"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
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
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deobfuscateLuaAdvanced, type AdvancedDeobfuscationResult } from "@/lib/advanced-deobfuscator"

export function AdvancedDeobfuscatorInterface() {
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState("")
  const [results, setResults] = useState<AdvancedDeobfuscationResult | null>(null)
  const [showComparison, setShowComparison] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setInputCode(content)
        toast({
          title: "File uploaded",
          description: `Loaded ${file.name} (${content.length} characters)`,
        })
      }
      reader.readAsText(file)
    }
  }

  const handleAdvancedDeobfuscate = async () => {
    if (!inputCode.trim()) {
      toast({
        title: "No input provided",
        description: "Please paste or upload your obfuscated Lua code first.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)
    setCurrentStep("Initializing advanced deobfuscation...")

    try {
      // Simulate real-time progress updates
      const steps = [
        { progress: 10, step: "Performing deep code analysis..." },
        { progress: 20, step: "Detecting VM structures and handlers..." },
        { progress: 30, step: "Decrypting bytecode sections..." },
        { progress: 45, step: "Advanced string decryption in progress..." },
        { progress: 60, step: "Reconstructing control flow..." },
        { progress: 75, step: "Restoring function structures..." },
        { progress: 85, step: "Recovering variable names..." },
        { progress: 95, step: "Removing anti-debug mechanisms..." },
        { progress: 100, step: "Finalizing and optimizing..." },
      ]

      for (const { progress: prog, step } of steps) {
        setProgress(prog)
        setCurrentStep(step)
        await new Promise((resolve) => setTimeout(resolve, 1200))
      }

      const result = await deobfuscateLuaAdvanced(inputCode)
      setOutputCode(result.deobfuscatedCode)
      setResults(result)

      toast({
        title: "Advanced deobfuscation complete!",
        description: `Successfully processed with ${result.analysis.confidence}% confidence`,
      })
    } catch (error) {
      toast({
        title: "Deobfuscation failed",
        description: "An error occurred during advanced processing.",
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
    if (quality >= 90) return "text-green-400"
    if (quality >= 70) return "text-yellow-400"
    return "text-red-400"
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 95) return "text-green-400"
    if (confidence >= 80) return "text-blue-400"
    if (confidence >= 60) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".lua,.txt" className="hidden" />

      <Card className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-700">
        <Tabs defaultValue="deobfuscate" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
            <TabsTrigger value="deobfuscate" className="data-[state=active]:bg-blue-600">
              <Terminal className="h-4 w-4 mr-2" />
              Deobfuscate
            </TabsTrigger>
            <TabsTrigger value="analysis" className="data-[state=active]:bg-purple-600">
              <Brain className="h-4 w-4 mr-2" />
              Analysis
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-600">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-green-600">
              <Eye className="h-4 w-4 mr-2" />
              Compare
            </TabsTrigger>
          </TabsList>

          <TabsContent value="deobfuscate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold flex items-center">
                    <Lock className="h-5 w-5 mr-2 text-red-400" />
                    Obfuscated Code
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-slate-600 hover:bg-slate-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Paste your Luraph-obfuscated Lua code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="min-h-[500px] font-mono text-sm bg-slate-900/50 border-slate-600 focus:border-blue-500"
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
                    <Unlock className="h-5 w-5 mr-2 text-green-400" />
                    Deobfuscated Code
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
                      onClick={() => downloadCode(outputCode, "deobfuscated.lua")}
                      disabled={!outputCode}
                      className="border-slate-600 hover:bg-slate-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Deobfuscated code will appear here..."
                  value={outputCode}
                  readOnly
                  className="min-h-[500px] font-mono text-sm bg-slate-900/50 border-slate-600"
                />
                <div className="flex items-center gap-2 flex-wrap">
                  {outputCode && (
                    <>
                      <Badge variant="secondary" className="bg-slate-700">
                        {outputCode.length.toLocaleString()} characters
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Deobfuscated
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
              <Card className="p-4 bg-slate-800/50 border-slate-600">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 animate-pulse text-blue-400" />
                      <span className="text-sm font-medium">{currentStep}</span>
                    </div>
                    <span className="text-sm text-slate-400">{progress}%</span>
                  </div>
                  <Progress value={progress} className="w-full h-2" />
                </div>
              </Card>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleAdvancedDeobfuscate}
                disabled={isProcessing || !inputCode.trim()}
                size="lg"
                className="px-12 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Zap className="h-5 w-5 mr-2" />
                {isProcessing ? "Processing..." : "Advanced Deobfuscate"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {results ? (
              <div className="space-y-6">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="p-4 bg-gradient-to-br from-blue-900/20 to-blue-800/20 border-blue-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="h-4 w-4 text-blue-400" />
                      <h4 className="font-semibold text-sm">Confidence</h4>
                    </div>
                    <div className={`text-2xl font-bold ${getConfidenceColor(results.analysis.confidence)}`}>
                      {results.analysis.confidence}%
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <h4 className="font-semibold text-sm">Quality</h4>
                    </div>
                    <div className={`text-2xl font-bold ${getQualityColor(results.analysis.codeQuality)}`}>
                      {results.analysis.codeQuality}%
                    </div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-purple-900/20 to-purple-800/20 border-purple-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Code className="h-4 w-4 text-purple-400" />
                      <h4 className="font-semibold text-sm">Reduction</h4>
                    </div>
                    <div className="text-2xl font-bold text-purple-400">{results.analysis.complexityReduction}%</div>
                  </Card>
                  <Card className="p-4 bg-gradient-to-br from-orange-900/20 to-orange-800/20 border-orange-700/50">
                    <div className="flex items-center gap-2 mb-2">
                      <Settings className="h-4 w-4 text-orange-400" />
                      <h4 className="font-semibold text-sm">Time</h4>
                    </div>
                    <div className="text-2xl font-bold text-orange-400">{results.analysis.processingTime}ms</div>
                  </Card>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="p-4 bg-slate-800/50 border-slate-600">
                    <h4 className="font-semibold mb-2">Obfuscation Details</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Type:</span>
                        <Badge variant="outline">{results.analysis.obfuscationType}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Version:</span>
                        <span className="text-sm">{results.analysis.luraphVersion}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Level:</span>
                        <Badge
                          variant={
                            results.analysis.obfuscationLevel === "extreme"
                              ? "destructive"
                              : results.analysis.obfuscationLevel === "heavy"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {results.analysis.obfuscationLevel}
                        </Badge>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-slate-800/50 border-slate-600">
                    <h4 className="font-semibold mb-2">Decryption Results</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Strings:</span>
                        <span className="text-sm font-bold text-green-400">{results.analysis.stringsDecrypted}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Variables:</span>
                        <span className="text-sm font-bold text-blue-400">{results.analysis.variablesRenamed}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Functions:</span>
                        <span className="text-sm font-bold text-purple-400">{results.analysis.functionsRestored}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-slate-800/50 border-slate-600">
                    <h4 className="font-semibold mb-2">Advanced Features</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">VM Handlers:</span>
                        <span className="text-sm font-bold text-red-400">{results.analysis.vmHandlersDetected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Patterns:</span>
                        <span className="text-sm font-bold text-yellow-400">{results.analysis.patternsDetected}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-slate-400">Advanced:</span>
                        <span className="text-sm font-bold text-orange-400">{results.analysis.advancedPatterns}</span>
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
                      {results.analysis.deobfuscationSteps.map((step, index) => (
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
                <p>Run advanced deobfuscation first to see detailed analysis</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            {results ? (
              <div className="space-y-6">
                <Card className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-400" />
                    Security Analysis
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
                      <span>No obvious security threats detected</span>
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
                <p>Run advanced deobfuscation first to see security analysis</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            {results ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Before vs After Comparison</h3>
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
                      <h4 className="font-semibold mb-2 text-red-400">Original (Obfuscated)</h4>
                      <Textarea
                        value={results.originalCode}
                        readOnly
                        className="min-h-[400px] font-mono text-xs bg-slate-900/50 border-slate-600"
                      />
                    </Card>
                    <Card className="p-4 bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2 text-green-400">Deobfuscated</h4>
                      <Textarea
                        value={results.deobfuscatedCode}
                        readOnly
                        className="min-h-[400px] font-mono text-xs bg-slate-900/50 border-slate-600"
                      />
                    </Card>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Size Reduction</h4>
                      <div className="text-2xl font-bold text-green-400">{results.analysis.complexityReduction}%</div>
                      <p className="text-xs text-slate-400 mt-1">
                        {results.originalCode.length.toLocaleString()} →{" "}
                        {results.deobfuscatedCode.length.toLocaleString()} chars
                      </p>
                    </Card>
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Readability</h4>
                      <div className={`text-2xl font-bold ${getQualityColor(results.analysis.codeQuality)}`}>
                        {results.analysis.codeQuality}%
                      </div>
                      <p className="text-xs text-slate-400 mt-1">Code quality score</p>
                    </Card>
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Functions</h4>
                      <div className="text-2xl font-bold text-purple-400">{results.analysis.functionsRestored}</div>
                      <p className="text-xs text-slate-400 mt-1">Restored</p>
                    </Card>
                    <Card className="p-4 text-center bg-slate-800/50 border-slate-600">
                      <h4 className="font-semibold mb-2">Variables</h4>
                      <div className="text-2xl font-bold text-blue-400">{results.analysis.variablesRenamed}</div>
                      <p className="text-xs text-slate-400 mt-1">Renamed</p>
                    </Card>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Run advanced deobfuscation first to see comparison</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
