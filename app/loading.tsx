export default function Loading() {
    return (
      <div className="relative min-h-screen bg-background pb-20">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-7xl">
          <div className="h-12 mb-8 md:mb-12" /> {/* Spacer for back button */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            <div className="lg:col-span-7 flex flex-col gap-10">
              {/* Image skeleton */}
              <div className="w-full aspect-square rounded-[2rem] bg-muted/20 animate-pulse" />
              
              {/* Variants skeleton */}
              <div className="space-y-4">
                <div className="h-8 w-48 bg-muted/20 rounded-lg animate-pulse" />
                <div className="flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-12 flex-1 bg-muted/20 rounded-lg animate-pulse"
                    />
                  ))}
                </div>
              </div>
  
              {/* Content skeleton */}
              <div className="space-y-4">
                <div className="h-8 w-64 bg-muted/20 rounded-lg animate-pulse" />
                <div className="h-4 w-full bg-muted/20 rounded-lg animate-pulse" />
                <div className="h-4 w-3/4 bg-muted/20 rounded-lg animate-pulse" />
              </div>
            </div>
  
            {/* Sidebar skeleton */}
            <div className="hidden lg:col-span-5 lg:flex flex-col space-y-8 md:space-y-10 sticky top-8">
              <div className="space-y-4">
                <div className="h-10 w-3/4 bg-muted/20 rounded-lg animate-pulse" />
                <div className="h-24 w-full bg-muted/20 rounded-lg animate-pulse" />
              </div>
              
              <div className="space-y-8 bg-card/30 p-8 rounded-[2rem] border border-primary/5">
                <div className="h-12 w-32 bg-muted/20 rounded-lg animate-pulse" />
                <div className="h-14 w-full bg-muted/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  