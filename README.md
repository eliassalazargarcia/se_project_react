# WTWR React App

A React + Vite project that shows weather-based clothing items, a profile page, and item management using a mock API.

## Features
- Home page shows items filtered by current weather.
- Profile page shows all items and an add button.
- Add/delete items through a mock server (`json-server`).
- Responsive item cards for desktop, tablet, and phone.

## Demo Video
Presentation/explanation video:
https://drive.google.com/file/d/1OUhPrK2FbILZ2N6zuBsQjT1-WABsg4cF/view?usp=sharing

## Getting Started
1) Install dependencies:
```
npm install
```
2) Start the mock API server (Terminal 1):
```
json-server --watch db.json --id _id --port 3001
```
3) Start the app (Terminal 2):
```
npm run dev
```

## Notes for Presentation
See `NOTES.md` for a simple, non-technical summary you can read from.

## Project Structure (Key Files)
- `src/components/App/App.jsx`: routes, state, and modal handlers
- `src/components/Profile/*`: profile layout and list of items
- `src/components/AddItemModal/AddItemModal.jsx`: add item form
- `src/components/ItemModal/ItemModal.jsx`: item preview and delete trigger
- `src/components/DeleteConfirmationModal/*`: delete confirmation dialog
- `src/utils/api.js`: GET/POST/DELETE calls to the mock server

## Requirements
- Node.js + npm
- `json-server` running on port 3001
