import type React from "react"
interface PatternBackgroundProps {
  children: React.ReactNode
  pattern?: "dots" | "grid" | "waves" | "cosmic"
  className?: string
}

export function PatternBackground({ children, pattern = "dots", className = "" }: PatternBackgroundProps) {
  const patterns = {
    dots: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)",
    grid: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
    waves:
      "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)",
    cosmic:
      "radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 40% 80%, rgba(120, 200, 255, 0.3) 0%, transparent 50%)",
  }

  const backgroundSizes = {
    dots: "20px 20px",
    grid: "20px 20px, 20px 20px",
    waves: "20px 20px",
    cosmic: "100% 100%",
  }

  return (
    <div
      className={`relative ${className}`}
      style={{
        backgroundImage: patterns[pattern],
        backgroundSize: backgroundSizes[pattern],
      }}
    >
      {children}
    </div>
  )
}
