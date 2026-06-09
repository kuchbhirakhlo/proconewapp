import type { Metadata } from "next"

const siteUrl = "https://www.procotech.in"
const siteName = "Proco Technologies"

/**
 * Shared template for generating page-specific Metadata.
 * Each page gets a unique, SEO-optimised title and description.
 */

// ---------- Homepage ----------
export const homepageMetadata: Metadata = {
  title: "Proco Technologies - Best Computer Institute & Software Development Company",
  description:
    "Proco Technologies is a premier computer institute and software development company offering professional courses in web development, mobile app development, and comprehensive IT training.",
  alternates: { canonical: siteUrl },
  openGraph: {
    title: "Proco Technologies - Best Computer Institute & Software Development Company",
    description:
      "Premier computer institute offering web development, mobile app development, and IT training courses. Build your career with industry-expert instructors.",
    url: siteUrl,
  },
  twitter: {
    title: "Proco Technologies - Best Computer Institute & Software Development",
    description: "Learn web development, mobile apps, and IT skills from industry experts. 95% job placement rate.",
  },
}

// ---------- About ----------
export const aboutMetadata: Metadata = {
  title: "About Proco Technologies | Computer Institute in Lucknow & Jaipur",
  description:
    "Founded in 2019, Proco Technologies has trained 500+ students and delivered 50+ software projects. Learn about our mission, team, and values. Contact us today!",
  alternates: { canonical: `${siteUrl}/about` },
  openGraph: {
    title: "About Proco Technologies | Computer Institute in Lucknow & Jaipur",
    description:
      "Founded in 2019, Proco Technologies has trained 500+ students and delivered 50+ software projects. Learn about our mission, team, and values.",
    url: `${siteUrl}/about`,
  },
}

// ---------- Contact ----------
export const contactMetadata: Metadata = {
  title: "Contact Proco Technologies | Get in Touch - Lucknow & Jaipur",
  description:
    "Reach out to Proco Technologies for course inquiries, software development projects, or partnership opportunities. Call or visit us in Lucknow or Jaipur today!",
  alternates: { canonical: `${siteUrl}/contact` },
  openGraph: {
    title: "Contact Proco Technologies | Get in Touch - Lucknow & Jaipur",
    description:
      "Reach out to Proco Technologies for course inquiries, software development projects, or partnership opportunities.",
    url: `${siteUrl}/contact`,
  },
}

// ---------- Full Stack Development Course ----------
export const fullStackCourseMetadata: Metadata = {
  title: "Full Stack Development Course in Lucknow | Proco Technologies",
  description:
    "Learn MERN stack, React, Node.js & more with our Full Stack Development course in Lucknow. Hands-on training with live projects. Enroll now and boost your career!",
  alternates: { canonical: `${siteUrl}/courses` },
  openGraph: {
    title: "Full Stack Development Course in Lucknow | Proco Technologies",
    description:
      "Learn MERN stack, React, Node.js & more with our Full Stack Development course in Lucknow. Hands-on training with live projects.",
    url: `${siteUrl}/courses`,
  },
}

// ---------- Web Development Course ----------
export const webDevelopmentCourseMetadata: Metadata = {
  title: "Web Development Course in Lucknow | Proco Technologies",
  description:
    "Master HTML, CSS, JavaScript, and modern frameworks with our Web Development course in Lucknow. Job-oriented training with certification. Enroll today!",
  alternates: { canonical: `${siteUrl}/website-development-lucknow` },
  openGraph: {
    title: "Web Development Course in Lucknow | Proco Technologies",
    description:
      "Master HTML, CSS, JavaScript, and modern frameworks with our Web Development course in Lucknow. Job-oriented training with certification.",
    url: `${siteUrl}/website-development-lucknow`,
  },
}

// ---------- Mobile App Development Course ----------
export const mobileAppDevelopmentMetadata: Metadata = {
  title: "Mobile App Development Course in Lucknow | Proco Technologies",
  description:
    "Build Android & iOS apps with Flutter and React Native. Enroll in our Mobile App Development course in Lucknow and start creating real-world apps. Call now!",
  alternates: { canonical: `${siteUrl}/courses` },
  openGraph: {
    title: "Mobile App Development Course in Lucknow | Proco Technologies",
    description:
      "Build Android & iOS apps with Flutter and React Native. Enroll in our Mobile App Development course in Lucknow and start creating real-world apps.",
    url: `${siteUrl}/courses`,
  },
}

// ---------- ADCA (Advance Diploma in Computer Application) ----------
export const adcaCourseMetadata: Metadata = {
  title: "ADCA Course in Lucknow - Advance Diploma in Computer Application",
  description:
    "Enroll in ADCA (Advance Diploma in Computer Application) in Lucknow at Proco Technologies. 1-year comprehensive program with certifications. Limited seats available!",
  alternates: { canonical: `${siteUrl}/adca-course-lucknow` },
  openGraph: {
    title: "ADCA Course in Lucknow - Advance Diploma in Computer Application",
    description:
      "Enroll in ADCA (Advance Diploma in Computer Application) in Lucknow at Proco Technologies. 1-year comprehensive program with certifications.",
    url: `${siteUrl}/adca-course-lucknow`,
  },
}

// ---------- DCA (Diploma in Computer Application) ----------
export const dcaCourseMetadata: Metadata = {
  title: "DCA Course in Lucknow - Diploma in Computer Application",
  description:
    "Join DCA (Diploma in Computer Application) course in Lucknow at Proco Technologies. 6-month diploma covering MS Office, programming & more. Apply now!",
  alternates: { canonical: `${siteUrl}/dca-course-lucknow` },
  openGraph: {
    title: "DCA Course in Lucknow - Diploma in Computer Application",
    description:
      "Join DCA (Diploma in Computer Application) course in Lucknow at Proco Technologies. 6-month diploma covering MS Office, programming & more. Apply now!",
    url: `${siteUrl}/dca-course-lucknow`,
  },
}

// ---------- Software Development Services ----------
export const softwareDevelopmentServicesMetadata: Metadata = {
  title: "Software Development Company in Lucknow & Jaipur | Proco Technologies",
  description:
    "Custom software development, web apps, mobile apps, CRM, and digital marketing for businesses in Lucknow and Jaipur. Get a free consultation today!",
  alternates: { canonical: `${siteUrl}/business` },
  openGraph: {
    title: "Software Development Company in Lucknow & Jaipur | Proco Technologies",
    description:
      "Custom software development, web apps, mobile apps, CRM, and digital marketing for businesses in Lucknow and Jaipur.",
    url: `${siteUrl}/business`,
  },
}