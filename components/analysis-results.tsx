"use client"

import { useState } from "react"
// PDFs removed: download JSON only
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Brain, 
  TrendingUp, 
  History, 
  Lightbulb, 
  FileText,
  Download,
  Plus,
  Clock,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle2,
  Target,
  X
} from "lucide-react"

interface Analysis {
  id: string
  studentName: string
  subject: string
  timestamp: Date
  data: {
    imageUrl: string
    mainError: string
    errorPercentage: number
    concepts: string[]
    suggestions: string[]
    detected_text?: string
    reasoning?: string
    score?: { correct: number; total: number; label: string }
  }
}

interface AnalysisResultsProps {
  analysis: Analysis | null
  isProcessing: boolean
  onNewAnalysis: () => void
  analysesCount?: number
  analyses?: any[]
}

export function AnalysisResults({ analysis, isProcessing, onNewAnalysis, analysesCount, analyses }: AnalysisResultsProps) {
  const [showProgression, setShowProgression] = useState(false)
  const analysesForStudent = analyses || []
  const studentAnalyses = analysis ? analysesForStudent.filter(a => a?.studentName === analysis.studentName) : []

  // Build and download a JSON report containing current analysis + student history and simple metrics
  async function downloadReport() {
    if (!analysis || !analysis.id) return
    const history = studentAnalyses || []
    const avgError = Math.round((history.reduce((s,a) => s + (a?.data?.errorPercentage || a?.data?.ai_analysis?.errorPercentage || 0), 0) / Math.max(1, history.length)))
    const recent = history.length >= 2 ? (history[0]?.data?.errorPercentage || history[0]?.data?.ai_analysis?.errorPercentage || 0) - (history[history.length-1]?.data?.errorPercentage || history[history.length-1]?.data?.ai_analysis?.errorPercentage || 0) : null

    const report = {
      generatedAt: new Date().toISOString(),
      studentName: analysis.studentName,
      subject: analysis.subject,
      currentAnalysis: analysis,
      historicalAnalyses: history,
      metrics: {
        analysesCount: history.length,
        averageError: avgError,
        recentTrend: recent,
      }
    }

    const safeName = (analysis.studentName || 'report').replace(/[^a-z0-9-_]/gi, '_')
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report-${safeName}.json`
    document.body.appendChild(a)
    a.click()
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)
  }

  // PDF helpers removed — only JSON download retained
  if (isProcessing) {
    return <ProcessingView />
  }

  if (!analysis || !analysis.id) {
    return <EmptyState onNewAnalysis={onNewAnalysis} />
  }

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 px-4 md:px-4 lg:px-8 py-4 md:py-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 md:w-6 md:h-6 text-secondary" />
              </div>
              <div>
                <h1 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900">Full Analysis</h1>
                {analysis.data?.score?.label && (
                  <div className="mt-1">
                    <Badge variant="secondary">Score: {analysis.data.score.label}</Badge>
                  </div>
                )}
                <div className="flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-3 text-sm text-gray-600 mt-1">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {analysis.studentName || 'Unknown Student'}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {analysis.subject || 'Unknown Subject'}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {analysis.timestamp ? analysis.timestamp.toLocaleString('en-US') : 'Unknown Date'}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-2 lg:gap-3">
              <Button variant="outline" className="gap-2" onClick={downloadReport}>
                <Download className="w-4 h-4" />
                Download Report
              </Button>
              {/* formato PDF removido - download JSON apenas */}
              <Button onClick={onNewAnalysis} className="gap-2">
                <Plus className="w-4 h-4" />
                New Analysis
              </Button>
            </div>
          </div>
        </div>
      </header>      {/* Main Content */}
      <div className="flex-1 px-4 md:px-4 lg:px-8 py-4 md:py-4 lg:py-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
          {/* Analyzed Text Sample - Full Width Card */}
          {analysis.data?.detected_text && (
            <Card className="p-4 md:p-4 lg:p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-3">Analyzed Text Sample</h3>
                  <p className="text-sm text-gray-600 mb-4">Excerpt from the OCR'd student submission</p>
                  <div className="bg-white border border-gray-100 rounded-lg p-4 shadow-sm">
                    <CollapsibleText text={analysis.data.detected_text} maxChars={500} />
                  </div>
                </div>
              </div>
            </Card>
          )}

          {/* Main organized cards */}
          <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-4 lg:gap-8">
            {/* Block "Main Concept" */}
            <Card className="p-4 md:p-4 lg:p-6 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Main Concept</h3>
                  <Badge variant="destructive" className="mb-3">
                    {analysis.data?.errorPercentage || 0}% difficulty
                  </Badge>
                  
                  {/* Show main concept from structured analysis if available */}
                  <h4 className="font-semibold text-gray-800 mb-3">
                    {((analysis.data as any)?.ai_structured?.mainConcept || (analysis.data as any)?.ai_analysis?.mainConcept || analysis.data?.mainError || 'Unknown Error')}
                  </h4>
                  
                  {analysis.data?.reasoning && (
                    <div className="mb-3 text-xs text-gray-600 bg-white/60 border border-gray-200 rounded p-3">
                      <p className="font-semibold mb-1">AI Reasoning</p>
                      <p className="leading-relaxed">
                        {analysis.data.reasoning}
                      </p>
                    </div>
                  )}
                  <p className="text-sm text-gray-600">
                    <strong>Related concepts:</strong>
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(analysis.data?.concepts || []).map((concept, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {concept}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Block "Specific Error" - Enhanced with detailed error analysis */}
            <Card className="p-4 md:p-4 lg:p-6 border-destructive/20 bg-gradient-to-br from-red-50 to-orange-50 overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 md:w-6 md:h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Specific Error Analysis</h3>
                  <div className="space-y-4">
                    {/* Error type and recurrence */}
                    <div className="flex items-center gap-3 flex-wrap">
                      <div className="min-w-0 max-w-full">
                        <Badge variant="destructive" className="text-xs block max-w-full">
                          <span className="inline-block max-w-full whitespace-normal break-words block">{((analysis.data as any)?.ai_structured?.specificError || (analysis.data as any)?.ai_analysis?.specificError || analysis.data?.mainError || 'Unknown Error')}</span>
                        </Badge>
                      </div>
                      <div className="flex-shrink-0">
                        {((analysis.data as any)?.ai_structured?.isRecurrent || (analysis.data as any)?.ai_analysis?.isRecurrent) ? (
                          <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                            Recurrent Pattern
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                            First Occurrence
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Error description with reasoning (collapsible for long texts) */}
                    <div className="bg-white border border-red-100 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Error Pattern</h4>
                      <div className="mb-3">
                        <CollapsibleText text={((analysis.data as any)?.ai_structured?.specificError || (analysis.data as any)?.ai_analysis?.specificError || analysis.data?.mainError || 'Unknown Error') as string} maxChars={220} />
                      </div>
                      {analysis.data?.reasoning && (
                        <>
                          <h5 className="font-medium text-gray-800 mb-1">AI Analysis:</h5>
                          <div className="text-xs text-gray-600 bg-red-50 p-3 rounded">
                            <CollapsibleText text={analysis.data.reasoning} maxChars={300} />
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>



            {/* Block "Historical Analysis" */}
            <Card className="p-4 md:p-4 lg:p-6 border-chart-3/20 bg-gradient-to-br from-yellow-50 to-amber-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <History className="w-5 h-5 md:w-6 md:h-6 text-amber-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Historical Analysis</h3>
                  <div className="space-y-4">
                    {/* Show historical analysis from structured data if available */}
                    {((analysis.data as any).ai_structured?.historicalAnalysis || (analysis.data as any).ai_analysis?.historicalAnalysis) ? (
                      <div className="bg-white border border-amber-100 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Pattern History</h4>
                        <p className="text-sm text-gray-700">
                          {renderAny((analysis.data as any).ai_structured?.historicalAnalysis || (analysis.data as any).ai_analysis?.historicalAnalysis)}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-white border border-amber-100 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">Baseline Analysis</h4>
                        <p className="text-sm text-gray-700">
                          This is the first test analyzed for this student. Establishing baseline to track progress and identify recurring patterns.
                        </p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">
                        <div className="bg-white rounded-lg p-3 border">
                          <div className="text-lg font-bold text-gray-900">{(analysesCount || 0) === 1 ? '1 analysis' : `${analysesCount || 0} analyses`}</div>
                          <div className="text-xs text-gray-600">Student's analysis</div>
                        </div>
                      <div className="bg-white rounded-lg p-3 border">
                        <div className="text-lg font-bold text-primary">
                          {((analysis.data as any).ai_structured?.isRecurrent || (analysis.data as any).ai_analysis?.isRecurrent) ? 'Recurring' : 'New'}
                        </div>
                        <div className="text-xs text-gray-600">Pattern status</div>
                      </div>
                      <div className="bg-white rounded-lg p-3 border">
                        <div className="text-lg font-bold text-secondary">Tracked</div>
                        <div className="text-xs text-gray-600">For progress</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Block "Suggestion for Teacher" */}
            <Card className="p-4 md:p-4 lg:p-6 border-secondary/20 bg-gradient-to-br from-green-50 to-emerald-50">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Lightbulb className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2">Suggestion for Teacher</h3>
                  <div className="space-y-3">
                    {/* Show structured suggestion if available */}
                    {((analysis.data as any).ai_structured?.suggestionForTeacher || (analysis.data as any).ai_analysis?.suggestionForTeacher) ? (
                      <div className="bg-white border border-green-100 rounded-lg p-4 mb-3">
                        <h4 className="font-semibold text-green-800 mb-2">AI Recommendation</h4>
                        <div className="text-sm text-gray-700">
                          {renderAny((analysis.data as any).ai_structured?.suggestionForTeacher || (analysis.data as any).ai_analysis?.suggestionForTeacher)}
                        </div>
                      </div>
                    ) : null}
                    
                    {/* Show general suggestions from analysis */}
                    {analysis.data?.suggestions && Array.isArray(analysis.data.suggestions) && analysis.data.suggestions.length > 0 && (
                      <>
                        <h4 className="font-medium text-gray-800">General Recommendations:</h4>
                        {analysis.data.suggestions.map((suggestion, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <div className="w-5 h-5 bg-green-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <span className="text-xs font-bold text-green-800">{index + 1}</span>
                            </div>
                            <p className="text-sm text-gray-700">{suggestion}</p>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Block "Generated Micro-Exercise" - Full Width */}
          <Card className="p-4 md:p-8 border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
            <div className="flex flex-col lg:flex-row items-start gap-4 lg:gap-4 lg:p-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 lg:w-16 lg:h-16 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Target className="w-5 h-5 lg:w-6 lg:h-6 lg:w-8 lg:h-8 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl lg:text-xl lg:text-2xl font-bold text-gray-900 mb-3">Personalized Micro-Exercises</h3>
                
                {/* Student Feedback Section */}
                {((analysis.data as any).studentFeedback) && (
                  <div className="mb-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Feedback for {analysis.studentName}</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap mb-2">{(analysis.data as any).studentFeedback}</p>
                      <p className="text-xs text-blue-600">This feedback is student-facing — you can use it to guide the student through a short practice.</p>
                    </div>
                  </div>
                )}
                
                {/* Show generated exercises if available */}
                {((analysis.data as any).ai_structured?.generatedMicroExercise || (analysis.data as any).ai_analysis?.generatedMicroExercise) ? (
                  <div className="mb-6">
                    <div className="bg-white border border-purple-100 rounded-lg p-4 lg:p-6">
                      <h4 className="font-semibold text-purple-800 mb-4">AI Generated Exercises</h4>
                      <div className="space-y-4">
                        {renderExercises((analysis.data as any).ai_structured?.generatedMicroExercise || (analysis.data as any).ai_analysis?.generatedMicroExercise)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-600 mb-4">
                      Create personalized exercises based on the specific difficulties identified for <strong>{analysis.studentName}</strong>
                    </p>
                    <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="font-semibold text-gray-900 mb-2">Focus on Main Error</h4>
                        <p className="text-sm text-gray-600">
                          Specific exercises for {((analysis.data as any)?.ai_structured?.specificError || (analysis.data as any)?.ai_analysis?.specificError || analysis.data?.mainError || 'unknown error').toLowerCase()}
                        </p>
                      </div>
                      <div className="bg-white rounded-lg p-4 border">
                        <h4 className="font-semibold text-gray-900 mb-2">Gradual Progression</h4>
                        <p className="text-sm text-gray-600">
                          From basic concept to more complex applications
                        </p>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex flex-col lg:flex-row gap-3">
                  <Button className="gap-2 bg-purple-600 hover:bg-purple-700">
                    <FileText className="w-4 h-4" />
                    {((analysis.data as any).ai_structured?.generatedMicroExercise || (analysis.data as any).ai_analysis?.generatedMicroExercise) ? 'Generate More Exercises' : 'Generate Personalized Exercises'}
                  </Button>
                  <Button variant="outline" className="gap-2" onClick={() => setShowProgression(true)}>
                    <TrendingUp className="w-4 h-4" />
                    View Suggested Progression
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Analyzed test image */}
          {analysis.data?.imageUrl && (
            <Card className="p-4 md:p-4 lg:p-6">
              <h3 className="text-lg md:text-lg font-semibold text-gray-900 mb-4">Analyzed Test</h3>
              <div className="bg-gray-50 rounded-xl p-2 md:p-4">
                <img 
                  src={analysis.data.imageUrl} 
                  alt="Student's test"
                  className="max-w-full h-auto rounded-lg shadow-sm mx-auto"
                />
              </div>
            </Card>
          )}
        </div>
      </div>
        {/* Progression modal rendered at root of component so it overlays correctly */}
        <ProgressModal open={showProgression} onClose={() => setShowProgression(false)} analyses={studentAnalyses} studentName={analysis.studentName || 'Unknown Student'} />
    </div>
  )
}

// Simple responsive SVG chart plotting errorPercentage over time
function ProgressChart({ analyses }: { analyses: any[] }) {
  // expect analyses sorted desc (most recent first)
  const points = analyses
    .filter(a => a && a.timestamp) // Filter out invalid analyses
    .slice()
    .reverse()
    .map(a => ({ x: new Date(a.timestamp).getTime(), y: typeof a?.data?.errorPercentage === 'number' ? a.data.errorPercentage : (a?.data?.ai_analysis?.errorPercentage || 0) }))

  if (points.length === 0) {
    return <div className="text-sm text-gray-600">No historical data available to plot.</div>
  }

  const xs = points.map(p => p.x)
  const ys = points.map(p => p.y)
  const minX = Math.min(...xs)
  const maxX = Math.max(...xs)
  const minY = Math.max(0, Math.min(...ys) - 5)
  const maxY = Math.min(100, Math.max(...ys) + 5)

  const width = 600
  const height = 240
  const padding = 36

  const scaleX = (x: number) => padding + ((x - minX) / (maxX - minX || 1)) * (width - padding * 2)
  const scaleY = (y: number) => height - padding - ((y - minY) / (maxY - minY || 1)) * (height - padding * 2)

  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${scaleX(p.x)} ${scaleY(p.y)}`).join(' ')

  return (
    <div className="overflow-x-auto">
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" height="240" className="rounded">
        {/* grid lines */}
        {[0,25,50,75,100].map(g => (
          <line key={g} x1={padding} x2={width-padding} y1={scaleY(g)} y2={scaleY(g)} stroke="var(--color-chart-3)" strokeOpacity={0.08} />
        ))}

        {/* path */}
        <path d={path} fill="none" stroke="var(--color-chart-1)" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

        {/* points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle cx={scaleX(p.x)} cy={scaleY(p.y)} r={4} fill="white" stroke="var(--color-chart-1)" strokeWidth={2} />
          </g>
        ))}

        {/* x labels */}
        {/* compute a reduced set of ticks to avoid overlap */}
        {(() => {
          const maxTicks = Math.min(6, points.length)
          const ticks: number[] = []
          if (points.length <= maxTicks) {
            for (let i = 0; i < points.length; i++) ticks.push(i)
          } else {
            for (let t = 0; t < maxTicks; t++) {
              const idx = Math.round(t * (points.length - 1) / (maxTicks - 1))
              ticks.push(idx)
            }
          }
          // unique
          const uniq = Array.from(new Set(ticks))
          return uniq.map(i => {
            const p = points[i]
            const x = scaleX(p.x)
            const label = new Date(p.x).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })
            return (
              <g key={i}>
                {/* vertical tick line */}
                <line x1={x} x2={x} y1={height - padding} y2={padding} stroke="var(--color-chart-3)" strokeOpacity={0.02} />
                <text x={x} y={height - 6} fontSize={11} fill="#666" textAnchor="end" transform={`rotate(-30 ${x} ${height - 6})`}>{label}</text>
              </g>
            )
          })
        })()}
      </svg>
    </div>
  )
}

// Modal markup
function ProgressModal({ open, onClose, analyses, studentName }: { open: boolean; onClose: () => void; analyses: any[]; studentName?: string }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-[95%] max-w-4xl bg-white rounded-lg shadow-lg p-4 md:p-4 lg:p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg md:text-lg font-semibold">Suggested Progression for {studentName}</h3>
            <p className="text-sm text-gray-600">Progress over time (lower error% is better). Use this to adjust pacing and focus.</p>
          </div>
          <button className="text-gray-600" onClick={onClose}><X /></button>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-50 border rounded p-4">
            <ProgressChart analyses={analyses} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-white border rounded">
              <div className="text-sm text-gray-600">Average Error</div>
              <div className="text-xl font-semibold text-gray-900">{Math.round((analyses.reduce((s,a) => s + (a?.data?.errorPercentage || a?.data?.ai_analysis?.errorPercentage || 0), 0) / Math.max(1, analyses.length)))}%</div>
            </div>
            <div className="p-4 bg-white border rounded">
              <div className="text-sm text-gray-600">Recent Trend</div>
              <div className="text-xl font-semibold text-gray-900">{analyses.length >= 2 ? (analyses[0]?.data?.errorPercentage || analyses[0]?.data?.ai_analysis?.errorPercentage || 0) - (analyses[analyses.length-1]?.data?.errorPercentage || analyses[analyses.length-1]?.data?.ai_analysis?.errorPercentage || 0) : '—'}</div>
            </div>
            <div className="p-4 bg-white border rounded">
              <div className="text-sm text-gray-600">Data points</div>
              <div className="text-xl font-semibold text-gray-900">{analyses.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper to render arbitrary values (string, array, object) safely
function renderAny(value: any) {
  if (value === null || value === undefined) return null
  const t = typeof value
  if (t === 'string' || t === 'number' || t === 'boolean') {
    return <div className="text-gray-800">{String(value)}</div>
  }
  if (Array.isArray(value)) {
    return (
      <ul className="list-disc ml-5 text-gray-800">
        {value.map((it, i) => (
          <li key={i} className="break-words">{typeof it === 'object' ? <div className="whitespace-pre-wrap text-sm overflow-x-auto">{JSON.stringify(it)}</div> : String(it)}</li>
        ))}
      </ul>
    )
  }
  if (t === 'object') {
    return (
      <div className="whitespace-pre-wrap text-sm text-gray-800 overflow-x-auto break-words">
        <code>{JSON.stringify(value, null, 2)}</code>
      </div>
    )
  }
  return <div className="text-gray-800">{String(value)}</div>
}

function ProcessingView() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4 md:space-y-6">
        <div className="w-12 h-12 lg:w-16 lg:h-16 md:w-20 md:h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
          <Brain className="w-6 h-6 lg:w-8 lg:h-8 md:w-10 md:h-10 text-primary" />
        </div>
        <div>
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900">Analyzing the test...</h2>
          <p className="text-gray-600 mt-2">Our AI is identifying error patterns</p>
        </div>
      </div>
    </div>
  )
}

function EmptyState({ onNewAnalysis }: { onNewAnalysis: () => void }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center space-y-4 md:space-y-6 max-w-md">
        <FileText className="w-10 h-10 lg:w-12 lg:h-12 md:w-16 md:h-16 text-gray-300 mx-auto" />
        <div>
          <h2 className="text-xl md:text-xl lg:text-2xl font-bold text-gray-900">No analysis selected</h2>
          <p className="text-gray-600 mt-2">
            Select an analysis from history or create a new one
          </p>
        </div>
        <Button onClick={onNewAnalysis} className="gap-2">
          <Plus className="w-4 h-4" />
          New Analysis
        </Button>
      </div>
    </div>
  )
}

function CollapsibleText({ text, maxChars = 300 }: { text: string; maxChars?: number }) {
  const [open, setOpen] = useState(false)
  if (!text) return null
  if (text.length <= maxChars) return <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{text}</p>
  return (
    <div>
      <div className="max-w-full overflow-x-auto">
        <p className="text-sm text-gray-700 whitespace-pre-wrap break-words">{open ? text : text.slice(0, maxChars) + '…'}</p>
      </div>
      <Button variant="ghost" size="sm" onClick={() => setOpen(!open)} className="mt-2 text-xs">
        {open ? 'Show less' : 'Show more'}
      </Button>
    </div>
  )
}

// Nicely render generated exercises (array or single object)
function renderExercises(value: any) {
  if (!value) return null
  const items = Array.isArray(value) ? value : [value]
  return (
    <div className="space-y-4">
      {items.map((ex: any, idx: number) => (
        <div key={idx} className="p-4 border rounded-lg bg-gray-50">
          {/* title fallback */}
          { (ex.title || ex.name) && <div className="text-sm font-semibold text-gray-800 mb-1">{ex.title || ex.name}</div> }

          {/* prompt: accept multiple possible keys (prompt, sentence, question, description, text) */}
          { (ex.prompt || ex.sentence || ex.question || ex.description || ex.text) && (
            <div className="text-sm text-gray-700 mb-2 whitespace-pre-wrap">{ex.prompt || ex.sentence || ex.question || ex.description || ex.text}</div>
          ) }

          {/* examples / samples */}
          { (ex.examples || ex.example || ex.samples) && Array.isArray(ex.examples || ex.example || ex.samples) && (
            <div className="text-sm text-gray-700 mb-2">
              <strong>Examples:</strong>
              <ul className="list-disc ml-5 mt-1">
                {(ex.examples || ex.example || ex.samples).map((it: any, i: number) => <li key={i} className="break-words">{typeof it === 'object' ? JSON.stringify(it) : String(it)}</li>)}
              </ul>
            </div>
          )}

          {/* hints / tips */}
          { (ex.hints || ex.tips) && (
            <div className="text-xs text-gray-600 mb-2">
              <strong>Hints:</strong>
              <div className="mt-1 whitespace-pre-wrap">{Array.isArray(ex.hints || ex.tips) ? (ex.hints || ex.tips).join('\n') : String(ex.hints || ex.tips)}</div>
            </div>
          )}

          {/* answer / solution mapping */}
          { (ex.answer || ex.solution || ex.solutions || ex.answers) && (
            <div className="text-sm text-green-700 font-medium">Answer: <span className="font-normal text-gray-800">
              {Array.isArray(ex.answer || ex.solution || ex.solutions || ex.answers) ? (ex.answer || ex.solution || ex.solutions || ex.answers).map((a: any, i: number) => <div key={i}>{String(a)}</div>) : String(ex.answer || ex.solution || ex.solutions || ex.answers)}
            </span></div>
          )}

          {/* fallback: if exercise is just a string */}
          { typeof ex === 'string' && <div className="text-sm text-gray-700 whitespace-pre-wrap">{ex}</div> }
        </div>
      ))}
    </div>
  )
}

function escapeHtml(str: any) {
  if (str === null || str === undefined) return ''
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
