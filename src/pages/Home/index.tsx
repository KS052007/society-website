import { Link } from 'react-router';
import {
  LineChart,
  GraduationCap,
  Trophy,
  Users,
  Calendar,
  MessageCircle,
  ExternalLink,
  BookOpen,
  Mail,
  Building,
  ArrowRight,
} from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { HeroMotif } from '@/components/ui/HeroMotif';
import { SectionTransitionWave } from '@/components/ui/SectionTransitionWave';
import { StatusBadge, KindBadge } from '@/components/ui/Badge';
import { InstagramIcon } from '@/components/ui/Icons';
import { SEO } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { quickLinks } from '@/content/links';
import { eventsData } from '@/content/events';
import { getEventStatus, formatDateRange } from '@/lib/dates';

export default function HomePage() {
  // Compute status for all events
  const computedEvents = eventsData.map((event) => ({
    ...event,
    status: getEventStatus(event),
  }));

  const upcomingEvents = computedEvents.filter(
    (e) => e.status === 'upcoming' || e.status === 'live'
  );
  const pastEvents = computedEvents.filter((e) => e.status === 'past');
  const mostRecentPast = pastEvents[0];

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/favicon.svg`,
    sameAs: [siteConfig.contacts.instagramUrl],
  };

  const pillars = [
    {
      icon: LineChart,
      title: 'Research & Analysis',
      desc: 'We promote structured financial research through reports, thesis-level reviews, and data-driven analysis across markets, firms, and economic themes.',
    },
    {
      icon: GraduationCap,
      title: 'Learning & Skill Building',
      desc: 'Through workshops, bootcamps, and peer-led sessions, we help students develop practical skills in finance, valuation, analytics, and financial reasoning.',
    },
    {
      icon: Trophy,
      title: 'Events & Competitions',
      desc: 'We organize finance-focused events including case competitions, speaker sessions, and collaborative challenges to encourage applied learning.',
    },
    {
      icon: Users,
      title: 'Community & Collaboration',
      desc: 'Amartya serves as a platform for students across the BS Degree to connect, discuss ideas, and grow together around a shared interest in finance.',
    },
  ];

  return (
    <>
      <SEO
        title="Amartya Finance Society | IITM BS"
        description="Official finance society of IITM BS. Markets, research, events, and community built with institutional focus."
        canonicalPath="/"
        jsonLd={organizationJsonLd}
      />

      {/* ─── HERO ─── */}
      <section
        className="relative w-full overflow-hidden"
        style={{ background: 'var(--bg-hero)' }}
      >
        {/* Top subtle radial ambient light glow (from Stitch) */}
        <div
          className="absolute -top-32 left-1/4 w-[500px] h-[500px] rounded-full blur-3xl pointer-events-none"
          style={{ background: 'rgba(203, 243, 240, 0.40)' }}
          aria-hidden="true"
        />

        {/* Right-side campus image with organic editorial curve mask */}
        <div
          className="absolute top-0 right-0 hidden sm:block pointer-events-none z-[5]"
          style={{ width: 'clamp(340px, 48vw, 860px)', height: '100%' }}
          data-reveal
          data-reveal-delay="0.15"
        >
          <HeroMotif />
        </div>

        {/* Content */}
        <Container className="relative z-20">
          <div
            className="flex flex-col justify-center pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-32 xl:pt-24 xl:pb-36"
            style={{ minHeight: 'clamp(480px, 56vh, 700px)' }}
          >
            {/* Text panel — max-width keeps it from crowding the image */}
            <div style={{ maxWidth: 'clamp(280px, 44vw, 580px)' }}>

              {/* Eyebrow label */}
              <div
                className="flex items-center gap-3 mb-5 sm:mb-6"
                data-reveal
                data-reveal-delay="0.05"
              >
                <span
                  className="inline-block shrink-0"
                  style={{ width: '2rem', height: '1.5px', background: 'rgba(11,46,51,0.30)' }}
                  aria-hidden="true"
                />
                <span
                  className="font-sans font-medium uppercase tracking-[0.22em] text-ink-600"
                  style={{ fontSize: 'clamp(9px, 0.75vw, 11px)' }}
                >
                  IITM BS · FINANCE SOCIETY
                </span>
              </div>

              {/* H1 — editorial serif headline using clamp() */}
              <h1
                className="font-serif font-normal text-default tracking-[-0.025em] leading-[0.98] mb-4 sm:mb-5"
                style={{ fontSize: 'clamp(2.75rem, 4.8vw, 5.5rem)' }}
                data-reveal
                data-reveal-delay="0.10"
              >
                <span className="sr-only">Amartya Finance Society · </span>
                <span className="block">Curiosity</span>
                <span className="block mt-1">
                  to{' '}
                  <span className="italic" style={{ color: 'var(--c-teal-dark)' }}>
                    Value
                  </span>
                  <span
                    className="inline-block rounded-full bg-brand ml-1.5 mb-1 align-baseline"
                    style={{ width: '0.55em', height: '0.55em' }}
                    aria-hidden="true"
                  />
                </span>
              </h1>

              {/* Supporting sentence */}
              <p
                className="font-sans text-ink-600 leading-relaxed mb-6 sm:mb-8"
                style={{ fontSize: 'clamp(0.875rem, 1.1vw, 1.0625rem)', maxWidth: '38ch' }}
                data-reveal
                data-reveal-delay="0.11"
              >
                A student community exploring markets, research, and real-world ideas.
              </p>

              {/* Mobile image card */}
              <div
                className="sm:hidden mb-8 rounded-2xl overflow-hidden shadow-sm border border-subtle/80"
                style={{ aspectRatio: '16 / 10' }}
                data-reveal
                data-reveal-delay="0.14"
              >
                <img
                  src="/assets/images/image.png"
                  alt="IIT Madras BS Academic Courtyard Garden"
                  className="w-full h-full object-cover"
                  style={{ objectPosition: 'center 40%' }}
                  loading="eager"
                />
              </div>

              {/* CTA link */}
              <div data-reveal data-reveal-delay="0.16">
                <Link
                  to="/events"
                  className="group inline-flex items-center gap-2.5 text-default font-serif italic border-b border-ink-900/40 pb-0.5 hover:text-brand hover:border-brand transition-colors"
                  style={{ fontSize: 'clamp(1rem, 1.2vw, 1.125rem)' }}
                >
                  <span>Explore Events</span>
                  <span
                    className="font-sans not-italic text-sm transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom accent strip */}
            <div
              className="flex items-start gap-3.5 mt-auto pt-10 sm:pt-12"
              data-reveal
              data-reveal-delay="0.20"
            >
              <div
                className="w-[2px] shrink-0 mt-0.5 rounded-full bg-brand"
                style={{ height: 'clamp(2.5rem, 3.5vw, 3rem)' }}
                aria-hidden="true"
              />
              <div
                className="flex flex-col font-sans font-semibold uppercase tracking-[0.20em] text-ink-600 leading-relaxed"
                style={{ fontSize: 'clamp(9px, 0.7vw, 11px)' }}
              >
                <span>PEOPLE</span>
                <span>IDEAS</span>
                <span>OPPORTUNITIES</span>
              </div>
            </div>
          </div>
        </Container>

        {/* Organic Sweep Wave Transition dividing Hero & About section (Stitch design reference) */}
        <div
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-[10] pointer-events-none"
          style={{ transform: 'translateY(1px)' }}
        >
          <SectionTransitionWave className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-56 text-white" />
        </div>
      </section>

      {/* ─── ABOUT & PILLARS ─── */}
      <section className="relative bg-white pt-2 sm:pt-4 md:pt-6 pb-20 md:pb-28 z-20" id="about">
        <Container>
          {/* About + Mission */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
            <div className="lg:col-span-7" data-reveal>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-teal-700 block mb-3">
                Who We Are & What We Do
              </span>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-default tracking-tight leading-tight mb-5">
                {siteConfig.about.heading}
              </h2>
              <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
                {siteConfig.about.body}
              </p>
            </div>

            <div className="lg:col-span-5" data-reveal data-reveal-delay="0.1">
              <div className="p-6 md:p-8 rounded-card bg-white/95 border border-subtle/70 shadow-card">
                <h3 className="font-display text-lg font-bold text-default mb-3 flex items-center gap-2.5">
                  <span className="w-1 h-5 bg-brand rounded-full" aria-hidden="true" />
                  {siteConfig.about.missionHeading}
                </h3>
                <p className="text-default text-sm sm:text-[15px] leading-relaxed">
                  {siteConfig.about.mission}
                </p>
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div>
            <div className="mb-10 text-center max-w-xl mx-auto" data-reveal>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-teal-700 block mb-2">
                Our Core Pillars
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-default tracking-tight">
                What we do across the society
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
              {pillars.map((pillar, idx) => {
                const Icon = pillar.icon;
                return (
                  <Card
                    key={pillar.title}
                    className="p-6 md:p-7 flex flex-col items-start"
                    data-reveal
                    data-reveal-delay={`${0.05 * (idx + 1)}`}
                  >
                    <div className="w-11 h-11 rounded-lg bg-mint-100/60 flex items-center justify-center text-teal-700 mb-4">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <h4 className="font-display text-lg font-bold text-default mb-2">
                      {pillar.title}
                    </h4>
                    <p className="text-muted leading-relaxed text-sm">
                      {pillar.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── HIGHLIGHTS ─── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4" data-reveal>
            <div>
              <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-teal-700 block mb-2">
                Society Highlights
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-default tracking-tight">
                What's happening
              </h2>
            </div>
            <Link
              to="/events"
              className="text-link font-semibold text-sm hover:underline inline-flex items-center gap-1"
            >
              View all events
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Upcoming or Empty State */}
            <div className="lg:col-span-7" data-reveal data-reveal-delay="0.1">
              {upcomingEvents.length > 0 ? (
                <Card className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <StatusBadge status={upcomingEvents[0].status} />
                    <KindBadge kind={upcomingEvents[0].kind} />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-default mb-2">
                    {upcomingEvents[0].title}
                  </h3>
                  <p className="text-muted text-sm mb-4">
                    {formatDateRange(
                      upcomingEvents[0].startDate,
                      upcomingEvents[0].endDate
                    )}
                  </p>
                  <p className="text-default leading-relaxed mb-6">
                    {upcomingEvents[0].summary}
                  </p>
                  <Button to="/events" variant="primary" size="md">
                    View event details
                  </Button>
                </Card>
              ) : (
                <Card className="p-7 md:p-8 border-2 border-subtle">
                  <div className="w-11 h-11 rounded-lg bg-mint-100/60 text-teal-700 flex items-center justify-center mb-4">
                    <Calendar className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-default mb-3">
                    More events coming soon.
                  </h3>
                  <p className="text-muted leading-relaxed text-sm mb-6 max-w-lg">
                    Stay tuned for more exciting events from Amartya Finance Society. We're planning market sessions, valuation workshops, and industry guest lectures for the upcoming semester.
                  </p>
                  <Button
                    href={siteConfig.contacts.whatsappCommunityUrl}
                    variant="primary"
                    size="md"
                  >
                    Join the community
                  </Button>
                </Card>
              )}
            </div>

            {/* Most Recent Past Event */}
            <div className="lg:col-span-5" data-reveal data-reveal-delay="0.15">
              {mostRecentPast && (
                <Card className="p-6">
                  <span className="text-[10px] font-semibold text-muted tracking-wider uppercase block mb-3">
                    Recent Past Event
                  </span>
                  <div className="flex items-center gap-2 mb-3">
                    <StatusBadge status="past" />
                    <KindBadge kind={mostRecentPast.kind} />
                  </div>
                  <h4 className="font-display text-lg font-bold text-default mb-2">
                    {mostRecentPast.title}
                  </h4>
                  <p className="text-xs text-muted mb-3">
                    {formatDateRange(mostRecentPast.startDate, mostRecentPast.endDate)}
                  </p>
                  <p className="text-muted text-sm line-clamp-2 mb-4 leading-relaxed">
                    {mostRecentPast.summary}
                  </p>
                  <Button
                    to="/events"
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    View in archive →
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* ─── QUICK LINKS ─── */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="text-center max-w-xl mx-auto mb-12" data-reveal>
            <span className="text-[11px] uppercase tracking-[0.18em] font-semibold text-teal-700 block mb-2">
              Directory
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-default tracking-tight">
              Quick links
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {quickLinks.map((link, idx) => {
              const getIcon = () => {
                switch (link.id) {
                  case 'email':
                    return <Mail className="w-4.5 h-4.5 text-teal-700" aria-hidden="true" />;
                  case 'instagram':
                    return <InstagramIcon className="w-4.5 h-4.5 text-teal-700" />;
                  case 'whatsapp':
                    return <MessageCircle className="w-4.5 h-4.5 text-teal-700" aria-hidden="true" />;
                  case 'bootcamp-schedule':
                    return <Calendar className="w-4.5 h-4.5 text-teal-700" aria-hidden="true" />;
                  case 'resources-repo':
                    return <BookOpen className="w-4.5 h-4.5 text-teal-700" aria-hidden="true" />;
                  default:
                    return <Building className="w-4.5 h-4.5 text-teal-700" aria-hidden="true" />;
                }
              };

              return (
                <Card
                  key={link.id}
                  className="p-5 flex flex-col justify-between hover:border-accent transition-colors"
                  data-reveal
                  data-reveal-delay={`${0.05 * (idx + 1)}`}
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-mint-100/60 flex items-center justify-center mb-3">
                      {getIcon()}
                    </div>
                    <h3 className="font-display text-sm font-bold text-default mb-1">
                      {link.label}
                    </h3>
                    <p className="text-muted text-xs leading-relaxed mb-4">
                      {link.description}
                    </p>
                  </div>
                  {link.isPending ? (
                    <span className="text-xs font-medium text-orange-700 italic">
                      [Coming soon]
                    </span>
                  ) : (
                    <a
                      href={link.url}
                      className="text-link text-xs font-semibold inline-flex items-center gap-1 hover:underline"
                      target={link.isExternal ? '_blank' : undefined}
                      rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    >
                      Visit link
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      {link.isExternal && <span className="sr-only">(opens in new tab)</span>}
                    </a>
                  )}
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
