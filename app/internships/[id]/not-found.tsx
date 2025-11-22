import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Briefcase } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="py-12 text-center">
          <Briefcase className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Internship Not Found</h1>
          <p className="text-muted-foreground mb-6">
            The internship you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/browse">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse All Internships</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
