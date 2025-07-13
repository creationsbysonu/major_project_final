import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaArrowUp
} from 'react-icons/fa';
import { Store } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialMedia = [
    { icon: FaFacebookF, href: '#', color: '#1877F2' },
    { icon: FaTwitter, href: '#', color: '#1DA1F2' },
    { icon: FaGithub, href: '#', color: '#333' },
    { icon: FaLinkedinIn, href: '#', color: '#0077B5' },
    { icon: FaInstagram, href: '#', color: '#E1306C' },
  ];

  return (
    <footer className="relative bg-white/40 dark:bg-black/40 backdrop-blur-lg text-gray-800 dark:text-gray-200 pt-14 pb-6 mt-20 border-t border-gray-300 dark:border-gray-700 transition-all">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-5 gap-8">

        {/* Logo and tagline */}
        <div className="md:col-span-2 space-y-3">
          <a href="/" className="flex items-center gap-2 text-3xl font-extrabold tracking-tight text-primary dark:text-accent">
            <Store size={32} className="text-primary dark:text-accent" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">e-pasal</span>
          </a>
          <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-400">
            Discover, shop, and experience smarter eCommerce built for Nepal. Fast. Simple. Trusted.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary dark:text-primary">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { name: "Home", to: "/" },
              { name: "About", to: "/aboutus" },
              { name: "Contact Us", to: "/contactus" },
              { name: "Feedback", to: "/feedback" },
            ].map((link) => (
              <li key={link.name}>
                <Link
                  to={link.to}
                  className="relative inline-block text-sm text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent transition-colors duration-300 group"
                >
                  {link.name}
                  <span className="block h-0.5 bg-primary dark:bg-accent scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary dark:text-primary">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#help" className="inline-block text-sm hover:text-primary dark:hover:text-accent/90 transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#faq" className="inline-block text-sm hover:text-primary dark:hover:text-accent transition-colors">
                FAQ
              </a>
            </li>
            <li>
              <a href="#faq" className="inline-block text-sm hover:text-primary dark:hover:text-accent transition-colors">
                Developer Section
              </a>
            </li>
            <li>
              <a href="/donate" className="inline-block text-sm hover:text-primary dark:hover:text-accent transition-colors">
                Donate
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-primary dark:text-primary">Legal</h3>
          <ul className="space-y-2">
            <li>
              <a href="#privacy" className="inline-block text-sm hover:text-primary dark:hover:text-accent transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms" className="inline-block text-sm hover:text-primary dark:hover:text-accent transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Media */}
      <div className="mt-10 flex justify-center space-x-5">
        {socialMedia.map(({ icon: Icon, href, color }, i) => (
          <a
            key={i}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 rounded-full bg-white/10 hover:scale-110 transition-all duration-300"
            style={{ color: color }}
            aria-label="social-link"
          >
            <Icon size={18} className="group-hover:animate-pulse" />
          </a>
        ))}
      </div>

      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white hover:bg-accent shadow-lg transition-all z-50"
        aria-label="Back to top"
      >
        <FaArrowUp size={18} />
      </button>

      {/* Bottom Notice */}
      <div className="mt-10 text-center text-xs text-gray-600 dark:text-gray-400">
        © {new Date().getFullYear()} e-pasal by abc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;