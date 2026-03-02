# 🏪 Product & Price ID Management Guide

This guide explains where developers store Stripe product and price IDs, and the best practices for managing them.

## 🤔 **The Problem**

When you create products in Stripe test mode, you get price IDs like:
- Test: `price_1RlztQFLURkqo4dLnG8IT4zx`
- Live: `price_1ABC123DEF456...` (different ID after copying!)

**Stripe DOES have a "Copy Product to Live Mode" feature**, but you still need to:
1. Copy products from test to live mode
2. Get new price IDs (they change when copied)
3. Update your code with the new live price IDs

## 🔄 **Stripe's Copy to Live Feature**

### **How to Use It:**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Test Mode**
3. Go to **Products**
4. Find your product and click **"Copy to live mode"**
5. Stripe will create a copy in live mode with new price IDs

### **What Happens:**
- ✅ Product details are copied (name, description, images, etc.)
- ✅ New price IDs are generated for live mode
- ✅ Product structure remains the same
- ❌ **Price IDs are different** - you still need to update your code

### **Example:**
```typescript
// Before copying to live
test: 'price_1RlztQFLURkqo4dLnG8IT4zx'

// After copying to live
test: 'price_1RlztQFLURkqo4dLnG8IT4zx'
live: 'price_1ABC123DEF456GHI789JKL'  // New ID!
```

## 🏗️ **Where Developers Store Product/Price IDs**

### **1. Configuration Files (Most Common)**
```typescript
// src/lib/product-catalog.ts
export const PRODUCT_CATALOG = {
  bootcamp: {
    prices: {
      test: 'price_test_123...',
      live: 'price_live_456...',
    }
  }
};
```

**Pros:**
- ✅ Easy to manage
- ✅ Version controlled
- ✅ Type-safe
- ✅ Single source of truth

**Cons:**
- ❌ Requires code deployment to change
- ❌ Not dynamic

### **2. Environment Variables**
```bash
# .env.local
STRIPE_BOOTCAMP_PRICE_TEST=price_test_123...
STRIPE_BOOTCAMP_PRICE_LIVE=price_live_456...
```

**Pros:**
- ✅ Environment-specific
- ✅ No code changes needed
- ✅ Secure

**Cons:**
- ❌ Harder to manage multiple products
- ❌ No type safety
- ❌ Scattered across files

### **3. Database Storage**
```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  stripe_price_id_test VARCHAR(255),
  stripe_price_id_live VARCHAR(255)
);
```

**Pros:**
- ✅ Dynamic (can change without deployment)
- ✅ Admin interface possible
- ✅ Centralized

**Cons:**
- ❌ More complex setup
- ❌ Database dependency
- ❌ Overkill for simple apps

### **4. CMS/Admin Panel**
```typescript
// Admin interface to manage products
interface ProductAdmin {
  name: string;
  testPriceId: string;
  livePriceId: string;
  active: boolean;
}
```

**Pros:**
- ✅ Non-technical users can manage
- ✅ Real-time changes
- ✅ Rich interface

**Cons:**
- ❌ Complex to build
- ❌ Security considerations
- ❌ Overkill for small apps

## 🎯 **Recommended Approach: Hybrid Configuration**

For most web apps, use **configuration files** with **environment variables** for sensitive data:

```typescript
// src/lib/product-catalog.ts
export const PRODUCT_CATALOG = {
  bootcamp: {
    id: 'bootcamp',
    name: 'UEFN Bootcamp',
    prices: {
      test: process.env.STRIPE_BOOTCAMP_PRICE_TEST || 'price_test_default',
      live: process.env.STRIPE_BOOTCAMP_PRICE_LIVE || 'price_live_default',
    }
  }
};
```

## 🔄 **Updated Migration Process: Test → Production**

### **Step 1: Copy Products to Live Mode**
1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Switch to **Test Mode**
3. Go to **Products**
4. Click **"Copy to live mode"** for each product
5. **Copy the new live price IDs** (they're different!)

### **Step 2: Update Your Configuration**
```typescript
// Update product-catalog.ts with new live price IDs
export const PRODUCT_CATALOG = {
  bootcamp: {
    prices: {
      test: 'price_1RlztQFLURkqo4dLnG8IT4zx',  // Your test ID
      live: 'price_1ABC123DEF456...',          // Your new live ID
    }
  }
};
```

### **Step 3: Validate Setup**
```typescript
import { validateProductCatalog } from './product-catalog';

const validation = validateProductCatalog();
if (!validation.valid) {
  console.error('Validation errors:', validation.errors);
}
```

### **Step 4: Test Both Environments**
```bash
# Test development mode
npm run dev

# Test production mode
STRIPE_ENVIRONMENT=production npm run dev
```

## 🛠️ **Automated Migration with Stripe CLI**

You can also use Stripe CLI for more advanced migration:

```bash
# Export test products
stripe products list --mode=test > test-products.json

# Copy to live mode (if supported by CLI)
stripe products create --from=test-product-id --mode=live

# Export live products
stripe products list --mode=live > live-products.json
```

## 🏢 **Real-World Examples**

### **Small SaaS (1-5 products)**
- **Storage**: Configuration files
- **Management**: Manual updates + Copy to Live
- **Example**: Your UEFN bootcamp

### **Medium SaaS (5-20 products)**
- **Storage**: Configuration files + environment variables
- **Management**: Copy to Live + Admin interface
- **Example**: Course platform with multiple courses

### **Large SaaS (20+ products)**
- **Storage**: Database + API
- **Management**: Automated migration + Admin panel
- **Example**: E-commerce platform

### **Enterprise**
- **Storage**: Database + multiple environments
- **Management**: Complex migration scripts + Admin system
- **Example**: Multi-tenant SaaS

## 🛠️ **Tools & Libraries**

### **Stripe Dashboard**
- **Copy to Live Mode**: Built-in feature
- **Manual Management**: Direct interface
- **Bulk Operations**: Limited support

### **Stripe CLI**
```bash
# Export products
stripe products list --mode=test > test-products.json
stripe products list --mode=live > live-products.json
```

### **Custom Migration Scripts**
```typescript
// scripts/migrate-products.ts
import { createProductionProducts } from '../src/lib/stripe-migration-helper';

const migrationData = await exportTestProducts();
const results = await createProductionProducts(migrationData);
```

### **Admin Interfaces**
- **Stripe Dashboard**: Manual management + Copy to Live
- **Custom Admin**: Your own interface
- **Third-party**: Tools like Retool, Bubble

## 🔒 **Security Best Practices**

1. **Never commit live price IDs** to public repositories
2. **Use environment variables** for sensitive data
3. **Validate price IDs** on startup
4. **Log environment** in transactions
5. **Test thoroughly** before going live
6. **Use Copy to Live** feature for consistency

## 📋 **Updated Checklist for Your Setup**

- [ ] Create products in test mode
- [ ] Copy products to live mode using Stripe Dashboard
- [ ] Copy new live price IDs
- [ ] Update configuration with live price IDs
- [ ] Test both environments
- [ ] Validate configuration
- [ ] Set up monitoring
- [ ] Document migration process

## 🎉 **Your Current Setup**

You're using the **recommended approach**:
- ✅ Configuration files (`product-catalog.ts`)
- ✅ Environment-aware system
- ✅ Type-safe access
- ✅ Validation on startup
- ✅ Clear separation of test/live
- ✅ Ready for Copy to Live migration

This is perfect for a small to medium SaaS application! 