export default function EmployerLoading() {
  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-primary text-primary-foreground py-12 animate-pulse">
        <div className="container mx-auto px-4">
          <div className="h-16 bg-primary-foreground/20 rounded-lg w-64" />
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    </div>
  )
}
