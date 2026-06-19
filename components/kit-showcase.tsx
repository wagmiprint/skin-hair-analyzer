import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function KitShowcase() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 text-neutral-50">
      {/* Background image */}
      <Image
        src="/images/era-kit-box.jpeg"
        alt="The Era DNA testing kit: a premium black box with applicator, swab, and instructions"
        fill
        className="object-cover object-center opacity-70"
        sizes="100vw"
      />
      {/* Readability overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/70 to-neutral-950/30" />

      {/* Content */}
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-28 lg:py-40">
        <div className="max-w-xl">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-5">
            The Era Kit
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-balance leading-[1.1]">
            Beautifully simple. Engineered for your biology.
          </h2>
          <p className="mt-6 text-lg text-neutral-300 leading-relaxed text-pretty">
            Every Era kit arrives in premium, sustainable packaging—complete with a painless
            cheek swab, prepaid return mailer, and step-by-step instructions. Collect your sample
            in minutes and unlock a skincare and hair regrowth plan built around your DNA.
          </p>
          <div className="mt-10">
            <Button size="lg" className="gap-2 px-8 h-14 text-base">
              Get Your DNA Kit
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
