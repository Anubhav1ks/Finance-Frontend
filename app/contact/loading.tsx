import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="flex flex-col">
      <section className="bg-primary py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <Skeleton className="h-12 w-2/3 mx-auto bg-primary-foreground/20" />
            <Skeleton className="h-6 w-full mx-auto bg-primary-foreground/20" />
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-6">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-[600px] w-full" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
