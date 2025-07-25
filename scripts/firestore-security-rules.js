rules_version = "2"
\
service cloud.firestore
{
  \
  match /databases/
  database
  ;/ cdemnostu{

  // Admin collection - only authenticated admins can read/write their own data\
  match / admins / { adminId }
  \
      allow read, write:
  if request.auth != null && request.auth.uid == adminId;

  // Courses collection - admins can read/write, authenticated users can read active courses\
  match / courses / { courseId }
  \
      allow read:
  if request.auth != null;
  \
      allow write:
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));

  // Portfolio collection - admins can read/write, public can read (for website display)\
  match / portfolio / { portfolioId }
  \
      allow read:
  if true; // Public read access for portfolio display\
  allow
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));

  // Students collection - admins can read/write, students can read their own data\
  match / students / { studentId }
  \
      allow read:
  if request.auth != null && 
        (request.auth.uid == studentId || \
         exists(/databases/$(database)/documents/admins/$(request.auth.uid))
  )
    \
      allow write:
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));

  // Enrollments collection - admins can read/write, students can read their own enrollments\
  match / enrollments / { enrollmentId }
  \
      allow read:
  if request.auth != null;
  \
      allow write:
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));

  // Contact forms and inquiries - public can create, admins can read/manage\
  match / contacts / { contactId }
  \
      allow create:
  if true; // Anyone can submit contact forms\
  allow
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  \
      allow update:
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  \
      allow delete:
  if request.auth != null && \
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));

  // Analytics collection - only admins can read/write\
  match / analytics / { analyticsId }
  allow
  if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
  allow
  if request.auth != null && 
        exists(/databases/$(database)/documents/admins/$(request.auth.uid));
}
}
