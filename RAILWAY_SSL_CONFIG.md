# GIG ZipFinder - Railway Configuration

## SSL/HTTPS Configuration
Railway automatically provides SSL certificates for custom domains.

### Current Configuration:
- Domain: www.gigzipfinder.com
- SSL: Automatic (provided by Railway)
- Force HTTPS: Enabled via _redirects

### DNS Configuration Required:

**Option 1 (Recommended):**
```
CNAME record:
Name: www
Value: gigzipfinder-production.up.railway.app (replace with your actual Railway domain)

A record (for root domain):
Name: @ or leave blank
Value: [Get this from Railway Dashboard]
```

**Option 2 (If CNAME for root is supported):**
```
CNAME record:
Name: www
Value: your-project.up.railway.app

CNAME record:
Name: @
Value: your-project.up.railway.app
```

### To Get Your Railway Domain:
1. Go to Railway Dashboard
2. Click on your frontend service
3. Go to Settings → Networking
4. Copy the Railway-provided domain

### To Enable SSL:
1. Railway Dashboard → Your Project → Frontend Service
2. Settings → Domains
3. Add custom domain: www.gigzipfinder.com
4. Railway will automatically provision SSL certificate
5. Wait 5-10 minutes for DNS propagation

### Verification:
After configuration, test:
- http://www.gigzipfinder.com (should redirect to https)
- https://www.gigzipfinder.com (should work with green lock)

### Troubleshooting:
If SSL doesn't work after 10 minutes:
1. Verify DNS settings in your domain registrar
2. Clear browser cache
3. Use incognito mode
4. Check Railway logs for errors
