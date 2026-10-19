import { Container } from '@/components/layout/Container';

export function PageSkeleton() {
  return (
    <div className="py-16 md:py-24" aria-busy="true" aria-label="Loading page content">
      <Container className="space-y-8 animate-pulse">
        {/* Title skeleton */}
        <div className="space-y-3 max-w-xl">
          <div className="h-4 w-24 bg-section-alt rounded-sm" />
          <div className="h-10 w-3/4 bg-section-alt rounded-md" />
          <div className="h-4 w-full bg-section-alt rounded-sm" />
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
          <div className="h-64 rounded-card bg-section-alt/60 border border-subtle" />
          <div className="h-64 rounded-card bg-section-alt/60 border border-subtle" />
          <div className="h-64 rounded-card bg-section-alt/60 border border-subtle" />
        </div>
      </Container>
    </div>
  );
}
