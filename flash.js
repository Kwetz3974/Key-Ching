const mode = process.env.FLASH_MODE || "mock";
const API = process.env.FLASH_API_URL || "https://api.test.flashapp.me/graphql";
const WALLET = process.env.FLASH_WALLET_ID; // the BTC wallet that PAYS the rewards
const mock = new Map();
const live = new Map();

function authHeaders() {
  const k = process.env.FLASH_API_KEY || "";
  return { "Content-Type": "application/json", ...(k.startsWith("fk_") ? { "X-API-KEY": k } : { Authorization: `Bearer ${k}` }) };
}

async function gql(query, variables) {
  const r = await fetch(API, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ query, variables }),
  });
  const j = await r.json();
  if (j.errors && j.errors.length) throw new Error(j.errors[0].message);
  return j.data;
}

const SEND_ADDR = `mutation($input: LnAddressPaymentSendInput!){ lnAddressPaymentSend(input:$input){ status errors{ message } } }`;
const SEND_INV = `mutation($input: LnInvoicePaymentInput!){ lnInvoicePaymentSend(input:$input){ status errors{ message } } }`;
const MAP = { SUCCESS: "paid", ALREADY_PAID: "paid", PENDING: "pending", FAILURE: "failed" };

async function sendPayout({ destination, sats, memo }) {
  if (mode === "mock") {
    const id = "mock_" + Date.now();
    mock.set(id, Date.now());
    return { id, status: "pending" };
  }
  if (!WALLET || !process.env.FLASH_API_KEY) throw new Error("Set FLASH_API_KEY and FLASH_WALLET_ID in .env");
  const isAddr = destination.includes("@");
  const input = isAddr
    ? { walletId: WALLET, lnAddress: destination, amount: sats }
    : { walletId: WALLET, paymentRequest: destination, memo };
  const data = await gql(isAddr ? SEND_ADDR : SEND_INV, { input });
  const res = data[isAddr ? "lnAddressPaymentSend" : "lnInvoicePaymentSend"];
  if (res.errors && res.errors.length) throw new Error(res.errors[0].message);
  const status = MAP[res.status] || "pending";
  const id = "flash_" + Date.now();
  live.set(id, status);
  return { id, status };
}

async function getStatus(id) {
  if (mode === "mock") return Date.now() - (mock.get(id) || 0) > 4000 ? "paid" : "pending";
  return live.get(id) || "pending";
}

module.exports = { sendPayout, getStatus };

