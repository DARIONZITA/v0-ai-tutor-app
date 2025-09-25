"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon, User, BookOpen, Sparkles } from "lucide-react"

interface Student {
  id: string
  name: string
  class: string
}

interface UploadAreaProps {
  students: Student[]
  onTestUpload: (studentId: string, subject: string, file: File) => void
  allowDemo?: boolean
}

export function UploadArea({ students, onTestUpload, allowDemo = false }: UploadAreaProps) {
  const [selectedStudent, setSelectedStudent] = useState<string>("")
  const [selectedSubject, setSelectedSubject] = useState<string>("")
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const subjects = [
    "English",
    "Mathematics",
    "General Knowledge",
    "Portuguese",
    "Sciences",
    "History",
    "Geography"
  ]

  const ocrLanguages = [
    // OCR language selection removed — defaulting to English
  ]

  const handleFileSelect = (file: File) => {
    if (!selectedStudent || !selectedSubject) {
      alert("Please select a student and subject first.")
      return
    }
    if (file && file.type.startsWith("image/")) {
      onTestUpload(selectedStudent, selectedSubject, file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file) handleFileSelect(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleClick = () => {
    if (!selectedStudent || !selectedSubject) {
      alert("Please select a student and subject first.")
      return
    }
    fileInputRef.current?.click()
  }

  const handleDemoUpload = async () => {
    if (!allowDemo) return
    if (!selectedStudent || !selectedSubject) {
      alert("Please select a student and subject first.")
      return
    }
    try {
      // Carrega a imagem demo como blob para simular upload real
      const resp = await fetch('/math-exercise-with-fractions.jpg')
      const blob = await resp.blob()
      const demoFile = new File([blob], 'demo.jpg', { type: blob.type || 'image/jpeg' })
  onTestUpload(selectedStudent, selectedSubject, demoFile)
    } catch (e) {
      console.error('Demo image fetch failed', e)
    }
  }

  // New: modal and example selection
  const [examplesOpen, setExamplesOpen] = useState(false)
  const [exampleImages, setExampleImages] = useState<string[]>([])
  const [examplesLoading, setExamplesLoading] = useState(false)
  const [examplesError, setExamplesError] = useState<string | null>(null)

  const openExamplesModal = async () => {
    if (!allowDemo) return
    if (!selectedStudent || !selectedSubject) {
      alert("Please select a student and subject first.")
      return
    }
    setExamplesOpen(true)
    await loadExampleImages(selectedSubject)
  }

  async function loadExampleImages(subject: string) {
    setExamplesLoading(true)
    setExamplesError(null)
    setExampleImages([])
    try {
      // Expect an index file at /examples/{subject}/index.json listing filenames
      const idxUrl = `/examples/${encodeURIComponent(subject)}/index.json`
      const r = await fetch(idxUrl)
      if (r.ok) {
        const list = await r.json()
        if (Array.isArray(list) && list.length > 0) {
          const urls = list.map((f: string) => `/examples/${encodeURIComponent(subject)}/${f}`)
          setExampleImages(urls)
          setExamplesLoading(false)
          return
        }
      }
      // No index.json or empty list — do NOT use a fallback image. Simply leave
      // exampleImages empty so the UI shows "No examples available".
      setExamplesError('No example images found for this subject.')
    } catch (e) {
      console.error('Failed to load example images', e)
      setExamplesError('Failed to load example images')
    } finally {
      setExamplesLoading(false)
    }
  }

  const selectExample = async (url: string) => {
    try {
      setExamplesLoading(true)
      const resp = await fetch(url)
      if (!resp.ok) throw new Error('Failed to fetch image')
      const blob = await resp.blob()
      const filename = url.split('/').pop() || 'example.jpg'
      const file = new File([blob], filename, { type: blob.type || 'image/jpeg' })
      onTestUpload(selectedStudent, selectedSubject, file)
      setExamplesOpen(false)
    } catch (e) {
      console.error('Selecting example failed', e)
      alert('Failed to load the selected example')
    } finally {
      setExamplesLoading(false)
    }
  }

  const selectedStudentName = students.find(s => s.id === selectedStudent)?.name

  return (
    <div className="flex-1 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200/50 px-4 lg:px-8 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900">New Analysis</h1>
              <p className="text-gray-600 mt-1">
                Upload a student's test for pedagogical analysis
              </p>
            </div>
            
            {allowDemo && (
              <>
                <Button
                  variant="default"
                  onClick={openExamplesModal}
                  disabled={!selectedStudent || !selectedSubject}
                  className={
                    `relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm lg:text-base shadow-lg transition-transform duration-200 transform ` +
                    `bg-gradient-to-r from-primary to-secondary text-white ` +
                    `${!selectedStudent || !selectedSubject ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-105'}`
                  }
                  aria-label="Use example test image"
                >
                  {/* small pulsing accent to draw attention */}
                  <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/90 shadow-sm animate-pulse" aria-hidden />
                  <Sparkles className="w-5 h-5 text-white animate-bounce-slow" />
                  <span className="font-semibold">Use Example</span>
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Examples Modal */}
      {examplesOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setExamplesOpen(false)} />
          <div className="relative z-10 w-[90%] max-w-4xl bg-white rounded-lg shadow-lg p-4 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <div>
                <h3 className="text-lg font-semibold">Choose an example for {selectedSubject}</h3>
                <p className="text-sm text-gray-600">Select an example exam to process as a test upload</p>
              </div>
              <button className="text-gray-600" onClick={() => setExamplesOpen(false)}>Close</button>
            </div>

            <div>
              {examplesLoading && (
                <div className="text-center py-4 lg:py-8">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
                  <div>Loading examples...</div>
                </div>
              )}

              {examplesError && (
                <div className="text-red-600">{examplesError}</div>
              )}

              {!examplesLoading && !examplesError && (
                <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  {exampleImages.map((img) => (
                    <div key={img} className="border rounded overflow-hidden">
                      <button className="w-full h-full block" onClick={() => selectExample(img)}>
                        <img src={img} alt={img} className="w-full h-40 object-cover" />
                        <div className="p-2 text-xs text-center text-gray-700">Select</div>
                      </button>
                    </div>
                  ))}
                  {exampleImages.length === 0 && !examplesLoading && (
                    <div className="text-sm text-gray-600">No examples available for this subject.</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-4 lg:px-8 py-4 lg:py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          
          {/* Student and Subject Selection */}
          <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-4 lg:p-6">
            {/* Student Selection */}
            <Card className="p-4 lg:p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">1. Select Student</h3>
                  <p className="text-sm text-gray-600">Choose the student who took the test</p>
                </div>
              </div>

              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white"
              >
                <option value="">Select a student...</option>
                {students.map(student => (
                  <option key={student.id} value={student.id}>
                    {student.name} - {student.class}
                  </option>
                ))}
              </select>
            </Card>

            {/* Subject Selection */}
            <Card className="p-4 lg:p-6 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">2. Select Subject</h3>
                  <p className="text-sm text-gray-600">Which subject was evaluated?</p>
                </div>
              </div>

              <select 
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary/20 focus:border-secondary bg-white"
              >
                <option value="">Select a subject...</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </Card>
          </div>

          {/* Upload Area */}
          <Card className={`transition-all duration-300 ${
            selectedStudent && selectedSubject 
              ? 'shadow-lg border-primary/20' 
              : 'opacity-50 border-gray-200'
          }`}>
            <div
              className={`border-2 border-dashed rounded-2xl p-16 text-center transition-all duration-500 ${
                selectedStudent && selectedSubject 
                  ? 'cursor-pointer' 
                  : 'cursor-not-allowed'
              } ${
                isDragging
                  ? "border-primary/80 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 scale-[1.02] shadow-lg"
                  : "border-gray-300 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) handleFileSelect(file)
                }}
              />

              <div className="space-y-6">
                <div
                  className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 ${
                    isDragging
                      ? "bg-gradient-to-br from-primary/30 to-secondary/20 scale-110 animate-bounce-in"
                      : selectedStudent && selectedSubject
                        ? "bg-gradient-to-br from-primary/15 to-secondary/10 hover:scale-105 animate-float"
                        : "bg-gray-100"
                  }`}
                >
                  {isDragging ? (
                    <ImageIcon className="w-10 h-10 text-primary" />
                  ) : (
                    <Upload className={`w-10 h-10 ${
                      selectedStudent && selectedSubject ? 'text-primary' : 'text-gray-400'
                    }`} />
                  )}
                </div>

                <div className="space-y-3">
                  {selectedStudent && selectedSubject ? (
                    <>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-900">
                        {isDragging ? "Drop the image here!" : "2. Test Upload"}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-lg text-gray-600">
                          Test of <span className="font-semibold text-primary">{selectedStudentName}</span>
                        </p>
                        <p className="text-base text-gray-500">
                          Subject: <span className="font-medium">{selectedSubject}</span>
                        </p>
                        <p className="text-sm text-gray-400">
                          Drag and drop or click to select the test image
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl lg:text-2xl font-bold text-gray-500">
                        Select student and subject first
                      </h3>
                      <p className="text-gray-400">
                        Complete the selections above to upload
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  )
}
