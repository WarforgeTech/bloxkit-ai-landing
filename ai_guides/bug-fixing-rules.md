# Bug Fixing Protocol

## Core Principles

### 1. Implementation Commitment
- **NEVER switch frameworks/tools mid-implementation** without explicit user approval
- **ALWAYS continue debugging** the chosen solution systematically
- **DOCUMENT all troubleshooting steps** and configuration changes
- **ASK for permission** before suggesting major architectural changes

### 2. Systematic Debugging Process
- Step 1: Analyze the error thoroughly—reproduce it and identify root cause
- Step 2: Check related files for impacts (but only if instructed to read them)
- Step 3: Propose minimal fixes; describe changes without applying
- Step 4: Verify: Suggest tests to confirm the fix
- Step 5: If stuck: Recommend logging or breakpoints for further diagnosis

## What NOT to Do

❌ **Switching Technologies Mid-Implementation:**
- Changing from Gmail API to Resend after hours of setup
- Abandoning Firebase Functions for Vercel Functions
- Switching from Stripe to PayPal after configuration
- Changing email providers without user approval

❌ **Abandoning Debugging:**
- Giving up on a solution without systematic troubleshooting
- Not checking logs or error messages carefully
- Skipping configuration verification steps

## What TO Do

✅ **Systematic Debugging:**
- Start with the most likely cause
- Check logs and error messages carefully
- Verify configuration step-by-step
- Test each component individually
- Document all troubleshooting steps

✅ **Proper Communication:**
- Explain the issue clearly
- Present debugging options
- Ask for permission before major changes
- Keep user informed of progress

## Example Scenarios

**Scenario 1: Gmail API Authentication Failing**
- ✅ Check Firebase function logs for specific error messages
- ✅ Verify Google Cloud Console service account configuration
- ✅ Test with different credentials or scopes
- ✅ Check domain-wide delegation settings
- ❌ DON'T suggest switching to Resend without asking

**Scenario 2: Firebase Function Deployment Issues**
- ✅ Check TypeScript compilation errors
- ✅ Verify package.json dependencies
- ✅ Review Firebase CLI configuration
- ✅ Test locally with emulators
- ❌ DON'T suggest switching to Vercel Functions

**Scenario 3: Stripe Webhook Problems**
- ✅ Verify webhook endpoint configuration
- ✅ Check webhook secret and signature verification
- ✅ Test with Stripe CLI
- ✅ Review function logs for processing errors
- ❌ DON'T suggest switching to PayPal

## Debugging Checklist

- [ ] Reproduce the error consistently
- [ ] Check all relevant logs (Firebase, Stripe, etc.)
- [ ] Verify configuration files and environment variables
- [ ] Test individual components in isolation
- [ ] Document all troubleshooting steps taken
- [ ] Ask for permission before suggesting major changes
- [ ] Present clear debugging options to user 