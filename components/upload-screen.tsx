"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, ImageIcon, BookOpen, Sparkles } from "lucide-react"

interface UploadScreenProps {
  onImageUpload: (imageUrl: string) => void
}

export function UploadScreen({ onImageUpload }: UploadScreenProps) {
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file)
      onImageUpload(imageUrl)
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
    fileInputRef.current?.click()
  }

  const handleDemoMode = () => {
    onImageUpload("/math-exercise-with-fractions.jpg")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b border-border/50 glass-card sticky top-0 z-10">
        <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 lg:gap-4">
              <div className="w-10 h-10 lg:w-11 lg:h-11 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg hover-lift">
                <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-xl lg:text-2xl font-bold text-foreground">Pedagogical Radar</h1>
                <p className="text-xs lg:text-sm text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  AI for Educators
                </p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={handleDemoMode} 
              className="gap-2 hover-lift border-primary/20 hover:border-primary/40 hover:bg-primary/5 text-sm lg:text-base"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Try Demo
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 lg:px-6 py-4 lg:py-8 lg:py-16">
        <div className="max-w-4xl mx-auto space-y-8 lg:space-y-16">
          {/* Welcome Block - More human and warm */}
          <div className="text-center space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 animate-bounce-in">
                <span className="text-xl lg:text-2xl">👩‍🏫</span>
                <span className="text-sm font-medium text-primary">Welcome, Teacher!</span>
              </div>
              <h2 className="text-2xl lg:text-3xl lg:text-5xl font-bold text-balance text-foreground leading-tight">
                Discover your class's <span className="text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"> learning patterns</span>
              </h2>
              <p className="text-lg lg:text-xl text-muted-foreground text-pretty max-w-3xl mx-auto leading-relaxed">
                Upload a student's test and our AI will instantly identify their specific difficulties, 
                <span className="font-medium text-foreground"> generating personalized pedagogical insights</span> to improve learning.
              </p>
            </div>
          </div>

          <Card className="p-0 shadow-xl border-border/30 hover-lift animate-slide-up overflow-hidden">
            <div
              className={`border-2 border-dashed rounded-2xl p-8 lg:p-20 text-center transition-all duration-500 cursor-pointer group relative overflow-hidden ${
                isDragging
                  ? "border-primary/80 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 scale-[1.02] shadow-lg"
                  : "border-border/40 hover:border-primary/50 hover:bg-gradient-to-br hover:from-primary/5 hover:to-secondary/5"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={handleClick}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-4 left-4 w-12 h-12 lg:w-16 lg:h-16 border border-primary/20 rounded-lg rotate-12"></div>
                <div className="absolute bottom-4 right-4 w-10 h-10 lg:w-12 lg:h-12 border border-secondary/20 rounded-lg -rotate-12"></div>
                <div className="absolute top-1/2 left-8 w-6 h-6 lg:w-8 lg:h-8 border border-primary/20 rounded-full"></div>
              </div>
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

              <div className="space-y-8 relative z-10">
                <div
                  className={`w-24 h-24 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 relative ${
                    isDragging
                      ? "bg-gradient-to-br from-primary/30 to-secondary/20 scale-110 shadow-lg animate-bounce-in"
                      : "bg-gradient-to-br from-primary/15 to-secondary/10 group-hover:scale-105 group-hover:shadow-md animate-float"
                  }`}
                >
                  {isDragging ? (
                    <ImageIcon className="w-10 h-10 lg:w-12 lg:h-12 text-primary animate-bounce-in" />
                  ) : (
                    <Upload className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                  )}
                  <div className="absolute -top-2 -right-2 w-5 h-5 lg:w-6 lg:h-6 bg-secondary rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-xs font-bold text-white">+</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold text-foreground">
                    {isDragging ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="animate-bounce">📸</span>
                        Drop your image here
                      </span>
                    ) : (
                      "Add student's test image"
                    )}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-lg text-muted-foreground">
                      {isDragging 
                        ? "Perfect! Ready to analyze." 
                        : "Drag and drop or click to select a student's test photo"
                      }
                    </p>
                    <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground/70">
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        JPG, PNG, HEIC
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        Up to 10MB
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Instant analysis
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8 animate-slide-up">
            <Card className="group p-8 text-center space-y-6 border-border/30 hover-lift hover:border-primary/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-primary/60"></div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">1</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-foreground">📸 Upload Intuitivo</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Simplesmente tire uma foto do exercício com o celular ou faça upload de uma imagem. 
                  <span className="font-medium text-foreground"> Sem complicações!</span>
                </p>
              </div>
            </Card>

            <Card className="group p-8 text-center space-y-6 border-border/30 hover-lift hover:border-secondary/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-secondary/60"></div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br from-secondary/20 to-secondary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-secondary rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">2</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-foreground">🧠 IA Especializada</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa inteligência artificial foi treinada especificamente em matemática educacional. 
                  <span className="font-medium text-foreground"> Precisão em segundos!</span>
                </p>
              </div>
            </Card>

            <Card className="group p-8 text-center space-y-6 border-border/30 hover-lift hover:border-chart-3/20 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-chart-3 to-chart-3/60"></div>
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br from-chart-3/20 to-chart-3/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <div className="w-6 h-6 lg:w-8 lg:h-8 bg-chart-3 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">3</span>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-xl font-bold text-foreground">✨ Insights Personalizados</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Receba relatórios detalhados sobre cada aluno e sugestões pedagógicas específicas. 
                  <span className="font-medium text-foreground"> Ensino direcionado!</span>
                </p>
              </div>
            </Card>
          </div>

          {/* Trust indicators */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="flex items-center justify-center gap-4 lg:gap-8 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span>Análise em tempo real</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span>100% seguro e privado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <span>Dados educacionais protegidos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
