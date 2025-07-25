-- Step 1: Create an admin account in Firebase Authentication
-- Go to Firebase Console > Authentication > Users > Add User
-- Email: admin@procotech.com
-- Password: [Choose a secure password]
-- Copy the User UID after creation

-- Step 2: Add admin document to Firestore
-- Collection: admins
-- Document ID: [paste the User UID from step 1]
-- Example document structure:
{
  "email": "admin@procotech.com",
  "role": "admin",
  "fullName": "Admin User",
  "createdAt": "2024-01-15T10:00:00Z",
  "lastLogin": null,
  "permissions": {
    "courses": true,
    "portfolio": true,
    "students": true,
    "analytics": true
  }
}
