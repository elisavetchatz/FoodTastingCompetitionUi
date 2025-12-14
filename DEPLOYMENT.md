# 🚀 Deployment Guide for Render

This guide will help you deploy your Food Tasting Competition app to Render.

## Prerequisites

- GitHub account
- Render account (free tier available at [render.com](https://render.com))
- Your code pushed to GitHub

## Step-by-Step Deployment

### 1. Push to GitHub

```bash
git add .
git commit -m "Prepare for Render deployment"
git push origin main
```

### 2. Deploy on Render

#### Option A: Automatic (Blueprint)

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will detect `render.yaml` and configure automatically
5. Click **"Apply"** to deploy

#### Option B: Manual

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

**Settings:**
- **Name**: `food-tasting-competition`
- **Region**: Choose closest to you (e.g., Frankfurt)
- **Branch**: `main`
- **Root Directory**: Leave empty (project root)
- **Runtime**: `Node`
- **Build Command**: `npm run render-build`
- **Start Command**: `npm run render-start`
- **Plan**: Free

**Environment Variables:**
- `NODE_ENV` = `production`
- `PORT` = `3000` (Render sets this automatically)
- `ALLOWED_ORIGINS` = `https://your-app-name.onrender.com`
- `RATE_LIMIT_WINDOW_MS` = `900000`
- `RATE_LIMIT_MAX_REQUESTS` = `100`

5. Click **"Create Web Service"**

### 3. Wait for Deployment

- First deployment takes 5-10 minutes
- Render will:
  - Install root dependencies
  - Install backend dependencies
  - Install frontend dependencies
  - Build the frontend
  - Start the backend server
- Backend serves the built frontend automatically

### 4. Access Your App

Once deployed, your app will be available at:
```
https://your-app-name.onrender.com
```

## How It Works in Production

1. **Build Phase** (`npm run render-build`):
   - Installs all dependencies (root, backend, frontend)
   - Builds the React frontend into static files (`frontend/dist`)

2. **Start Phase** (`npm run render-start`):
   - Starts the backend server in production mode
   - Backend serves API routes at `/api/*`
   - Backend serves built frontend files for all other routes
   - Single domain for both frontend and backend

3. **Architecture**:
   ```
   User Request → Render Server
                    ↓
                Backend (Express)
                    ↓
         ┌──────────┴──────────┐
         ↓                     ↓
    /api/* routes      Static Files (React)
   (API endpoints)     (frontend/dist)
   ```

## Updating Your Deployment

Simply push changes to GitHub:

```bash
git add .
git commit -m "Update app"
git push origin main
```

Render automatically rebuilds and redeploys!

## Troubleshooting

### Build Fails

**Check build logs** in Render dashboard:
- Look for dependency errors
- Ensure all package.json files are correct
- Verify Node.js version compatibility

### App Won't Start

**Check runtime logs**:
- Look for port binding errors
- Verify environment variables are set
- Check that `NODE_ENV=production` is set

### API Not Working

**Check CORS settings**:
- Update `ALLOWED_ORIGINS` environment variable
- Should match your Render URL exactly
- Include `https://` protocol

### Frontend Shows 404

**Check that**:
- Build completed successfully (check logs)
- `frontend/dist` directory exists after build
- Backend is serving static files in production mode

## Free Tier Limitations

Render free tier includes:
- ✅ 512 MB RAM
- ✅ Automatic HTTPS
- ✅ Auto-deploy from GitHub
- ⚠️ Spins down after 15 minutes of inactivity
- ⚠️ 750 hours/month (enough for one app)

**Note**: First request after spin-down takes ~30 seconds to wake up.

## Upgrading to Paid Plan

For production use, consider:
- **Starter Plan** ($7/month): No spin-down, 512 MB RAM
- **Standard Plan** ($25/month): 2 GB RAM, better performance

## Custom Domain

To use your own domain:
1. Go to your service settings
2. Click **"Custom Domain"**
3. Add your domain
4. Update DNS records as instructed
5. Render provides free SSL automatically

## Environment Variables

Update anytime in Render dashboard:
1. Go to your service
2. Click **"Environment"**
3. Add/edit variables
4. Service auto-redeploys

## Monitoring

Render provides:
- **Logs**: Real-time application logs
- **Metrics**: CPU, memory, bandwidth usage
- **Alerts**: Email notifications for failures

## Need Help?

- [Render Documentation](https://render.com/docs)
- [Render Community](https://community.render.com)
- Check your deployment logs in Render dashboard

---

**Congratulations!** Your Food Tasting Competition app is now live! 🎉
