# Deployment Plan for Frontend and Backend on Namecheap

## Overview
This document outlines the steps to deploy both the frontend (static files) and backend (Node.js server) of your project on Namecheap hosting.

---

## Frontend Deployment (Static Files)

1. **Access Namecheap cPanel:**
   - Log in to your Namecheap account.
   - Go to your hosting dashboard and open cPanel.

2. **Upload Frontend Files:**
   - Navigate to the "File Manager" in cPanel.
   - Go to the `public_html` directory (or the root directory for your domain).
   - Upload all frontend files (e.g., `index.html`, `about.html`, `register.html`, `career.html`, `pricing.html`, `api.html`, `blog.html`, `features.html`, `how-it-works.html`, `nutrients-chart.html`, CSS, JS, images, etc.).
   - Ensure the directory structure is maintained.

3. **Set File Permissions:**
   - Make sure files have appropriate read permissions (usually 644 for files, 755 for directories).

4. **Test Frontend:**
   - Visit your domain in a browser to verify the frontend loads correctly.

---

## Backend Deployment (Node.js Server)

1. **Check Hosting Type:**
   - Ensure your Namecheap hosting supports Node.js apps (usually VPS or dedicated server).
   - Shared hosting typically does not support running Node.js servers persistently.

2. **Access Server via SSH:**
   - Use SSH to connect to your server.
   - Upload your backend project files (all files inside the `backend` folder).

3. **Install Dependencies:**
   - Run `npm install` inside the backend directory to install dependencies.

4. **Run the Server:**
   - Use a process manager like `pm2` to run the server persistently:
     ```
     npm install -g pm2
     pm2 start server.js --name "major-project-backend"
     pm2 save
     pm2 startup
     ```
   - Configure firewall and ports as needed.

5. **Configure Domain and Proxy:**
   - If your backend runs on a port (e.g., 3000), configure a reverse proxy (e.g., via Apache or Nginx) to forward requests from your domain or subdomain to the backend server.

6. **Test Backend:**
   - Verify the backend API is accessible via your domain or subdomain.

---

## Additional Notes

- Ensure your MongoDB database is accessible from the deployed backend (consider using a cloud MongoDB service if needed).
- Update any environment variables or configuration files for production.
- Secure your server with SSL certificates (Namecheap offers free SSL or use Let's Encrypt).

---

## Summary

- Upload frontend static files to `public_html`.
- Deploy backend Node.js app on VPS or dedicated server with SSH access.
- Use pm2 to manage backend process.
- Configure domain and proxy settings.

---

If you want, I can help you prepare scripts or detailed commands for each step.

Please confirm if you want me to proceed with detailed deployment scripts or instructions.
