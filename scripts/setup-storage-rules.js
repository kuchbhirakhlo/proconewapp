// Firebase Storage Rules Setup Script
// Run this script to configure Storage security rules for Firebase Storage
// Usage: node scripts/setup-storage-rules.js

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔧 Setting up Firebase Storage security rules...');

try {
    // Check if Firebase CLI is available
    exec('firebase --version', (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Firebase CLI is not installed. Please install it first:');
            console.log('npm install -g firebase-tools');
            process.exit(1);
        }

        console.log('✅ Firebase CLI is installed');

        // Deploy storage rules
        const rulesFile = path.join(__dirname, '..', 'storage.rules');

        if (!fs.existsSync(rulesFile)) {
            console.error('❌ storage.rules file not found');
            console.log('📝 Please ensure storage.rules file exists in the root directory');
            process.exit(1);
        }

        console.log('📝 Deploying Storage security rules...');

        exec(`firebase deploy --only storage`, (error, stdout, stderr) => {
            if (error) {
                console.error('❌ Failed to deploy storage rules:', error.message);
                console.log('\n🔧 Alternative manual setup:');
                console.log('1. Go to Firebase Console: https://console.firebase.google.com');
                console.log('2. Select your project: procotech-879c2');
                console.log('3. Go to Storage > Rules');
                console.log('4. Replace the existing rules with the contents of storage.rules file');
                console.log('5. Click "Publish" to save the changes');
                process.exit(1);
            }

            console.log('✅ Storage security rules deployed successfully!');
            console.log('🎉 Firebase Storage now has proper permissions for PDF uploads');
            console.log('\n📋 What was configured:');
            console.log('- Authenticated admin users can upload PDFs to course_pdfs folder');
            console.log('- Authenticated users can read/download PDFs');
            console.log('- Only admins can delete PDFs');
            console.log('- PDF content type validation is enforced');
        });
    });
} catch (error) {
    console.error('❌ Error setting up storage rules:', error.message);
    process.exit(1);
}