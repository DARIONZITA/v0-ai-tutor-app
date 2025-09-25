"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight,
  BookOpen,
  Brain,
  Users,
  Target,
  Sparkles,
  TrendingUp,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  FileText,
  Zap,
  Shield,
  Award,
  Eye,
  Clock,
  Star,
  ChevronDown
} from "lucide-react"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms identify specific error patterns and learning gaps instantly",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized Insights",
      description: "Generate custom micro-exercises and pedagogical recommendations for each student",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Student Grouping",
      description: "Automatically organize students by skill level and learning needs for targeted instruction",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Progress Tracking",
      description: "Monitor student development over time with comprehensive analytics and visual reports",
      color: "from-orange-500 to-red-500"
    }
  ]

  const stats = [
    { number: "95%", label: "Pattern Recognition Accuracy", icon: <Eye className="w-6 h-6" /> },
    { number: "< 30s", label: "Analysis Time", icon: <Clock className="w-6 h-6" /> },
    { number: "10,000+", label: "Students Analyzed", icon: <Users className="w-6 h-6" /> },
    { number: "4.9/5", label: "Teacher Satisfaction", icon: <Star className="w-6 h-6" /> }
  ]

  const benefits = [
    "Identify learning gaps instantly",
    "Reduce grading time by 80%",
    "Improve student outcomes",
    "Data-driven teaching decisions",
    "Personalized learning paths",
    "Real-time progress insights"
  ]

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Decorative background layers to reduce whiteness and add depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white/60 to-blue-50" aria-hidden />
      <div className="absolute -left-28 -top-20 w-[520px] h-[520px] bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-80 transform rotate-12" aria-hidden />
      <div className="absolute right-0 bottom-[-80px] w-[420px] h-[420px] bg-gradient-to-br from-purple-50 to-pink-50 rounded-full blur-3xl opacity-60" aria-hidden />
      {/* Subtle noise texture as SVG - low opacity for gentle effect */}
      <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-10 mix-blend-multiply" aria-hidden>
        <defs>
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="table" tableValues="0 0.08" />
            </feComponentTransfer>
          </filter>
        </defs>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" fill="#111" />
      </svg>
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-200/50 z-50">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Pedagogical Radar
                </h1>
                <p className="text-xs lg:text-sm text-gray-600">AI for Educators</p>
              </div>
            </div>
            <Button onClick={onGetStarted} className="gap-2 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 lg:pt-32 pb-16 lg:pb-24 px-4 lg:px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center space-y-8 lg:space-y-12">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full border border-primary/20 animate-bounce-in">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Revolutionary AI Education Technology</span>
            </div>

            {/* Hero Title */}
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-7xl font-bold leading-tight">
                Transform Your
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent animate-gradient">
                  Teaching Experience
                </span>
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Discover hidden learning patterns in student work with AI-powered analysis. 
                Get instant insights, personalized recommendations, and data-driven teaching strategies.
              </p>
            </div>

            {/* Hero CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="gap-3 text-lg px-8 py-4 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300"
              >
                <Brain className="w-6 h-6" />
                Start Analyzing Now
                <ArrowRight className="w-5 h-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="gap-2 text-lg px-8 py-4 hover:bg-gray-50"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Eye className="w-5 h-5" />
                See How It Works
              </Button>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-16 animate-bounce">
              <ChevronDown className="w-8 h-8 text-gray-400 mx-auto" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-white/50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="flex justify-center">
                  <div className="w-12 h-12 lg:w-16 lg:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl flex items-center justify-center">
                    <div className="text-primary">
                      {stat.icon}
                    </div>
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-sm lg:text-base text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center space-y-8 mb-16 lg:mb-24">
            <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30">
              Core Features
            </Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Powerful AI Tools for
              <span className="block text-primary">Modern Educators</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our cutting-edge technology transforms how you understand and support student learning
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="p-6 lg:p-8 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 shadow-lg group"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge variant="outline" className="px-4 py-2 text-primary border-primary/30">
                  Why Choose Us
                </Badge>
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
                  Revolutionize Your
                  <span className="block text-primary">Teaching Workflow</span>
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Join thousands of educators who have transformed their teaching with AI-powered insights
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button 
                onClick={onGetStarted}
                size="lg" 
                className="gap-3 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <Award className="w-6 h-6" />
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Trusted by Educators</h3>
                      <p className="text-gray-600">Academic research-backed</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Accuracy Rate</span>
                      <span className="font-bold text-primary">95%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full w-[95%]"></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Time Saved</span>
                      <span className="font-bold text-green-600">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full w-[80%]"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="space-y-8 max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Teaching?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed">
              Join the AI education revolution. Start analyzing student work with unprecedented insight today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={onGetStarted}
                size="lg" 
                variant="secondary"
                className="gap-3 text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 bg-white text-primary hover:bg-gray-50"
              >
                <Sparkles className="w-6 h-6" />
                Get Started Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </div>

            <p className="text-white/80 text-sm">
              No credit card required • Free 30-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-white">
        <div className="container mx-auto px-4 lg:px-6 text-center">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold">Pedagogical Radar</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 Pedagogical Radar. Empowering educators with AI.
            </p>
          </div>
        </div>
      </footer>
      </div>
    </div>
  )
}