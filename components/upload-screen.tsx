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
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Radar Pedagógico</h1>
                <p className="text-xs text-muted-foreground">Análise IA para Educadores</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleDemoMode} className="gap-2 bg-transparent">
              <Sparkles className="w-4 h-4" />
              Experimentar Demo
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-3xl mx-auto space-y-12">
          {/* Welcome Block */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-balance text-foreground">Olá, Professora! 👋</h2>
              <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto leading-relaxed">
                Faça upload de um exercício de matemática e descubra instantaneamente os padrões de erro da sua turma
                com inteligência artificial.
              </p>
            </div>
          </div>

          <Card className="p-8 shadow-sm border-border/50 animate-slide-up">
            <div
              className={`border-2 border-dashed rounded-xl p-16 text-center transition-all duration-300 cursor-pointer group ${
                isDragging
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border hover:border-primary/60 hover:bg-muted/30"
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
                  className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-all duration-300 ${
                    isDragging
                      ? "bg-primary/20 scale-110"
                      : "bg-primary/10 group-hover:bg-primary/15 group-hover:scale-105"
                  }`}
                >
                  {isDragging ? (
                    <ImageIcon className="w-10 h-10 text-primary" />
                  ) : (
                    <Upload className="w-10 h-10 text-primary" />
                  )}
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {isDragging ? "Solte a imagem aqui" : "Faça upload do exercício"}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-base text-muted-foreground">
                      Arraste e solte ou clique para selecionar uma imagem
                    </p>
                    <p className="text-sm text-muted-foreground/80">Suporta JPG, PNG, HEIC • Máximo 10MB</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
            <Card className="p-6 text-center space-y-4 border-border/50 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-bold text-lg">1</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Upload Simples</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Tire uma foto ou faça upload da imagem do exercício de matemática
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center space-y-4 border-border/50 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
                <span className="text-secondary font-bold text-lg">2</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Análise IA</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nossa IA identifica padrões de erro e dificuldades automaticamente
                </p>
              </div>
            </Card>

            <Card className="p-6 text-center space-y-4 border-border/50 hover:shadow-sm transition-shadow">
              <div className="w-12 h-12 mx-auto bg-chart-3/10 rounded-full flex items-center justify-center">
                <span className="text-chart-3 font-bold text-lg">3</span>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Insights Pedagógicos</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Receba relatórios detalhados e sugestões de exercícios personalizados
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
