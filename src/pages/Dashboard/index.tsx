import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { SEO } from '@/lib/seo';
import { Lock, ShieldAlert } from 'lucide-react';

export default function DashboardPage() {
  return (
    <>
      <SEO
        title="Dashboard | Amartya"
        description="Society Team Sign-in"
        noindex={true}
      />

      <section className="py-12 md:py-16 bg-gradient-to-b from-mint-100/30 to-page border-b border-subtle">
        <Container>
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-widest font-semibold text-teal-700 block mb-2">
              Internal Administration
            </span>
            <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-default mb-4">
              Society Team Sign-in
            </h1>
            <p className="text-lg sm:text-xl text-muted leading-relaxed">
              Team-only participant data & analytics.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16 md:py-24 bg-page">
        <Container>
          <div className="max-w-md mx-auto">
            <Card className="p-8">
              <div className="w-12 h-12 rounded-full bg-section-alt flex items-center justify-center text-teal-700 mb-6">
                <Lock className="w-6 h-6" aria-hidden="true" />
              </div>

              <h2 className="font-display text-2xl font-bold text-default mb-2">
                Core Team Access
              </h2>
              <p className="text-muted text-sm leading-relaxed mb-6">
                Authorized society organizers can sign in using their registered IITM institutional email.
              </p>

              <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
                <div>
                  <label
                    htmlFor="team-email"
                    className="block text-xs font-semibold text-default uppercase tracking-wider mb-2"
                  >
                    IITM Email
                  </label>
                  <input
                    id="team-email"
                    type="email"
                    disabled
                    placeholder="name@study.iitm.ac.in"
                    className="w-full px-4 py-2.5 rounded-lg border border-subtle bg-section-alt/50 text-muted cursor-not-allowed opacity-75 text-sm"
                  />
                </div>

                <Button
                  type="submit"
                  disabled
                  variant="primary"
                  size="md"
                  className="w-full opacity-60 cursor-not-allowed"
                >
                  Send magic sign-in link
                </Button>
              </form>

              <div className="mt-8 p-4 rounded-lg bg-section-alt border border-subtle flex items-start gap-3">
                <ShieldAlert className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-xs text-muted leading-relaxed">
                  You don't have access. Contact the Amartya core team. (Backend authentication will be activated in Phase 4).
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>
    </>
  );
}
