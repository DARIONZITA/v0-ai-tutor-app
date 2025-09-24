"use client"

import { useState } from "react"
import { UploadScreen } from "@/components/upload-screen"
import { ProcessingScreen } from "@/components/processing-screen"
import { ResultsScreen } from "@/components/results-screen"

type Screen = "upload" | "processing" | "results"

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("upload")
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl)
    setCurrentScreen("processing")

    // Simulate processing time
    setTimeout(() => {
      setCurrentScreen("results")
    }, 3000)
  }

  const handleReset = () => {
    setCurrentScreen("upload")
    setUploadedImage(null)
  }

  return (
    <main className="min-h-screen bg-background">
      {currentScreen === "upload" && <UploadScreen onImageUpload={handleImageUpload} />}

      {currentScreen === "processing" && <ProcessingScreen />}

      {currentScreen === "results" && <ResultsScreen onReset={handleReset} />}
    </main>
  )
}
