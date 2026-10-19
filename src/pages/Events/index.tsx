import { useState, useRef, useEffect } from 'react';
import { Calendar, Globe, ExternalLink, ChevronDown, Check, Sparkles, Filter } from 'lucide-react';
import { Container } from '@/components/layout/Container';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { StatusBadge, KindBadge } from '@/components/ui/Badge';
import { SEO } from '@/lib/seo';
import { siteConfig } from '@/config/site';
import { eventsData, type EventKind } from '@/content/events';
import { getEventStatus, formatDateRange } from '@/lib/dates';

type TimeframeFilter = 'all' | 'upcoming' | 'past';

const KIND_FILTERS: { id: EventKind | 'all'; label: string }[] = [
  { id: 'all', label: 'All categories' },
  { id: 'bootcamp', label: 'Bootcamp' },
  { id: 'workshop', label: 'Workshop' },
  { id: 'competition', label: 'Competition' },
  { id: 'speaker-session', label: 'Speaker session' },
  { id: 'case-study', label: 'Case study' },
];

export default function EventsPage() {
  const [timeframe, setTimeframe] = useState<TimeframeFilter>('upcoming');
  const [selectedKind, setSelectedKind] = useState<EventKind | 'all'>('all');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute status dynamically from dates
  const computedEvents = eventsData.map((event) => ({
    ...event,
    status: getEventStatus(event),
  }));

  const upcomingList = computedEvents.filter(
    (e) => e.status === 'upcoming' || e.status === 'live'
  );
  const pastList = computedEvents.filter((e) => e.status === 'past');

  const timeframeOptions: { id: TimeframeFilter; label: string; count: number }[] = [
    { id: 'upcoming', label: 'Upcoming', count: upcomingList.length },
    { id: 'all', label: 'All Events', count: computedEvents.length },
    { id: 'past', label: 'Past Events', count: pastList.length },
  ];

  // Apply timeframe selection
  let currentList = computedEvents;
  if (timeframe === 'upcoming') {
    currentList = upcomingList;
  } else if (timeframe === 'past') {
    currentList = pastList;
  }

  // Apply kind filter
  const filteredEvents = currentList.filter((event) => {
    if (selectedKind === 'all') return true;
    return event.kind === selectedKind;
  });

  const selectedTimeframeOption = timeframeOptions.find((opt) => opt.id === timeframe)!;

  return (
    <>
      <SEO
        title="Events | Amartya Finance Society"
        description="Upcoming and previous events by Amartya Finance Society, the official finance society of IITM BS."
        canonicalPath="/events"
      />

      {/* Header section with refined typography and ambient styling */}
      <section className="relative pt-12 pb-10 md:pt-18 md:pb-14">
        <Container>
          <div className="max-w-3xl" data-reveal>
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-default mb-3">
              Events & Cohorts
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed max-w-2xl">
              Workshops, bootcamps, competitions, and speaker sessions from Amartya designed to bridge academic study with real-world financial markets.
            </p>
          </div>
        </Container>
      </section>

      {/* Modern Floating Toolbar: Dropdown + Category Chips */}
      <section className="sticky top-16 z-30 mb-8 sm:mb-12">
        <Container>
          <div
            className="rounded-2xl bg-surface/90 backdrop-blur-md border border-subtle shadow-card p-2 sm:p-2.5 flex flex-col lg:flex-row lg:items-center justify-between gap-3"
            data-reveal
          >
            {/* Left: Timeframe Dropdown */}
            <div className="relative inline-block text-left" ref={dropdownRef}>
              <button
                type="button"
                id="timeframe-select-trigger"
                onClick={() => setDropdownOpen((prev) => !prev)}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
                className="w-full sm:w-auto inline-flex items-center justify-between sm:justify-start gap-2.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-default bg-surface hover:bg-section-alt/50 border border-subtle rounded-xl shadow-xs transition-colors focus-visible:ring-2 focus-visible:ring-focus min-h-[40px] cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                  <span className="text-muted text-xs font-normal">Show:</span>
                  <span className="text-default font-semibold">{selectedTimeframeOption.label}</span>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full bg-section-alt text-teal-700">
                    {selectedTimeframeOption.count}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-muted transition-transform duration-200 ${
                      dropdownOpen ? 'rotate-180 text-teal-700' : ''
                    }`}
                    aria-hidden="true"
                  />
                </div>
              </button>

              {dropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-60 rounded-xl bg-surface/98 backdrop-blur-md border border-subtle shadow-lg py-1.5 z-50 focus:outline-none animate-in fade-in zoom-in-95 duration-150"
                  role="listbox"
                  aria-labelledby="timeframe-select-trigger"
                >
                  <div className="px-3 py-1.5 text-[11px] font-semibold text-muted tracking-wider uppercase border-b border-subtle/50 mb-1">
                    Select Timeframe
                  </div>
                  {timeframeOptions.map((opt) => {
                    const isSelected = timeframe === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => {
                          setTimeframe(opt.id);
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2 text-xs sm:text-sm transition-colors cursor-pointer text-left rounded-lg mx-auto ${
                          isSelected
                            ? 'bg-section-alt/70 font-bold text-default'
                            : 'text-default hover:bg-section-alt/40'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {isSelected ? (
                            <Check className="w-4 h-4 text-teal-700 shrink-0" aria-hidden="true" />
                          ) : (
                            <span className="w-4 h-4 shrink-0" aria-hidden="true" />
                          )}
                          <span>{opt.label}</span>
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-section-alt text-teal-700">
                          {opt.count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Right: Category Filter Pills */}
            <div
              className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none"
              role="group"
              aria-label="Filter events by kind"
            >
              <div className="hidden sm:flex items-center text-muted text-xs pr-1 font-medium">
                <Filter className="w-3.5 h-3.5 mr-1 text-teal-700" aria-hidden="true" />
                <span>Filter:</span>
              </div>
              {KIND_FILTERS.map((chip) => {
                const isSelected = selectedKind === chip.id;
                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setSelectedKind(chip.id)}
                    className={`whitespace-nowrap px-3.5 py-1.5 text-xs rounded-xl font-medium transition-all duration-150 cursor-pointer min-h-[38px] flex items-center ${
                      isSelected
                        ? 'bg-teal-700 text-white font-semibold shadow-xs'
                        : 'bg-surface/60 text-muted hover:text-default hover:bg-section-alt/60 border border-subtle/60'
                    }`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Events List & Empty States */}
      <section className="pb-20 min-h-[420px]">
        <Container>
          {filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event, idx) => (
                <Card
                  key={event.slug}
                  as="article"
                  className="flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  data-reveal
                  data-reveal-delay={`${0.06 * (idx + 1)}`}
                >
                  {/* Banner image with aspect-ratio reserved */}
                  {event.banner && (
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-section-alt border-b border-subtle">
                      <img
                        src={event.banner.src}
                        alt={event.banner.alt}
                        width={event.banner.width}
                        height={event.banner.height}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-102"
                      />
                    </div>
                  )}

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Kind + Status Badges */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <KindBadge kind={event.kind} />
                        <StatusBadge status={event.status} />
                      </div>

                      {/* Title */}
                      <h2 className="font-display text-xl font-bold text-default mb-2 leading-snug">
                        {event.title}
                      </h2>

                      {/* Date & Mode Meta */}
                      <div className="space-y-1.5 mb-4 text-xs text-muted">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
                          <span>
                            {formatDateRange(event.startDate, event.endDate)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-teal-700 shrink-0" aria-hidden="true" />
                          <span className="capitalize">
                            {event.mode === 'online' ? 'Online (100%)' : event.mode}
                          </span>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-muted text-sm leading-relaxed mb-6">
                        {event.summary}
                      </p>
                    </div>

                    {/* Action Links */}
                    <div className="pt-4 border-t border-subtle flex flex-wrap items-center gap-3">
                      {event.links.map((link, linkIdx) => (
                        <Button
                          key={linkIdx}
                          href={link.url}
                          variant="secondary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          {link.label}
                          <ExternalLink className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                        </Button>
                      ))}
                      {event.registrationUrl && (
                        <Button
                          href={event.registrationUrl}
                          variant="primary"
                          size="sm"
                          className="w-full sm:w-auto"
                        >
                          Register
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            /* Redesigned Empty State / Roadmap Card */
            <div
              className="max-w-2xl mx-auto py-12 px-6 sm:px-10 bg-surface/90 backdrop-blur-md rounded-2xl border border-subtle text-center shadow-card"
              data-reveal
            >
              {/* Luminous Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-mint-100 to-teal-500/20 border border-teal-500/30 flex items-center justify-center text-teal-700 shadow-sm">
                <Sparkles className="w-8 h-8" aria-hidden="true" />
              </div>

              <h2
                className={`font-display text-2xl sm:text-3xl font-bold text-default tracking-tight ${
                  timeframe === 'upcoming' ? 'mb-8' : 'mb-3'
                }`}
              >
                {timeframe === 'upcoming'
                  ? 'More events coming soon.'
                  : 'No events match the selected filter.'}
              </h2>

              {timeframe !== 'upcoming' && (
                <p className="text-muted text-base leading-relaxed mb-8 max-w-lg mx-auto">
                  Try selecting a different category or clearing your filter to view available events.
                </p>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  href={siteConfig.contacts.whatsappCommunityUrl}
                  variant="primary"
                  size="md"
                  className="w-full sm:w-auto shadow-xs"
                >
                  Join the community
                </Button>
                {timeframe !== 'all' && (
                  <Button
                    onClick={() => {
                      setTimeframe('past');
                      setSelectedKind('all');
                    }}
                    variant="outline"
                    size="md"
                    className="w-full sm:w-auto"
                  >
                    View past events ({pastList.length}) →
                  </Button>
                )}
              </div>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
