// Firebase Storage CORS Setup Script
// Run this script to configure CORS for Firebase Storage
// Usage: node scripts/setup-storage-cors.js

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Firebase Storage CORS...');

// Check if Firebase CLI is installed
exec('firebase --version', (error, stdout, stderr) => {
    if (error) {
        console.error('❌ Firebase CLI is not installed. Please install it first:');
        console.log('npm install -g firebase-tools');
        process.exit(1);
    }

    console.log('✅ Firebase CLI is installed');

    // Set up CORS rules
    const corsFile = path.join(__dirname, '..', 'cors.json');

    if (!fs.existsSync(corsFile)) {
        console.error('❌ cors.json file not found');
        process.exit(1);
    }

    console.log('📝 Setting CORS rules for Firebase Storage...');

    exec(`firebase storage:cors:set ${corsFile}`, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Failed to set CORS rules:', error.message);
            console.log('\n🔧 Alternative manual setup:');
            console.log('1. Go to Firebase Console: https://console.firebase.google.com');
            console.log('2. Select your project: procotech-879c2');
            console.log('3. Go to Storage > Rules');
            console.log('4. Add the following CORS configuration:');
            console.log(`
[
  {
    "origin": ["http://localhost:3000", "https://your-domain.com"],
    "method": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods"],
    "maxAgeSeconds": 3600
  }
]
      `);
            process.exit(1);
        }

        console.log('✅ CORS rules set successfully!');
        console.log('🎉 Firebase Storage is now configured for CORS');
        console.log('\n📋 Next steps:');
        console.log('1. Restart your Next.js development server');
        console.log('2. Try uploading a PDF file again');
        console.log('3. If you still get CORS errors, check your browser console for more details');
    });
});