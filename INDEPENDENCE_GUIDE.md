# 🚀 GIG ZipFinder - Deployment Independence Guide

## ✅ Making Your Application 100% Independent from Emergent

Your GIG ZipFinder application can run **completely independently** with your own API keys. Here's how:

---

## 🔑 **Required API Keys**

### 1. **Stripe** (REQUIRED for payments)
```bash
STRIPE_SECRET_KEY=sk_live_...
STRIPE_PUBLISHABLE_KEY=pk_live_...
```
**Get your keys:** https://dashboard.stripe.com/apikeys

---

### 2. **OpenAI** (RECOMMENDED for AI ZIP code search)
```bash
OPENAI_API_KEY=sk-proj-...
```
**Get your key:** https://platform.openai.com/api-keys

**Why OpenAI?**
- ✅ **100% Independent** - No dependency on Emergent
- ✅ **GPT-4o** - Best model for analyzing gig economy markets
- ✅ **Direct billing** - You control your usage and costs

---

### 3. **Perplexity** (OPTIONAL for real-time web search)
```bash
PERPLEXITY_API_KEY=pplx-...
```
**Get your key:** https://www.perplexity.ai/settings/api

**Benefits:**
- Real-time web search for the latest ZIP code availability
- Scrapes Reddit, YouTube, forums for actual driver experiences
- More accurate results than AI-only predictions

---

## 📋 **Configuration Priority**

The system uses this priority order for AI features:

1. **OPENAI_API_KEY** (Your own key - INDEPENDENT)
2. **EMERGENT_LLM_KEY** (Fallback universal key)
3. **Cached ZIP codes** (If no AI key is configured)

---

## ⚙️ **How to Deploy Independently**

### **On Railway** (Your current setup)

1. **Backend Service** (`gigzipfinder`):
   ```
   Go to: Variables tab
   
   Add these:
   OPENAI_API_KEY=sk-proj-your_openai_key_here
   STRIPE_SECRET_KEY=sk_live_your_stripe_key_here
   STRIPE_PUBLISHABLE_KEY=pk_live_your_stripe_key_here
   PERPLEXITY_API_KEY=pplx-your_key_here  (optional)
   
   Remove (if you want 100% independence):
   EMERGENT_LLM_KEY  (Delete this variable)
   ```

2. **Frontend Service** (`Gig-web`):
   ```
   Already configured:
   REACT_APP_BACKEND_URL=https://gigzipfinder-production.up.railway.app
   ```

3. Railway will automatically redeploy after saving variables.

---

### **On Other Platforms** (Vercel, Netlify, AWS, etc.)

1. Copy `/app/backend/.env.example` to `.env`
2. Fill in your API keys
3. Set `FRONTEND_URL` to your production domain
4. Deploy normally

---

## 🤖 **How AI Search Works**

### **Automatic Updates Every 48 Hours**

Your application has a built-in scheduler that:

1. ✅ **Runs automatically** every 48 hours
2. ✅ **Searches in real-time** using Perplexity (if configured)
3. ✅ **Analyzes with GPT-4o** to extract the best ZIP codes
4. ✅ **Updates the database** with fresh high-availability areas
5. ✅ **No manual intervention needed**

### **What Gets Searched**

For each app (Instacart, DoorDash, Spark Driver):
- Reddit communities (r/InstacartShoppers, r/doordash_drivers, r/Sparkdriver)
- YouTube tutorials and reviews
- Forums and Facebook groups
- News articles about gig economy
- Recent driver experiences

### **Search Quality Levels**

| Configuration | Search Quality | Independence |
|---------------|----------------|--------------|
| **OpenAI + Perplexity** | ⭐⭐⭐⭐⭐ Excellent (Real-time web data) | ✅ 100% Independent |
| **OpenAI only** | ⭐⭐⭐⭐ Very Good (AI predictions) | ✅ 100% Independent |
| **Emergent LLM Key** | ⭐⭐⭐⭐ Very Good (AI predictions) | ⚠️ Depends on Emergent |
| **No AI key** | ⭐⭐ Fair (Cached data only) | ✅ Independent but limited |

---

## 💰 **Cost Estimates** (Using your own keys)

### **OpenAI GPT-4o**
- ~$0.01 - $0.03 per ZIP code search
- 3 apps × 48-hour updates = ~$0.90/month for AI
- User-triggered searches: ~$0.01 each

### **Perplexity**
- ~$0.005 - $0.01 per web search
- Optional but highly recommended for accuracy

### **Stripe**
- 2.9% + $0.30 per successful transaction
- No monthly fees

**Total estimated cost:** $1-3/month for AI + Stripe transaction fees

---

## ✅ **Verification**

To check if your application is independent:

1. **Remove EMERGENT_LLM_KEY** from Railway variables
2. **Add OPENAI_API_KEY**
3. Wait for redeploy
4. Test: Visit https://www.gigzipfinder.com/purchase/instacart
5. The AI search should work normally

---

## 🔧 **Troubleshooting**

### "AI search not working"
✅ Check: `OPENAI_API_KEY` or `EMERGENT_LLM_KEY` is set in Railway
✅ Check: Key is valid and not expired
✅ Check: Backend logs in Railway for errors

### "Payments not working"
✅ Check: Both Stripe keys are set correctly
✅ Check: Keys are LIVE keys (sk_live_* and pk_live_*)
✅ Check: Stripe account is activated

### "Scheduler not running"
✅ Check: Backend service is running in Railway
✅ Check: MongoDB is accessible
✅ Wait: First run may take up to 48 hours after deployment

---

## 📞 **Need Help?**

- **Stripe setup:** https://stripe.com/docs
- **OpenAI setup:** https://platform.openai.com/docs
- **Perplexity setup:** https://docs.perplexity.ai

---

**Your application is NOW independent and production-ready! 🎉**
