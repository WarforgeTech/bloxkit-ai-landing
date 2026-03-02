# 🚀 Quick Stripe Setup Guide

Your Stripe environment is now fully configured! Here's what you need to do next:

## ✅ What's Already Done

- ✅ Production keys configured
- ✅ Test keys configured  
- ✅ Environment-aware system set up
- ✅ API routes updated
- ✅ Example component updated

## 🔧 Next Steps

### 1. Create Test Products in Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Test Mode** (toggle in top-right)
3. Go to **Products** → **Add Product**
4. Create your test bootcamp product:
   - **Name**: "UEFN Bootcamp (Test)"
   - **Price**: $50.00 USD
   - **Billing**: One-time payment
5. **Copy the test price ID** (starts with `price_`)

### 2. Update Test Price ID

Replace the placeholder in `src/lib/stripe-config.ts`:

```typescript
// Find this line in developmentConfig:
priceId: 'price_test_bootcamp_development',

// Replace with your actual test price ID:
priceId: 'price_1ABC123DEF456...', // Your actual test price ID
```

### 3. Test Your Setup

```bash
# Start development server
npm run dev
```

You should see:
- ✅ "🧪 Test Mode" indicator on checkout buttons
- ✅ Test environment being used
- ✅ No real charges will be made

### 4. Test Production Mode (Optional)

```bash
# Force production mode for testing
STRIPE_ENVIRONMENT=production npm run dev
```

This will:
- ✅ Use live Stripe environment
- ✅ No test mode indicator
- ✅ Real charges (be careful!)

## 🧪 Test Card Numbers

Use these test cards in development:

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 0002`
- **3D Secure**: `4000 0025 0000 3155`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

## 🔄 Update Other Components

Replace hardcoded price IDs in these files:
- `src/components/landing/hero.tsx`
- `src/components/landing/header.tsx`
- `src/components/landing/solution.tsx`
- `src/components/landing/curriculum.tsx`
- `src/components/landing/final-cta.tsx`

**Example replacement:**
```tsx
// ❌ Old way
priceId: 'price_1RlztQFLURkqo4dLnG8IT4zx',

// ✅ New way
<EnvironmentAwareCheckoutButton
  productKey="bootcamp"
  metadata={{ source: 'hero' }}
>
  Buy Now
</EnvironmentAwareCheckoutButton>
```

## 🎉 You're Ready!

Your Stripe setup is now:
- ✅ **Environment-aware** (auto-switches between test/live)
- ✅ **Secure** (no hardcoded keys in components)
- ✅ **Maintainable** (centralized configuration)
- ✅ **Testable** (clear test mode indicators)

## 🆘 Need Help?

- Check the full setup guide: `STRIPE_ENVIRONMENT_SETUP.md`
- Look for "🧪 Test Mode" indicators to confirm you're in test mode
- Use test card numbers to avoid real charges
- Check browser console for any configuration errors 