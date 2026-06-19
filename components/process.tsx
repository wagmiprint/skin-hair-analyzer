"use client"

import { useRef, useEffect, useState } from "react"
import Image from "next/image"
import { ArrowRight, Droplets, Video, Package, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const steps = [
  {
    step: "01",
    title: "Swab & Send",
    subtitle: "It all starts with a simple cheek swab at home.",
    description: "Order your Era DNA kit and collect your sample in minutes with a painless mouth swab. Drop it in the prepaid mailer and send it back to our certified lab—no needles, no appointments.",
    image: "/images/process-assess.jpg",
    icon: Droplets,
    color: "from-[#7C9A82]/20 to-[#7C9A82]/5",
  },
  {
    step: "02",
    title: "Analyze & Decode",
    subtitle: "Your genetics reveal what your skin and hair really need.",
    description: "Our lab sequences 200+ genetic markers tied to collagen production, oil balance, hair follicle health, and sensitivity—building a complete picture of your unique skin and hair biology.",
    image: "/images/dna-analysis.png",
    logo: "/images/era-logo.png",
    icon: Video,
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    step: "03",
    title: "Prescribe & Plan",
    subtitle: "A licensed physician designs your custom routine.",
    description: "An Era physician reviews your DNA results and prescribes targeted medications and OTC solutions for skincare and hair regrowth—formulated specifically for your genetic profile.",
    image: "/images/process-consult.jpg",
    icon: Package,
    color: "from-[#7C9A82]/20 to-[#7C9A82]/5",
  },
  {
    step: "04",
    title: "Treat & Transform",
    subtitle: "Your personalized formulas arrive at your door.",
    description: "Your prescriptions and OTC products ship straight to you, with ongoing physician support and refinements as your skin and hair respond. Real results, backed by your biology.",
    image: "/images/process-optimize.jpg",
    icon: Zap,
    color: "from-[#7C9A82]/20 to-[#7C9A82]/5",
  },
]

function ProcessStep({ step, index, isActive }: { step: typeof steps[0]; index: number; isActive: boolean }) {
  const Icon = step.icon
  
  return (
    <div 
      className={cn(
        "flex flex-col lg:grid lg:grid-cols-2 gap-6 lg:gap-20 items-center transition-all duration-700",
        isActive ? "opacity-100" : "opacity-60"
      )}
    >
      {/* Content Side */}
      <div className={cn(
        "order-2 text-center lg:text-left",
        index % 2 === 0 ? "lg:order-1" : "lg:order-2"
      )}>
        {/* Step indicator */}
        <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
          <div className={cn(
            "flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br transition-all duration-500",
            step.color,
            isActive ? "scale-100" : "scale-90"
          )}>
            <Icon className={cn(
              "w-6 h-6 transition-colors duration-500",
              isActive ? "text-foreground" : "text-muted-foreground"
            )} />
          </div>
          <span className="text-sm font-medium text-muted-foreground tracking-widest">
            STEP {step.step}
          </span>
        </div>

        {/* Title */}
        <h3 className={cn(
          "text-2xl sm:text-3xl lg:text-5xl font-serif font-medium text-foreground mb-3 lg:mb-4 transition-all duration-500",
          isActive ? "translate-y-0" : "translate-y-2"
        )}>
          {step.title}
        </h3>

        {/* Subtitle */}
        <p className={cn(
          "text-base lg:text-xl text-primary font-medium mb-3 lg:mb-4 transition-all duration-500 delay-75",
          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}>
          {step.subtitle}
        </p>

        {/* Description */}
        <p className={cn(
          "text-sm lg:text-lg text-muted-foreground leading-relaxed mb-6 lg:mb-8 transition-all duration-500 delay-100",
          isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        )}>
          {step.description}
        </p>

        {/* CTA */}
        <div className="flex justify-center lg:justify-start">
          <Button 
            variant="outline" 
            className={cn(
              "gap-2 transition-all duration-500 delay-150",
              isActive ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            )}
          >
            Learn More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Image Side */}
      <div className={cn(
        "order-1 relative",
        index % 2 === 0 ? "lg:order-2" : "lg:order-1"
      )}>
        <div className={cn(
          "relative aspect-[4/3] rounded-3xl overflow-hidden transition-all duration-700",
          isActive ? "scale-100 shadow-2xl" : "scale-95 shadow-lg"
        )}>
          <Image
            src={step.image}
            alt={step.title}
            fill
            className="object-cover"
          />
          {/* Gradient overlay */}
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-500",
            isActive ? "opacity-100" : "opacity-0"
          )} />
          {/* Brand logo badge */}
          {"logo" in step && step.logo && (
            <div className="absolute top-5 left-5 flex items-center rounded-full bg-background/85 backdrop-blur-sm px-4 py-2 shadow-md">
              <Image
                src={step.logo as string}
                alt="Era"
                width={64}
                height={24}
                className="h-5 w-auto"
              />
            </div>
          )}
        </div>

        {/* Floating step number - hidden on mobile */}
        <div className={cn(
          "hidden lg:flex absolute -bottom-6 transition-all duration-500",
          index % 2 === 0 ? "-left-8" : "-right-8",
          isActive ? "scale-100 opacity-100" : "scale-75 opacity-50"
        )}>
          <div className="w-32 h-32 bg-accent text-accent-foreground rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl font-serif font-bold">{step.step}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Process() {
  const [activeStep, setActiveStep] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const stepRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const handleScroll = () => {
      const viewportCenter = window.innerHeight / 2

      let closestIndex = 0
      let closestDistance = Infinity

      stepRefs.current.forEach((ref, index) => {
        if (!ref) return
        
        const rect = ref.getBoundingClientRect()
        const elementCenter = rect.top + rect.height / 2
        const distance = Math.abs(elementCenter - viewportCenter)

        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveStep(closestIndex)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-cream text-cream-foreground" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-24">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Understand the Process
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground mb-6 text-balance">
            From cheek swab to custom skincare and hair regrowth—powered by your DNA.
          </h2>
        </div>

        {/* Reading panel */}
        <div className="rounded-3xl px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
          {/* Progress indicator - desktop */}
          <div className="hidden lg:flex justify-center mb-16">
            <div className="flex items-center gap-2">
              {steps.map((step, index) => (
                <button
                  key={step.step}
                  onClick={() => {
                    stepRefs.current[index]?.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  }}
                  className="flex items-center gap-2 group"
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                    activeStep === index 
                      ? "bg-primary text-primary-foreground scale-110" 
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}>
                    {step.step}
                  </div>
                  {index < steps.length - 1 && (
                    <div className={cn(
                      "w-16 h-0.5 transition-colors duration-300",
                      activeStep > index ? "bg-primary" : "bg-muted"
                    )} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-20 lg:space-y-48">
            {steps.map((step, index) => (
              <div
                key={step.step}
                ref={(el) => { stepRefs.current[index] = el }}
                className="rounded-3xl border border-background/70 bg-background/30 p-6 sm:p-10 lg:p-14"
              >
                <ProcessStep 
                  step={step} 
                  index={index} 
                  isActive={activeStep === index}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
