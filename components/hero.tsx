"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import Image from "next/image"

const heroImages = [
  { src: "/images/hero-main.jpg", alt: "Woman with healthy skin and hair" },
  { src: "/images/hero-main-male.png", alt: "Man with healthy skin and hair" },
]

export function Hero() {
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen">
      {/* Full-width hero with split layout */}
      <div className="flex flex-col lg:grid lg:grid-cols-2 min-h-screen">
        {/* Left content */}
        <div className="flex flex-col justify-center items-center lg:items-start px-6 lg:px-12 xl:px-20 py-12 pt-16 lg:py-24 lg:pt-28 order-2 lg:order-1">
          <div className="w-full max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            {/* Animated text ticker */}
            <div className="overflow-hidden mb-8">
              <div className="flex animate-marquee whitespace-nowrap text-sm text-primary font-medium tracking-wide">
                <span className="mx-4">Hair Thinning</span>
                <span className="mx-4">Fine Lines</span>
                <span className="mx-4">Acne</span>
                <span className="mx-4">Dull Skin</span>
                <span className="mx-4">Receding Hairline</span>
                <span className="mx-4">Uneven Tone</span>
                <span className="mx-4">Hair Thinning</span>
                <span className="mx-4">Fine Lines</span>
                <span className="mx-4">Acne</span>
                <span className="mx-4">Dull Skin</span>
                <span className="mx-4">Receding Hairline</span>
                <span className="mx-4">Uneven Tone</span>
              </div>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif font-medium tracking-tight text-foreground leading-[1.1]">
              Skincare & hair regrowth engineered around{" "}
              <span className="text-primary">your DNA</span>
            </h1>

            {/* Subheadline */}
            <p className="mt-8 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0">
              Era turns a simple at-home cheek swab into a personalized treatment plan—analyzed 
              by licensed physicians who prescribe medications and OTC solutions shipped to your door.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start gap-4">
              <Button size="lg" className="gap-2 px-8 h-14 text-base">
                Get Your DNA Kit
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="gap-2 h-14 px-8 text-base border-2 text-foreground hover:bg-muted">
                    <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    Free AI Assessment
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl w-[95vw] p-0 overflow-hidden gap-0">
                  <DialogHeader className="px-6 py-4 border-b border-border">
                    <DialogTitle className="font-serif font-medium">Free AI Assessment</DialogTitle>
                  </DialogHeader>
                  <iframe
                    src="https://scan.eradna.com/"
                    title="Era Free AI Assessment"
                    className="w-full h-[70vh] border-0"
                  />
                </DialogContent>
              </Dialog>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 lg:mt-16 pt-8 border-t border-border w-full">
              <div className="grid grid-cols-3 gap-4 text-center lg:text-left lg:flex lg:flex-wrap lg:items-center lg:gap-x-10 lg:gap-y-4">
                <div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-foreground">50K+</span>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Kits Analyzed</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-foreground">98%</span>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Satisfaction Rate</p>
                </div>
                <div>
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-semibold text-foreground">200+</span>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-1">Genetic Markers</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="relative order-1 lg:order-2 h-[45vh] sm:h-[50vh] lg:h-auto lg:min-h-screen overflow-hidden">
          {heroImages.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover object-center transition-opacity duration-[2000ms] ease-in-out ${
                activeImage === index ? "opacity-100" : "opacity-0"
              }`}
              priority={index === 0}
            />
          ))}
          {/* Overlay gradient for mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background lg:hidden" />
          {/* Left edge gradient for desktop */}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/20 to-transparent hidden lg:block" />
        </div>
      </div>
    </section>
  )
}
