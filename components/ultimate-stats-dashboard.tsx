"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Cpu, Database, Network, Zap, Brain, Shield, Activity, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

interface SystemStats {
  cpuUsage: number
  memoryUsage: number
  networkActivity: number
  processingPower: number
  aiConfidence: number
  securityLevel: number
  activeThreads: number
  quantumEfficiency: number
}

export function UltimateStatsDashboard() {
  const [stats, setStats] = useState<SystemStats>({
    cpuUsage: 0,
    memoryUsage: 0,
    networkActivity: 0,
    processingPower: 0,
    aiConfidence: 0,
    securityLevel: 0,
    activeThreads: 0,
    quantumEfficiency: 0,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpuUsage: Math.floor(Math.random() * 30) + 70, // 70-100%
        memoryUsage: Math.floor(Math.random() * 20) + 60, // 60-80%
        networkActivity: Math.floor(Math.random() * 40) + 30, // 30-70%
        processingPower: Math.floor(Math.random() * 10) + 90, // 90-100%
        aiConfidence: Math.floor(Math.random() * 5) + 95, // 95-100%
        securityLevel: 100, // Always maximum
        activeThreads: Math.floor(Math.random() * 8) + 12, // 12-20
        quantumEfficiency: Math.floor(Math.random() * 5) + 95, // 95-100%
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const statItems = [
    {
      label: "CPU Usage",
      value: stats.cpuUsage,
      icon: Cpu,
      color: "text-blue-400",
      bgColor: "from-blue-900/20 to-blue-800/20",
      borderColor: "border-blue-700/50",
    },
    {
      label: "Memory",
      value: stats.memoryUsage,
      icon: Database,
      color: "text-green-400",
      bgColor: "from-green-900/20 to-green-800/20",
      borderColor: "border-green-700/50",
    },
    {
      label: "Network",
      value: stats.networkActivity,
      icon: Network,
      color: "text-purple-400",
      bgColor: "from-purple-900/20 to-purple-800/20",
      borderColor: "border-purple-700/50",
    },
    {
      label: "Processing",
      value: stats.processingPower,
      icon: Zap,
      color: "text-yellow-400",
      bgColor: "from-yellow-900/20 to-yellow-800/20",
      borderColor: "border-yellow-700/50",
    },
    {
      label: "AI Confidence",
      value: stats.aiConfidence,
      icon: Brain,
      color: "text-pink-400",
      bgColor: "from-pink-900/20 to-pink-800/20",
      borderColor: "border-pink-700/50",
    },
    {
      label: "Security",
      value: stats.securityLevel,
      icon: Shield,
      color: "text-red-400",
      bgColor: "from-red-900/20 to-red-800/20",
      borderColor: "border-red-700/50",
    },
    {
      label: "Threads",
      value: stats.activeThreads,
      icon: Activity,
      color: "text-cyan-400",
      bgColor: "from-cyan-900/20 to-cyan-800/20",
      borderColor: "border-cyan-700/50",
      isCount: true,
    },
    {
      label: "Quantum Eff.",
      value: stats.quantumEfficiency,
      icon: TrendingUp,
      color: "text-orange-400",
      bgColor: "from-orange-900/20 to-orange-800/20",
      borderColor: "border-orange-700/50",
    },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {statItems.map((item, index) => (
        <Card
          key={index}
          className={`p-4 bg-gradient-to-br ${item.bgColor} ${item.borderColor} hover-glow transition-all duration-300`}
        >
          <div className="flex items-center justify-between mb-2">
            <item.icon className={`h-4 w-4 ${item.color}`} />
            <Badge variant="outline" className={`text-xs ${item.color} border-current`}>
              LIVE
            </Badge>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400">{item.label}</span>
              <span className={`text-sm font-bold ${item.color}`}>{item.isCount ? item.value : `${item.value}%`}</span>
            </div>
            {!item.isCount && <Progress value={item.value} className="h-1" />}
          </div>
        </Card>
      ))}
    </div>
  )
}
