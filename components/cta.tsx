import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function CTA() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/couple-wellness.jpg"
          alt="Person with healthy skin and hair"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-accent/90" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
              Your New Beginning
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-accent-foreground text-balance">
              Uncover what your DNA reveals with Era
            </h2>
            <p className="mt-6 text-lg text-accent-foreground/70 leading-relaxed">
              Getting started is 100% risk-free. For just $65, you&apos;ll get your at-home 
              DNA kit (200+ genetic markers), a private telehealth consult with a licensed 
              physician, and a personalized skincare & hair regrowth plan with treatments 
              shipped to your door.
            </p>
            
            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Button 
                size="lg" 
                className="gap-2 h-14 px-8 text-base"
              >
                Get Your DNA Kit
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-accent-foreground/30 text-accent-foreground hover:bg-accent-foreground/10 h-14 px-8 text-base"
              >
                Schedule a Call
              </Button>
            </div>
          </div>

          {/* Stats card */}
          <div className="bg-card rounded-3xl p-8 lg:p-10 shadow-2xl">
            <h3 className="text-2xl font-serif font-medium text-foreground mb-8">
              What you get for $65
            </h3>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-serif font-semibold text-primary">1</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">At-Home DNA Kit</p>
                  <p className="text-sm text-muted-foreground mt-1">200+ genetic markers analyzed</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-serif font-semibold text-primary">2</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Physician Consultation</p>
                  <p className="text-sm text-muted-foreground mt-1">Private telehealth session</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="text-xl font-serif font-semibold text-primary">3</span>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Personalized Plan</p>
                  <p className="text-sm text-muted-foreground mt-1">Custom skincare & hair protocol</p>
                </div>
              </li>
            </ul>
            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-xs text-muted-foreground">
                No commitments. Cancel anytime. 100% satisfaction guaranteed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
