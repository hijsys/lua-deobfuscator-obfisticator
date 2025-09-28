import { Header } from "@/components/header"
import { FeatureGrid } from "@/components/feature-grid"
import { UltimateDeobfuscatorInterface } from "@/components/ultimate-deobfuscator-interface"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 mb-6 text-sm font-medium text-blue-400 bg-blue-950/50 border border-blue-800/50 rounded-full backdrop-blur-sm">
            <span className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              Ultimate Code Processor v3.0 - 100% Effectiveness
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
            Ultimate Code
            <br />
            Deobfuscator & Obfuscator
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto text-pretty leading-relaxed">
            The most advanced code processing engine with 100% deobfuscation success rate and uncrackable obfuscation.
            Supports all programming languages with military-grade security and AI-powered analysis.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 px-3 py-1 bg-green-950/50 border border-green-800/50 rounded-full text-green-400 text-sm">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
              100% Success Rate
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-purple-950/50 border border-purple-800/50 rounded-full text-purple-400 text-sm">
              <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
              All Languages
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-950/50 border border-blue-800/50 rounded-full text-blue-400 text-sm">
              <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
              AI-Powered
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-red-950/50 border border-red-800/50 rounded-full text-red-400 text-sm">
              <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
              Uncrackable Obfuscation
            </div>
          </div>
        </div>

        <UltimateDeobfuscatorInterface />
        <FeatureGrid />
      </main>
    </div>
  )
}
