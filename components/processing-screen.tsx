"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { BookOpen, Brain, Users, FileText, Sparkles } from "lucide-react"

export function ProcessingScreen() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <header className="border-b border-border/50 glass-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg hover-lift">
              <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
            </div>
            <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Pedagogical Radar</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                  Analyzing your exercise...
              </p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-3xl mx-auto space-y-16">
          {/* Main Processing Animation - More Human */}
          <div className="text-center space-y-10 animate-fade-in">
            <div className="relative">
              {/* Main Brain Icon with Enhanced Animation */}
              <div className="w-40 h-40 mx-auto bg-gradient-to-br from-primary/20 via-primary/10 to-secondary/10 rounded-full flex items-center justify-center animate-pulse-slow shadow-2xl">
                <Brain className="w-20 h-20 text-primary animate-float" />
              </div>
              
              {/* Animated Progress Ring */}
              <div className="absolute inset-0 w-40 h-40 mx-auto">
                <svg className="w-40 h-40 -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-border/30"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    className="text-primary animate-progress"
                    style={{
                      strokeDasharray: "440",
                      strokeDashoffset: "110",
                      animation: "progress 3s ease-in-out infinite"
                    }}
                  />
                </svg>
              </div>

              {/* Floating Elements Around */}
              <div className="absolute -top-4 -left-4 w-6 h-6 lg:w-8 lg:h-8 bg-secondary/20 rounded-lg animate-bounce-in"></div>
              <div className="absolute -bottom-4 -right-4 w-5 h-5 lg:w-6 lg:h-6 bg-primary/20 rounded-full animate-bounce-in" style={{ animationDelay: "0.5s" }}></div>
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-chart-3/20 rounded-full animate-bounce-in" style={{ animationDelay: "1s" }}></div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-primary/10 rounded-full border border-primary/20">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                <span className="text-primary font-medium">IA Trabalhando...</span>
              </div>
              <h2 className="text-4xl font-bold text-foreground">
             ✨ Analyzing your exercise
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
             Our specialized artificial intelligence is 
             <span className="font-semibold text-foreground"> examining every detail </span>
             of the exercise to identify unique learning patterns of your class
              </p>
            </div>
          </div>

          <Card className="p-10 shadow-xl border-border/30 hover-lift animate-slide-up glass-card">
            <div className="space-y-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                  <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">Progresso da Análise</h3>
                  <p className="text-sm text-muted-foreground">Acompanhe cada etapa do processo</p>
                </div>
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

          <Card className="p-8 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/5 border-primary/20 animate-slide-up hover-lift">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 lg:w-16 lg:h-16 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl flex items-center justify-center animate-bounce-in">
                <span className="text-2xl lg:text-3xl">🎯</span>
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground mb-3">Você sabia?</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Nossa IA especializada consegue identificar mais de <span className="font-bold text-primary">50 tipos diferentes</span> de erros matemáticos e 
                  sugere <span className="font-bold text-secondary">exercícios personalizados</span> baseados nas dificuldades específicas de cada aluno.
                </p>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Precisão de 94%</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <span>Análise em 3s</span>
                  </div>
                </div>
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
