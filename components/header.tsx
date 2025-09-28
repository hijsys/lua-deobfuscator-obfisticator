import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Github, HelpCircle, Zap, Shield, Atom } from "lucide-react"

export function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/80 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-600 via-purple-600 to-red-600 shadow-lg animate-pulse-glow">
            <Atom className="h-5 w-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-white">Ultimate Code Processor</span>
            <Badge variant="outline" className="text-xs border-blue-600 text-blue-400 bg-blue-950/30 w-fit">
              v3.0 Quantum
            </Badge>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#features"
            className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors flex items-center gap-1"
          >
            <Zap className="h-3 w-3" />
            Features
          </a>
          <a
            href="#obfuscator"
            className="text-sm font-medium text-slate-300 hover:text-red-400 transition-colors flex items-center gap-1"
          >
            <Shield className="h-3 w-3" />
            Obfuscator
          </a>
          <a href="#docs" className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors">
            Documentation
          </a>
          <a
            href="#api"
            className="text-sm font-medium text-slate-300 hover:text-green-400 transition-colors flex items-center gap-1"
          >
            <Shield className="h-3 w-3" />
            Security
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-800">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent hover-glow"
          >
            <Github className="h-4 w-4 mr-2" />
            GitHub
          </Button>
        </div>
      </div>
    </header>
  )
}
