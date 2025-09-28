"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Play, Download, Copy, Upload, AlertTriangle, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { deobfuscateLua } from "@/lib/deobfuscator"

export function DeobfuscatorInterface() {
  const [inputCode, setInputCode] = useState("")
  const [outputCode, setOutputCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const { toast } = useToast()

  const handleDeobfuscate = async () => {
    if (!inputCode.trim()) {
      toast({
        title: "No input provided",
        description: "Please paste your obfuscated Lua code first.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)
    setProgress(0)

    try {
      // Simulate progress updates
      const progressSteps = [
        { step: 20, message: "Analyzing obfuscation patterns..." },
        { step: 40, message: "Decrypting strings..." },
        { step: 60, message: "Simplifying control flow..." },
        { step: 80, message: "Renaming variables..." },
        { step: 100, message: "Finalizing deobfuscation..." },
      ]

      for (const { step, message } of progressSteps) {
        setProgress(step)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      const result = await deobfuscateLua(inputCode)
      setOutputCode(result.deobfuscatedCode)
      setAnalysisResults(result.analysis)

      toast({
        title: "Deobfuscation complete",
        description: "Your Lua code has been successfully deobfuscated.",
      })
    } catch (error) {
      toast({
        title: "Deobfuscation failed",
        description: "An error occurred while processing your code.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
      setProgress(0)
    }
  }

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text)
    toast({
      title: "Copied to clipboard",
      description: "Code has been copied to your clipboard.",
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

  return (
    <div className="max-w-7xl mx-auto mb-16">
      <Card className="p-6">
        <Tabs defaultValue="deobfuscate" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="deobfuscate">Deobfuscate</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
          </TabsList>

          <TabsContent value="deobfuscate" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Input Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Obfuscated Code</h3>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </Button>
                  </div>
                </div>
                <Textarea
                  placeholder="Paste your Luraph-obfuscated Lua code here..."
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  className="code-editor min-h-[400px] font-mono text-sm"
                />
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">{inputCode.length} characters</Badge>
                  {inputCode.includes("string.char") && (
                    <Badge variant="outline">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      String encryption detected
                    </Badge>
                  )}
                </div>
              </div>

              {/* Output Panel */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Deobfuscated Code</h3>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => copyToClipboard(outputCode)}
                      disabled={!outputCode}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadCode(outputCode, "deobfuscated.lua")}
                      disabled={!outputCode}
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
                  className="code-editor min-h-[400px] font-mono text-sm"
                />
                <div className="flex items-center gap-2">
                  {outputCode && (
                    <>
                      <Badge variant="secondary">{outputCode.length} characters</Badge>
                      <Badge variant="outline" className="text-green-400">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Deobfuscated
                      </Badge>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Processing Status */}
            {isProcessing && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Processing...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="w-full" />
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-center">
              <Button
                onClick={handleDeobfuscate}
                disabled={isProcessing || !inputCode.trim()}
                size="lg"
                className="px-8"
              >
                <Play className="h-4 w-4 mr-2" />
                {isProcessing ? "Processing..." : "Deobfuscate Code"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="analysis" className="space-y-6">
            {analysisResults ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Obfuscation Type</h4>
                  <Badge variant="outline">{analysisResults.obfuscationType}</Badge>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Strings Decrypted</h4>
                  <div className="text-2xl font-bold">{analysisResults.stringsDecrypted}</div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Variables Renamed</h4>
                  <div className="text-2xl font-bold">{analysisResults.variablesRenamed}</div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Functions Found</h4>
                  <div className="text-2xl font-bold">{analysisResults.functionsFound}</div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Complexity Reduction</h4>
                  <div className="text-2xl font-bold text-green-400">{analysisResults.complexityReduction}%</div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Processing Time</h4>
                  <div className="text-2xl font-bold">{analysisResults.processingTime}ms</div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Patterns Detected</h4>
                  <div className="text-2xl font-bold">{analysisResults.patternsDetected}</div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Obfuscation Level</h4>
                  <Badge
                    variant={
                      analysisResults.obfuscationLevel === "extreme"
                        ? "destructive"
                        : analysisResults.obfuscationLevel === "heavy"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {analysisResults.obfuscationLevel}
                  </Badge>
                </Card>
                <Card className="p-4">
                  <h4 className="font-semibold mb-2">Detection Confidence</h4>
                  <div className="text-2xl font-bold text-blue-400">{analysisResults.confidence}%</div>
                </Card>
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertTriangle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Run deobfuscation first to see analysis results</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}
