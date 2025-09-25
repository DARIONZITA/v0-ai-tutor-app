"use client"

import { useState, useEffect } from "react"
import { LandingPage } from "@/components/landing-page"
import { Sidebar } from "../components/sidebar"
import { UploadArea } from "../components/upload-area"
import { AnalysisResults } from "../components/analysis-results"
import { StudentGroups } from "../components/student-groups"
import { ClassAnalysis } from "@/components/class-analysis"
import { StudentManagement } from "@/components/student-management"
import { studentsApi, analysesApi, type Student, type Analysis } from "@/lib/api"

// Convert backend format to frontend format
interface FrontendStudent {
  id: string
  name: string
  class: string
}

interface FrontendAnalysis {
  id: string
  studentName: string
  subject: string
  timestamp: Date
  data: any
}

type View = "landing" | "upload" | "results" | "groups" | "classes" | "students"

export default function Home() {
  const [currentView, setCurrentView] = useState<View>("landing")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [analyses, setAnalyses] = useState<FrontendAnalysis[]>([])
  const [selectedAnalysis, setSelectedAnalysis] = useState<FrontendAnalysis | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [students, setStudents] = useState<FrontendStudent[]>([])
  const [loading, setLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        
        // Carregar estudantes 
        const studentsResponse = await studentsApi.getStudents()
        const backendStudents = studentsResponse.students || []
        
        // Converter formato do backend para frontend
        const frontendStudents: FrontendStudent[] = backendStudents.map(student => ({
          id: student.id,
          name: student.name,
          class: student.class_name
        }))
        
        setStudents(frontendStudents)

        // Carregar análises
        const analysesResponse = await analysesApi.getAnalyses()
        const backendAnalyses = analysesResponse.analyses || []
        
        // Converter formato do backend para frontend
        const FRONTEND_BACKEND_BASE = 'https://backend-professoria.onrender.com'
        const frontendAnalyses: FrontendAnalysis[] = backendAnalyses.map(analysis => {
          const rawData = analysis.data || {}
          let imageUrl = rawData.imageUrl || ''
          if (imageUrl && imageUrl.startsWith('/')) {
            imageUrl = `${FRONTEND_BACKEND_BASE}${imageUrl}`
          }
          return {
            id: analysis.id,
            studentName: analysis.studentName,
            subject: analysis.subject,
            timestamp: new Date(analysis.timestamp),
            data: { ...rawData, imageUrl }
          }
        })
        
        setAnalyses(frontendAnalyses)
        
      } catch (error) {
        console.error('Error loading data:', error)
        // Em caso de erro, usar dados padrão para não quebrar a interface
        const defaultStudents: FrontendStudent[] = [
          { id: "1", name: "Anna Silva", class: "5th A" },
          { id: "2", name: "Bruno Santos", class: "5th A" },
          { id: "3", name: "Carla Oliveira", class: "5th A" },
          { id: "4", name: "Daniel Costa", class: "5th A" },
          { id: "5", name: "Elena Rodrigues", class: "5th A" },
          { id: "6", name: "Felix Almeida", class: "5th A" },
          { id: "7", name: "Gabriela Lima", class: "5th A" },
          { id: "8", name: "Hugo Ferreira", class: "5th A" },
        ]
        setStudents(defaultStudents)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  const handleTestUpload = async (studentId: string, subject: string, file: File) => {
    const student = students.find(s => s.id === studentId)
    if (!student) return
    setIsProcessing(true)
    setCurrentView("results")
    try {
      const result = await analysesApi.analyzeExercise(file, studentId, subject)
      const frontendAnalysis: FrontendAnalysis = {
        id: result.analysis.id,
        studentName: result.analysis.studentName,
        subject: result.analysis.subject,
        timestamp: new Date(result.analysis.timestamp),
        data: result.analysis.data
      }
      setAnalyses(prev => [frontendAnalysis, ...prev])
      setSelectedAnalysis(frontendAnalysis)
    } catch (error) {
      console.error('Error analyzing exercise:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAnalysisSelect = (analysis: FrontendAnalysis) => {
    setSelectedAnalysis(analysis)
    setCurrentView("results")
  }

  const handleNewAnalysis = () => {
    setCurrentView("upload")
    setSelectedAnalysis(null)
  }

  const handleViewGroups = () => {
    setCurrentView("groups")
  }

  const handleViewClasses = () => {
    setCurrentView("classes")
  }
  const handleViewStudents = () => {
    setCurrentView("students")
  }

  const handleGetStarted = () => {
    setCurrentView("upload")
  }

  // Show landing page first
  if (currentView === "landing") {
    return <LandingPage onGetStarted={handleGetStarted} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex flex-col lg:flex-row relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        <div className="w-6 h-6 flex flex-col justify-center">
          <span className={`block h-0.5 w-6 bg-gray-600 transition-transform ${sidebarOpen ? 'rotate-45 translate-y-1' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-opacity ${sidebarOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block h-0.5 w-6 bg-gray-600 mt-1 transition-transform ${sidebarOpen ? '-rotate-45 -translate-y-1' : ''}`}></span>
        </div>
      </button>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:relative inset-y-0 left-0 z-40 lg:z-auto
        transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
        transition-transform duration-300 ease-in-out lg:transition-none
        lg:block
      `}>
        <Sidebar 
          analyses={analyses}
          onAnalysisSelect={(analysis: FrontendAnalysis) => {
            handleAnalysisSelect(analysis)
            setSidebarOpen(false)
          }}
          onNewAnalysis={() => {
            handleNewAnalysis()
            setSidebarOpen(false)
          }}
          onViewGroups={() => {
            handleViewGroups()
            setSidebarOpen(false)
          }}
          onViewClasses={() => {
            handleViewClasses()
            setSidebarOpen(false)
          }}
          onViewStudents={() => {
            handleViewStudents()
            setSidebarOpen(false)
          }}
          selectedAnalysis={selectedAnalysis}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-0 lg:ml-0">
        {currentView === "upload" && (
          <UploadArea 
            students={students}
            onTestUpload={handleTestUpload}
            allowDemo={true}
          />
        )}

        {currentView === "results" && (
          <AnalysisResults 
            analysis={selectedAnalysis}
            isProcessing={isProcessing}
            onNewAnalysis={handleNewAnalysis}
            analysesCount={selectedAnalysis ? analyses.filter(a => a.studentName === selectedAnalysis.studentName).length : 0}
            analyses={analyses}
          />
        )}

        {currentView === "groups" && (
          <StudentGroups 
            students={students}
            analyses={analyses}
          />
        )}

        {currentView === "classes" && (
          <ClassAnalysis />
        )}
        {currentView === "students" && (
          <StudentManagement />
        )}
      </main>
    </div>
  )
}
