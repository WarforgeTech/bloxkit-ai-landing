# Firebase Functions Gen 2 Setup Guide

This guide explains how to properly configure your frontend to work with Firebase Functions Gen 2 for secure secret management.

## 🎯 Overview

Firebase Functions Gen 2 provides better secret management through the Firebase CLI, eliminating the need to store sensitive keys in environment variables or code.

## 🚨 Implementation Commitment Rules

### ⚠️ CRITICAL: Stick to Chosen Implementations

**When a specific technology or approach has been chosen and significant time invested:**

1. **DO NOT switch frameworks/tools mid-implementation** without explicit user approval
2. **DO continue debugging** the chosen solution systematically
3. **DO document issues** and troubleshooting steps
4. **DO ask for permission** before suggesting major changes

**Examples of what NOT to do:**
- ❌ Switching from Gmail API to Resend after hours of setup
- ❌ Changing from Firebase Functions to Vercel Functions mid-project
- ❌ Abandoning Stripe for PayPal after configuration

**Examples of what TO do:**
- ✅ Debug Gmail API authentication issues step-by-step
- ✅ Check Firebase deployment logs for specific errors
- ✅ Verify Google Cloud Console settings
- ✅ Test with different credentials or scopes
- ✅ Ask user before suggesting alternative approaches

### Debugging Best Practices

1. **Systematic Approach:**
   - Start with the most likely cause
   - Check logs and error messages carefully
   - Verify configuration step-by-step
   - Test each component individually

2. **Documentation:**
   - Record all troubleshooting steps
   - Note what works and what doesn't
   - Keep track of configuration changes

3. **Communication:**
   - Explain the issue clearly
   - Present debugging options
   - Ask for permission before major changes

## 🔧 Environment Variables Setup

### Required Environment Variables

Add these to your `.env.local` file:

```bash
# Firebase Functions Gen 2 API Endpoints
NEXT_PUBLIC_DEVELOPMENT_API_ENDPOINT=https://your-dev-function-url.cloudfunctions.net
NEXT_PUBLIC_PRODUCTION_API_ENDPOINT=https://your-prod-function-url.cloudfunctions.net

# Optional: Override for all environments
# NEXT_PUBLIC_STRIPE_API_ENDPOINT=https://your-custom-endpoint.com

# Optional: Custom headers (JSON string)
# NEXT_PUBLIC_API_HEADERS={"X-Custom-Header": "value"}

# URLs
NEXT_PUBLIC_DEVELOPMENT_URL=http://localhost:9002
NEXT_PUBLIC_PRODUCTION_URL=https://yourdomain.com
```

## 🏗️ Firebase Functions Gen 2 API Project Setup

### 1. Initialize Firebase Functions Gen 2

In your API project directory:

```bash
# Initialize Firebase Functions Gen 2
firebase init functions

# Choose:
# - TypeScript
# - ESLint
# - Install dependencies
```

### 2. Configure Functions for Gen 2

Update your `functions/package.json`:

```json
{
  "name": "functions",
  "scripts": {
    "build": "tsc",
    "serve": "npm run build && firebase emulators:start --only functions",
    "shell": "npm run build && firebase functions:shell",
    "start": "npm run shell",
    "deploy": "firebase deploy --only functions",
    "logs": "firebase functions:log"
  },
  "engines": {
    "node": "18"
  },
  "main": "lib/index.js",
  "dependencies": {
    "firebase-admin": "^11.8.0",
    "firebase-functions": "^4.3.1",
    "stripe": "^12.0.0"
  },
  "devDependencies": {
    "typescript": "^4.9.0",
    "@types/node": "^18.0.0"
  },
  "private": true
}
```

### 3. Set Up Secret Management

Use Firebase CLI to manage secrets:

```bash
# Set development secrets
firebase functions:secrets:set STRIPE_SECRET_KEY_TEST
# Enter your test secret key when prompted

# Set production secrets
firebase functions:secrets:set STRIPE_SECRET_KEY_LIVE
# Enter your live secret key when prompted

# Set other secrets as needed
firebase functions:secrets:set WEBHOOK_SECRET
firebase functions:secrets:set API_KEY
```

### 4. Access Secrets in Functions

In your Firebase Functions code:

```typescript
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";

// Define secrets
const stripeSecretKey = defineSecret("STRIPE_SECRET_KEY_TEST");
const stripeSecretKeyLive = defineSecret("STRIPE_SECRET_KEY_LIVE");

// Use in function
export const stripeCheckoutSession = onRequest(
  {
    secrets: [stripeSecretKey, stripeSecretKeyLive],
    cors: true,
  },
  async (req, res) => {
    const config = getStripeConfig();
    const secretKey = config.isProduction 
      ? stripeSecretKeyLive.value() 
      : stripeSecretKey.value();
    
    // Your Stripe logic here
  }
);
```

## 🔄 Frontend Integration

### 1. Environment Detection

The frontend automatically detects the environment:

```typescript
import { getFirebaseFunctionsConfig } from '@/lib/firebase-functions-config';

const config = getFirebaseFunctionsConfig();
console.log('API Endpoint:', config.apiEndpoint);
console.log('Environment:', config.environment);
```

### 2. Using the Checkout System

```tsx
import { EnvironmentAwareCheckoutButton } from '@/components/ui/environment-aware-checkout-button';

<EnvironmentAwareCheckoutButton
  productKey="bootcamp"
  metadata={{ source: 'pricing' }}
>
  Buy Now
</EnvironmentAwareCheckoutButton>
```

### 3. Manual API Calls

```typescript
import { createStripeCheckoutSession } from '@/lib/stripe-checkout';

const result = await createStripeCheckoutSession({
  priceId: 'price_123',
  quantity: 1,
  metadata: { source: 'manual' }
});
```

## 🛡️ Security Best Practices

### 1. Secret Management

✅ **Use Firebase CLI secrets** instead of environment variables  
✅ **Never commit secrets** to version control  
✅ **Use different secrets** for dev/prod environments  
✅ **Rotate secrets regularly**  

### 2. API Security

✅ **Validate requests** on the server side  
✅ **Use CORS properly**  
✅ **Add request headers** for tracking  
✅ **Implement rate limiting**  

### 3. Environment Separation

✅ **Separate dev/prod** Firebase projects  
✅ **Use different Stripe accounts** for test/live  
✅ **Validate environment** on both client and server  

## 🔍 Configuration Validation

### 1. Validate Frontend Config

```typescript
import { validateFirebaseFunctionsConfig } from '@/lib/firebase-functions-config';

const validation = validateFirebaseFunctionsConfig();
if (!validation.valid) {
  console.warn('Configuration warnings:', validation.warnings);
}
```

### 2. Generate Configuration Report

```typescript
import { generateFirebaseFunctionsReport } from '@/lib/firebase-functions-config';

console.log(generateFirebaseFunctionsReport());
```

## 🚀 Deployment

### 1. Deploy Functions

```bash
# Deploy to development
firebase deploy --only functions --project your-dev-project

# Deploy to production
firebase deploy --only functions --project your-prod-project
```

### 2. Update Frontend Endpoints

After deployment, update your environment variables with the new function URLs.

### 3. Test Both Environments

```bash
# Test development
npm run dev

# Test production
STRIPE_ENVIRONMENT=production npm run dev
```

## 🔧 Troubleshooting

### Common Issues

1. **"Function not found"**
   - Check the function URL in environment variables
   - Verify the function is deployed
   - Check Firebase project configuration

2. **"Secret not found"**
   - Verify secrets are set with Firebase CLI
   - Check secret names match function code
   - Ensure secrets are accessible in the function

3. **"CORS error"**
   - Configure CORS in your Firebase function
   - Check allowed origins
   - Verify request headers

### Debug Mode

Enable detailed logging:

```typescript
// In your frontend
const config = getFirebaseFunctionsConfig();
console.log('Full config:', config);

// In your Firebase function
console.log('Request headers:', req.headers);
console.log('Request body:', req.body);
```

## 📋 Checklist

- [ ] Set up Firebase Functions Gen 2 project
- [ ] Configure secrets with Firebase CLI
- [ ] Deploy functions to dev environment
- [ ] Deploy functions to prod environment
- [ ] Update frontend environment variables
- [ ] Test checkout in development
- [ ] Test checkout in production
- [ ] Validate configuration
- [ ] Set up monitoring and logging

## 🎉 Benefits

✅ **Secure secret management** through Firebase CLI  
✅ **Environment separation** with different projects  
✅ **Automatic environment detection**  
✅ **Type-safe configuration**  
✅ **Centralized API management**  
✅ **Easy deployment** with Firebase CLI  
✅ **Built-in monitoring** and logging  
✅ **Scalable architecture** 