# Stripe Environment Setup Guide

This guide explains how to properly manage Stripe in both development and production environments.

## 🎯 Overview

The new system automatically switches between test and live Stripe environments based on your configuration, eliminating the need to manually change keys or price IDs.

## 🔧 Environment Variables Setup

### Required Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Development (Test Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST=pk_test_your_test_publishable_key
STRIPE_SECRET_KEY_TEST=sk_test_your_test_secret_key

# Production (Live Mode)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_your_live_publishable_key
STRIPE_SECRET_KEY_LIVE=sk_live_your_live_secret_key

# Optional: Force environment (overrides NODE_ENV)
STRIPE_ENVIRONMENT=development  # or 'production'

# URLs (optional - will use defaults if not set)
NEXT_PUBLIC_DEVELOPMENT_URL=http://localhost:9002
NEXT_PUBLIC_PRODUCTION_URL=https://yourdomain.com
NEXT_PUBLIC_BASE_URL=http://localhost:9002
```

## 🏗️ Stripe Dashboard Setup

### 1. Create Test Products & Prices

1. Go to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Test Mode** (toggle in top-right)
3. Navigate to **Products** → **Add Product**
4. Create your test product:
   - Name: "UEFN Bootcamp (Test)"
   - Price: $50.00 USD
   - One-time payment
5. Copy the test price ID (starts with `price_`)

### 2. Update Configuration

Replace the placeholder in `src/lib/stripe-config.ts`:

```typescript
// In developmentConfig
products: {
  bootcamp: {
    priceId: 'price_YOUR_TEST_PRICE_ID_HERE', // Replace with your test price ID
    // ... other config
  },
},
```

### 3. Production Products

1. Switch to **Live Mode** in Stripe Dashboard
2. Create the same product structure
3. Copy the live price ID
4. Update the `productionConfig` in the same file

## 🚀 How It Works

### Automatic Environment Detection

The system automatically detects your environment:

- **Development**: `NODE_ENV !== 'production'` OR `STRIPE_ENVIRONMENT=development`
- **Production**: `NODE_ENV === 'production'` OR `STRIPE_ENVIRONMENT=production`

### Using the New Components

Instead of hardcoded price IDs, use the environment-aware components:

```tsx
// ❌ Old way (hardcoded)
<Button onClick={() => redirectToStripeCheckout({
  priceId: 'price_1RlztQFLURkqo4dLnG8IT4zx',
  // ...
})}>
  Buy Now
</Button>

// ✅ New way (environment-aware)
<EnvironmentAwareCheckoutButton
  productKey="bootcamp"
  metadata={{ source: 'pricing' }}
>
  Buy Now
</EnvironmentAwareCheckoutButton>
```

### Manual Price ID Access

If you need to access price IDs programmatically:

```typescript
import { getPriceId, getStripeConfig } from '@/lib/stripe-config';

// Get current price ID for bootcamp
const priceId = getPriceId('bootcamp');

// Get full configuration
const config = getStripeConfig();
console.log('Current environment:', config.environment);
console.log('Is test mode:', !config.isProduction);
```

## 🧪 Testing

### Development Testing

1. Set up test environment variables
2. Create test products in Stripe test mode
3. Use test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`

### Environment Validation

The system validates your configuration on startup:

```typescript
// This runs automatically and will show warnings/errors
validateStripeConfig();
```

## 🔄 Migration Guide

### Step 1: Update Environment Variables

Add the new environment variables to your `.env.local`:

```bash
# Add these new variables
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST=pk_test_...
STRIPE_SECRET_KEY_TEST=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_LIVE=pk_live_...
STRIPE_SECRET_KEY_LIVE=sk_live_...

# Keep your existing variable for backward compatibility
STRIPE_SECRET_KEY=sk_test_...  # or sk_live_...
```

### Step 2: Update Components

Replace hardcoded price IDs with the new system:

```tsx
// Find all instances of 'price_1RlztQFLURkqo4dLnG8IT4zx'
// Replace with EnvironmentAwareCheckoutButton
```

### Step 3: Test Both Environments

1. Test development mode: `npm run dev`
2. Test production mode: `STRIPE_ENVIRONMENT=production npm run dev`

## 🛡️ Security Best Practices

1. **Never commit API keys** to version control
2. **Use different keys** for test and live environments
3. **Validate configuration** on startup
4. **Add environment metadata** to all transactions
5. **Use webhook signatures** for production

## 🔍 Troubleshooting

### Common Issues

1. **"Missing Stripe publishable key"**
   - Check your environment variables
   - Ensure you're using the correct key for your environment

2. **"Price ID not found"**
   - Verify the price ID exists in your Stripe dashboard
   - Check you're in the correct mode (test/live)

3. **"Environment mismatch"**
   - Check `NODE_ENV` and `STRIPE_ENVIRONMENT` variables
   - Ensure your keys match your intended environment

### Debug Mode

Enable debug logging:

```typescript
// Add to your component
import { getStripeConfig } from '@/lib/stripe-config';

console.log('Current Stripe config:', getStripeConfig());
```

## 📋 Checklist

- [ ] Set up test environment variables
- [ ] Create test products in Stripe dashboard
- [ ] Set up live environment variables
- [ ] Create live products in Stripe dashboard
- [ ] Update configuration file with price IDs
- [ ] Replace hardcoded price IDs in components
- [ ] Test development environment
- [ ] Test production environment
- [ ] Validate webhook endpoints
- [ ] Update deployment scripts

## 🎉 Benefits

✅ **No more manual key switching**  
✅ **Automatic environment detection**  
✅ **Test mode indicators** for users  
✅ **Centralized configuration**  
✅ **Type-safe price ID access**  
✅ **Environment metadata** for tracking  
✅ **Validation on startup**  
✅ **Easy to add new products** 