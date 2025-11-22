import Link from "next/link"
import { MapPin, Clock, Banknote, Briefcase, ArrowRight } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Internship } from "@/lib/mock-data"

interface InternshipCardProps {
  internship: Internship
}

export function InternshipCard({ internship }: InternshipCardProps) {
  const daysAgo = Math.floor((new Date().getTime() - new Date(internship.postedDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-accent">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="flex-1">
            <Link href={`/internships/${internship.id}`}>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-accent transition-colors cursor-pointer">
                {internship.title}
              </h3>
            </Link>
            <p className="text-lg text-muted-foreground mb-3">{internship.company}</p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="secondary" className="gap-1">
                <MapPin className="h-3 w-3" />
                {internship.location}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Briefcase className="h-3 w-3" />
                {internship.mode}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <Clock className="h-3 w-3" />
                {internship.duration}
              </Badge>
              {internship.isPaid && internship.stipend && (
                <Badge className="bg-success text-success-foreground gap-1">
                  <Banknote className="h-3 w-3" />£{internship.stipend}/month
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-accent text-accent-foreground">{internship.category}</Badge>
            <span className="text-xs text-muted-foreground">
              {daysAgo === 0 ? "Posted today" : `Posted ${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">{internship.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {internship.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {internship.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{internship.skills.length - 4} more
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          <Link href={`/internships/${internship.id}`} className="flex-1">
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              View Details
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          {/* <Button
            variant="outline"
            className="hover:bg-accent hover:text-accent-foreground hover:border-accent bg-transparent"
          >
            Save
          </Button> */}
        </div>
      </CardContent>
    </Card>
  )
}
