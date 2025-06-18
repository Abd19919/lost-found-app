# 🚀 Deployment Guide for Lost & Found App (M2)

This document explains the deployment process of the full-stack web application using **Railway** for the backend and **Vercel** for the frontend.

---

## 🔧 Backend Deployment (Express + PostgreSQL on Railway)

### ✅ Prerequisites
- Railway account: https://railway.app
- PostgreSQL installed locally (for development and DB structure setup)

### 🛠️ Steps

1. **Create a new project** on Railway
2. **Add PostgreSQL plugin**
   - Railway will create a new PostgreSQL database with connection credentials
3. **Set up environment variables**
   - Go to `Variables` tab in Railway and add:
     - `DATABASE_URL` → value from the PostgreSQL plugin
4. **Connect GitHub repo or drag-and-drop backend folder**
5. **Set Start Command**
   - In Railway → Settings → Start Command → `node server.js`
6. **Push backend code to GitHub (if not done)**
   ```bash
   git init
   git remote add origin <your_repo_url>
   git push -u origin main