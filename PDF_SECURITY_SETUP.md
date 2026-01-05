# PDF Security Setup - Quick Start

## What Changed?

✅ **PDFs are now secure:**
- Students can ONLY view if enrolled
- Direct Firebase URLs are blocked
- No download button
- No save/print shortcuts
- Right-click disabled

## 3 Quick Steps to Deploy

### Step 1: Get Firebase Admin Credentials
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Go to Project Settings → Service Accounts
3. Click "Generate New Private Key"
4. You'll get a JSON file with credentials

### Step 2: Add to .env.local
Create/update `.env.local` in your project root:

```
FIREBASE_ADMIN_PROJECT_ID=procotech-879c2
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\n...copy from JSON file...\n-----END RSA PRIVATE KEY-----\n"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@procotech-879c2.iam.gserviceaccount.com
```

⚠️ **Important:** Don't commit `.env.local` to Git!

### Step 3: Deploy New Rules
Deploy the updated security rules:

```bash
# Using Firebase CLI
firebase deploy --only firestore:rules,storage:rules
```

Or manually in Firebase Console:
- Go to Firestore → Rules → Copy from `firestore.rules`
- Go to Storage → Rules → Copy from `storage.rules`

## Files Modified

| File | Changes |
|------|---------|
| `app/api/get-pdf/route.ts` | NEW - Secure API endpoint |
| `components/pdf/pdf-viewer.tsx` | Removed download/print buttons, added security |
| `app/student/course-pdfs/page.tsx` | Removed download button, pass pdfId to viewer |
| `hooks/useAuth.ts` | NEW - Auth hook for getting ID tokens |
| `storage.rules` | Updated to block direct PDF access |
| `firestore.rules` | Updated enrollment checks |

## Testing

**Test 1: Unenrolled student can't view**
1. Create new student account
2. Don't enroll in any course
3. Try to view PDF
4. Should see error message

**Test 2: Enrolled student can view**
1. Create student and enroll in course
2. View PDF in that course
3. Should load properly
4. No download option available

**Test 3: Direct URL is blocked**
```bash
# This should fail now
https://storage.googleapis.com/.../course_pdfs/pdf123
# Response: 403 Forbidden
```

## Common Issues & Fixes

**❌ Problem:** "Firebase Admin SDK not properly configured"
- **Solution:** Check that all 3 env variables are set correctly in `.env.local`

**❌ Problem:** Student can still download PDF
- **Solution:** Clear cache and verify you're using the updated PDF viewer component

**❌ Problem:** "You are not enrolled" error when should have access
- **Solution:** Verify in Firestore that student's `enrolledCourses` includes the course ID

**❌ Problem:** PDF won't load in viewer
- **Solution:** Check browser console for errors, verify Firebase Admin SDK credentials

## Security Summary

### What's Protected:
- ✅ Only enrolled students can access PDFs
- ✅ Direct URL access is blocked
- ✅ Download is impossible through UI
- ✅ Save/Print keyboard shortcuts blocked
- ✅ Right-click context menu blocked
- ✅ All access logged (through Firestore security rules)

### What's Not Protected:
- ⚠️ Screenshots (user can use Print Screen)
- ⚠️ Screen recording
- ⚠️ Browser DevTools inspection

This is normal and expected. The goal is preventing casual distribution, not enterprise-grade DRM.

## Rollback (if needed)

If something goes wrong:

1. **Revert Storage Rules:**
   - Go to Firebase Console → Storage → Rules
   - Change `allow read: if false` back to `allow read: if isAuthenticated()`

2. **Revert Firestore Rules:**
   - Similar process in Firestore Rules tab

3. **Disable API Route:**
   - Delete or rename `app/api/get-pdf/route.ts`

## Support

For issues with the security implementation:
1. Check the `PDF_SECURITY_GUIDE.md` for detailed documentation
2. Review browser console for error messages
3. Verify Firebase Admin credentials are correct
4. Check that Firestore and Storage rules are deployed

---

**Questions?** See `PDF_SECURITY_GUIDE.md` for complete documentation.
