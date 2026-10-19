import { Button } from '@/components/ui/Button';
import { Container } from '@/components/layout/Container';
import { SEO } from '@/lib/seo';
import { AlertCircle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="Page Not Found | Amartya Finance Society"
        description="That page doesn't exist or hasn't launched yet."
        noindex={true}
      />
      <div className="py-20 md:py-32 flex items-center justify-center">
        <Container className="text-center max-w-lg">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-section-alt flex items-center justify-center text-accent">
            <AlertCircle className="w-8 h-8 text-teal-700" aria-hidden="true" />
          </div>
          <span className="text-xs uppercase tracking-widest font-semibold text-muted block mb-2">
            Error 404
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight text-default mb-4">
            Page not found
          </h1>
          <p className="text-muted text-base md:text-lg mb-8 leading-relaxed">
            That page doesn't exist or hasn't launched yet.
          </p>
          <div className="flex justify-center">
            <Button to="/" variant="primary" size="md">
              Back to home
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}
