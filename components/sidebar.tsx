"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { BookOpen, Plus, Users, FileText, Clock, ChevronRight } from "lucide-react"

interface Analysis {
  id: string
  studentName: string
  subject: string
  timestamp: Date
  data: any
}

interface SidebarProps {
  analyses: Analysis[]
  onAnalysisSelect: (analysis: Analysis) => void
  onNewAnalysis: () => void
  onViewGroups: () => void
  onViewClasses?: () => void
  onViewStudents?: () => void
  selectedAnalysis: Analysis | null
}

export function Sidebar({ 
  analyses, 
  onAnalysisSelect, 
  onNewAnalysis, 
  onViewGroups, 
  onViewClasses, 
  onViewStudents,
  selectedAnalysis 
}: SidebarProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: '2-digit' 
    })
  }

  return (
  <aside className="w-80 bg-white border-r border-gray-200/50 flex flex-col shadow-sm h-screen min-h-0">
      {/* Header */}
      <div className="p-4 lg:p-6 border-b border-gray-200/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-sm">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">Pedagogical Radar</h1>
            <p className="text-xs text-gray-500">Teacher Dashboard</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={onNewAnalysis}
            className="w-full gap-2 bg-primary hover:bg-primary/90"
          >
            <Plus className="w-4 h-4" />
            New Analysis
          </Button>
          
          <div className="flex flex-col gap-2">
            <Button 
              onClick={onViewGroups}
              variant="outline"
              className="w-full gap-2 border-primary/20 hover:bg-primary/5"
            >
              <Users className="w-4 h-4 text-primary" />
              View Groups
            </Button>
            <Button 
              onClick={() => onViewClasses && onViewClasses()}
              variant="outline"
              className="w-full gap-2 border-primary/20 hover:bg-primary/5"
            >
              <Users className="w-4 h-4 text-primary" />
              View Classes
            </Button>
            <Button 
              onClick={() => onViewStudents && onViewStudents()}
              variant="outline"
              className="w-full gap-2 border-primary/20 hover:bg-primary/5"
            >
              <Users className="w-4 h-4 text-primary" />
              Manage Students
            </Button>
          </div>
        </div>
      </div>

  {/* Analysis History */}
  <div className="flex-1 overflow-y-auto min-h-0">
        <div className="p-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-4 h-4 text-gray-400" />
            <h2 className="text-sm font-semibold text-gray-700">Analysis History</h2>
          </div>

          {analyses.length === 0 ? (
            <div className="text-center py-4 lg:py-8">
              <FileText className="w-6 h-6 lg:w-8 lg:h-8 text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No analyses yet</p>
              <p className="text-xs text-gray-400 mt-1">
                Start by uploading a student's test
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {analyses.map((analysis, index) => (
                <Card 
                  key={analysis.id}
                  className={`p-3 cursor-pointer transition-all duration-200 hover:shadow-md border ${
                    selectedAnalysis?.id === analysis.id 
                      ? 'border-primary/30 bg-primary/5 shadow-sm' 
                      : 'border-gray-200/50 hover:border-primary/20'
                  }`}
                  onClick={() => onAnalysisSelect(analysis)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded">
                          #{index + 1}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(analysis.timestamp)}
                        </span>
                      </div>
                      
                      <h3 className="font-medium text-sm text-gray-900 truncate mb-1">
                        {analysis.studentName}
                      </h3>
                      
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {analysis.subject}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatTime(analysis.timestamp)}
                        </span>
                      </div>
                    </div>
                    
                    <ChevronRight className="w-4 h-4 text-gray-400 ml-2 flex-shrink-0" />
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Stats */}
      <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{analyses.length}</div>
          <div className="text-xs text-gray-500">
            {analyses.length === 1 ? 'Analysis performed' : 'Analyses performed'}
          </div>
        </div>
      </div>
    </aside>
  )
}
