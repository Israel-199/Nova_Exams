import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import navLogo from "@/assets/navlogo.png";
import { WireframeMesh } from "./WireframeMesh";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about-us" },
  { label: "Blog", path: "/blog" },
  { label: "Resources", path: "/resources" },
  { label: "Contact Us", path: "/contact-us" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[hsl(var(--hero-bg))]/70 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full bg-purple-950 flex items-center justify-center">
              <img src={navLogo} alt="Nova Exams Logo" className="w-8 h-8" />
            </div>
            <span className="text-secondary-foreground font-display font-bold text-xl">
              Nova <span className="text-primary">Exams</span>
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="nav-link font-medium text-secondary-foreground/80 hover:text-yellow-400 transition-colors"
            >
              {item.label.split("").map((char, i) => (
                <span key={i} className="drop-char">{char}</span>
              ))}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Desktop Log in */}
          <button
            className="hidden lg:block px-5 py-2 rounded-lg border border-secondary-foreground/30
                       bg-yellow-400 font-medium text-black
                       transform transition-all duration-300
                       hover:bg-yellow-400/90 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg
                       focus-visible:-translate-y-1 focus-visible:-translate-x-1 focus-visible:shadow-lg
                       active:translate-x-0 active:translate-y-0 active:shadow-md"
          >
            Log in
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="block lg:hidden text-secondary-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute left-0 right-0 top-full bg-[hsl(var(--hero-bg))]/80 backdrop-blur-md border-t border-secondary-foreground/10 p-4 animate-fade-in space-y-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.path}
              className="block w-full nav-link font-medium text-secondary-foreground/80 hover:text-yellow-400 transition-colors"
            >
              {item.label.split("").map((char, i) => (
                <span key={i} className="drop-char">{char}</span>
              ))}
            </Link>
          ))}

          {/* Mobile Log in */}
          <button
            className="mt-4 w-full px-5 py-2 rounded-lg border border-secondary-foreground/30
                       bg-yellow-400 font-medium text-black
                       transform transition-all duration-300
                       hover:bg-yellow-400/90 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-lg
                       focus-visible:-translate-y-1 focus-visible:-translate-x-1 focus-visible:shadow-lg
                       active:translate-x-0 active:translate-y-0 active:shadow-md"
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
}
