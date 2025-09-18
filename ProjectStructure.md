# 📂 Project Structure – Prayer Times Web App

```plaintext
prayer-times-app/
├─ node_modules/          ← Installed dependencies 
├─ public/                ← Static assets (images, icons, etc.)
├─ src/
│  ├─ api.js              ← Handles all API requests (REST Countries, CountriesNow, Aladhan) + caching 
│  ├─ ui.js               ← UI + DOM helpers (selects, table, next prayer banner)
│  ├─ utils.js            ← General utilities (fetch, date, helpers)
│  ├─ app.js              ← Core logic: event orchestration, state, countdown timer
│  ├─ config.js           ← Centralized constants & API endpoints (prayer list, storage keys, base URLs)
│  ├─ storage.js          ← LocalStorage wrapper (get/set/del/clear with safe JSON )
│  └─ styles.css          ← Styling and responsive layout for desktop & mobile
├─ .gitignore             ← Git ignored files and folders
├─ index.html             ← Main HTML file (static DOM: selectors, table, banner, reset)
├─ package.json           ← Project manifest (dependencies, scripts, metadata)
├─ package-lock.json      ← Dependency lockfile 
├─ ProjectStructure.md    ← Documentation of project structure
└─ README.md              ← Documentation and setup instructions
