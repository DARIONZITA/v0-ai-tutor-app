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
            <Button variant="outline" onClick={onReset} className="gap-2 bg-transparent">
              <RotateCcw className="w-4 h-4" />
              Nova Análise
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Success Header */}
          <div className="text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 mx-auto bg-secondary/10 rounded-full flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-secondary" />
            </div>
            <div className="space-y-3">
              <h2 className="text-4xl font-bold text-foreground text-balance">Análise Concluída! ✨</h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Identificámos padrões importantes na sua turma
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Primary Error Pattern */}
            <Card className="p-8 shadow-sm border-border/50 animate-slide-up">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-destructive/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-destructive" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-foreground">Erro Principal Identificado</h3>
                    <Badge variant="destructive" className="text-xs">
                      Alta Prioridade
                    </Badge>
                  </div>
                </div>

                <Card className="p-6 bg-muted/30 border-border/50">
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
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-primary" />
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
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-primary" />
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

              <Card className="p-6 bg-muted/30 border-border/50">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
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
            <Button size="lg" className="gap-3 h-14 px-8">
              <Download className="w-5 h-5" />
              Baixar Exercício (PDF)
            </Button>
            <Button variant="outline" size="lg" className="gap-3 h-14 px-8 bg-transparent">
              <Share className="w-5 h-5" />
              Enviar para Google Classroom
            </Button>
            <Button variant="outline" size="lg" onClick={onReset} className="gap-3 h-14 px-8 bg-transparent">
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
    <div className="flex items-center justify-between p-4 bg-background rounded-lg border border-border/50 hover:shadow-sm transition-shadow">
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
