# GIG ZipFinder - Find the Best ZIP Codes for Gig Economy Apps

A full-stack web application that helps gig economy workers find the best US ZIP codes for apps like Instacart, DoorDash, Uber, and more.

## 🚀 Features

- **AI-Powered Search**: Real-time web search using Perplexity API
- **Multiple AI Providers**: Supports xAI (Grok), OpenAI, and Emergent LLM
- **Stripe Payment Integration**: Secure payment processing
- **48-Hour Access**: Purchased ZIP codes expire after 48 hours
- **Multi-Language Support**: English, Spanish, and Portuguese
- **Mobile Responsive**: Works on all devices

## 🛠 Tech Stack

**Frontend:**
- React 19
- Tailwind CSS
- Axios

**Backend:**
- FastAPI (Python)
- Motor (MongoDB Async)
- APScheduler
- Stripe

**Database:**
- MongoDB Atlas

## 📦 Environment Variables

All configuration is done via environment variables. Never commit `.env` files.

### Backend Variables:
```
MONGO_URL=<your_mongodb_connection_string>
DB_NAME=<your_database_name>
CORS_ORIGINS=*
STRIPE_SECRET_KEY=<your_stripe_secret_key>
STRIPE_PUBLISHABLE_KEY=<your_stripe_publishable_key>
ADMIN_SECRET_KEY=<your_admin_secret>
FRONTEND_URL=https://www.gigzipfinder.com
XAI_API_KEY=<your_xai_key>
OPENAI_API_KEY=<your_openai_key>
PERPLEXITY_API_KEY=<your_perplexity_key>
EMERGENT_LLM_KEY=<your_emergent_key>
```

### Frontend Variables:
```
REACT_APP_BACKEND_URL=<your_backend_url>
```

## 🚀 Deployment

This application is designed to run on Railway with separate services for frontend and backend.

1. Connect your GitHub repository to Railway
2. Create two services: one for backend, one for frontend
3. Set all environment variables in Railway dashboard
4. Deploy!

## 📝 License

Proprietary - All rights reserved

## 🔒 Security

- Never commit API keys or credentials
- All secrets managed via environment variables
- Use Stripe test mode for development
