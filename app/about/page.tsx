import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Award, Target, Heart } from "lucide-react"

export default function AboutPage() {
  const team = [
    {
      name: "Aviral Shukla",
      role: "Founder & CEO",
      image: "https://cdn-icons-png.flaticon.com/512/8815/8815077.png",
      bio: "10+ years in software development and education",
    },
    {
      name: "Rakesh Dey",
      role: "Senior Software Engineer",
      image: "https://cdn-icons-png.flaticon.com/512/8815/8815077.png",
      bio: "Dedicated to helping students achieve their career goals",
    },
  ]

  const values = [
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: "Excellence",
      description: "We strive for excellence in everything we do, from course content to project delivery.",
    },
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Community",
      description: "Building a supportive community where students and professionals can grow together.",
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Innovation",
      description: "Staying ahead of technology trends to provide cutting-edge education and solutions.",
    },
    {
      icon: <Heart className="h-8 w-8 text-red-600" />,
      title: "Passion",
      description: "Our passion for technology and education drives us to help others succeed.",
    },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-green-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge className="mb-4" variant="secondary">
              About Proco Technologies
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Empowering the Next Generation of Tech Professionals
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Founded in 2019, <span className="text-blue-400">Proco Technologies</span> has been at the forefront of technology education and software development,
              helping individuals and businesses thrive in the digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At Proco Technologies, our journey began in 2019 with a clear vision: to empower youth with future-ready technical skills through practical, industry-focused training. Headquartered in Lucknow and Jaipur, we specialize in software development and IT education, offering courses like Full Stack Development, Web & Mobile App Development, ADCA, DCA, and more.
                </p>
                <p>
                  Starting with just 10 students in a small classroom, we've grown into a leading institution that has
                  trained over 500 professionals and completed more than 50 successful software projects. Our dual
                  approach of education and real-world application sets us apart in the industry.
                </p>
                <p>
                  We recognized early on that traditional education often lacks the real-world exposure needed to succeed in today’s competitive tech environment. That’s why our curriculum blends theory with hands-on project experience, allowing students to not only learn but build. Over the years, we’ve successfully trained more than 500 students and completed 50+ live projects for clients across India.
                </p>
                <p>
                  Our unique model prioritizes skill-building, career support, and innovation. With a focus on placement assistance and up-to-date tech practices, we ensure every learner is ready to step confidently into the IT industry.
                </p>
                <p>
                  At Proco, we believe in transforming potential into performance. Whether you're a beginner or someone looking to upgrade your career, our goal is to guide you at every step of your tech journey.
                </p>
              </div>
            </div>
            <div>
              <Image
                src="https://media.licdn.com/dms/image/v2/D5612AQFcXS62quCplg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1661871992258?e=2147483647&v=beta&t=sbulnK_83orJfAaVLNdGkIrmNDTSvhgPTN11OHrf5ck"
                alt="Proco Technologies Office"
                width={500}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These core values guide everything we do and shape the culture of our organization.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">{value.icon}</div>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our experienced team of educators and developers are passionate about helping you succeed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <Image
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    width={300}
                    height={300}
                    className="rounded-full mx-auto mb-4 w-32 h-32 object-cover"
                  />
                  <CardTitle className="text-xl">{member.name}</CardTitle>
                  <CardDescription className="text-blue-600 font-medium">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl leading-relaxed">
            To democratize access to quality technology education and provide innovative software solutions that drive
            business growth. We believe that with the right guidance and practical experience, anyone can build a
            successful career in technology.
          </p>
        </div>
      </section>
    </div>
  )
}
