# Dx Cartographer — Vercel Deploy

## Structure
```
dx-vercel/
├── api/
│   └── chat.js       ← serverless function (your API key lives here)
├── public/
│   └── index.html    ← the frontend
├── vercel.json       ← routing config
└── package.json
```

## Deploy in 3 steps

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "init"
git remote add origin https://github.com/YOUR_USERNAME/dx-cartographer.git
git push -u origin main
```

### 2. Connect to Vercel
1. Go to https://vercel.com → New Project
2. Import your GitHub repo
3. Leave all build settings as default
4. Click Deploy

### 3. Add your API key
1. In Vercel dashboard → your project → **Settings → Environment Variables**
2. Add:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-your-key-here`
3. Go to **Deployments** → click the 3 dots on latest → **Redeploy**

That's it. Your site is live at `https://your-project.vercel.app`

## How it works
```
Browser → /api/chat (Vercel serverless) → Anthropic API
```
Key never touches the browser. Free tier = 100GB bandwidth + unlimited serverless invocations.
