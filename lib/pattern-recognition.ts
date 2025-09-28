// Advanced pattern recognition for Luraph obfuscation techniques
export interface ObfuscationPattern {
  name: string
  pattern: RegExp
  description: string
  severity: "low" | "medium" | "high" | "extreme"
  handler: (match: string) => string
}

export interface UniversalPattern {
  name: string
  languages: string[]
  pattern: RegExp
  description: string
  severity: "low" | "medium" | "high" | "extreme"
  handler: (match: string, language: string) => string
}

export interface PatternAnalysis {
  detectedPatterns: Array<{
    pattern: ObfuscationPattern | UniversalPattern
    matches: number
    locations: number[]
  }>
  obfuscationLevel: "light" | "moderate" | "heavy" | "extreme"
  confidence: number
  luraphVersion: string | null
}

// Comprehensive pattern database for Luraph obfuscation
export const LURAPH_PATTERNS: ObfuscationPattern[] = [
  {
    name: "String Character Encoding",
    pattern: /string\.char\s*$$\s*[\d\s,+\-*/()]+\s*$$/g,
    description: "Encoded strings using string.char with numeric values",
    severity: "high",
    handler: (match) => decodeStringChar(match),
  },
  {
    name: "Global Table Access",
    pattern: /_G\s*\[\s*["']([^"']+)["']\s*\]/g,
    description: "Obfuscated global variable access through _G table",
    severity: "medium",
    handler: (match) => match.replace(/_G\s*\[\s*["']([^"']+)["']\s*\]/, "$1"),
  },
  {
    name: "Loadstring Obfuscation",
    pattern: /loadstring\s*$$\s*["']([^"']+)["']\s*$$/g,
    description: "Dynamic code execution through loadstring",
    severity: "high",
    handler: (match) => match,
  },
  {
    name: "Table Index Obfuscation",
    pattern: /\[\s*["']([a-zA-Z_][a-zA-Z0-9_]*)["']\s*\]/g,
    description: "Obfuscated table access using string indices",
    severity: "low",
    handler: (match) => match.replace(/\[\s*["']([a-zA-Z_][a-zA-Z0-9_]*)["']\s*\]/, ".$1"),
  },
  {
    name: "Function Name Obfuscation",
    pattern: /local\s+([a-zA-Z_]\w*)\s*=\s*([a-zA-Z_]\w*)/g,
    description: "Local variable assignments hiding function references",
    severity: "medium",
    handler: (match) => match,
  },
  {
    name: "VM Handler Pattern",
    pattern: /function\s+[a-zA-Z_]\w*\s*$$\s*[a-zA-Z_]\w*\s*,\s*[a-zA-Z_]\w*\s*,\s*[a-zA-Z_]\w*\s*$$/g,
    description: "Lua VM handler functions with specific parameter patterns",
    severity: "extreme",
    handler: (match) => match,
  },
  {
    name: "Bytecode Loading",
    pattern: /string\.dump\s*$$\s*[^)]+\s*$$|load\s*\(\s*string\.dump/g,
    description: "Bytecode serialization and loading patterns",
    severity: "extreme",
    handler: (match) => match,
  },
  {
    name: "Environment Manipulation",
    pattern: /(getfenv|setfenv)\s*$$\s*[^)]+\s*$$/g,
    description: "Environment table manipulation for obfuscation",
    severity: "high",
    handler: (match) => match,
  },
  {
    name: "Control Flow Obfuscation",
    pattern: /if\s+[a-zA-Z_]\w*\s*==\s*\d+\s+then|while\s+[a-zA-Z_]\w*\s*~=\s*\d+\s+do/g,
    description: "Obfuscated control flow using numeric comparisons",
    severity: "medium",
    handler: (match) => match,
  },
  {
    name: "Anti-Debug Patterns",
    pattern: /(debug\.getinfo|debug\.traceback|debug\.getlocal)/g,
    description: "Anti-debugging and analysis prevention techniques",
    severity: "high",
    handler: (match) => match,
  },
]

export const UNIVERSAL_PATTERNS: UniversalPattern[] = [
  {
    name: "Base64 Encoding",
    languages: ["javascript", "python", "java", "csharp", "php"],
    pattern: /(?:atob|base64\.b64decode|Base64\.decode|base64_decode)\s*$$\s*["']([A-Za-z0-9+/=]+)["']\s*$$/g,
    description: "Base64 encoded strings across multiple languages",
    severity: "high",
    handler: (match, language) => {
      try {
        const base64Match = match.match(/["']([A-Za-z0-9+/=]+)["']/)
        if (base64Match) {
          const decoded = atob(base64Match[1])
          return `"${decoded}"`
        }
      } catch {}
      return match
    },
  },
  {
    name: "Hex Encoding",
    languages: ["python", "java", "csharp", "cpp", "c"],
    pattern: /(?:bytes\.fromhex|Integer\.parseInt.*16|Convert\.FromHexString)\s*$$\s*["']([0-9a-fA-F]+)["']\s*$$/g,
    description: "Hexadecimal encoded strings",
    severity: "medium",
    handler: (match, language) => {
      try {
        const hexMatch = match.match(/["']([0-9a-fA-F]+)["']/)
        if (hexMatch) {
          const hex = hexMatch[1]
          const decoded =
            hex
              .match(/.{2}/g)
              ?.map((h) => String.fromCharCode(Number.parseInt(h, 16)))
              .join("") || ""
          return `"${decoded}"`
        }
      } catch {}
      return match
    },
  },
  {
    name: "Dynamic Code Execution",
    languages: ["javascript", "python", "php", "lua"],
    pattern: /(?:eval|exec|loadstring|assert)\s*$$\s*[^)]+\s*$$/g,
    description: "Dynamic code execution patterns",
    severity: "extreme",
    handler: (match, language) => match,
  },
  {
    name: "String Concatenation Obfuscation",
    languages: ["javascript", "python", "java", "csharp"],
    pattern: /["'][^"']*["']\s*\+\s*["'][^"']*["']/g,
    description: "Obfuscated string concatenation",
    severity: "low",
    handler: (match, language) => {
      // Combine concatenated strings
      const strings = match.match(/["']([^"']*)["']/g)
      if (strings) {
        const combined = strings.map((s) => s.slice(1, -1)).join("")
        return `"${combined}"`
      }
      return match
    },
  },
  {
    name: "Character Code Obfuscation",
    languages: ["javascript", "python", "java", "csharp"],
    pattern: /(?:String\.fromCharCode|chr|Character\.toString|$$char$$)\s*$$\s*[\d\s,+\-*/()]+\s*$$/g,
    description: "Character code based string obfuscation",
    severity: "high",
    handler: (match, language) => {
      try {
        const numbers = match.match(/\d+/g)
        if (numbers) {
          const chars = numbers.map((n) => String.fromCharCode(Number.parseInt(n)))
          return `"${chars.join("")}"`
        }
      } catch {}
      return match
    },
  },
]

export function analyzeUniversalPatterns(code: string, language: string): PatternAnalysis {
  const detectedPatterns: PatternAnalysis["detectedPatterns"] = []
  let totalMatches = 0
  let severityScore = 0

  // Analyze language-specific patterns first
  const languagePatterns =
    language === "lua" ? LURAPH_PATTERNS : UNIVERSAL_PATTERNS.filter((p) => p.languages.includes(language))

  languagePatterns.forEach((pattern) => {
    const matches = Array.from(code.matchAll(pattern.pattern))
    if (matches.length > 0) {
      detectedPatterns.push({
        pattern: pattern as ObfuscationPattern | UniversalPattern,
        matches: matches.length,
        locations: matches.map((match) => match.index || 0),
      })
      totalMatches += matches.length

      const severityWeight =
        pattern.severity === "extreme" ? 4 : pattern.severity === "high" ? 3 : pattern.severity === "medium" ? 2 : 1
      severityScore += matches.length * severityWeight
    }
  })

  // Determine obfuscation level
  const obfuscationLevel =
    severityScore > 50 ? "extreme" : severityScore > 25 ? "heavy" : severityScore > 10 ? "moderate" : "light"

  // Calculate confidence
  const patternDiversity = detectedPatterns.length / languagePatterns.length
  const matchDensity = totalMatches / (code.length / 1000)
  const confidence = Math.min(100, Math.round(patternDiversity * 50 + matchDensity * 25 + 25))

  // Detect version based on language
  const luraphVersion =
    language === "lua" ? detectLuraphVersion(detectedPatterns) : `${language.toUpperCase()} Obfuscation`

  return {
    detectedPatterns,
    obfuscationLevel,
    confidence,
    luraphVersion,
  }
}

// Advanced pattern matching for specific Luraph techniques
export function detectAdvancedPatterns(code: string): Array<{
  type: string
  description: string
  locations: number[]
  severity: string
}> {
  const advancedPatterns = []

  // VM instruction patterns
  const vmInstructions = code.match(/\b[A-Z_]{2,}\s*=\s*\d+/g)
  if (vmInstructions && vmInstructions.length > 10) {
    advancedPatterns.push({
      type: "VM Instruction Table",
      description: "Detected VM instruction constant definitions",
      locations: [],
      severity: "extreme",
    })
  }

  // Encrypted function table
  const encryptedFunctions = code.match(/\{\s*\[[\d\s,]+\]\s*=\s*function/g)
  if (encryptedFunctions) {
    advancedPatterns.push({
      type: "Encrypted Function Table",
      description: "Functions stored in encrypted lookup table",
      locations: [],
      severity: "high",
    })
  }

  // Stack manipulation patterns
  const stackPatterns = code.match(/(push|pop|peek)\s*$$\s*[^)]+\s*$$/g)
  if (stackPatterns && stackPatterns.length > 5) {
    advancedPatterns.push({
      type: "Stack Manipulation",
      description: "VM-style stack operations detected",
      locations: [],
      severity: "extreme",
    })
  }

  return advancedPatterns
}

export function detectQuantumPatterns(
  code: string,
  language: string,
): Array<{
  type: string
  description: string
  locations: number[]
  severity: string
}> {
  const quantumPatterns = []

  // Multi-layer encryption detection
  const layeredEncryption = code.match(/(?:atob|decode|decrypt)\s*\(\s*(?:atob|decode|decrypt)/g)
  if (layeredEncryption && layeredEncryption.length > 0) {
    quantumPatterns.push({
      type: "Multi-Layer Encryption",
      description: "Multiple encryption layers detected",
      locations: [],
      severity: "extreme",
    })
  }

  // VM protection patterns
  const vmProtection = code.match(/(?:vm|virtual|machine|execute|handler)\s*[=:]\s*\{/gi)
  if (vmProtection && vmProtection.length > 3) {
    quantumPatterns.push({
      type: "VM Protection",
      description: "Virtual machine protection detected",
      locations: [],
      severity: "extreme",
    })
  }

  // Anti-debug patterns
  const antiDebug = code.match(/(?:debugger|console|devtools|debug)\s*[;,]/gi)
  if (antiDebug && antiDebug.length > 2) {
    quantumPatterns.push({
      type: "Anti-Debug Protection",
      description: "Anti-debugging mechanisms detected",
      locations: [],
      severity: "high",
    })
  }

  // Control flow obfuscation
  const controlFlow = code.match(/(?:switch|case)\s*$$\s*[a-zA-Z_]\w*\s*\[\s*[a-zA-Z_]\w*\s*\+\+\s*\]\s*$$/g)
  if (controlFlow && controlFlow.length > 0) {
    quantumPatterns.push({
      type: "Control Flow Obfuscation",
      description: "Advanced control flow obfuscation detected",
      locations: [],
      severity: "high",
    })
  }

  return quantumPatterns
}

function detectLuraphVersion(patterns: PatternAnalysis["detectedPatterns"]): string | null {
  const patternNames = patterns.map((p) => p.pattern.name)

  if (patternNames.includes("VM Handler Pattern") && patternNames.includes("Bytecode Loading")) {
    return "Luraph v14.x (VM-based)"
  } else if (patternNames.includes("Environment Manipulation") && patternNames.includes("String Character Encoding")) {
    return "Luraph v13.x"
  } else if (patternNames.includes("Global Table Access") && patternNames.includes("Loadstring Obfuscation")) {
    return "Luraph v12.x"
  } else if (patternNames.includes("String Character Encoding")) {
    return "Luraph v11.x"
  }

  return null
}

function decodeStringChar(match: string): string {
  try {
    // Extract numbers from string.char(num1, num2, ...)
    const numbersMatch = match.match(/\d+/g)
    if (!numbersMatch) return match

    const numbers = numbersMatch.map((n) => Number.parseInt(n))
    const decodedString = String.fromCharCode(...numbers)
    return `"${decodedString}"`
  } catch {
    return match
  }
}
