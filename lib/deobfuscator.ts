// Core deobfuscation engine for Luraph-obfuscated Lua scripts
import { analyzeObfuscationPatterns, detectAdvancedPatterns } from "./pattern-recognition"

export interface DeobfuscationResult {
  deobfuscatedCode: string
  analysis: {
    obfuscationType: string
    stringsDecrypted: number
    variablesRenamed: number
    functionsFound: number
    complexityReduction: number
    processingTime: number
    patternsDetected: number
    obfuscationLevel: number
    confidence: number
    advancedPatterns: number
  }
}

export async function deobfuscateLua(obfuscatedCode: string): Promise<DeobfuscationResult> {
  const startTime = Date.now()
  let processedCode = obfuscatedCode
  let stringsDecrypted = 0
  let variablesRenamed = 0
  let functionsFound = 0

  const patternAnalysis = analyzeObfuscationPatterns(obfuscatedCode)
  const advancedPatterns = detectAdvancedPatterns(obfuscatedCode)

  // Use detected patterns to determine deobfuscation strategy
  const obfuscationType = patternAnalysis.luraphVersion || detectObfuscationType(obfuscatedCode)

  for (const detectedPattern of patternAnalysis.detectedPatterns) {
    if (detectedPattern.pattern.severity === "high" || detectedPattern.pattern.severity === "extreme") {
      processedCode = processedCode.replace(detectedPattern.pattern.pattern, detectedPattern.pattern.handler)
    }
  }

  // Step 2: Remove string encryption (string.char patterns)
  const stringDecryptionResult = decryptStrings(processedCode)
  processedCode = stringDecryptionResult.code
  stringsDecrypted = stringDecryptionResult.count

  // Step 3: Simplify variable names
  const variableRenameResult = renameVariables(processedCode)
  processedCode = variableRenameResult.code
  variablesRenamed = variableRenameResult.count

  // Step 4: Remove junk code and dead code
  processedCode = removeJunkCode(processedCode)

  // Step 5: Simplify control flow
  processedCode = simplifyControlFlow(processedCode)

  // Step 6: Format and beautify
  processedCode = beautifyLuaCode(processedCode)

  // Count functions
  functionsFound = countFunctions(processedCode)

  const processingTime = Date.now() - startTime
  const complexityReduction = calculateComplexityReduction(obfuscatedCode, processedCode)

  return {
    deobfuscatedCode: processedCode,
    analysis: {
      obfuscationType,
      stringsDecrypted,
      variablesRenamed,
      functionsFound,
      complexityReduction,
      processingTime,
      patternsDetected: patternAnalysis.detectedPatterns.length,
      obfuscationLevel: patternAnalysis.obfuscationLevel,
      confidence: patternAnalysis.confidence,
      advancedPatterns: advancedPatterns.length,
    },
  }
}

function detectObfuscationType(code: string): string {
  if (code.includes("string.char") && code.includes("_G[")) {
    return "Luraph v14.x"
  } else if (code.includes("loadstring") && code.includes("string.byte")) {
    return "Luraph v13.x"
  } else if (code.includes("getfenv") && code.includes("setfenv")) {
    return "Luraph v12.x"
  } else {
    return "Luraph (Unknown Version)"
  }
}

function decryptStrings(code: string): { code: string; count: number } {
  let count = 0

  // Pattern 1: string.char(num, num, num, ...)
  code = code.replace(/string\.char$$([^)]+)$$/g, (match, args) => {
    count++
    const numbers = args.split(",").map((n: string) => Number.parseInt(n.trim()))
    return `"${String.fromCharCode(...numbers)}"`
  })

  // Pattern 2: Complex string.char with calculations
  code = code.replace(/string\.char$$([^)]+(?:$$[^)]*$$)*[^)]*)$$/g, (match, args) => {
    try {
      count++
      // Simplified evaluation - in real implementation, this would be more sophisticated
      const evaluated = args.replace(/(\d+)\s*\+\s*(\d+)/g, (m: string, a: string, b: string) =>
        (Number.parseInt(a) + Number.parseInt(b)).toString(),
      )
      const numbers = evaluated.split(",").map((n: string) => Number.parseInt(n.trim()))
      return `"${String.fromCharCode(...numbers)}"`
    } catch {
      return match
    }
  })

  return { code, count }
}

function renameVariables(code: string): { code: string; count: number } {
  let count = 0
  const variableMap = new Map<string, string>()

  // Find obfuscated variable names (typically single letters or random strings)
  const obfuscatedVars = code.match(/\b[a-zA-Z_][a-zA-Z0-9_]*\b/g) || []
  const suspiciousVars = obfuscatedVars.filter(
    (v) => v.length === 1 || /^[a-zA-Z]{1,3}\d*$/.test(v) || /^_[a-zA-Z0-9]{1,5}$/.test(v),
  )

  suspiciousVars.forEach((oldVar) => {
    if (!variableMap.has(oldVar) && !isReservedWord(oldVar)) {
      const newVar = `var_${count + 1}`
      variableMap.set(oldVar, newVar)
      count++
    }
  })

  // Replace variables
  variableMap.forEach((newVar, oldVar) => {
    const regex = new RegExp(`\\b${oldVar}\\b`, "g")
    code = code.replace(regex, newVar)
  })

  return { code, count }
}

function removeJunkCode(code: string): string {
  // Remove empty statements
  code = code.replace(/;\s*;/g, ";")

  // Remove unnecessary parentheses
  code = code.replace(/$$\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*$$/g, "$1")

  // Remove dead code patterns
  code = code.replace(/if\s+false\s+then[\s\S]*?end/g, "")

  return code
}

function simplifyControlFlow(code: string): string {
  // Simplify unnecessary do-end blocks
  code = code.replace(/do\s+(.*?)\s+end/g, "$1")

  // Simplify if-then-else patterns
  code = code.replace(/if\s+true\s+then\s+(.*?)\s+end/g, "$1")

  return code
}

function beautifyLuaCode(code: string): string {
  // Basic formatting
  const formatted = code

  // Add proper indentation
  const lines = formatted.split("\n")
  let indentLevel = 0
  const indentedLines = lines.map((line) => {
    const trimmed = line.trim()

    if (trimmed.includes("end") || trimmed.includes("else") || trimmed.includes("elseif")) {
      indentLevel = Math.max(0, indentLevel - 1)
    }

    const indented = "  ".repeat(indentLevel) + trimmed

    if (
      trimmed.includes("function") ||
      trimmed.includes("if") ||
      trimmed.includes("for") ||
      trimmed.includes("while") ||
      trimmed.includes("do") ||
      trimmed.includes("then")
    ) {
      indentLevel++
    }

    return indented
  })

  return indentedLines.join("\n")
}

function countFunctions(code: string): number {
  const functionMatches = code.match(/function\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/g) || []
  const localFunctionMatches = code.match(/local\s+function\s+[a-zA-Z_][a-zA-Z0-9_]*\s*\(/g) || []
  return functionMatches.length + localFunctionMatches.length
}

function calculateComplexityReduction(original: string, deobfuscated: string): number {
  const originalComplexity = original.length + (original.match(/string\.char/g) || []).length * 10
  const deobfuscatedComplexity = deobfuscated.length
  return Math.round(((originalComplexity - deobfuscatedComplexity) / originalComplexity) * 100)
}

function isReservedWord(word: string): boolean {
  const reserved = [
    "and",
    "break",
    "do",
    "else",
    "elseif",
    "end",
    "false",
    "for",
    "function",
    "if",
    "in",
    "local",
    "nil",
    "not",
    "or",
    "repeat",
    "return",
    "then",
    "true",
    "until",
    "while",
    "print",
    "string",
    "table",
    "math",
    "io",
  ]
  return reserved.includes(word)
}
