◇  Project next steps ─────────────────────────────────────────────────────╮
│                                                                          │
│  1: cd personal-website                                                  │
│  2: git init && git add -A && git commit -m "Initial commit" (optional)  │
│  3: npm run dev -- --open                                                │
│                                                                          │
│  To close the dev server, hit Ctrl-C                                     │
│                                                                          │
│  Stuck? Visit us at https://svelte.dev/chat                              │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────╯
│
◇  Integration next steps ─────────────────────────────────────────────╮
│                                                                      │
│  drizzle:                                                            │
│  - You will need to set DATABASE_URL in your production environment  │
│  - Run npm run db:start to start the docker container                │
│  - Run npm run db:push to update your database schema                │
│                                                                      │
│  lucia:                                                              │
│  - Run npm run db:push to update your database schema                │
│  - Visit /demo/lucia route to view the demo                          │
│                                                                      │
├──────────────────────────────────────────────────────────────────────╯