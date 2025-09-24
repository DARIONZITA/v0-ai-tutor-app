"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Users, FileText, Sparkles } from "lucide-react"

export function ProcessingScreen() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-sm">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Radar Pedagógico</h1>
              <p className="text-xs text-muted-foreground">Análise IA para Educadores</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* Main Processing Animation */}
          <div className="text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="w-32 h-32 mx-auto bg-primary/5 rounded-full flex items-center justify-center animate-pulse-slow">
                <Brain className="w-16 h-16 text-primary" />
              </div>
              <div className="absolute inset-0 w-32 h-32 mx-auto">
                <svg className="w-32 h-32 animate-spin" viewBox="0 0 128 128">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className="text-border"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="text-primary animate-progress"
                    style={{
                      strokeDasharray: "377",
                      strokeDashoffset: "94",
                    }}
                  />
                </svg>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Analisando o exercício...</h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
                Nossa IA está identificando padrões de erro e preparando insights personalizados para sua turma
              </p>
            </div>
          </div>

          <Card className="p-8 shadow-sm border-border/50 animate-slide-up">
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Progresso da Análise</h3>
              </div>

              <div className="space-y-5">
                <ProcessingStep
                  icon={<FileText className="w-5 h-5" />}
                  title="Extraindo texto da imagem"
                  description="Reconhecimento óptico de caracteres (OCR)"
                  completed={true}
                />
                <ProcessingStep
                  icon={<Brain className="w-5 h-5" />}
                  title="Identificando erros matemáticos"
                  description="Análise semântica dos cálculos"
                  completed={true}
                />
                <ProcessingStep
                  icon={<Users className="w-5 h-5" />}
                  title="Agrupando padrões de dificuldade"
                  description="Classificação por tipos de erro"
                  completed={false}
                  active={true}
                />
                <ProcessingStep
                  icon={<BookOpen className="w-5 h-5" />}
                  title="Gerando exercícios personalizados"
                  description="Criação de conteúdo adaptativo"
                  completed={false}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-primary/5 border-primary/20 animate-slide-up">
            <div className="text-center space-y-3">
              <div className="w-12 h-12 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Sabia que?</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nossa IA consegue identificar mais de <strong>50 tipos diferentes</strong> de erros matemáticos e
                  sugere exercícios personalizados baseados nas dificuldades específicas de cada aluno.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

interface ProcessingStepProps {
  icon: React.ReactNode
  title: string
  description: string
  completed: boolean
  active?: boolean
}

function ProcessingStep({ icon, title, description, completed, active = false }: ProcessingStepProps) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
          completed
            ? "bg-secondary text-secondary-foreground shadow-sm"
            : active
              ? "bg-primary/10 text-primary animate-pulse border-2 border-primary/20"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {completed ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          icon
        )}
      </div>

      <div className="flex-1 space-y-1">
        <h4
          className={`font-medium transition-colors ${
            completed ? "text-foreground" : active ? "text-foreground" : "text-muted-foreground"
          }`}
        >
          {title}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
