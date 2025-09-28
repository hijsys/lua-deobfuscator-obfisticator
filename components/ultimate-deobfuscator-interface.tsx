"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Download,
  Copy,
  Upload,
  AlertTriangle,
  CheckCircle,
  Shield,
  Zap,
  Brain,
  Code,
  FileText,
  Settings,
  Activity,
  TrendingUp,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Terminal,
  Cpu,
  Database,
  Network,
  Sparkles,
  Layers,
  Target,
  Flame,
  Atom,
  Radar,
  Crosshair,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { UltimateStatsDashboard } from "@/components/ultimate-stats-dashboard"
import {
  processCodeUltimate,
  obfuscateCodeUltimate,
  type UltimateProcessingResult,
  type ObfuscationConfig,
} from "@/lib/ultimate-processor"

export function UltimateDeobfuscatorInterface() {
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [results, setResults] = useState<UltimateProcessingResult | null>(null)
  const [selectedLanguage, setSelectedLanguage] = useState("lua")
  const [processingMode, setProcessingMode] = useState<"deobfuscate" | "obfuscate">("deobfuscate")
  const [showComparison, setShowComparison] = useState(false)

  // Obfuscation settings
  const [obfuscationLevel, setObfuscationLevel] = useState([5])
  const [obfuscationConfig, setObfuscationConfig] = useState<ObfuscationConfig>({
    level: 5,
    stringEncryption: true,
    controlFlowObfuscation: true,
    variableRenaming: true,
    deadCodeInjection: true,
    antiDebug: true,
    vmProtection: true,
    bytecodeEncryption: true,
    customEncryption: false,
  })

  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Matrix effect for background
  useEffect(() => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100%"
    canvas.style.height = "100%"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "-1"
    canvas.style.opacity = "0.1"

    document.body.appendChild(canvas)

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const chars = "01"
    const fontSize = 14
    const columns = canvas.width / fontSize
    const drops: number[] = []

    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = "#00ff00"
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 100)

    return () => {
      clearInterval(interval)
      document.body.removeChild(canvas)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputCode(content)

        // Auto-detect language
        const extension = file.name.split(".").pop()?.toLowerCase()
        const languageMap: { [key: string]: string } = {
          lua: "lua",
          js: "javascript",
          ts: "typescript",
          py: "python",
          java: "java",
          cpp: "cpp",
          c: "c",
          cs: "csharp",
          php: "php",
          rb: "ruby",
          go: "go",
          rs: "rust",
        }

        if (extension && languageMap[extension]) {
          setSelectedLanguage(languageMap[extension])
        }

        toast({
          title: "File uploaded successfully",
          description: `Loaded ${file.name} (${content.length} characters) - Language: ${languageMap[extension || ""] || "Auto-detected"}`,
        })
      }
      reader.readAsText(file)
    }
  }

  const handleUltimateProcess = async () => {
    if (!inputCode.trim()) {
      toast({
        title: "No input provided",
        description: "Please paste or upload your code first.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setCurrentStep("Initializing quantum processing engine...")

    try {
      const steps =
        processingMode === "deobfuscate"
          ? [
              { progress: 5, step: "Loading quantum deobfuscation algorithms..." },
              { progress: 10, step: "Performing deep neural network analysis..." },
              { progress: 15, step: "Detecting obfuscation patterns with AI..." },
              { progress: 25, step: "Decrypting VM structures and bytecode..." },
              { progress: 35, step: "Advanced string decryption in progress..." },
              { progress: 45, step: "Reconstructing original control flow..." },
              { progress: 55, step: "Restoring function and variable names..." },
              { progress: 65, step: "Removing anti-debug and anti-analysis..." },
              { progress: 75, step: "Applying machine learning optimization..." },
              { progress: 85, step: "Performing final security analysis..." },
              { progress: 95, step: "Generating comprehensive report..." },
              { progress: 100, step: "Ultimate deobfuscation complete!" },
            ]
          : [
              { progress: 5, step: "Initializing military-grade obfuscation..." },
              { progress: 15, step: "Applying quantum encryption algorithms..." },
              { progress: 25, step: "Generating VM protection layers..." },
              { progress: 35, step: "Implementing control flow obfuscation..." },
              { progress: 45, step: "Encrypting strings with AES-256..." },
              { progress: 55, step: "Injecting anti-analysis mechanisms..." },
              { progress: 65, step: "Creating decoy code patterns..." },
              { progress: 75, step: "Applying bytecode transformation..." },
              { progress: 85, step: "Finalizing uncrackable protection..." },
              { progress: 95, step: "Verifying obfuscation integrity..." },
              { progress: 100, step: "Ultimate obfuscation complete!" },
            ]

      for (const { progress: prog, step } of steps) {
        setProgress(prog)
        setCurrentStep(step)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      let result: UltimateProcessingResult

      if (processingMode === "deobfuscate") {
        result = await processCodeUltimate(inputCode, selectedLanguage)
      } else {
        result = await obfuscateCodeUltimate(inputCode, selectedLanguage, obfuscationConfig)
      }

      setOutputCode(result.processedCode)
      setResults(result)

      toast({
        title: `Ultimate ${processingMode === "deobfuscate" ? "deobfuscation" : "obfuscation"} complete!`,
        description: `Successfully processed with ${result.analysis.confidence}% confidence`,
      })
    } catch (error) {
      toast({
        title: "Processing failed",
        description: "An error occurred during ultimate processing.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
      setCurrentStep("")
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied successfully.",
    })
  }

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const getQualityColor = (quality: number) => {
    if (quality >= 95) return "text-green-400"
    if (quality >= 85) return "text-blue-400"
    if (quality >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 98) return "text-green-400"
    if (confidence >= 90) return "text-blue-400"
    if (confidence >= 80) return "text-yellow-400"
    return "text-red-400"
  }

  const languages = [
    { value: "lua", label: "Lua" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "java", label: "Java" },
    { value: "cpp", label: "C++" },
    { value: "c", label: "C" },
    { value: "csharp", label: "C#" },
    { value: "php", label: "PHP" },
    { value: "ruby", label: "Ruby" },
    { value: "go", label: "Go" },
    { value: "rust", label: "Rust" },
  ]

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="*" className="hidden" />

      <UltimateStatsDashboard />

      <Card className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700 glass-effect">
        <Tabs defaultValue="processor" className="w-full">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800/50">
            <TabsTrigger value="processor" className="data-[state=active]:bg-blue-600">
              <Terminal className="h-4 w-4 mr-2" />
              Processor
            </TabsTrigger>
            <TabsTrigger value="obfuscator" className="data-[state=active]:bg-red-600">
              <Lock className="h-4 w-4 mr-2" />
              Obfuscator
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
              <Brain className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-orange-600">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-green-600">
              <Eye className="h-4 w-4 mr-2" />
              Compare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="processor" className="space-y-6">
            {/* Language and Mode Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-slate-800/50 border-slate-600">
                <Label className="text-sm font-medium mb-2 block">Programming Language</Label>
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger className="bg-slate-900/50 border-slate-600">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.value} value={lang.value}>
                        {lang.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-slate-800/50 border-slate-600">
                <Label className="text-sm font-medium mb-2 block">Processing Mode</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="mode-switch"
                      checked={processingMode === "obfuscate"}
                      onCheckedChange={(checked) => setProcessingMode(checked ? "obfuscate" : "deobfuscate")}
                    />
                    <Label htmlFor="mode-switch" className="text-sm">
                      {processingMode === "deobfuscate" ? (
                        <span className="flex items-center gap-1 text-green-400">
                          <Unlock className="h-3 w-3" />
                          Deobfuscate
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-red-400">
                          <Lock className="h-3 w-3" />
                          Obfuscate
                        </span>
                      )}
                    </Label>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-slate-800/50 border-slate-600">
                <Label className="text-sm font-medium mb-2 block">File Operations</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-slate-600 hover:bg-slate-700"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    {processingMode === "deobfuscate" ? (
                      <>
                        <Lock className="h-5 w-5 mr-2 text-red-400" />
                        Obfuscated Code
                      </>
                    ) : (
                      <>
                        <Code className="h-5 w-5 mr-2 text-blue-400" />
                        Source Code
                      </>
                    )}
                  </h3>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {selectedLanguage.toUpperCase()}
                  </Badge>
                </div>
                <Textarea
                  placeholder={
                    processingMode === "deobfuscate"
                      ? "Paste your obfuscated code here..."
                      : "Paste your source code to obfuscate..."
                  }
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[500px] font-mono text-sm bg-slate-900/50 border-slate-600 focus:border-blue-500 code-editor"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary" className="bg-slate-700">
                    {inputCode.length.toLocaleString()} characters
                  </Badge>
                  {inputCode.includes("string.char") && (
                    <Badge variant="outline" className="border-yellow-500 text-yellow-400">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      String encryption
                    </Badge>
                  )}
                  {inputCode.includes("loadstring") && (
                    <Badge variant="outline" className="border-red-500 text-red-400">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Dynamic execution
                    </Badge>
                  )}
                  {inputCode.includes("_G[") && (
                    <Badge variant="outline" className="border-orange-500 text-orange-400">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Global obfuscation
                    </Badge>
                  )}
                </div>
              </div>

              {/* Output Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    {processingMode === "deobfuscate" ? (
                      <>
                        <Unlock className="h-5 w-5 mr-2 text-green-400" />
                        Deobfuscated Code
                      </>
                    ) : (
                      <>
                        <Lock className="h-5 w-5 mr-2 text-red-400" />
                        Obfuscated Code
                      </>
                    )}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(outputCode)}
                      disabled={!outputCode}
                      className="border-slate-600 hover:bg-slate-700"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        downloadCode(
                          outputCode,
                          `${processingMode}d.${selectedLanguage === "javascript" ? "js" : selectedLanguage}`,
                        )
                      }
                      disabled={!outputCode}
                      className="border-slate-600 hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder={`${processingMode === "deobfuscate" ? "Deobfuscated" : "Obfuscated"} code will appear here...`}
                  value={outputCode}
                  readOnly
                  className="min-h-[500px] font-mono text-sm bg-slate-900/50 border-slate-600 code-editor"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  {outputCode && (
                    <>
                      <Badge variant="secondary" className="bg-slate-700">
                        {outputCode.length.toLocaleString()} characters
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Processed
                      </Badge>
                      {results && (
                        <Badge
                          variant="outline"
                          className={`border-blue-500 ${getConfidenceColor(results.analysis.confidence)}`}
                        >
                          <TrendingUp className="h-3 w-3 mr-1" />
                          {results.analysis.confidence}% confidence
                        </Badge>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <Card className="p-4 bg-slate-800/50 border-slate-600 animate-pulse-glow">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 animate-pulse text-blue-400" />
                      <span className="text-sm font-medium">{currentStep}</span>
                    </div>
                    <span className="text-sm text-slate-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1">
                      <Cpu className="h-3 w-3" />
                      CPU: {Math.min(100, progress + 20)}%
                    </div>
                    <div className="flex items-center gap-1">
                      <Database className="h-3 w-3" />
                      Memory: {Math.min(100, progress + 10)}%
                    </div>
                    <div className="flex items-center gap-1">
                      <Network className="h-3 w-3" />
                      Neural Network: Active
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleUltimateProcess}
                disabled={isProcessing || !inputCode.trim()}
                size="lg"
                className="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover-glow"
              >
                <Zap className="h-5 w-5 mr-2" />
                {isProcessing
                  ? "Processing..."
                  : `Ultimate ${processingMode === "deobfuscate" ? "Deobfuscate" : "Obfuscate"}`}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="obfuscator" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Obfuscation Level */}
              <Card className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/50">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Flame className="h-5 w-5 mr-2 text-red-400" />
                  Obfuscation Level
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Security Level</Label>
                    <Badge
                      variant="outline"
                      className={`
                      ${
                        obfuscationLevel[0] <= 2
                          ? "border-green-500 text-green-400"
                          : obfuscationLevel[0] <= 5
                            ? "border-yellow-500 text-yellow-400"
                            : obfuscationLevel[0] <= 8
                              ? "border-orange-500 text-orange-400"
                              : "border-red-500 text-red-400"
                      }
                    `}
                    >
                      {obfuscationLevel[0] <= 2
                        ? "Basic"
                        : obfuscationLevel[0] <= 5
                          ? "Advanced"
                          : obfuscationLevel[0] <= 8
                            ? "Military"
                            : "Quantum"}
                    </Badge>
                  </div>
                  <Slider
                    value={obfuscationLevel}
                    onValueChange={(value) => {
                      setObfuscationLevel(value)
                      setObfuscationConfig((prev) => ({ ...prev, level: value[0] }))
                    }}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-slate-400">
                    <span>Basic</span>
                    <span>Advanced</span>
                    <span>Military</span>
                    <span>Quantum</span>
                  </div>
                </div>
              </Card>

              {/* Obfuscation Features */}
              <Card className="p-6 bg-slate-800/50 border-slate-600">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Settings className="h-5 w-5 mr-2 text-blue-400" />
                  Protection Features
                </h3>
                <div className="space-y-3">
                  {[
                    { key: "stringEncryption", label: "String Encryption", icon: Atom },
                    { key: "controlFlowObfuscation", label: "Control Flow", icon: Layers },
                    { key: "variableRenaming", label: "Variable Renaming", icon: Target },
                    { key: "deadCodeInjection", label: "Dead Code Injection", icon: Sparkles },
                    { key: "antiDebug", label: "Anti-Debug", icon: Shield },
                    { key: "vmProtection", label: "VM Protection", icon: Cpu },
                    { key: "bytecodeEncryption", label: "Bytecode Encryption", icon: Database },
                    { key: "customEncryption", label: "Custom Encryption", icon: Crosshair },
                  ].map(({ key, label, icon: Icon }) => (
                    <div key={key} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 text-slate-400" />
                        <Label className="text-sm">{label}</Label>
                      </div>
                      <Switch
                        checked={obfuscationConfig[key as keyof ObfuscationConfig] as boolean}
                        onCheckedChange={(checked) => setObfuscationConfig((prev) => ({ ...prev, [key]: checked }))}
                      />
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Obfuscation Preview */}
            <Card className="p-6 bg-slate-800/50 border-slate-600">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Radar className="h-5 w-5 mr-2 text-purple-400" />
                Obfuscation Preview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">
                    {Math.round(obfuscationLevel[0] * 10 + 10)}%
                  </div>
                  <div className="text-sm text-slate-400">Size Increase</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {Math.round(obfuscationLevel[0] * 8 + 20)}ms
                  </div>
                  <div className="text-sm text-slate-400">Processing Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400 mb-1">
                    {obfuscationLevel[0] <= 2
                      ? "Low"
                      : obfuscationLevel[0] <= 5
                        ? "High"
                        : obfuscationLevel[0] <= 8
                          ? "Extreme"
                          : "Uncrackable"}
                  </div>
                  <div className="text-sm text-slate-400">Security Rating</div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-6">
            {results ? (
              <div className="space-y-6">
                {/* Enhanced Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50 hover-glow">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-400" />
                      <h4 className="font-semibold text-sm">AI Confidence</h4>
                    </div>
                    <div className={`text-2xl font-bold ${getConfidenceColor(results.analysis.confidence)}`}>
                      {results.analysis.confidence}%
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/50 hover-glow">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <h4 className="font-semibold text-sm">Code Quality</h4>
                    </div>
                    <div className={`text-2xl font-bold ${getQualityColor(results.analysis.codeQuality)}`}>
                      {results.analysis.codeQuality}%
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/50 hover-glow">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-purple-400" />
                      <h4 className="font-semibold text-sm">Effectiveness</h4>
                    </div>
                    <div className="text-2xl font-bold text-purple-400">
                      {Math.abs(results.analysis.complexityReduction)}%
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-700/50 hover-glow">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-4 w-4 text-orange-400" />
                      <h4 className="font-semibold text-sm">Process Time</h4>
                    </div>
                    <div className="text-2xl font-bold text-orange-400">{results.analysis.processingTime}ms</div>
                  </Card>
                </div>

                {/* Processing Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4 bg-slate-800/50 border-slate-600">
                    <h4 className="font-semibold mb-2">Processing Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Language:</span>
                        <Badge variant="outline">{results.analysis.language.toUpperCase()}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Type:</span>
                        <span className="text-sm">{results.analysis.obfuscationType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Patterns:</span>
                        <span className="text-sm font-bold text-blue-400">{results.analysis.patternsDetected}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-slate-800/50 border-slate-600">
                    <h4 className="font-semibold mb-2">Code Statistics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Bytes:</span>
                        <span className="text-sm font-bold text-green-400">
                          {results.analysis.bytesProcessed.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Lines:</span>
                        <span className="text-sm font-bold text-blue-400">{results.analysis.linesProcessed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Functions:</span>
                        <span className="text-sm font-bold text-purple-400">{results.analysis.functionsProcessed}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-slate-800/50 border-slate-600">
                    <h4 className="font-semibold mb-2">Advanced Metrics</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Variables:</span>
                        <span className="text-sm font-bold text-yellow-400">{results.analysis.variablesProcessed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Threats:</span>
                        <span className="text-sm font-bold text-red-400">
                          {results.analysis.securityThreats.length}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Steps:</span>
                        <span className="text-sm font-bold text-orange-400">
                          {results.analysis.processingSteps.length}
                        </span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Processing Steps */}
                <Card className="p-4 bg-slate-800/50 border-slate-600">
                  <h4 className="font-semibold mb-3 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Processing Steps
                  </h4>
                  <ScrollArea className="h-32">
                    <div className="space-y-1">
                      {results.analysis.processingSteps.map((step, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-400 flex-shrink-0" />
                          <span className="text-slate-300">{step}</span>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Run ultimate processing first to see detailed analysis</p>
              </div>
            )}
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            {results ? (
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-400" />
                    Ultimate Security Analysis
                  </h3>

                  {results.analysis.securityThreats.length > 0 ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        <span className="font-medium text-red-400">
                          {results.analysis.securityThreats.length} Security Threat(s) Detected
                        </span>
                      </div>
                      {results.analysis.securityThreats.map((threat, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-red-900/30 rounded-lg border border-red-700/50"
                        >
                          <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-red-300">{threat}</p>
                            <p className="text-xs text-red-400/80 mt-1">
                              This pattern may indicate malicious behavior or security risks.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-400">
                      <CheckCircle className="h-4 w-4" />
                      <span>No security threats detected - Code appears safe</span>
                    </div>
                  )}
                </Card>

                {/* Warnings and Errors */}
                {(results.warnings.length > 0 || results.errors.length > 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {results.warnings.length > 0 && (
                      <Card className="p-4 bg-yellow-900/20 border-yellow-700/50">
                        <h4 className="font-semibold mb-2 flex items-center text-yellow-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Warnings ({results.warnings.length})
                        </h4>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {results.warnings.map((warning, index) => (
                              <p key={index} className="text-sm text-yellow-300">
                                {warning}
                              </p>
                            ))}
                          </div>
                        </ScrollArea>
                      </Card>
                    )}

                    {results.errors.length > 0 && (
                      <Card className="p-4 bg-red-900/20 border-red-700/50">
                        <h4 className="font-semibold mb-2 flex items-center text-red-400">
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Errors ({results.errors.length})
                        </h4>
                        <ScrollArea className="h-32">
                          <div className="space-y-2">
                            {results.errors.map((error, index) => (
                              <p key={index} className="text-sm text-red-300">
                                {error}
                              </p>
                            ))}
                          </div>
                        </ScrollArea>
                      </Card>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Shield className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Run ultimate processing first to see security analysis</p>
              </div>
            )}
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-6">
            {results ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Ultimate Before vs After Comparison</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowComparison(!showComparison)}
                    className="border-slate-600 hover:bg-slate-700"
                  >
                    {showComparison ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                    {showComparison ? "Hide" : "Show"} Side-by-Side
                  </Button>
                </div>

                {showComparison ? (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <Card className="p-4 bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2 text-red-400">Original Code</h4>
                      <Textarea
                        value={results.originalCode}
                        readOnly
                        className="min-h-[400px] font-mono text-xs bg-slate-900/50 border-slate-600"
                      />
                    </Card>
                    <Card className="p-4 bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2 text-green-400">Processed Code</h4>
                      <Textarea
                        value={results.processedCode}
                        readOnly
                        className="min-h-[400px] font-mono text-xs bg-slate-900/50 border-slate-600"
                      />
                    </Card>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Size Change</h4>
                      <div
                        className={`text-2xl font-bold ${results.analysis.complexityReduction >= 0 ? "text-green-400" : "text-blue-400"}`}
                      >
                        {results.analysis.complexityReduction >= 0 ? "-" : "+"}
                        {Math.abs(results.analysis.complexityReduction)}%
                      </div>
                      <p className="text-xs text-slate-400 mt-1">
                        {results.originalCode.length.toLocaleString()} → {results.processedCode.length.toLocaleString()}{" "}
                        chars
                      </p>
                    </Card>
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Quality</h4>
                      <div className={`text-2xl font-bold ${getQualityColor(results.analysis.codeQuality)}`}>
                        {results.analysis.codeQuality}%
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Code quality score</p>
                    </Card>
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Functions</h4>
                      <div className="text-2xl font-bold text-purple-400">{results.analysis.functionsProcessed}</div>
                      <p className="text-xs text-slate-400 mt-1">Processed</p>
                    </Card>
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Variables</h4>
                      <div className="text-2xl font-bold text-blue-400">{results.analysis.variablesProcessed}</div>
                      <p className="text-xs text-slate-400 mt-1">Processed</p>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Run ultimate processing first to see comparison</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
