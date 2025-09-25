// API client for backend communication

const API_BASE_URL = 'http://127.0.0.1:8000' // Backend URL

interface Student {
  id: string
  name: string
  class_name: string
}

interface AnalysisData {
  imageUrl: string
  detected_text: string
  mainError: string
  errorPercentage: number
  concepts: string[]
  suggestions: string[]
  reasoning?: string
}

interface Analysis {
  id: string
  studentName: string
  subject: string
  timestamp: string
  data: AnalysisData
}

interface GroupStudentRef {
  id?: string
  analysisId?: string
  studentName?: string
  rationale?: string
  // Campos enriquecidos após junção opcional com lista de estudantes
  name?: string
  class?: string
  class_name?: string
}

interface StudentGroup {
  id: string
  name: string
  level: 'high' | 'medium' | 'low'
  color: string
  description: string
  criteria?: string
  students: GroupStudentRef[]
  commonErrors: string[]
  suggestions: string[]
}

interface GroupingResponse {
  groups: StudentGroup[]
  llm?: boolean
  cached?: boolean
}

// Utility function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, defaultOptions)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Students API
export const studentsApi = {
  // Get all students
  getStudents: async (class_name?: string): Promise<{ students: Student[] }> => {
    const q = class_name ? `?class_name=${encodeURIComponent(class_name)}` : ''
    return apiRequest<{ students: Student[] }>(`/students${q}`)
  },

  // Create new student
  createStudent: async (name: string, class_name: string): Promise<Student> => {
    return apiRequest<Student>('/students', {
      method: 'POST',
      body: JSON.stringify({ name, class_name }),
    })
  },

  // Get specific student
  getStudent: async (studentId: string): Promise<Student> => {
    return apiRequest<Student>(`/students/${studentId}`)
  },

  deleteStudent: async (studentId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/students/${studentId}`, { method: 'DELETE' })
    if (response.status === 404) throw new Error('Student not found')
    return
  }
}

// Analyses API
export const analysesApi = {
  // Get all analyses
  getAnalyses: async (): Promise<{ analyses: Analysis[] }> => {
    return apiRequest<{ analyses: Analysis[] }>('/analyses')
  },

  // Get specific analysis
  getAnalysis: async (analysisId: string): Promise<Analysis> => {
    return apiRequest<Analysis>(`/analyses/${analysisId}`)
  },

  // Analyze exercise with file upload
  analyzeExercise: async (
    file: File,
    studentId?: string,
    subject: string = 'Mathematics'
  ): Promise<{ analysis: Analysis; ocr_info: any }> => {
    const formData = new FormData()
    formData.append('file', file)
    
    if (studentId) {
      formData.append('student_id', studentId)
    }
    formData.append('subject', subject)
    // language parameter removed — backend uses Gemini and ignores language for the new motor

    const response = await fetch(`${API_BASE_URL}/analyze_exercise`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  },
}

// Groups API
export const groupsApi = {
  // Get student groups based on analyses
  getStudentGroups: async (): Promise<GroupingResponse> => {
    return apiRequest<GroupingResponse>('/student_groups')
  },
  recompute: async (): Promise<GroupingResponse> => {
    return apiRequest<GroupingResponse>('/student_groups/recompute', { method: 'POST' })
  }
}

export const classApi = {
  getAnalysesByClass: async (): Promise<{ groups: any[] }> => {
    return apiRequest<{ groups: any[] }>('/analyses_by_class')
  },
  getClasses: async (): Promise<{ classes: { class_name: string; student_count: number }[] }> => {
    return apiRequest<{ classes: { class_name: string; student_count: number }[] }>(`/classes`)
  },
  getClassInsights: async (class_name: string, force?: boolean): Promise<any> => {
    const q = force ? `?force=true` : ''
    return apiRequest<any>(`/classes/${encodeURIComponent(class_name)}${q}`)
  }
}

// Export types for use in components
export type { Student, Analysis, AnalysisData, StudentGroup, GroupStudentRef, GroupingResponse }

// Export types for use in components