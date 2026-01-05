# PDF Security Implementation Guide

## Overview
This document outlines the security measures implemented to protect PDF documents from unauthorized access and downloads in the ProcoTech application.

## Security Layers

### 1. **Server-Side Authentication & Authorization API Route**
**File:** `app/api/get-pdf/route.ts`

#### How it works:
- Students can ONLY view PDFs through an authenticated API endpoint
- Direct Firebase URLs are no longer functional (Storage rules updated)
- Each request is verified:
  - Firebase ID token validation
  - Student profile verification
  - Course enrollment verification
  - PDF existence check

#### Key Features:
```typescript
// Token verification
const decodedToken = await auth.verifyIdToken(token)

// Enrollment check
const hasAccess = courseIds.some((courseId: string) =>
  enrolledCourses.includes(courseId)
)

// Cache-Control headers prevent caching
'Cache-Control': 'private, no-cache, no-store, must-revalidate'
```

### 2. **Firestore Rules**
**File:** `firestore.rules`

Students can only read PDFs if:
- They are authenticated
- Their `enrolledCourses` array contains at least one of the PDF's `courseIds`

### 3. **Firebase Storage Rules**
**File:** `storage.rules`

#### Critical Update:
```
// DENY direct read access - must use secure API endpoint instead
match /course_pdfs/{fileName} {
  allow read: if false;  // ← Blocks all direct access
  allow write: if isAdmin();
  allow delete: if isAdmin();
}
```

This prevents:
- Direct URL access to PDFs
- Bypassing authentication checks
- Public sharing of PDF links
- Direct downloads from Firebase

### 4. **PDF Viewer Security Features**
**File:** `components/pdf/pdf-viewer.tsx`

#### Removed Features:
- ❌ Download button
- ❌ "Open in new tab" button
- ❌ Right-click context menu
- ❌ Ctrl+S / Cmd+S (Save) keyboard shortcut
- ❌ Ctrl+P / Cmd+P (Print) keyboard shortcut

#### Security Features:
```typescript
// Prevent right-click
const handleContextMenu = (e: React.MouseEvent) => {
  e.preventDefault()
}

// Prevent keyboard shortcuts for saving/printing
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') e.preventDefault()  // Save
  if ((e.ctrlKey || e.metaKey) && e.key === 'p') e.preventDefault()  // Print
}

// Use secure proxy route
const secureUrl = `/api/get-pdf?pdfId=${encodeURIComponent(pdfId)}`
```

#### iframe Security:
```typescript
<iframe
  src={secureUrl}
  sandbox="allow-same-origin allow-scripts"
/>
```

### 5. **Frontend Authentication**
**File:** `hooks/useAuth.ts`

- Retrieves current user's Firebase ID token
- Token is sent with every PDF request
- Session-based token management

### 6. **User Interface Changes**
**File:** `app/student/course-pdfs/page.tsx`

- Download button removed from PDF list
- Only "View PDF" button available
- Visual security indicator added to PDF viewer
- Clear messaging about document protection

## Environment Variables Required

Add these to your `.env.local` file for the API route to work:

```
FIREBASE_ADMIN_PROJECT_ID=procotech-879c2
FIREBASE_ADMIN_PRIVATE_KEY="your-private-key-here"
FIREBASE_ADMIN_CLIENT_EMAIL="your-service-account-email@iam.gserviceaccount.com"
```

To get these values:
1. Go to Firebase Console → Project Settings
2. Click "Service Accounts" tab
3. Click "Generate New Private Key"
4. Copy the values to your `.env.local`

## How to Get Service Account Credentials

1. Firebase Console → Your Project Settings
2. Navigate to "Service Accounts" tab
3. Click "Generate New Private Key"
4. The JSON file contains:
   - `project_id` → `FIREBASE_ADMIN_PROJECT_ID`
   - `private_key` → `FIREBASE_ADMIN_PRIVATE_KEY`
   - `client_email` → `FIREBASE_ADMIN_CLIENT_EMAIL`

⚠️ **Keep these credentials secure** - never commit them to Git

## Access Flow Diagram

```
Student Request
    ↓
Student clicks "View PDF"
    ↓
Frontend: Get ID Token from Firebase Auth
    ↓
Send: GET /api/get-pdf?pdfId=xxx
      Header: Authorization: Bearer {idToken}
    ↓
API Route Validation:
  ✓ Token valid?
  ✓ Student exists?
  ✓ Enrolled in course?
  ✓ PDF exists?
    ↓
✓ All checks pass → Serve PDF via iframe
✗ Any check fails → Return 401/403 Error
    ↓
PDF Viewer displays in secure iframe
  - No download button
  - No right-click menu
  - No keyboard save/print shortcuts
```

## What Students CAN'T Do

1. ❌ Download the PDF file
2. ❌ Open PDF in new tab
3. ❌ Right-click to save
4. ❌ Use Ctrl+S / Cmd+S to save
5. ❌ Use Ctrl+P / Cmd+P to print
6. ❌ Access direct Firebase URLs
7. ❌ Share PDF links (URLs won't work for others)
8. ❌ View PDFs from unenrolled courses

## What Students CAN Do

1. ✅ View PDFs in-browser
2. ✅ Zoom in/out
3. ✅ Rotate pages
4. ✅ Scroll through document
5. ✅ View document only while authenticated

## Additional Notes

### Browser-Level Protections
While we've disabled many features, determined users could still:
- Use browser DevTools to capture screenshots
- Use screen recording software

This is **normal and expected** - content viewed on a screen can always be captured. The security focuses on:
- Preventing casual/accidental distribution
- Controlling access to enrolled students only
- Preventing sharing of direct URLs

### For Maximum Security
If extremely sensitive content is involved, consider:
1. Watermarking PDFs with student ID/timestamp
2. Logging all PDF access attempts
3. Using more restrictive viewing technology (e.g., custom viewer without iframes)
4. DRM solutions if needed

## Troubleshooting

### "Unable to load document" error
- Ensure student is logged in
- Verify student is enrolled in the course
- Check Firebase Admin credentials in `.env.local`

### PDF not loading in iframe
- Check browser console for CORS errors
- Verify `sandbox` attribute is correct
- Ensure Firebase Storage rules are deployed

### Students can still download
- Clear browser cache
- Verify PDF viewer component is using new code
- Check that old Download button code is removed

## Testing the Security

1. **Test unauthorized access:**
   ```bash
   curl -X GET "http://localhost:3000/api/get-pdf?pdfId=test123"
   # Should return 401 Unauthorized
   ```

2. **Test with valid token:**
   ```bash
   curl -X GET "http://localhost:3000/api/get-pdf?pdfId=test123" \
     -H "Authorization: Bearer YOUR_ID_TOKEN"
   # Should work if enrolled
   ```

3. **Test unenrolled access:**
   - Create student account
   - Don't enroll in course
   - Try to view PDF
   - Should see "not enrolled" error

## Deployment Checklist

- [ ] Add Firebase Admin credentials to `.env.local`
- [ ] Deploy updated Firestore rules
- [ ] Deploy updated Storage rules
- [ ] Deploy API route (`app/api/get-pdf/route.ts`)
- [ ] Deploy updated PDF viewer component
- [ ] Deploy updated course PDFs page
- [ ] Test with unenrolled student account
- [ ] Test with enrolled student account
- [ ] Verify direct Firebase URLs no longer work

## References

- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Firebase Security Rules](https://firebase.google.com/docs/rules)
- [Web Security Best Practices](https://owasp.org/www-project-web-security-testing-guide/)
