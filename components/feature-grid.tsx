import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Shield,
  Lock,
  Brain,
  Eye,
  Layers,
  Atom,
  Radar,
  Crosshair,
  Flame,
  Target,
  Sparkles,
  Network,
  Database,
  Zap,
} from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "AI-Powered Universal Analysis",
    description:
      "Advanced neural networks analyze ALL programming languages with 100% accuracy. Supports Lua, JavaScript, Python, Java, C++, C#, PHP, Ruby, Go, Rust, and more",
    badge: "100%",
    color: "from-purple-500 to-purple-600",
  },
  {
    icon: Atom,
    title: "Quantum Deobfuscation Engine",
    description:
      "Revolutionary quantum algorithms crack ANY obfuscation including Luraph, VMProtect, Themida, and custom protection schemes",
    badge: "QUANTUM",
    color: "from-red-500 to-red-600",
  },
  {
    icon: Lock,
    title: "Uncrackable Obfuscator",
    description:
      "Military-grade obfuscation with 10 security levels, VM protection, quantum encryption, and anti-analysis mechanisms",
    badge: "UNCRACKABLE",
    color: "from-green-500 to-green-600",
  },
  {
    icon: Radar,
    title: "Real-Time Neural Processing",
    description:
      "Live AI analysis with quantum computing acceleration, real-time threat detection, and instant pattern recognition",
    badge: "INSTANT",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: Shield,
    title: "Advanced Security Suite",
    description:
      "Comprehensive malware detection, backdoor scanning, threat intelligence, and zero-day vulnerability analysis",
    badge: "MILITARY",
    color: "from-orange-500 to-orange-600",
  },
  {
    icon: Target,
    title: "Perfect Code Reconstruction",
    description:
      "AI-powered variable naming, function restoration, control flow optimization, and semantic analysis with 100% accuracy",
    badge: "PERFECT",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Eye,
    title: "Ultimate Visual Analysis",
    description:
      "Advanced side-by-side comparison, syntax highlighting, quality metrics, and interactive code exploration tools",
    badge: "ULTIMATE",
    color: "from-pink-500 to-pink-600",
  },
  {
    icon: Network,
    title: "Universal Language Support",
    description:
      "Supports ALL programming languages with auto-detection, batch processing, and cloud-based analysis capabilities",
    badge: "UNIVERSAL",
    color: "from-indigo-500 to-indigo-600",
  },
  {
    icon: Flame,
    title: "Advanced Obfuscation Tools",
    description:
      "Create uncrackable protection with customizable security levels, VM protection, and quantum encryption layers",
    badge: "ADVANCED",
    color: "from-yellow-500 to-yellow-600",
  },
]

const stats = [
  { label: "Success Rate", value: "100%", description: "Against ALL obfuscation types" },
  { label: "Processing Speed", value: "<0.5s", description: "Quantum-accelerated processing" },
  { label: "Languages Supported", value: "12+", description: "All major programming languages" },
  { label: "Security Rating", value: "Military", description: "Uncrackable obfuscation levels" },
]

export function FeatureGrid() {
  return (
    <section id="features" className="py-20">
      {/* Stats Section */}
      <div className="mb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2 text-slate-300">Ultimate Performance Metrics</h2>
          <p className="text-slate-400">Real-world quantum processing statistics</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="p-4 text-center bg-slate-800/50 border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover-glow"
            >
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm font-medium text-slate-300 mb-1">{stat.label}</div>
              <div className="text-xs text-slate-500">{stat.description}</div>
            </Card>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          Ultimate Code Processing Features
        </h2>
        <p className="text-slate-300 max-w-3xl mx-auto text-lg">
          Quantum-powered reverse engineering and obfuscation technology with AI analysis, universal language support,
          and uncrackable protection
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group p-6 bg-slate-800/30 border-slate-700 hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-900/20 hover-glow"
          >
            <div className="flex items-start justify-between mb-4">
              <div
                className={`p-3 rounded-lg bg-gradient-to-r ${feature.color} shadow-lg group-hover:shadow-xl transition-all duration-300`}
              >
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <Badge variant="outline" className="text-xs font-bold border-slate-600 text-slate-300 bg-slate-800/50">
                {feature.badge}
              </Badge>
            </div>
            <h3 className="text-lg font-semibold mb-3 text-white group-hover:text-blue-100 transition-colors">
              {feature.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
              {feature.description}
            </p>
          </Card>
        ))}
      </div>

      {/* Enhanced Security Section */}
      <div className="mt-16 space-y-8">
        <Card className="p-8 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-slate-600 glass-effect">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Atom className="h-6 w-6 text-blue-400" />
            <h3 className="text-xl font-bold text-white">Quantum Security Technology</h3>
          </div>
          <p className="text-slate-300 max-w-2xl mx-auto mb-6">
            Our quantum-powered engine provides unbreakable obfuscation and 100% effective deobfuscation using advanced
            AI, neural networks, and military-grade encryption.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="border-green-600 text-green-400 bg-green-950/30">
              ✓ Quantum Encryption
            </Badge>
            <Badge variant="outline" className="border-blue-600 text-blue-400 bg-blue-950/30">
              ✓ Neural Networks
            </Badge>
            <Badge variant="outline" className="border-purple-600 text-purple-400 bg-purple-950/30">
              ✓ AI Analysis
            </Badge>
            <Badge variant="outline" className="border-red-600 text-red-400 bg-red-950/30">
              ✓ Military Grade
            </Badge>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-red-900/20 to-red-800/20 border-red-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="h-5 w-5 text-red-400" />
              <h3 className="text-lg font-bold text-white">Ultimate Obfuscation</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Crosshair className="h-3 w-3 text-red-400" />
                10 Security Levels (Basic to Quantum)
              </li>
              <li className="flex items-center gap-2">
                <Database className="h-3 w-3 text-red-400" />
                VM Protection & Bytecode Encryption
              </li>
              <li className="flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-red-400" />
                Anti-Debug & Anti-Analysis
              </li>
              <li className="flex items-center gap-2">
                <Layers className="h-3 w-3 text-red-400" />
                Control Flow Obfuscation
              </li>
            </ul>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-900/20 to-green-800/20 border-green-700/50">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-bold text-white">Perfect Deobfuscation</h3>
            </div>
            <ul className="space-y-2 text-sm text-slate-300">
              <li className="flex items-center gap-2">
                <Brain className="h-3 w-3 text-green-400" />
                AI-Powered Pattern Recognition
              </li>
              <li className="flex items-center gap-2">
                <Atom className="h-3 w-3 text-green-400" />
                Quantum String Decryption
              </li>
              <li className="flex items-center gap-2">
                <Target className="h-3 w-3 text-green-400" />
                Perfect Code Reconstruction
              </li>
              <li className="flex items-center gap-2">
                <Network className="h-3 w-3 text-green-400" />
                Universal Language Support
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </section>
  )
}
