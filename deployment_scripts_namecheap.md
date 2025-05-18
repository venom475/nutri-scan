# Deployment Scripts and Commands for Namecheap Hosting

## Frontend Deployment

### Upload Frontend Files via cPanel File Manager or FTP
- Use cPanel File Manager or an FTP client (e.g., FileZilla) to upload all frontend files to the `public_html` directory.
- No scripts needed for this step, just manual upload.

---

## Backend Deployment

### Prerequisites
- SSH access to your Namecheap VPS or dedicated server.
- Node.js and npm installed on the server.
- pm2 installed globally (process manager).

### Step 1: Connect to Server via SSH
```bash
ssh your-username@your-server-ip
```

### Step 2: Upload Backend Files
- Use `scp` or an FTP client to upload the entire `backend` folder to your server, e.g.:
```bash
scp -r backend your-username@your-server-ip:/home/your-username/
```

### Step 3: Install Dependencies
```bash
cd backend
npm install
```

### Step 4: Install pm2 (if not installed)
```bash
npm install -g pm2
```

### Step 5: Start the Backend Server with pm2
```bash
pm2 start server.js --name "major-project-backend"
pm2 save
pm2 startup
```
- Follow any instructions pm2 outputs after `pm2 startup` to enable startup on boot.

### Step 6: Configure Reverse Proxy (Apache or Nginx)
- Configure your web server to proxy requests to your Node.js backend port (default 3000).
- Example Nginx config snippet:
```
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
- Restart Nginx after configuration.

### Step 7: Verify Backend is Running
- Visit your domain or server IP to check if backend API is accessible.

---

## Additional Notes

- Update environment variables or config files for production settings.
- Ensure MongoDB is accessible from your server.
- Secure your server with SSL certificates (Let's Encrypt or Namecheap SSL).

---

If you want, I can help you with specific commands for FTP upload or cPanel usage, or help you write Nginx/Apache config files.
