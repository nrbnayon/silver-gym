"use client"

import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center space-y-6 max-w-md">
        <AlertTriangle className="h-16 w-16 text-destructive mx-auto" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Something went wrong!</h1>
          <p className="text-muted-foreground">
            We encountered an error while loading your wedding planner. Please try again.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" onClick={() => (window.location.href = "/")}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  )
}
