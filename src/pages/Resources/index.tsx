import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { SEO } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { BookOpen, Search } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Fundamentals',
  'Valuation',
  'Markets',
  'Economics',
  'Data & Analytics',
  'Case Studies',
];

export default function ResourcesPage() {
  return (
    <>
      <SEO
        title="Resources | Amartya Finance Society"
        description="Free finance learning resources curated by Amartya, IITM BS."
        canonicalPath="/resources"
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-mint-100/30 to-page border-b border-subtle">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-teal-700 block mb-2">
              Knowledge Repository
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-default mb-4">
              Resources
            </h1>
            <p className="text-lg sm:text-xl text-muted leading-relaxed">
              Free learning material curated by Amartya.
            </p>
          </div>
        </Container>
      </section>

      {/* Search & Categories Bar (Mock Shell) */}
      <section className="py-6 bg-surface border-b border-subtle">
        <Container>
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="relative max-w-md w-full">
              <Search className="w-4 h-4 text-muted absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                type="search"
                disabled
                placeholder="Search notes, slides, datasets..."
                className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-subtle bg-section-alt/50 text-muted cursor-not-allowed opacity-75"
              />
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat, idx) => (
                <span
                  key={cat}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border border-subtle whitespace-nowrap ${
                    idx === 0
                      ? 'bg-default text-white'
                      : 'bg-surface text-muted opacity-60'
                  }`}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Empty State */}
      <section className="py-20 bg-page">
        <Container>
          <div className="max-w-xl mx-auto text-center py-12 px-6 bg-surface rounded-card border-2 border-subtle shadow-sm">
            <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-section-alt flex items-center justify-center text-teal-700">
              <BookOpen className="w-7 h-7" aria-hidden="true" />
            </div>
            <h2 className="font-display text-2xl font-bold text-default mb-3">
              Resources are coming soon.
            </h2>
            <p className="text-muted text-base leading-relaxed mb-8">
              We are currently organizing study decks, financial statement models, valuation templates, and reading lists. Join the community to get early access as soon as the library drops.
            </p>
            <div className="flex justify-center">
              <Button
                href={siteConfig.contacts.whatsappCommunityUrl}
                variant="primary"
                size="md"
              >
                Join WhatsApp Community
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
