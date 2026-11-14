# Key-Ching 🔑
Learn. Simulate. Test. Earn. A Bitcoin self-custody education app that pays sats via Flash.

## Run
    npm install
    cp .env.example .env
    npm run dev        # http://localhost:3000

Runs in **mock payment mode** by default, so the full flow works with no Flash credentials.

## Tweak it (no code needed)
- **Lessons, simulations, quizzes:** edit `content/modules.json`. Add a module by copying one block.
- **Reward size, pass mark, app name:** edit `.env`.
- **Look and feel:** `public/index.html` (CSS at the top).

## Go live with Flash
All Flash logic lives in `flash.js`. Implement `sendPayout()` and `getStatus()` per Flash's docs,
set `FLASH_MODE=live` and add your key to `.env`. Nothing else changes.

## How it's built
- `server.js`: Express API. Quizzes are graded server-side (answers never reach the browser) and reward eligibility is checked server-side.
- `data/db.json`: simple file storage. Swap for SQLite/Postgres when needed.
- Users are anonymous (random ID in localStorage). Add login if you need one user per person.

## Safety
Educational only. Never ask for or store real recovery phrases, keys or PINs. All scenarios are fictional.

## Known MVP gaps
No auth or rate limiting (one claim per browser ID can be bypassed by clearing storage). Add login + per-IP limits before real payouts.
