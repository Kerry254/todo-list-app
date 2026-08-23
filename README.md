# My To-Do List

A simple, beginner-friendly to-do list app built with plain HTML, CSS, and JavaScript — no frameworks, no build tools. Tasks are saved in your browser so they're still there when you come back.

## What it does

Add tasks, check them off when done, delete the ones you don't need anymore, and switch between light and dark mode. Everything is saved automatically — there's no save button and no login, it all lives in your browser's local storage.

## How to run it

1. Download or clone the three files (`index.html`, `script.js`, `style.css`) into the same folder — they must stay together.
2. Open `index.html` in any modern browser 
3.  No installation, no server, no dependencies required.


##Features implemented

- **Add a task**— type in the input box and press Enter or click Add.
- **Mark complete** — click the checkbox next to a task; it gets a strikethrough.
- **Delete a task** — click the ✕ button on any task.
- **Persistent storage** — tasks are saved to `localStorage`, so refreshing or closing the browser doesn't lose them.
- **Dark / light mode toggle** — click the button in the top-right corner to switch themes. Your choice is remembered on your next visit too.

## Bonus features

- **Theme persistence** — most beginner to-do apps only toggle dark mode for the current session; this one remembers your choice across visits using `localStorage`.
- **Smooth theme transition** — background and text colors fade instead of switching instantly (see the `transition` property in `style.css`).
- **Empty-input protection** — the form won't add a blank task, and extra spaces are trimmed automatically before saving.

## Known limitations 

- No editing an existing task (you'd delete it and re-add it).
- No priority levels or status categories  — just done or not done.
- No task count, stats, or progress bar.
- Tasks are stored per-browser, per-device — they won't sync across different browsers or computers.

## Files


| `index.html` | Page structure — the form and the empty task list container 
| `script.js` | All app logic — adding, deleting, completing tasks, saving/loading, and theme switching |
| `style.css` | All styling, including the light/dark color variables |
