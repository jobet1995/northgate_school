import Link from "next/link";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/courses", label: "Courses" },
    { href: "/teachers", label: "Teachers" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" },
  ];

  const socialLinks = [
    { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
    { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
    { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
    { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-blue-500 p-2 transition-transform group-hover:scale-105">
                <GraduationCap
                  className="h-6 w-6 text-white"
                  aria-hidden="true"
                  data-testid="graduation-cap-icon"
                />
              </div>
              <span className="text-xl font-extrabold text-white">
                Northgate School
              </span>
            </Link>
            <p className="text-sm leading-relaxed">
              Empowering future leaders through quality education. Where
              curiosity meets excellence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-blue-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin
                  className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5"
                  aria-hidden="true"
                />
                <span className="text-sm">
                  123 Education Street, Learning City, LC 12345
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone
                  className="h-5 w-5 text-blue-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+1234567890"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail
                  className="h-5 w-5 text-blue-400 flex-shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:info@northgateschool.edu"
                  className="text-sm hover:text-blue-400 transition-colors"
                >
                  info@northgateschool.edu
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-white font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-2xl bg-gray-800 p-2.5 hover:bg-blue-700 transition-all hover:scale-110"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p className="text-sm">
            &copy; {currentYear} Northgate School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
