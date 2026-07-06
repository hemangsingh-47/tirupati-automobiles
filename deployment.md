# Production Deployment Guide

This guide covers deploying the Tirupati Automobiles MERN application to a production environment.

## Prerequisites
- A VPS or cloud server (e.g., DigitalOcean, AWS EC2, Linode) running Ubuntu 20.04+
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance
- A domain name
- Nginx
- PM2

## 1. Server Setup

SSH into your server and install the necessary dependencies:

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs nginx
sudo npm install -g pm2
```

## 2. Clone and Install

```bash
git clone <your-repo-url> tirupati-automobiles
cd tirupati-automobiles

# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

## 3. Environment Variables

Create `.env` files in both directories.

**Backend (`server/.env`):**
```env
NODE_ENV=production
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

**Frontend (`/.env`):**
```env
VITE_API_URL=https://api.yourdomain.com/api
```

## 4. Build Frontend

```bash
cd ..
npm run build
```
This will create a `dist` folder.

## 5. Start Backend with PM2

```bash
cd server
pm2 start src/server.js --name "tirupati-api"
pm2 startup
pm2 save
```

## 6. Configure Nginx

Create a new Nginx configuration file:
`sudo nano /etc/nginx/sites-available/tirupati`

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # Frontend
    location / {
        root /path/to/tirupati-automobiles/dist;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Uploads
    location /uploads/ {
        alias /path/to/tirupati-automobiles/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }
}
```

Enable the configuration:
```bash
sudo ln -s /etc/nginx/sites-available/tirupati /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## 7. SSL Certificate (Certbot)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 8. Backup and Maintenance

Ensure `server/uploads` directory has proper read/write permissions for the Node process. Setup a cron job for MongoDB backups if using a local database.
