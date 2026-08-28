# Daily Task Tracker

A deliberately simple personal task tracker.

## What it does

- **Top 3** — limits you to three focus items
- **Today** — normal tasks for the day
- **Later** — things you don't need staring at you right now
- **Brain Dump** — loose notes and reminders
- **Progress bar** — quick visual of what's done
- Saves automatically in your browser using `localStorage`
- No account, database, framework, or setup needed

## Run locally

Just open `index.html` in your browser.

For a cleaner local setup:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Put it on GitHub Pages

1. Create a new GitHub repository.
2. Upload these files.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`.
6. Save.

## Important

Your tasks are stored only in the browser you use. Clearing browser site data will remove them.

That is intentional for v1: no login, no backend, no clutter.
