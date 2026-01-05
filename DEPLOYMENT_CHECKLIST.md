# Deployment & Testing Checklist

## Pre-Deployment Phase

### Code Review
- [ ] Review all changes in `CHANGES_DETAILED.md`
- [ ] Verify new API route logic in `app/api/get-pdf/route.ts`
- [ ] Check PDF viewer component for security features
- [ ] Ensure useAuth hook is correctly implemented
- [ ] Confirm no download functionality remains in UI

### Environment Setup
- [ ] Get Firebase Admin Service Account credentials
  - [ ] Go to Firebase Console → Project Settings
  - [ ] Click "Service Accounts" tab
  - [ ] Click "Generate New Private Key"
  - [ ] Save the JSON file securely
- [ ] Create `.env.local` file in project root
- [ ] Add `FIREBASE_ADMIN_PROJECT_ID` from JSON
- [ ] Add `FIREBASE_ADMIN_PRIVATE_KEY` from JSON
- [ ] Add `FIREBASE_ADMIN_CLIENT_EMAIL` from JSON
- [ ] ⚠️ Add `.env.local` to `.gitignore` (don't commit credentials!)
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] Test that environment variables load correctly

### Firebase Rules
- [ ] Review updated `storage.rules` file
  - [ ] Verify `allow read: if false;` for course_pdfs
  - [ ] Check write permissions (admins only)
  - [ ] Check delete permissions (admins only)
- [ ] Review `firestore.rules` (should be unchanged)
- [ ] Export current rules as backup (in case rollback needed)
- [ ] Note: Storage rules changes take ~30 seconds to propagate

---

## Deployment Phase

### Firebase Rules Deployment
**Option A: Using Firebase CLI**
```bash
- [ ] Install Firebase CLI: npm install -g firebase-tools
- [ ] Login: firebase login
- [ ] Deploy rules: firebase deploy --only firestore:rules,storage:rules
- [ ] Verify success message
```

**Option B: Manual in Console**
```bash
- [ ] Go to Firebase Console
- [ ] Navigate to Firestore → Rules
  - [ ] Copy content from firestore.rules
  - [ ] Paste into console
  - [ ] Click Publish
- [ ] Navigate to Storage → Rules
  - [ ] Copy content from storage.rules
  - [ ] Paste into console
  - [ ] Click Publish
- [ ] Wait 30 seconds for propagation
```

### Next.js Code Deployment
- [ ] Build locally: `npm run build`
  - [ ] Check for any build errors
  - [ ] Verify no TypeScript errors
- [ ] Test locally: `npm run dev`
  - [ ] Test with enrolled student
  - [ ] Test with unenrolled student
  - [ ] Check console for errors
- [ ] Deploy to hosting (Vercel, Firebase Hosting, etc.)
  - [ ] Trigger deployment
  - [ ] Wait for build to complete
  - [ ] Verify deployment successful
- [ ] ⚠️ Ensure `.env.local` is NOT included in deployment
  - [ ] Add environment variables in hosting platform
  - [ ] (Vercel: Project Settings → Environment Variables)
  - [ ] (Firebase Hosting: Use Cloud Functions with secrets)

---

## Testing Phase

### Basic Functionality Tests

**Test 1: Enrolled Student Can View PDF**
```
Steps:
- [ ] Login as enrolled student
- [ ] Go to Course PDFs page
- [ ] Click "View PDF"
- [ ] PDF loads in viewer
- [ ] Zoom/rotate controls work
- [ ] No download button visible
- [ ] Security message displayed

Expected Results:
✓ PDF loads
✓ All controls functional
✓ No download option
✓ Success message
```

**Test 2: Unenrolled Student Cannot View PDF**
```
Steps:
- [ ] Create new student account
- [ ] Do NOT enroll in any courses
- [ ] Go to Course PDFs page
- [ ] Try to click "View PDF"
- [ ] Check error message

Expected Results:
✓ Error appears immediately
✓ Error message says "not enrolled"
✓ PDF does not load
✓ Clear explanation to user
```

**Test 3: Direct Firebase URL Is Blocked**
```
Steps:
- [ ] Get direct Firebase Storage URL
  (Copy from old requests if available)
- [ ] Try accessing in new browser tab
- [ ] Try accessing in incognito window
- [ ] Try accessing without auth

Expected Results:
✗ 403 Forbidden error
✗ No PDF content
✗ Cannot bypass authentication
```

**Test 4: Keyboard Shortcuts Are Blocked**
```
Steps:
- [ ] Login as enrolled student
- [ ] View a PDF
- [ ] Try Ctrl+S (or Cmd+S on Mac)
  Expected: Nothing happens
- [ ] Try Ctrl+Shift+S
  Expected: Nothing happens or browser save (OK, in iframe)
- [ ] Try Ctrl+P (or Cmd+P on Mac)
  Expected: Nothing happens

Expected Results:
✓ Ctrl+S/Cmd+S blocked
✓ Ctrl+P/Cmd+P blocked
✓ No save dialog
```

**Test 5: Right-Click Context Menu**
```
Steps:
- [ ] Login as enrolled student
- [ ] View a PDF
- [ ] Right-click on the PDF viewer
- [ ] Check what menu appears

Expected Results:
✓ No context menu appears (hidden by right-click handler)
✓ Or if menu appears, no "Save As" option
✓ Cannot download from context menu
```

### Security Tests

**Test 6: Session/Token Expiration**
```
Steps:
- [ ] Login student
- [ ] View PDF (works)
- [ ] Wait for token to expire
  (or manually invalidate token)
- [ ] Try to scroll/zoom
- [ ] Refresh and try to view another PDF

Expected Results:
✓ First PDF still displays (loaded from iframe)
✓ New requests fail with 401
✓ User prompted to re-login
✓ Graceful error handling
```

**Test 7: Student Can't Access Other Student's Requests**
```
Steps:
- [ ] Student A views PDF, open DevTools → Network
- [ ] Copy the API request URL
- [ ] Logout Student A, Login Student B
- [ ] Paste request URL in browser
- [ ] Check response

Expected Results:
✗ Returns 401 or 403
✗ Student B cannot access Student A's session
✗ Each student's token only works for them
```

**Test 8: Admin Can Still Manage PDFs**
```
Steps:
- [ ] Login as admin
- [ ] Go to admin PDF management
- [ ] Should be able to upload PDFs
  Expected: ✓ Works
- [ ] Should be able to delete PDFs
  Expected: ✓ Works
- [ ] Storage rules still allow admin uploads
  Expected: ✓ Yes

Expected Results:
✓ Admin functions unaffected
✓ Storage rules allow admin write
✓ Firestore rules allow admin operations
```

### Mobile & Browser Tests

**Test 9: Mobile Responsiveness**
```
Devices to test:
- [ ] iPhone (various sizes)
- [ ] Android phone
- [ ] iPad/tablet
- [ ] Desktop (different browsers)

Check:
- [ ] PDF viewer loads
- [ ] Zoom buttons work
- [ ] Rotate button works
- [ ] No layout issues
- [ ] Buttons accessible on touch
```

**Test 10: Cross-Browser Compatibility**
```
Browsers to test:
- [ ] Chrome/Chromium
- [ ] Firefox
- [ ] Safari
- [ ] Edge

Check:
- [ ] PDF displays correctly
- [ ] All controls work
- [ ] No console errors
- [ ] Security features work
- [ ] iframe sandbox works
```

### Performance Tests

**Test 11: PDF Load Time**
```
Steps:
- [ ] View PDF
- [ ] Open DevTools → Network
- [ ] Note API request time
- [ ] Note PDF load time

Expected Results:
✓ API request < 500ms
✓ PDF starts loading < 1s
✓ No noticeable lag
```

**Test 12: Large PDF Files**
```
Steps:
- [ ] Find largest PDF in system
- [ ] View it
- [ ] Zoom in/out several times
- [ ] Rotate pages
- [ ] Check memory usage

Expected Results:
✓ Loads successfully
✓ Controls remain responsive
✓ No crashes or freezing
✓ Memory usage reasonable
```

### Error Handling Tests

**Test 13: Various Error Scenarios**
```
Test each error condition:

- [ ] Missing pdfId parameter
  Expected: 400 Bad Request

- [ ] Invalid pdfId (doesn't exist)
  Expected: 404 Not Found

- [ ] Student not found in Firestore
  Expected: 403 Forbidden

- [ ] Student not enrolled
  Expected: 403 Forbidden

- [ ] PDF file missing from Storage
  Expected: 404 Not Found

- [ ] Invalid/expired token
  Expected: 401 Unauthorized

Check:
- [ ] Clear error messages displayed
- [ ] User knows what went wrong
- [ ] Helpful guidance provided
```

---

## Post-Deployment Phase

### Monitoring

**First 24 Hours**
- [ ] Monitor error logs (Firebase, Next.js, hosting)
- [ ] Check for 401/403 errors (normal, track count)
- [ ] Verify no unexpected 500 errors
- [ ] Monitor PDF access patterns
- [ ] Check user feedback/support tickets

**First Week**
- [ ] Review access logs
- [ ] Monitor performance metrics
- [ ] Check for any security issues
- [ ] Verify rules are working correctly
- [ ] Ensure no bypasses found

### Documentation

- [ ] Update internal documentation
- [ ] Document any customizations made
- [ ] Create support guide for users
- [ ] Document any issues encountered
- [ ] Keep credentials secure (never share)

### Rollback Plan (if needed)

**If Something Goes Wrong:**
```
1. Storage Rules:
   - [ ] Revert to: allow read: if isAuthenticated();
   - [ ] Publish changes
   - [ ] Wait 30 seconds

2. Firestore Rules:
   - [ ] Revert any changes
   - [ ] Publish changes

3. Code:
   - [ ] Revert to previous deployment
   - [ ] Or delete API route and old components
   - [ ] Redeploy
   - [ ] Clear cache if needed

4. Environment:
   - [ ] Remove Firebase Admin credentials
   - [ ] Remove .env.local changes
```

---

## Sign-Off Checklist

### Pre-Deployment Sign-Off
- [ ] Code review completed
- [ ] Tests run locally successfully
- [ ] Environment variables configured
- [ ] Firebase credentials securely stored
- [ ] `.env.local` added to `.gitignore`
- [ ] Backup of current rules created
- [ ] Team notified of deployment

### Post-Deployment Sign-Off
- [ ] All tests passed on live environment
- [ ] No critical errors in logs
- [ ] Users can view PDFs (enrolled)
- [ ] Users cannot download PDFs
- [ ] Direct URLs blocked
- [ ] Security features verified
- [ ] Performance acceptable
- [ ] Documentation updated
- [ ] Team marked deployment complete

---

## Quick Reference

### Key Files
| File | Purpose |
|------|---------|
| `app/api/get-pdf/route.ts` | Secure PDF serving |
| `components/pdf/pdf-viewer.tsx` | Secure viewer UI |
| `hooks/useAuth.ts` | Auth token management |
| `storage.rules` | Firebase storage rules |
| `firestore.rules` | Firestore access rules |

### Key Commands
```bash
# Build
npm run build

# Dev server
npm run dev

# Deploy (Firebase CLI)
firebase deploy --only firestore:rules,storage:rules

# Test specific endpoint
curl -X GET "http://localhost:3000/api/get-pdf?pdfId=test123"
```

### Environment Variables Required
```
FIREBASE_ADMIN_PROJECT_ID
FIREBASE_ADMIN_PRIVATE_KEY
FIREBASE_ADMIN_CLIENT_EMAIL
```

### Support Resources
- [PDF_SECURITY_GUIDE.md](./PDF_SECURITY_GUIDE.md) - Technical details
- [PDF_SECURITY_SETUP.md](./PDF_SECURITY_SETUP.md) - Quick setup
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md) - Overview
- [ARCHITECTURE_DIAGRAMS.md](./ARCHITECTURE_DIAGRAMS.md) - Visual guides
- [CHANGES_DETAILED.md](./CHANGES_DETAILED.md) - Detailed changes

---

## Notes

- All tests must pass before marking deployment successful
- Keep backup of original rules for rollback
- Monitor first 24 hours closely
- Have rollback plan ready
- Document any issues for future reference
- Celebrate successful secure deployment! 🎉
