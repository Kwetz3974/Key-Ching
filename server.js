require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const flash = require("./flash");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

const CFG = { name: process.env.APP_NAME || "Key-Ching", passMark: Number(process.env.PASS_MARK || 0.7) };
const content = () => JSON.parse(fs.readFileSync(path.join(__dirname, "content/modules.json"), "utf8"));

// Tiny JSON "database". On Vercel only /tmp is writable (resets). Use a real DB for production.
const DB = process.env.VERCEL ? "/tmp/db.json" : path.join(__dirname, "data/db.json");
const load = () => (fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB, "utf8")) : { users: {} });
const save = (d) => fs.writeFileSync(DB, JSON.stringify(d, null, 2));
const getUser = (db, id) => {
  const u = (db.users[id] ||= {});
  u.passed ||= {}; u.scores ||= {}; u.done ||= {}; u.claims ||= {};
  return u;
};
const validId = (id) => typeof id === "string" && /^[\w-]{8,64}$/.test(id);
const validDestination = (d) =>
  typeof d === "string" && (/^[a-z0-9._-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(d.trim()) || /^lnbc[0-9a-z]+$/i.test(d.trim()));
// A level unlocks once the previous one is fully done (quiz + simulation)
const unlocked = (mods, u, i) => i === 0 || !!u.done[mods[i - 1].id];

app.get("/api/modules", (req, res) => {
  res.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  const c = content();
  const modules = c.modules.map((m) => ({ ...m, quiz: m.quiz.map(({ q, options }) => ({ q, options })) })); // answers stay here
  res.json({ config: CFG, demo: c.demo, modules });
});

app.get("/api/progress/:uid", (req, res) => {
  if (!validId(req.params.uid)) return res.status(400).json({ error: "bad id" });
  res.json(getUser(load(), req.params.uid));
});

app.post("/api/quiz/:moduleId", (req, res) => {
  const { uid, answers } = req.body;
  if (!validId(uid) || !Array.isArray(answers)) return res.status(400).json({ error: "bad request" });
  const mods = content().modules;
  const i = mods.findIndex((m) => m.id === req.params.moduleId);
  if (i < 0) return res.status(404).json({ error: "module not found" });
  const mod = mods[i];
  const db = load(), u = getUser(db, uid);
  if (!unlocked(mods, u, i)) return res.status(403).json({ error: "Finish the previous level first." });
  const correct = mod.quiz.filter((q, k) => answers[k] === q.answer).length;
  const score = correct / mod.quiz.length;
  const need = mod.passMark ?? CFG.passMark;
  u.scores[mod.id] = Math.max(u.scores[mod.id] || 0, score);
  if (score >= need) u.passed[mod.id] = true;
  save(db);
  res.json({ score, correct, total: mod.quiz.length, passed: score >= need, need });
});

// The recovery simulation reports completion here (needs a passed quiz). Sats are earned at this point.
app.post("/api/complete/:moduleId", (req, res) => {
  const { uid } = req.body;
  if (!validId(uid)) return res.status(400).json({ error: "bad id" });
  const mod = content().modules.find((m) => m.id === req.params.moduleId);
  if (!mod) return res.status(404).json({ error: "module not found" });
  const db = load(), u = getUser(db, uid);
  if (!u.passed[mod.id]) return res.status(403).json({ error: "Pass the questions first." });
  u.done[mod.id] = true;
  save(db);
  res.json({ ok: true, sats: mod.sats });
});

// One claim per level. Amount comes from the level in modules.json.
app.post("/api/claim", async (req, res) => {
  const { uid, moduleId, destination } = req.body;
  if (!validId(uid)) return res.status(400).json({ error: "bad id" });
  if (!validDestination(destination)) return res.status(400).json({ error: "Enter a valid Lightning address or invoice." });
  const mod = content().modules.find((m) => m.id === moduleId);
  if (!mod) return res.status(404).json({ error: "level not found" });
  const db = load(), u = getUser(db, uid);
  if (!u.done[mod.id]) return res.status(403).json({ error: "Finish this level to earn its sats." });
  if (u.claims[mod.id]) return res.status(409).json({ error: "Already claimed.", claim: u.claims[mod.id] });
  try {
    const p = await flash.sendPayout({ destination: destination.trim(), sats: mod.sats, memo: `${CFG.name}: ${mod.title}` });
    if (p.status === "failed") return res.status(502).json({ error: "Payment failed. Check the address and try again." });
    u.claims[mod.id] = { id: p.id, moduleId: mod.id, status: p.status, sats: mod.sats, at: new Date().toISOString() };
    save(db);
    res.json(u.claims[mod.id]);
  } catch (e) {
    res.status(502).json({ error: "Payment failed: " + e.message });
  }
});

// All claims for a user; refreshes any that are still pending
app.get("/api/claims/:uid", async (req, res) => {
  if (!validId(req.params.uid)) return res.status(400).json({ error: "bad id" });
  const db = load(), u = getUser(db, req.params.uid);
  for (const c of Object.values(u.claims)) {
    if (c.status === "pending") { try { c.status = await flash.getStatus(c.id); } catch (_) {} }
  }
  save(db);
  res.json(u.claims);
});

if (require.main === module) app.listen(process.env.PORT || 3000, () => console.log(`${CFG.name} on http://localhost:${process.env.PORT || 3000}`));
module.exports = app;

