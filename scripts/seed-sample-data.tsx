// Sample data seeding script for Firestore
// Run this in your browser console after logging in as admin

const sampleCourses = [
  {
    title: "Full Stack Web Development",
    description: "Master modern web development with React, Node.js, and databases",
    duration: "6 months",
    level: "Beginner to Advanced",
    price: "₹15,999",
    features: [
      "HTML, CSS, JavaScript fundamentals",
      "React.js and Next.js",
      "Node.js and Express.js",
      "MongoDB and PostgreSQL",
      "Deployment and DevOps",
      "Real-world projects",
    ],
    category: "Programming",
    status: "active",
  },
  {
    title: "Advanced Diploma in Computer Application (ADCA)",
    description: "Comprehensive computer application course covering all essential skills",
    duration: "1 year",
    level: "Intermediate",
    price: "₹8,999",
    features: [
      "MS Office Suite",
      "Computer Fundamentals",
      "Internet and Email",
      "Basic Programming",
      "Database Management",
      "Project Work",
    ],
    category: "Computer Applications",
    status: "active",
  },
  {
    title: "Mobile App Development",
    description: "Build native and cross-platform mobile applications",
    duration: "4 months",
    level: "Intermediate",
    price: "₹12,999",
    features: [
      "React Native fundamentals",
      "iOS and Android development",
      "State management with Redux",
      "API integration",
      "App store deployment",
      "Performance optimization",
    ],
    category: "Mobile Development",
    status: "active",
  },
]

const samplePortfolio = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    category: "Web Development",
    client: "RetailCorp",
    year: "2024",
    status: "completed",
    projectUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/procotech/ecommerce",
  },
  {
    title: "Learning Management System",
    description: "Educational platform with course management, video streaming, and progress tracking.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400",
    technologies: ["Next.js", "PostgreSQL", "TypeScript", "AWS"],
    category: "Web Development",
    client: "EduTech Solutions",
    year: "2024",
    status: "completed",
    projectUrl: "https://example-lms.com",
  },
  {
    title: "Healthcare Management System",
    description: "Comprehensive healthcare management system for hospitals with patient records and appointments.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400",
    technologies: ["Vue.js", "Laravel", "MySQL", "Docker"],
    category: "Web Development",
    client: "MediCare Hospital",
    year: "2023",
    status: "completed",
  },
]

// Function to seed sample data (run in browser console after admin login)
async function seedSampleData() {
  const { addDoc, collection } = await import("firebase/firestore")
  const { db } = await import("./lib/firebase")

  try {
    // Add sample courses
    console.log("Adding sample courses...")
    for (const course of sampleCourses) {
      await addDoc(collection(db, "courses"), {
        ...course,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    // Add sample portfolio items
    console.log("Adding sample portfolio items...")
    for (const item of samplePortfolio) {
      await addDoc(collection(db, "portfolio"), {
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }

    console.log("Sample data seeded successfully!")
  } catch (error) {
    console.error("Error seeding data:", error)
  }
}

// Uncomment the line below and run in browser console to seed data
// seedSampleData();
