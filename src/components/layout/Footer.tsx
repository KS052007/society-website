import { Link } from 'react-router';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { InstagramIcon } from '@/components/ui/Icons';
import { Container } from './Container';
import { siteConfig } from '@/config/site';
import { getLiveRoutes, isRouteLive } from '@/config/routes';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const liveRoutes = getLiveRoutes();
  const isDashboardEnabled = isRouteLive('dashboard');

  return (
    <footer
      id="contact"
      className="bg-inverse text-white border-t border-ink-600/30 pt-12 pb-8 mt-auto"
      aria-labelledby="footer-contact-heading"
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-ink-600/40">
          {/* Identity & About Column */}
          <div className="md:col-span-5 flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                src="/favicon.svg"
                alt="Amartya Finance Society"
                width="36"
                height="36"
                className="w-9 h-9 rounded-lg shrink-0 object-contain bg-white shadow-xs"
              />
              <span className="font-display font-bold text-xl tracking-tight text-white">
                {siteConfig.shortName}
              </span>
            </div>
            <p className="text-mint-100 text-sm font-medium">
              {siteConfig.eyebrow}
            </p>
            <p className="text-gray-300 text-sm max-w-sm leading-relaxed mt-1">
              Reach out for collaborations, speaker sessions, recruitment updates, or resource contributions.
            </p>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-4 flex flex-col gap-3">
            <h2
              id="footer-contact-heading"
              className="text-white font-display tracking-wide uppercase text-xs text-mint-100 font-semibold"
            >
              Contact Us
            </h2>
            <ul className="space-y-2 text-sm" role="list">
              <li>
                <a
                  href={`mailto:${siteConfig.contacts.email}`}
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-apricot-300 transition-colors focus-visible:ring-2 focus-visible:ring-mint-100 rounded-sm"
                >
                  <Mail className="w-4 h-4 shrink-0 text-mint-100" aria-hidden="true" />
                  <span>{siteConfig.contacts.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-apricot-300 transition-colors focus-visible:ring-2 focus-visible:ring-mint-100 rounded-sm"
                >
                  <InstagramIcon className="w-4 h-4 shrink-0 text-mint-100" />
                  <span>Instagram: {siteConfig.contacts.instagramHandle}</span>
                  <span className="sr-only">(opens in new tab)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.contacts.whatsappCommunityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange-500 hover:text-apricot-300 transition-colors focus-visible:ring-2 focus-visible:ring-mint-100 rounded-sm"
                >
                  <MessageCircle className="w-4 h-4 shrink-0 text-mint-100" aria-hidden="true" />
                  <span>Community: Join WhatsApp Community</span>
                  <span className="sr-only">(opens in new tab)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 opacity-70" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          {/* Site Navigation Links Column */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <h3 className="text-white text-xs font-semibold font-display tracking-wide uppercase text-mint-100">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm" role="list">
              {liveRoutes.map((route) => (
                <li key={route.id}>
                  <Link
                    to={route.path}
                    className="text-mint-100 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-mint-100 rounded-sm inline-block py-0.5"
                  >
                    {route.label}
                  </Link>
                </li>
              ))}
              {isDashboardEnabled && (
                <li>
                  <Link
                    to="/dashboard"
                    className="text-mint-100 hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-mint-100 rounded-sm inline-block py-0.5"
                  >
                    Team Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Sign-off */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-mint-100/90">
          <p>
            © {currentYear} Amartya Finance Society. All rights reserved.
          </p>
          <p className="font-medium text-mint-100">
            {siteConfig.signoff}
          </p>
        </div>
      </Container>
    </footer>
  );
}
