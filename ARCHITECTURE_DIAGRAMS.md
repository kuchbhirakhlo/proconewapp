# PDF Security Architecture Diagrams

## 1. Request Flow Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Student Browser                              │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ 1. Student clicks "View PDF" button                            │  │
│  │ 2. Page.tsx renders PDFViewer component                        │  │
│  │ 3. PDFViewer calls useAuth() hook                              │  │
│  │ 4. useAuth() gets Firebase user & ID token                     │  │
│  │ 5. Creates secure URL: /api/get-pdf?pdfId=abc123              │  │
│  │ 6. Sends request with token in Authorization header            │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────────────┘
                       │
                       │ GET /api/get-pdf?pdfId=abc123
                       │ Header: Authorization: Bearer {idToken}
                       ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  Next.js Backend API Route                           │
│               (/app/api/get-pdf/route.ts)                           │
│                                                                      │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ VALIDATION CHECKS:                                             │  │
│  │                                                                │  │
│  │ ✓ Check 1: Extract & verify ID token                          │  │
│  │   ├─ Valid signature?                                          │  │
│  │   └─ Not expired?                                              │  │
│  │                                                                │  │
│  │ ✓ Check 2: Get student from Firestore                         │  │
│  │   ├─ Student document exists?                                 │  │
│  │   └─ Extract enrolledCourses array                            │  │
│  │                                                                │  │
│  │ ✓ Check 3: Verify enrollment                                  │  │
│  │   ├─ Is student enrolled in this course?                      │  │
│  │   └─ Is PDF for this course?                                  │  │
│  │                                                                │  │
│  │ ✓ Check 4: Verify PDF exists                                  │  │
│  │   ├─ PDF metadata in Firestore?                               │  │
│  │   └─ PDF file in Storage?                                     │  │
│  │                                                                │  │
│  │ Decision:                                                      │  │
│  │   ALL PASS ─────────────────────────┐                          │  │
│  │   ANY FAIL ─────────────────────────┤                          │  │
│  └────────────────────────────────────┬┴──────────────────────────┘  │
└──────────────────────┬───────────────────────────────────────────────┘
                       │
         ┌─────────────┴─────────────┐
         ▼                           ▼
    SUCCESS                     ERROR
    (200 OK)                    (401/403/404)
         │                           │
         │ Stream PDF file           │ Return error JSON
         │ from Storage              │
         │ with:                     │
         │ - Content-Type:           │
         │   application/pdf         │
         │ - Cache-Control:          │
         │   private,no-cache        │
         │ - Content-Disposition:    │
         │   inline                  │
         │                           │
         ▼                           ▼
    ┌─────────────────────────────────────┐
    │  Browser receives response           │
    │                                      │
    │  Success: Display in iframe ✓        │
    │  Error: Show error message ✗         │
    └──────────────┬──────────────────────┘
                   │
    ┌──────────────▼──────────────┐
    │  PDF Viewer Component        │
    │                              │
    │  ✓ Zoom in/out               │
    │  ✓ Rotate pages              │
    │  ✓ Scroll through document   │
    │                              │
    │  ✗ No Download button        │
    │  ✗ No Open in new tab        │
    │  ✗ No right-click menu       │
    │  ✗ No save shortcuts         │
    └──────────────────────────────┘
```

---

## 2. Security Layers Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                     ATTACK SURFACE                              │
│                                                                 │
│  Layer 1: Direct Firebase URL                                  │
│  ────────────────────────────────────────────                 │
│  https://storage.googleapis.com/.../course_pdfs/pdf123        │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────┐                                   │
│  │ Storage Security Rules   │ ← BLOCKED HERE                    │
│  │ allow read: if false;    │   Returns: 403 Forbidden         │
│  └─────────────────────────┘                                   │
└────────────────────────────────────────────────────────────────┘
         │
         ▼ (Blocked)
         X

┌────────────────────────────────────────────────────────────────┐
│                     LEGITIMATE ACCESS                           │
│                                                                 │
│  Layer 1: Authentication                                       │
│  ──────────────────────────                                   │
│  Student must be logged in                                     │
│  Firebase Auth enforces this                                   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────┐                                   │
│  │ Layer 2: Token Verification                                │
│  │ ──────────────────────── │                                  │
│  │ /api/get-pdf route:      │                                  │
│  │ - Verify ID token       │                                  │
│  │ - Check expiration       │                                  │
│  │ - Validate signature     │                                  │
│  └──────────┬──────────────┘                                   │
│             │                                                   │
│             ▼ (Token valid)                                    │
│  ┌─────────────────────────┐                                   │
│  │ Layer 3: Student Exists │                                  │
│  │ ──────────────────────── │                                  │
│  │ Check Firestore:         │                                  │
│  │ /students/{uid}          │                                  │
│  └──────────┬──────────────┘                                   │
│             │                                                   │
│             ▼ (Student found)                                  │
│  ┌─────────────────────────┐                                   │
│  │ Layer 4: Enrollment Verify                                 │
│  │ ────────────────────────│                                  │
│  │ Check student's:         │                                  │
│  │ enrolledCourses array    │                                  │
│  │ vs PDF's courseIds       │                                  │
│  └──────────┬──────────────┘                                   │
│             │                                                   │
│             ▼ (Enrolled)                                       │
│  ┌─────────────────────────┐                                   │
│  │ Layer 5: PDF Exists      │                                  │
│  │ ──────────────────────── │                                  │
│  │ Check Storage:           │                                  │
│  │ course_pdfs/{pdfId}      │                                  │
│  └──────────┬──────────────┘                                   │
│             │                                                   │
│             ▼ (File found)                                     │
│  ┌─────────────────────────┐                                   │
│  │ Layer 6: Serve PDF       │                                  │
│  │ ──────────────────────── │                                  │
│  │ Stream file from Storage │                                  │
│  │ with security headers    │                                  │
│  └──────────┬──────────────┘                                   │
│             │                                                   │
│             ▼                                                   │
│  ┌─────────────────────────────────────┐                       │
│  │ Layer 7: Client-Side Protection     │                       │
│  │ ───────────────────────────────────│                       │
│  │ - Display in secure iframe          │                       │
│  │ - Sandbox attributes                │                       │
│  │ - No download button                │                       │
│  │ - Right-click blocked               │                       │
│  │ - Save/Print shortcuts blocked      │                       │
│  └─────────────────────────────────────┘                       │
│             │                                                   │
│             ▼                                                   │
│  ┌─────────────────────────────────────┐                       │
│  │ ✓ Student views PDF securely        │                       │
│  │ ✓ Only enrolled students can access │                       │
│  │ ✓ Direct links don't work           │                       │
│  │ ✓ Download prevented                │                       │
│  └─────────────────────────────────────┘                       │
└────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Relationship Diagram

```
┌─────────────────────────────────────────────────────────────┐
│              Course PDFs Page Component                      │
│        (app/student/course-pdfs/page.tsx)                   │
│                                                              │
│  - Fetches student's enrolled courses                        │
│  - Displays list of available PDFs                           │
│  - Shows "View PDF" button only (no download)                │
│  - Passes pdfId to PDFViewer                                 │
│                                                              │
│                 │                                            │
│                 │ onClick: handleViewPDF(pdf)                │
│                 │ passes: pdfId, title, pdfUrl               │
│                 │                                            │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │     PDF Viewer Component              │                  │
│  │  (components/pdf/pdf-viewer.tsx)      │                  │
│  │                                       │                  │
│  │  Props:                               │                  │
│  │  - pdfUrl (original URL)              │                  │
│  │  - pdfId (unique identifier)  ◄──────┼─ NEW              │
│  │  - title                              │                  │
│  │  - onClose callback                   │                  │
│  │                                       │                  │
│  │  On Mount: useAuth()                  │                  │
│  │      │                                │                  │
│  │      ▼                                │                  │
│  │  Get ID Token from Firebase           │                  │
│  │      │                                │                  │
│  │      ▼                                │                  │
│  │  Build Secure URL:                    │                  │
│  │  /api/get-pdf?pdfId={pdfId}           │                  │
│  │      │                                │                  │
│  │      ▼                                │                  │
│  │  Save token in sessionStorage         │                  │
│  │      │                                │                  │
│  │      ▼                                │                  │
│  │  Set secureUrl state                  │                  │
│  │                                       │                  │
│  │  Render:                              │                  │
│  │  ┌─────────────────────────────────┐ │                  │
│  │  │  Security Controls              │ │                  │
│  │  │  ├─ onContextMenu handler       │ │                  │
│  │  │  ├─ onKeyDown handler           │ │                  │
│  │  │  └─ prevents Ctrl+S, Ctrl+P     │ │                  │
│  │  └─────────────────────────────────┘ │                  │
│  │  ┌─────────────────────────────────┐ │                  │
│  │  │  Toolbar Buttons                │ │                  │
│  │  │  ✓ Zoom In                      │ │                  │
│  │  │  ✓ Zoom Out                     │ │                  │
│  │  │  ✓ Rotate                       │ │                  │
│  │  │  ✗ Download (removed)           │ │                  │
│  │  │  ✗ Open in New Tab (removed)    │ │                  │
│  │  └─────────────────────────────────┘ │                  │
│  │  ┌─────────────────────────────────┐ │                  │
│  │  │  Iframe with PDF                │ │                  │
│  │  │  src={secureUrl}                │ │                  │
│  │  │  sandbox="allow-same-origin"    │ │                  │
│  │  └─────────────────────────────────┘ │                  │
│  └──────────────────────────────────────┘                   │
│                 │                                            │
│                 │ useAuth() imports                         │
│                 │                                            │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │   Auth Hook (hooks/useAuth.ts)        │                  │
│  │                                       │                  │
│  │  - Listens to Firebase Auth state    │                  │
│  │  - Returns current user              │                  │
│  │  - User object includes:             │                  │
│  │    ├─ getIdToken() method            │                  │
│  │    ├─ uid                            │                  │
│  │    └─ other Firebase user props      │                  │
│  │                                       │                  │
│  │  Used by: PDFViewer component        │                  │
│  └──────────────────────────────────────┘                   │
│                 │                                            │
│                 │ gets ID token                             │
│                 │                                            │
│                 ▼                                            │
│  ┌──────────────────────────────────────┐                   │
│  │  Firebase Authentication              │                  │
│  │  (lib/firebase.ts)                    │                  │
│  │                                       │                  │
│  │  - auth object                        │                  │
│  │  - manages user sessions              │                  │
│  │  - provides ID tokens                 │                  │
│  └──────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────┘
                     │
                     │ API call with auth header
                     │
                     ▼
      ┌──────────────────────────────────┐
      │  API Route: /api/get-pdf/route.ts │
      │  (runs on Next.js server)         │
      │                                   │
      │  1. Extract Authorization header  │
      │  2. Verify ID token               │
      │  3. Query Firestore               │
      │  4. Get PDF from Storage          │
      │  5. Return PDF stream             │
      └──────────────────────────────────┘
                     │
                     │ PDF stream
                     │
                     ▼
      ┌──────────────────────────────────┐
      │  Browser receives PDF             │
      │  Displays in iframe               │
      │  Secure viewing experience        │
      └──────────────────────────────────┘
```

---

## 4. Access Control Matrix

```
┌─────────────────────┬─────────────┬──────────────┬──────────────┐
│ User Type           │ View PDF    │ Download PDF │ Share Link   │
├─────────────────────┼─────────────┼──────────────┼──────────────┤
│ Enrolled Student    │ ✅ Yes      │ ❌ No        │ ❌ No        │
│ Unenrolled Student  │ ❌ No       │ ❌ No        │ ❌ No        │
│ Admin               │ ✅ Yes      │ ✅ Yes*      │ ✅ Yes*      │
│ Guest (No Login)    │ ❌ No       │ ❌ No        │ ❌ No        │
│ Via Direct URL      │ ❌ No       │ ❌ No        │ ❌ No        │
└─────────────────────┴─────────────┴──────────────┴──────────────┘

* Admins use different interface/permissions
```

---

## 5. Data Flow Diagram

```
┌────────────────────────────────────────────────────────────┐
│                    Firestore Database                       │
│                                                             │
│  Collections:                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ /students/{uid}                                       │  │
│  │  - enrolledCourses: string[]                          │  │
│  │  - email: string                                      │  │
│  │  - name: string                                       │  │
│  │  - etc...                                             │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ /course_pdfs/{pdfId}                                  │  │
│  │  - title: string                                      │  │
│  │  - description: string                                │  │
│  │  - courseIds: string[]  ◄── KEY FIELD                │  │
│  │  - pdfUrl: string (for reference)                     │  │
│  │  - uploadedBy: string                                 │  │
│  │  - createdAt: timestamp                               │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ /courses/{courseId}                                   │  │
│  │  - title: string                                      │  │
│  │  - description: string                                │  │
│  │  - etc...                                             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                  Firebase Storage                           │
│                                                             │
│  /course_pdfs/                                             │
│  ├── pdf1.pdf                                              │
│  ├── pdf2.pdf                                              │
│  ├── pdf3.pdf                                              │
│  └── ...                                                   │
│                                                             │
│  Access: Only via API route (rules deny direct access)     │
└────────────────────────────────────────────────────────────┘

When Student Views PDF:
┌──────────────────────────────────────────────────────────┐
│ API Route Lookup Process                                 │
│                                                          │
│ 1. Get pdfId from query params                           │
│    └─ Find: /course_pdfs/{pdfId}                         │
│                                                          │
│ 2. Extract courseIds from PDF metadata                   │
│    └─ Example: courseIds = ["course1", "course2"]        │
│                                                          │
│ 3. Get userId from ID token                             │
│    └─ Example: userId = "user123"                        │
│                                                          │
│ 4. Lookup student record                                │
│    └─ Find: /students/{userId}                           │
│                                                          │
│ 5. Get enrolledCourses from student                      │
│    └─ Example: enrolledCourses = ["course1", "course3"]  │
│                                                          │
│ 6. Compare arrays                                       │
│    └─ Check: Do enrolledCourses ∩ courseIds exist?       │
│    └─ In example: "course1" is in both → ACCESS GRANTED │
│                                                          │
│ 7. Serve PDF from Storage                               │
│    └─ Stream: /course_pdfs/{pdfId}                       │
│                                                          │
│ Result:                                                 │
│  ✓ All checks pass → 200 OK + PDF stream                │
│  ✗ Any check fails → 403 Forbidden (with reason)        │
└──────────────────────────────────────────────────────────┘
```

---

## 6. Error Handling Flow

```
Request to /api/get-pdf
         │
         ▼
    Is token provided?
    ├─ No ──────→ 401: Missing or invalid token
    │
    └─ Yes
         │
         ▼
    Is token valid?
    ├─ No ──────→ 401: Invalid token
    │
    └─ Yes
         │
         ▼
    Is pdfId provided?
    ├─ No ──────→ 400: Missing pdfId parameter
    │
    └─ Yes
         │
         ▼
    Does PDF exist in Firestore?
    ├─ No ──────→ 404: PDF does not exist
    │
    └─ Yes
         │
         ▼
    Does student record exist?
    ├─ No ──────→ 403: Student profile not found
    │
    └─ Yes
         │
         ▼
    Is student enrolled in course?
    ├─ No ──────→ 403: Not enrolled in required course
    │
    └─ Yes
         │
         ▼
    Does PDF file exist in Storage?
    ├─ No ──────→ 404: PDF file not found in storage
    │
    └─ Yes
         │
         ▼
    ✓ 200: OK - Stream PDF with security headers

All errors logged to:
- Next.js server logs
- Browser console (as JSON response)
- Can be extended to send to logging service
```

---

## 7. Before vs After Architecture

```
BEFORE (❌ Insecure):
─────────────────────

Student Page → Direct Firebase URL → Firestore Rules Check → PDF
                   │                        │
                   │                        └─ Public access
                   │
                   └─ No enrollment verification
                   └─ No server-side check
                   └─ URL can be shared
                   └─ Download always possible


AFTER (✅ Secure):
──────────────────

Student Page → useAuth() hook → ID Token
                   │
                   ▼
            API Route (/api/get-pdf)
                   │
        ┌──────────┼──────────┐
        │          │          │
        ▼          ▼          ▼
    Verify     Check        Check
    Token    Student      Enrollment
        │          │          │
        └──────────┼──────────┘
                   │
        (All checks must pass)
                   │
                   ▼
            Firestore Lookup → Enrollments ✓
            Storage Lookup → PDF File ✓
                   │
                   ▼
            Stream PDF with:
            - Cache-Control: private
            - Content-Disposition: inline
            - No-cache headers
                   │
                   ▼
            Secure iframe in Browser
            with:
            - Sandbox attributes
            - No download button
            - Blocked right-click
            - Blocked save shortcuts
```

---

## Summary

These diagrams show:
1. **Complete request flow** from student click to PDF display
2. **7 security layers** protecting PDF access
3. **Component relationships** and data passing
4. **Access control matrix** for different user types
5. **Database structure** and lookup process
6. **Error handling** with proper HTTP status codes
7. **Before/after comparison** showing security improvements
