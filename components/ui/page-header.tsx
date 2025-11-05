import type React from "react"
import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
  className?: string
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col space-y-4 pb-8 pt-6 md:pb-10", className)}>
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:text-5xl text-balance">
          {title}
        </h1>
        {description && <p className="text-lg text-muted-foreground text-balance max-w-2xl">{description}</p>}
      </div>
      {children}
    </div>
  )
}
