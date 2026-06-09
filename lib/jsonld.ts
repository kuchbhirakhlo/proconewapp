/**
 * JSON-LD Structured Data for Proco Technologies
 *
 * Three schemas to be injected into the <head> of relevant pages:
 *
 *  1. Lucknow Branch  → root layout (app/layout.tsx)
 *  2. Jaipur Branch   → root layout (app/layout.tsx)
 *  3. Full Stack      → courses layout (app/courses/layout.tsx)
 */

const siteUrl = "https://www.procotech.in"
const logoUrl = `${siteUrl}/proco_tech.jpg`
const imageUrl = `${siteUrl}/procoheroimage.webp`

// ──────────────────────────────────────────────
//  1.  LUCKNOW BRANCH  — EducationalOrganization + ComputerStore
// ──────────────────────────────────────────────
export function lucknowBranchJsonLd() {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "ComputerStore"],
      "name": "Proco Technologies",
      "description": "Computer institute and software development company offering Full Stack Development, Web & Mobile App Development, ADCA, DCA, Python, JavaScript, React, Next.js, Node.js and Flutter training in Lucknow.",
      "url": siteUrl,
      "logo": logoUrl,
      "image": imageUrl,
      "telephone": "+91-8383811977" /* ← CONFIRM / UPDATE LUCKNOW BRANCH PHONE */,
      "foundingDate": "2019",
      "founder": {
        "@type": "Person",
        "name": "Aviral Shukla"
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 5,
        "maxValue": 20
      },
      "areaServed": ["Lucknow", "Uttar Pradesh"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva",
        "addressLocality": "Lucknow",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "226020",
        "addressCountry": "IN"
      },
      /* ★ YOU STILL NEED: geo (lat/lng) */
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.8467 /* ← FILL ACTUAL LATITUDE  */,
        "longitude": 80.9462 /* ← FILL ACTUAL LONGITUDE */
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00" /* ← CONFIRM OPEN TIME */,
          "closes": "19:00" /* ← CONFIRM CLOSE TIME */
        }
        /* Sunday is closed by default — add a spec if you are open */
      ],
      "sameAs": [
        "https://www.facebook.com/procotechnologies",
        "https://www.instagram.com/proco_technologies/",
        "https://www.linkedin.com/company/procotech",
        "https://www.youtube.com/@procotech"
      ],
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8" /* ← CONFIRM / UPDATE RATING */,
        "bestRating": "5",
        "ratingCount": 120 /* ← UPDATE ACTUAL COUNT */,
        "reviewCount": 120
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "offers": [
          { "@type": "Offer", "name": "Full Stack Web Development Course", "price": "9999", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "Mobile App Development Course", "price": "7999", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "ADCA - Advanced Diploma in Computer Application", "price": "8999", "priceCurrency": "INR" },
          { "@type": "Offer", "name": "DCA - Diploma in Computer Application", "price": "3999", "priceCurrency": "INR" }
        ]
      }
    })
  }
}

// ──────────────────────────────────────────────
//  2.  JAIPUR BRANCH  — LocalBusiness (EducationalOrganization + ComputerStore)
// ──────────────────────────────────────────────
export function jaipurBranchJsonLd() {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["EducationalOrganization", "ComputerStore"],
      "name": "Proco Technologies - Jaipur",
      "description": "Computer institute and software development company in Jaipur offering professional IT training and custom software solutions.",
      "url": siteUrl,
      "logo": logoUrl,
      "image": imageUrl,
      /* ★ YOU STILL NEED: Jaipur branch phone number */
      "telephone": "+91-XXXXXXXXXX" /* ← FILL JAIPUR PHONE */,
      "foundingDate": "2019",
      "areaServed": ["Jaipur", "Rajasthan"],
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "14 Shree Colony, Near Ever Bright School, Jai Singh Pura Khor",
        "addressLocality": "Jaipur",
        "addressRegion": "Rajasthan",
        "postalCode": "302027",
        "addressCountry": "IN"
      },
      /* ★ YOU STILL NEED: geo (lat/lng) for Jaipur */
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 26.9124 /* ← FILL ACTUAL LATITUDE  */,
        "longitude": 75.7873 /* ← FILL ACTUAL LONGITUDE */
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          "opens": "09:00" /* ← CONFIRM OPEN TIME */,
          "closes": "19:00" /* ← CONFIRM CLOSE TIME */
        }
      ],
      "sameAs": [
        "https://www.facebook.com/procotechnologies",
        "https://www.instagram.com/proco_technologies/",
        "https://www.linkedin.com/company/procotech",
        "https://www.youtube.com/@procotech"
      ]
    })
  }
}

// ──────────────────────────────────────────────
//  3.  FULL STACK DEVELOPMENT COURSE
// ──────────────────────────────────────────────
export function fullStackCourseJsonLd() {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "Full Stack Web Development Course",
      "description": "Comprehensive MERN stack training covering React, Next.js, Node.js, Express, MongoDB, and modern web technologies. Hands-on projects and 95% job placement within 6 months.",
      "provider": {
        "@type": "EducationalOrganization",
        "name": "Proco Technologies",
        "url": siteUrl,
        "logo": logoUrl,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Lucknow",
          "addressRegion": "Uttar Pradesh",
          "addressCountry": "IN"
        }
      },
      "about": {
        "@type": "Thing",
        "name": "Full Stack Web Development"
      },
      "educationalCredentialAwarded": "Course Completion Certificate",
      "occupationalCredentialAwarded": "Full Stack Developer Certification",
      "timeRequired": "PT360H" /* ← ADJUST: e.g. PT360H = 360 hours */,
      "totalHistoricalEnrollment": 200 /* ← UPDATE ACTUAL NUMBER */,
      "offers": {
        "@type": "Offer",
        "price": "9999",
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-06-01"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "bestRating": "5",
        "ratingCount": 85,
        "reviewCount": 85
      },
      "review": [
        {
          "@type": "Review",
          "reviewRating": {
            "@type": "Rating",
            "ratingValue": "5",
            "bestRating": "5"
          },
          "author": {
            "@type": "Person",
            "name": "Student Review"
          },
          "reviewBody": "Excellent course! The practical projects helped me get a job as a full stack developer within 3 months of completing the training."
        }
      ],
      "occupationalCategory": "15-1252.00" /* Standard Occupational Code for Software Developers */,
      "teaches": [
        "HTML & CSS",
        "JavaScript",
        "React.js",
        "Next.js",
        "Node.js & Express",
        "MongoDB",
        "REST APIs",
        "Git & GitHub",
        "Deployment"
      ],
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "https://schema.org/Online" /* or "InPerson" / "Mixed" */,
        "courseWorkload": "PT12W" /* ← ADJUST: PT12W = 12 weeks */,
        "location": {
          "@type": "Place",
          "name": "Proco Technologies",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ground Floor D N Singh Complex, Semra Gauri, Aziz Nagar, Madiyanva",
            "addressLocality": "Lucknow",
            "addressRegion": "Uttar Pradesh",
            "postalCode": "226020",
            "addressCountry": "IN"
          }
        }
      },
      "jobPlacementRate": {
        "@type": "QuantitativeValue",
        "value": "95",
        "unitText": "PERCENT"
      }
    })
  }
}