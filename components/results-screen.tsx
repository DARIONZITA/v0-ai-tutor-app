"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Users, TrendingUp, FileText, RotateCcw, Sparkles, Download, Share } from "lucide-react"

interface ResultsScreenProps {
  onReset: () => void
}

export function ResultsScreen({ onReset }: ResultsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50">
      <header className="border-b border-border/50 glass-card sticky top-0 z-10">
        <div className="container mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg hover-lift">
                <BookOpen className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-foreground">Pedagogical Radar</h1>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Analysis complete ✨
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="gap-2 hover-lift border-secondary/20 hover:border-secondary/40 hover:bg-secondary/5">
                <Download className="w-4 h-4 text-secondary" />
                Download Report
              </Button>
              <Button variant="outline" onClick={onReset} className="gap-2 hover-lift border-primary/20 hover:border-primary/40 hover:bg-primary/5">
                <RotateCcw className="w-4 h-4 text-primary" />
                New Analysis
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto space-y-16">
          {/* Success Header - More Celebratory */}
          <div className="text-center space-y-8 animate-fade-in">
            <div className="relative">
              <div className="w-28 h-28 mx-auto bg-gradient-to-br from-secondary/20 via-secondary/10 to-primary/10 rounded-full flex items-center justify-center animate-bounce-in shadow-2xl">
                <Sparkles className="w-14 h-14 text-secondary animate-float" />
              </div>
              {/* Celebration dots around */}
              <div className="absolute -top-2 left-1/2 w-4 h-4 bg-primary/30 rounded-full animate-bounce-in" style={{ animationDelay: "0.2s" }}></div>
              <div className="absolute top-1/4 -right-4 w-3 h-3 bg-secondary/40 rounded-full animate-bounce-in" style={{ animationDelay: "0.4s" }}></div>
              <div className="absolute bottom-1/4 -left-4 w-3 h-3 bg-chart-3/40 rounded-full animate-bounce-in" style={{ animationDelay: "0.6s" }}></div>
            </div>
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 px-6 py-2 bg-secondary/10 rounded-full border border-secondary/20">
                <span className="text-lg">🎉</span>
                <span className="text-secondary font-medium">Pronto para ensinar melhor!</span>
              </div>
              <h2 className="text-5xl font-bold text-foreground text-balance leading-tight">
                Análise 
                <span className="text-transparent bg-gradient-to-r from-secondary to-primary bg-clip-text"> Concluída!</span>
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                Descobrimos <span className="font-bold text-foreground">padrões únicos de aprendizagem</span> na sua turma. 
                Agora você tem insights poderosos para personalizar o ensino e maximizar resultados.
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            {/* Primary Error Pattern */}
            <Card className="p-8 shadow-sm border-border/50 animate-slide-up">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 lg:w-6 lg:h-6 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Erro Principal Identificado</h3>
                    <Badge variant="destructive" className="text-xs">
                      Alta Prioridade
                    </Badge>
                  </div>
                </div>

                <Card className="p-4 lg:p-6 bg-muted/30 border-border/50">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground">Soma de Frações com Denominadores Diferentes</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      <strong>67% dos alunos</strong> demonstram dificuldade em encontrar denominadores comuns antes de
                      somar frações. Este é um conceito fundamental que precisa de reforço imediato.
                    </p>
                    <div className="flex gap-2 pt-2">
                      <Badge variant="outline" className="text-xs">
                        Conceito Base
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        8 de 12 alunos
                      </Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Affected Students */}
            <Card className="p-8 shadow-sm border-border/50 animate-slide-up">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Alunos Afetados</h3>
                    <Badge variant="secondary" className="text-xs">
                      8 de 12 alunos
                    </Badge>
                  </div>
                </div>

                <div className="space-y-3">
                  <StudentCard name="Maria Silva" initial="M" difficulty="Alta" color="destructive" />
                  <StudentCard name="João Santos" initial="J" difficulty="Média" color="secondary" />
                  <StudentCard name="Ana Costa" initial="A" difficulty="Alta" color="destructive" />

                  <Button variant="ghost" className="w-full text-sm mt-4 h-12">
                    Ver todos os 8 alunos →
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-8 shadow-sm border-border/50 animate-slide-up">
            <div className="space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Exercício Personalizado Gerado</h3>
                    <p className="text-sm text-muted-foreground">
                      Criado automaticamente para este grupo de dificuldade
                    </p>
                  </div>
                </div>
                <Button className="gap-2">
                  <FileText className="w-4 h-4" />
                  Ver Completo
                </Button>
              </div>

              <Card className="p-4 lg:p-6 bg-muted/30 border-border/50">
                <div className="space-y-4">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <h4 className="text-lg font-semibold text-foreground">
                      Micro-Exercício: Soma de Frações - Nível Básico
                    </h4>
                    <Badge variant="outline">8 Questões</Badge>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <strong>Objetivo:</strong> Praticar a soma de frações com denominadores diferentes
                  </div>

                  <Card className="p-4 bg-background border-border/50">
                    <div className="space-y-3">
                      <p className="font-medium text-foreground">Exercícios:</p>
                      <div className="space-y-2 text-foreground">
                        <p>1. Calcule: ½ + ¼ = ?</p>
                        <p>2. Calcule: ⅔ + ⅙ = ?</p>
                        <p className="text-muted-foreground text-sm">+ 6 questões similares</p>
                      </div>
                    </div>
                  </Card>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      Denominadores Simples
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Passo a Passo
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Resolução Guiada
                    </Badge>
                  </div>
                </div>
              </Card>
            </div>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Button size="lg" className="gap-3 h-14 px-4 lg:px-8">
              <Download className="w-5 h-5" />
              Baixar Exercício (PDF)
            </Button>
            <Button variant="outline" size="lg" className="gap-3 h-14 px-4 lg:px-8 bg-transparent">
              <Share className="w-5 h-5" />
              Enviar para Google Classroom
            </Button>
            <Button variant="outline" size="lg" onClick={onReset} className="gap-3 h-14 px-4 lg:px-8 bg-transparent">
              <RotateCcw className="w-5 h-5" />
              Analisar Novo Exercício
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface StudentCardProps {
  name: string
  initial: string
  difficulty: string
  color: "destructive" | "secondary"
}

function StudentCard({ name, initial, difficulty, color }: StudentCardProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-4 bg-background rounded-lg border border-border/50 hover:shadow-sm transition-shadow">
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            color === "destructive" ? "bg-destructive/10" : "bg-secondary/10"
          }`}
        >
          <span className={`text-sm font-semibold ${color === "destructive" ? "text-destructive" : "text-secondary"}`}>
            {initial}
          </span>
        </div>
        <span className="font-medium text-foreground">{name}</span>
      </div>
      <Badge variant={color === "destructive" ? "destructive" : "secondary"} className="text-xs">
        Dificuldade {difficulty}
      </Badge>
    </div>
  )
}
