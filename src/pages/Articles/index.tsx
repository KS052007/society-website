import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SEO } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { FileText } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';

export default function ArticlesPage() {
  return (
    <>
      <SEO
        title="Articles | Amartya Finance Society"
        description="Research notes, explainers and commentary from Amartya members."
        canonicalPath="/articles"
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-mint-100/30 to-page border-b border-subtle">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-teal-700 block mb-2">
              Publications
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-default mb-4">
              Articles
            </h1>
            <p className="text-lg sm:text-xl text-muted leading-relaxed">
              Research notes, explainers and commentary from Amartya members.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-20 bg-page">
        <Container>
          <div className="max-w-xl mx-auto text-center py-12 px-6 bg-surface rounded-card border-2 border-subtle shadow-sm">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-section-alt flex items-center justify-center text-teal-700">
              <FileText className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-bold text-default mb-3">
              Articles are on the way.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              Our members are writing in-depth sector research, valuation breakdowns, and macroeconomic analyses. Follow our social channels for first release announcements.
            </p>
            <div className="flex justify-center">
              <Button
                href={siteConfig.contacts.instagramUrl}
                variant="primary"
                size="md"
              >
                <InstagramIcon className="w-4 h-4 mr-1 text-on-brand" />
                Follow on Instagram
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
