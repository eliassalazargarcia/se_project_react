# WTWR (What to Wear)

A weather-based clothing recommendation app that helps users decide what to wear based on current weather conditions. Users can browse, add, and manage clothing items while the app suggests appropriate attire for the day's forecast.

**Live Demo:** [https://finalsprint.jumpingcrab.com](https://finalsprint.jumpingcrab.com)

**Backend Repository:** [WTWR Express API](https://github.com/eliassalazargarcia/se_project_express)

## Tech Stack

- **Frontend:** React, React Router, Vite
- **Backend:** Node.js, Express
- **Database:** MongoDB

## Features

- View weather-appropriate clothing suggestions based on current local weather
- Browse all clothing items on a personalized profile page
- Add new clothing items with name, image URL, and weather category
- Delete items with confirmation dialog
- Responsive design optimized for desktop, tablet, and mobile devices
- User authentication (login/signup)
- Like/unlike favorite clothing items

## Installation

1. Clone the repository:
```bash
git clone https://github.com/eliassalazargarcia/se_project_react.git
cd se_project_react
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## Backend Setup

This frontend connects to a separate Express API backend. To run the full application locally:

1. Clone and set up the [backend repository](https://github.com/eliassalazargarcia/se_project_express)
2. Ensure the backend server is running on port 3001
3. The frontend will automatically connect to the API endpoints

## Project Structure

```
src/
├── components/     # React components (App, Profile, Modals, etc.)
├── contexts/       # React context providers
├── hooks/          # Custom React hooks
├── utils/          # API calls and helper functions
└── vendor/         # Third-party assets and fonts
```
