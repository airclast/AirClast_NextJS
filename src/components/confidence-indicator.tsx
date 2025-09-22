import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, XCircle } from "lucide-react"

interface ConfidenceIndicatorProps {
  score: number
}

export function ConfidenceIndicator({ score }: ConfidenceIndicatorProps) {
  const getConfidenceInfo = (score: number) => {
    if (score >= 0.8) {
      return {
        label: "High Confidence",
        color: "bg-green-100 text-green-800",
        icon: <CheckCircle className="w-3 h-3" />,
      }
    } else if (score >= 0.6) {
      return {
        label: "Medium Confidence",
        color: "bg-yellow-100 text-yellow-800",
        icon: <AlertCircle className="w-3 h-3" />,
      }
    } else {
      return {
        label: "Low Confidence",
        color: "bg-red-100 text-red-800",
        icon: <XCircle className="w-3 h-3" />,
      }
    }
  }

  const info = getConfidenceInfo(score)

  return (
    <Badge className={`flex items-center space-x-1 ${info.color}`}>
      {info.icon}
      <span>{info.label}</span>
      <span>({(score * 100).toFixed(0)}%)</span>
    </Badge>
  )
}
