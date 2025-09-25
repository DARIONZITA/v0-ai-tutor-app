"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle,
  CheckCircle2,
  Clock,
  User,
  Target,
  ArrowRight,
  Lightbulb
} from "lucide-react"
import { groupsApi, type StudentGroup, type GroupingResponse, type GroupStudentRef, type Student as ApiStudent } from "@/lib/api"

interface Student {
  id: string
  name: string
  class: string
}

interface Analysis {
  id: string
  studentName: string
  subject: string
  timestamp: Date
  data: any
}

interface StudentGroupsProps {
  students: Student[]
  analyses: Analysis[]
}

interface UiStudentGroup extends StudentGroup {
  icon: React.ReactNode
  students: (GroupStudentRef & { name?: string; class?: string })[]
}

export function StudentGroups({ students, analyses }: StudentGroupsProps) {
  const [groups, setGroups] = useState<UiStudentGroup[]>([])
  const [meta, setMeta] = useState<{ llm?: boolean; cached?: boolean }>({})
  const [loading, setLoading] = useState(true)

  // Load groups from API
  useEffect(() => {
    const loadGroups = async () => {
      try {
        setLoading(true)
        const response = await groupsApi.getStudentGroups()
        
        // Convert API groups to frontend format with icons
        const frontendGroups: UiStudentGroup[] = response.groups.map(group => ({
          ...group,
          icon: getGroupIcon(group.level),
          students: group.students.map(s => ({
            // Mapear os campos corretos do backend
            id: s.analysisId || s.id || 'unknown',
            name: s.studentName || s.name || 'Unknown Student',
            class: s.class_name || s.class || '5th A',
            rationale: s.rationale
          }))
        }))
        setGroups(frontendGroups)
        setMeta({ llm: response.llm, cached: response.cached })
      } catch (error) {
        console.error('Error loading groups:', error)
        // Fallback to simulated groups
  setGroups(getFallbackGroups())
  setMeta({ llm: false, cached: false })
      } finally {
        setLoading(false)
      }
    }

    loadGroups()
  }, [students, analyses])

  const getGroupIcon = (level: string) => {
    switch (level) {
      case 'high':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'medium':
        return <Clock className="w-5 h-5 text-yellow-600" />
      case 'low':
        return <AlertCircle className="w-5 h-5 text-red-600" />
      default:
        return <Users className="w-5 h-5 text-gray-600" />
    }
  }

  // Fallback groups in case API fails
  const getFallbackGroups = (): UiStudentGroup[] => {
    const analyzedStudents = analyses.map(a => a.studentName)
    const notAnalyzedStudents = students.filter(s => !analyzedStudents.includes(s.name))
    
    return [
      {
        id: 'advanced',
        name: 'Advanced Group',
        level: 'high' as const,
        color: 'bg-green-50 border-green-200',
        icon: <CheckCircle2 className="w-5 h-5 text-green-600" />,
        description: 'Students with good understanding of basic concepts',
        students: students.slice(0, 2),
        commonErrors: [],
        suggestions: [
          'Deepening exercises',
          'Contextualized problems',
          'Mentoring other students'
        ]
      },
      {
        id: 'intermediate',
        name: 'Intermediate Group',
        level: 'medium' as const,
        color: 'bg-yellow-50 border-yellow-200',
        icon: <Clock className="w-5 h-5 text-yellow-600" />,
        description: 'Students with some specific difficulties',
        students: [...students.slice(2, 5), ...notAnalyzedStudents],
        commonErrors: [
          'Operations with fractions',
          'Solving simple equations'
        ],
        suggestions: [
          'Reinforcement in specific concepts',
          'Directed exercises',
          'Closer follow-up'
        ]
      },
      {
        id: 'needs-support',
        name: 'Support Group',
        level: 'low' as const,
        color: 'bg-red-50 border-red-200',
        icon: <AlertCircle className="w-5 h-5 text-red-600" />,
        description: 'Students who need intensive reinforcement',
        students: students.slice(5, 7),
        commonErrors: [
          'Basic operations',
          'Number concept',
          'Problem interpretation'
        ],
        suggestions: [
          'Individual reinforcement',
          'Manipulative materials',
          'Constant monitoring'
        ]
      }
    ].filter(group => group.students.length > 0)
  }

  const getLevelStats = () => {
    const total = students.length
    const advanced = groups.find(g => g.id === 'advanced')?.students.length || 0
    const intermediate = groups.find(g => g.id === 'intermediate')?.students.length || 0
    const needsSupport = groups.find(g => g.id === 'needs-support')?.students.length || 0
    
    return { advanced, intermediate, needsSupport, total }
  }

  const stats = getLevelStats()

  const recompute = async () => {
    try {
      setLoading(true)
      const response = await groupsApi.recompute()
      const refreshed: UiStudentGroup[] = response.groups.map(group => ({
        ...group,
        icon: getGroupIcon(group.level),
        students: group.students.map(s => ({
          // Mapear os campos corretos do backend
          id: s.analysisId || s.id || 'unknown',
          name: s.studentName || s.name || 'Unknown Student',
          class: s.class_name || s.class || '5th A',
          rationale: s.rationale
        }))
      }))
      setGroups(refreshed)
      setMeta({ llm: response.llm, cached: response.cached })
    } catch (e) {
      console.error('Error recomputing groups', e)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading student groups...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 px-4 lg:px-8 py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <Users className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-gray-900">Student Groups</h1>
                <p className="text-gray-600 mt-1">
                  Students organized by difficulty level and error patterns
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {meta.llm && (
                <span className="text-xs px-2 py-1 rounded bg-indigo-50 text-indigo-600 border border-indigo-200">
                  {meta.cached ? 'LLM (cached)' : 'LLM active'}
                </span>
              )}
              {!meta.llm && (
                <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-600 border border-gray-200">
                  Heuristic mode
                </span>
              )}
              <Button onClick={recompute} variant="outline" className="gap-2">
                <Target className="w-4 h-4" />
                Recompute
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="bg-white border-b border-gray-200/50 px-4 lg:px-8 py-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:p-6">
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-green-600">{stats.advanced}</div>
              <div className="text-sm text-gray-600">Advanced</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-yellow-600">{stats.intermediate}</div>
              <div className="text-sm text-gray-600">Intermediate</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-red-600">{stats.needsSupport}</div>
              <div className="text-sm text-gray-600">Need Support</div>
            </div>
            <div className="text-center">
              <div className="text-xl lg:text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-8 py-4 lg:py-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {groups.map((group) => (
            <Card key={group.id} className={`${group.color} hover-lift`}>
              <div className="p-4 lg:p-6">
                {/* Group Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                      {group.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{group.name}</h3>
                      <p className="text-gray-600 mt-1">{group.description}</p>
                      {('criteria' in group) && group.criteria && (
                        <p className="text-xs text-gray-500 mt-1">Criteria: {group.criteria}</p>
                      )}
                      <Badge variant="outline" className="mt-2">
                        {group.students.length} {group.students.length === 1 ? 'student' : 'students'}
                      </Badge>
                    </div>
                  </div>
                  
                  {group.level === 'high' && (
                    <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                  )}
                  {group.level === 'low' && (
                    <TrendingDown className="w-5 h-5 lg:w-6 lg:h-6 text-red-600" />
                  )}
                </div>

                {/* Students Grid */}
                <div className="grid md:grid-cols-1 lg:grid-cols-2 lg:grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                  {group.students.map((student) => (
                    <div key={student.id} className="bg-white rounded-lg p-4 border border-gray-200/50">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 lg:w-8 lg:h-8 bg-gray-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-gray-600" />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{student.name}</div>
                          <div className="text-sm text-gray-600">{student.class}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Analysis Section */}
                <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 lg:p-6">
                  {/* Common Errors */}
                  {group.commonErrors.length > 0 && (
                    <div className="bg-white rounded-lg p-4 border border-gray-200/50">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-red-500" />
                        <h4 className="font-semibold text-gray-900">Common Errors</h4>
                      </div>
                      <ul className="space-y-2">
                        {group.commonErrors.map((error, index) => (
                          <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                            <ArrowRight className="w-3 h-3 text-red-400" />
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Suggestions */}
                  <div className="bg-white rounded-lg p-4 border border-gray-200/50">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-blue-500" />
                      <h4 className="font-semibold text-gray-900">Pedagogical Suggestions</h4>
                    </div>
                    <ul className="space-y-2">
                      {group.suggestions.map((suggestion, index) => (
                        <li key={index} className="text-sm text-gray-700 flex items-center gap-2">
                          <ArrowRight className="w-3 h-3 text-blue-400" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
