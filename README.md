# Defeating ADHD - Protocol Tracker

A mobile-first React app for tracking the 12-week ADHD intervention protocol.

## Features

- **Today Tab**: Daily checklist, quick log buttons, food logging
- **Workout Tab**: Strength (A/B/C), Cardio (4x4, Zone 2), Mobility (D), Sauna Stretches
- **Protocols Tab**: BOLT timer, HRV biofeedback, CO2 training, sauna, NSDR, supplements
- **Tests Tab**: ASRS-6/18, cognitive tests, reaction time
- **Trends Tab**: 7-day charts for all metrics
- **Calendar Export**: Download .ics file with 12 weeks of reminders

## Deploy to Vercel (Easiest)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Import Project" → Select your GitHub repo
4. Click "Deploy"
5. Done! You'll get a URL like `adhd-protocol.vercel.app`

## Add to iPhone Home Screen

1. Open your Vercel URL in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Now it works like a native app

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Recharts
- Lucide Icons
