import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import navLogo from "@/assets/navlogo.png";

export function Footer() {
  return (
    <footer className="relative bg-indigo text-indigo-foreground overflow-hidden">
      {/* Content wrapper */}
      <div className="relative z-10 mx-auto max-w-7xl py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-xl bg-purple-950 flex items-center justify-center">
                <img src={navLogo} alt="Nova Exams Logo" className="w-8 h-8" />
              </div>
              <span className="font-display font-bold text-[30px]">
                <span className="text-primary">Nova</span>
                <span className="text-indigo-foreground"> Exams</span>
              </span>
            </Link>
            <p className="text-indigo-foreground/80 text-sm leading-relaxed">
              Your trusted partner for international exam preparation and booking services. We streamline your exam journey with expert guidance.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-primary">Quick Links</h4>
            <ul className="space-y-3">
              {["Home", "About Us", "Blog", "Resources", "Contact Us", "Book Now"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Book Now" ? "/booking" : `/${link.toLowerCase().replace(" ", "-").replace("home", "")}`}
                    className="text-indigo-foreground/80 hover:text-primary transition-colors text-sm"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exams Offered */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-primary">Exams Offered</h4>
            <ul className="space-y-3">
              {["Duolingo", "TOEFL", "IELTS", "TOLC", "GRE", "GMAT"].map((exam) => (
                <li key={exam}>
                  <span className="text-indigo-foreground/80 text-sm">{exam}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-lg mb-4 text-primary">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-indigo-foreground/80">
                <Mail className="w-4 h-4 text-primary" />
                <span>info@novaexams.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-foreground/80">
                <Phone className="w-4 h-4 text-primary" />
                <span>+251 911 123 456</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-indigo-foreground/80">
                <MapPin className="w-4 h-4 text-primary" />
                <span>Addis Ababa, Ethiopia</span>
              </li>
            </ul>
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-indigo-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-indigo-foreground/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-indigo-foreground/60">
            © {new Date().getFullYear()} Nova Exams. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className="text-indigo-foreground/60 hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-indigo-foreground/60 hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
