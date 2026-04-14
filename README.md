# TunBraille - Website

Official website for TunBraille, built with React + Vite + Tailwind CSS, powered by Firebase.

## Getting Started

```bash
npm install
npm run dev
```

## Environment Variables

This project uses Firebase. You need to set environment variables before building or running.

### Local Development

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
2. Fill in your Firebase values in `.env`.

### Netlify Deployment

Go to **Netlify Dashboard > Site settings > Environment variables** and add the following:

| Variable | Description |
|---|---|
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain (e.g. `your-project.firebaseapp.com`) |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket (e.g. `your-project.firebasestorage.app`) |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

You can find all these values in the [Firebase Console](https://console.firebase.google.com/) under **Project Settings > General > Your apps > Web app**.

### Build Command (Netlify)

```
npm run build
```

**Publish directory:** `dist`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
