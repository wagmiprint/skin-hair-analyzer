import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const plans = [
  {
    tier: "01",
    name: "Era Essentials",
    tagline: "Simple. Flexible. Affordable.",
    description: "Our ESSENTIALS membership includes your at-home DNA kit plus exclusive discounts on select OTC skincare and hair products, with the option to purchase a physician consult.",
    price: 25,
    period: "month",
    features: [
      "At-home DNA testing kit covering 200+ genetic markers",
      "Ability to purchase telehealth consults with licensed physicians",
      "Members-only pricing on OTC skincare & hair products",
    ],
    popular: false,
    cta: "Get Started",
  },
  {
    tier: "02",
    name: "Era Complete",
    tagline: "Chosen by 95% of members — DNA-powered skin & hair care, elevated.",
    description: "Get full DNA analysis, deep physician consults, and prescription treatment plans built around your genetics for skincare and hair regrowth.",
    price: 149,
    period: "month",
    features: [
      "At-home DNA testing kit covering 200+ genetic markers",
      "A private telehealth consult with licensed physicians",
      "Personalized prescriptions: retinoids, Finasteride, Minoxidil & more",
      "Routine check-ins and plan adjustments every 90 days",
    ],
    popular: true,
    cta: "Start Complete",
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 lg:py-32 bg-surface">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Membership with Meaning
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground text-balance">
            Choose your path to better skin & hair
          </h2>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-3xl p-8 lg:p-10 transition-all",
                plan.popular
                  ? "bg-accent text-accent-foreground ring-2 ring-primary"
                  : "bg-card border border-border"
              )}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-8">
                  <span className="px-4 py-1.5 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Tier */}
              <p className={cn(
                "text-sm font-medium mb-4",
                plan.popular ? "text-primary" : "text-muted-foreground"
              )}>
                Tier {plan.tier}
              </p>

              {/* Plan name */}
              <h3 className={cn(
                "text-2xl lg:text-3xl font-serif font-medium mb-2",
                plan.popular ? "text-accent-foreground" : "text-foreground"
              )}>
                {plan.name}
              </h3>

              {/* Tagline */}
              <p className={cn(
                "text-sm font-medium mb-4",
                plan.popular ? "text-primary" : "text-primary"
              )}>
                {plan.tagline}
              </p>

              {/* Description */}
              <p className={cn(
                "text-sm leading-relaxed mb-8",
                plan.popular ? "text-accent-foreground/70" : "text-muted-foreground"
              )}>
                {plan.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <p className={cn(
                  "text-sm font-medium mb-4",
                  plan.popular ? "text-accent-foreground" : "text-foreground"
                )}>
                  Plan Features:
                </p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={cn(
                        "h-5 w-5 shrink-0 mt-0.5",
                        plan.popular ? "text-primary" : "text-primary"
                      )} />
                      <span className={cn(
                        "text-sm",
                        plan.popular ? "text-accent-foreground/90" : "text-foreground"
                      )}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className={cn(
                    "text-5xl font-serif font-semibold",
                    plan.popular ? "text-accent-foreground" : "text-foreground"
                  )}>
                    ${plan.price}
                  </span>
                  <span className={cn(
                    "text-lg",
                    plan.popular ? "text-accent-foreground/70" : "text-muted-foreground"
                  )}>
                    /{plan.period}
                  </span>
                </div>
                <p className={cn(
                  "text-xs mt-2",
                  plan.popular ? "text-accent-foreground/60" : "text-muted-foreground"
                )}>
                  plus cost of medication
                </p>
              </div>

              {/* CTA */}
              <Button
                className={cn(
                  "w-full h-12 gap-2",
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : ""
                )}
                variant={plan.popular ? "default" : "outline"}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-block bg-secondary rounded-2xl p-8 lg:p-12 max-w-3xl">
            <h3 className="text-2xl lg:text-3xl font-serif font-medium text-foreground mb-4">
              Discover What Your DNA Reveals
            </h3>
            <p className="text-muted-foreground mb-6">
              Getting started is 100% risk-free. For just $65, you&apos;ll get your at-home DNA kit (200+ genetic markers), 
              a private telehealth consult with a licensed physician, and a personalized skincare & hair regrowth plan.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="gap-2">
                Get Started for $65
                <ArrowRight className="h-4 w-4" />
              </Button>
              <span className="text-sm text-muted-foreground">per DNA Kit + Consult</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
