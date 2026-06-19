import Link from "next/link"
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

const navigation = {
  treatments: [
    { name: "Anti-Aging Skincare", href: "#" },
    { name: "Acne Treatment", href: "#" },
    { name: "Hair Regrowth", href: "#" },
    { name: "Pigmentation", href: "#" },
    { name: "Scalp Health", href: "#" },
  ],
  company: [
    { name: "About Era", href: "#" },
    { name: "Our Physicians", href: "#" },
    { name: "The Science", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
  ],
  support: [
    { name: "Help Center", href: "#" },
    { name: "Contact Us", href: "#" },
    { name: "FAQs", href: "#" },
    { name: "Shipping Info", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "HIPAA Notice", href: "#" },
    { name: "Genetic Privacy", href: "#" },
  ],
}

const social = [
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "YouTube", href: "#", icon: Youtube },
]

export function Footer() {
  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 lg:py-24">
        {/* Top section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="inline-block">
              <span className="text-4xl font-serif font-semibold tracking-tight text-accent-foreground">
                Era
              </span>
            </Link>
            <p className="mt-6 text-sm text-accent-foreground/60 max-w-sm leading-relaxed">
              DNA-powered skincare and hair regrowth designed around your genetics. 
              Physician-prescribed treatments, delivered to your door.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4 mt-8">
              {social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-accent-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={item.name}
                >
                  <item.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-sm font-semibold text-accent-foreground mb-4 uppercase tracking-wide">
              Treatments
            </h3>
            <ul className="space-y-3">
              {navigation.treatments.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-accent-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-accent-foreground mb-4 uppercase tracking-wide">
              Company
            </h3>
            <ul className="space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-accent-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-accent-foreground mb-4 uppercase tracking-wide">
              Support
            </h3>
            <ul className="space-y-3">
              {navigation.support.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-accent-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-accent-foreground mb-4 uppercase tracking-wide">
              Legal
            </h3>
            <ul className="space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.href} 
                    className="text-sm text-accent-foreground/60 hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-accent-foreground/10">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <p className="text-sm text-accent-foreground/50">
              &copy; {new Date().getFullYear()} Era Health, Inc. All rights reserved.
            </p>
            <p className="text-xs text-accent-foreground/40 max-w-lg text-center lg:text-right">
              Era is a DNA testing and telehealth platform that connects customers with licensed physicians. 
              Prescription treatment requires consultation with a healthcare provider.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
