import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"

export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard.",
      image: "https://repository-images.githubusercontent.com/456963513/82528385-a73f-488f-9003-513321283a6b",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      category: "Web Development",
      client: "RetailCorp",
      year: "2024",
    },
    {
      id: 2,
      title: "Healthcare Management System",
      description:
        "Comprehensive healthcare management system for hospitals with patient records, appointments, and billing.",
      image: "https://media.licdn.com/dms/image/v2/D5605AQF88I6JqZJlcg/videocover-low/videocover-low/0/1716833727464?e=2147483647&v=beta&t=-xS0aF4PXtLhcrBN8B7sh0fuXhX4tP3sJB9dAtx7Is8",
      technologies: ["Next.js", "PostgreSQL", "TypeScript", "Tailwind"],
      category: "Web Development",
      client: "MediCare Hospital",
      year: "2024",
    },
    {
      id: 3,
      title: "Food Delivery Mobile App",
      description: "Cross-platform mobile app for food delivery with real-time tracking and payment integration.",
      image: "https://i.ytimg.com/vi/6hUSNDGkg1c/maxresdefault.jpg",
      technologies: ["React Native", "Firebase", "Google Maps", "PayPal"],
      category: "Mobile Development",
      client: "QuickEats",
      year: "2023",
    },
    {
      id: 4,
      title: "Learning Management System",
      description: "Educational platform with course management, video streaming, and progress tracking.",
      image: "https://repository-images.githubusercontent.com/651920455/4b54fa0e-0f63-4dfe-8af2-6f60ab0925ec",
      technologies: ["Vue.js", "Laravel", "MySQL", "AWS"],
      category: "Web Development",
      client: "EduTech Solutions",
      year: "2023",
    },
    {
      id: 5,
      title: "Real Estate Portal",
      description: "Property listing and management platform with advanced search and virtual tours.",
      image: "https://camo.githubusercontent.com/3c9e386cbd96b82db1a66ef87fc26e71a569a70c09341970b6561f1003a955f9/68747470733a2f2f692e6962622e636f2f67566753574a632f6167656e742d64617368626f6172642e706e67",
      technologies: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
      category: "Web Development",
      client: "PropertyPro",
      year: "2023",
    },
    {
      id: 6,
      title: "Fitness Tracking App",
      description: "Mobile fitness app with workout tracking, nutrition planning, and social features.",
      image: "https://raw.githubusercontent.com/avigael/react-native-fitness-app/main/screenshot/screenshot.png",
      technologies: ["Flutter", "Dart", "Firebase", "HealthKit"],
      category: "Mobile Development",
      client: "FitLife",
      year: "2022",
    },
  ]

  const categories = ["All", "Web Development", "Mobile Development", "Data Analytics"]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="mb-4" variant="secondary">
            Our Portfolio
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Showcasing Our Best Work</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful projects across various industries. From web applications to mobile
            apps, we deliver solutions that drive business growth.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button key={category} variant={category === "All" ? "default" : "outline"} className="rounded-full">
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <Card key={project.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="relative">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge>{project.category}</Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-500">
                      {project.client} • {project.year}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Live
                    </Button>
                    <Button size="sm" variant="outline">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers that showcase our commitment to delivering exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">50+</div>
              <div className="text-gray-600">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">25+</div>
              <div className="text-gray-600">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-gray-600">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technologies We Use</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We work with cutting-edge technologies to deliver modern, scalable solutions.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              "React",
              "Next.js",
              "Node.js",
              "Python",
              "Flutter",
              "AWS",
              "MongoDB",
              "PostgreSQL",
              "Docker",
              "Kubernetes",
              "TypeScript",
              "GraphQL",
            ].map((tech) => (
              <div key={tech} className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-2">
                  <span className="text-2xl font-bold text-gray-600">{tech.charAt(0)}</span>
                </div>
                <span className="text-sm text-gray-600">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl mb-8">
            Let's discuss how we can help bring your ideas to life with our expertise and experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              Get a Quote
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-red-600 bg-transparent"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
