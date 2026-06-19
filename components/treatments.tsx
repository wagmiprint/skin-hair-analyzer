"use client"

import { useState } from "react"
import { ArrowRight, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Image from "next/image"

const categories = [
  { id: "skincare", label: "Skincare" },
  { id: "hair", label: "Hair Regrowth" },
]

// Theme colors for each category
const themeColors = {
  skincare: {
    primary: "#7C9A82", // sage green
    primaryLight: "rgba(124, 154, 130, 0.1)",
    primaryMedium: "rgba(124, 154, 130, 0.2)",
    sectionBg: "#2A3A2E", // dark green background
    sectionText: "#E8EDE9", // light green-tinted text
  },
  hair: {
    primary: "#6B8CAE", // soft blue
    primaryLight: "rgba(107, 140, 174, 0.1)",
    primaryMedium: "rgba(107, 140, 174, 0.2)",
    sectionBg: "#2A333A", // dark blue background
    sectionText: "#E8ECF0", // light blue-tinted text
  },
}

const treatments = {
  skincare: [
    {
      id: "anti-aging",
      title: "Smooth Fine Lines & Wrinkles",
      shortTitle: "Anti-Aging",
      description: "Your DNA reveals how your skin produces collagen and ages over time. Era physicians prescribe targeted retinoids and actives to soften fine lines and restore firmness.",
      image: "/images/treatment-hormone.jpg",
    },
    {
      id: "acne",
      title: "Clear & Prevent Acne",
      shortTitle: "Acne",
      description: "Genetic insights into oil production and inflammation let our physicians prescribe the right prescription-strength treatments to clear breakouts and keep skin balanced.",
      image: "/images/treatment-longevity.jpg",
    },
    {
      id: "pigmentation",
      title: "Even Out Tone & Dark Spots",
      shortTitle: "Pigmentation",
      description: "Understand your skin's tendency toward hyperpigmentation and get custom-formulated brightening treatments designed to fade dark spots and even your complexion.",
      image: "/images/treatment-weight.jpg",
    },
    {
      id: "hydration",
      title: "Restore Hydration & Barrier",
      shortTitle: "Hydration",
      description: "Your genetics influence how well your skin retains moisture. Get a personalized routine of OTC and prescription solutions to repair your barrier and lock in hydration.",
      image: "/images/treatment-sexual.jpg",
    },
    {
      id: "sensitivity",
      title: "Calm Sensitive Skin",
      shortTitle: "Sensitivity",
      description: "If your DNA flags heightened sensitivity, our physicians tailor gentle, effective formulas that reduce redness and irritation without compromising results.",
      image: "/images/treatment-appearance.jpg",
    },
  ],
  hair: [
    {
      id: "thinning",
      title: "Stop Hair Thinning",
      shortTitle: "Thinning",
      description: "Your DNA identifies your sensitivity to DHT and follicle health. Era physicians prescribe clinically proven treatments like Finasteride to slow and stop hair loss.",
      image: "/images/men-hormone.jpg",
    },
    {
      id: "regrowth",
      title: "Regrow Thicker, Fuller Hair",
      shortTitle: "Regrowth",
      description: "Get physician-prescribed Minoxidil and custom topical formulas matched to your genetics to reactivate dormant follicles and regrow denser hair.",
      image: "/images/men-longevity.jpg",
    },
    {
      id: "scalp",
      title: "Restore Scalp Health",
      shortTitle: "Scalp Health",
      description: "Genetic markers reveal how your scalp responds to inflammation and oil. Get targeted OTC and prescription solutions to create the ideal foundation for hair growth.",
      image: "/images/men-weight.jpg",
    },
    {
      id: "hairline",
      title: "Rebuild Your Hairline",
      shortTitle: "Hairline",
      description: "Address a receding hairline with a DNA-informed protocol of prescription and over-the-counter treatments designed around your specific pattern of loss.",
      image: "/images/men-sexual.jpg",
    },
    {
      id: "strength",
      title: "Strengthen & Protect Hair",
      shortTitle: "Strength",
      description: "Your genetics shape hair strength and breakage risk. Era physicians recommend solutions to fortify strands and protect against future thinning.",
      image: "/images/men-appearance.jpg",
    },
  ],
}

export function Treatments() {
  const [activeCategory, setActiveCategory] = useState<"skincare" | "hair">("skincare")
  const [activeTreatment, setActiveTreatment] = useState(0)

  const currentTreatments = treatments[activeCategory]
  const currentTreatment = currentTreatments[activeTreatment]
  const theme = themeColors[activeCategory]

  return (
    <section 
      id="treatments" 
      className="py-24 lg:py-32 transition-colors duration-500"
      style={{ backgroundColor: theme.sectionBg, color: theme.sectionText }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p 
            className="text-sm font-medium tracking-widest uppercase mb-4 transition-colors duration-500"
            style={{ color: theme.primary }}
          >
            Built From Your Genetics
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-balance">
            Find the Right Formula
          </h2>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center mb-10 lg:mb-16">
          <div 
            className="inline-flex rounded-full p-1 lg:p-1.5 transition-colors duration-500"
            style={{ backgroundColor: `${theme.sectionText}15` }}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id as "skincare" | "hair")
                  setActiveTreatment(0)
                }}
                className={cn(
                  "px-4 sm:px-6 lg:px-8 py-2 lg:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300"
                )}
                style={{
                  backgroundColor: activeCategory === category.id ? themeColors[category.id as "skincare" | "hair"].primary : "transparent",
                  color: activeCategory === category.id ? "white" : theme.sectionText,
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left - Featured Treatment Card */}
          <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden bg-background min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={currentTreatment.image}
                alt={currentTreatment.title}
                fill
                className="object-cover transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-end p-6 lg:p-12">
              <span 
                className="inline-block self-start px-3 lg:px-4 py-1 lg:py-1.5 backdrop-blur-sm text-white text-xs font-medium rounded-full mb-4 lg:mb-6 transition-colors duration-500"
                style={{ backgroundColor: `${theme.primary}99` }}
              >
                {activeCategory === "skincare" ? "Skincare" : "Hair Regrowth"}
              </span>

              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-medium text-white mb-3 lg:mb-4">
                {currentTreatment.title}
              </h3>
              
              <p className="text-white/80 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 max-w-lg">
                {currentTreatment.description}
              </p>

              <Button 
                size="lg"
                className="self-start gap-2 text-accent hover:opacity-90 transition-all duration-300"
                style={{ backgroundColor: theme.primary, color: "white" }}
              >
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right - Treatment List */}
          <div className="flex flex-col justify-center">
            <div className="space-y-2">
              {currentTreatments.map((treatment, index) => (
                <button
                  key={treatment.id}
                  onClick={() => setActiveTreatment(index)}
                  className={cn(
                    "w-full group flex items-center justify-between p-4 lg:p-6 rounded-xl lg:rounded-2xl text-left transition-all duration-300 border-l-4",
                    activeTreatment !== index && "border-transparent"
                  )}
                  onMouseEnter={(e) => {
                    if (activeTreatment !== index) {
                      e.currentTarget.style.backgroundColor = `${theme.sectionText}08`
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTreatment !== index) {
                      e.currentTarget.style.backgroundColor = "transparent"
                    }
                  }}
                  style={{
                    backgroundColor: activeTreatment === index ? theme.primaryLight : undefined,
                    borderLeftColor: activeTreatment === index ? theme.primary : "transparent",
                  }}
                >
                  <div className="flex items-center gap-3 lg:gap-4">
                    <span 
                      className="text-2xl sm:text-3xl lg:text-5xl font-serif font-light transition-colors duration-300"
                      style={{ color: activeTreatment === index ? theme.primary : `${theme.sectionText}40` }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span 
                      className="text-base lg:text-xl font-medium transition-colors duration-300"
                      style={{ color: activeTreatment === index ? theme.sectionText : `${theme.sectionText}B0` }}
                    >
                      {treatment.shortTitle}
                    </span>
                  </div>
                  <ChevronRight 
                    className={cn(
                      "h-5 w-5 transition-all duration-300",
                      activeTreatment === index 
                        ? "translate-x-0 opacity-100" 
                        : "-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                    )} 
                    style={{ color: activeTreatment === index ? theme.primary : `${theme.sectionText}40` }}
                  />
                </button>
              ))}
            </div>

            {/* Bottom Tags */}
            <div 
              className="flex flex-wrap gap-2 lg:gap-3 mt-8 lg:mt-12 pt-6 lg:pt-8 transition-colors duration-500"
              style={{ borderTop: `1px solid ${theme.sectionText}15` }}
            >
              {currentTreatments.map((treatment, index) => (
                <button
                  key={treatment.id}
                  onClick={() => setActiveTreatment(index)}
                  className="px-3 lg:px-4 py-1.5 lg:py-2 rounded-full text-xs lg:text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: activeTreatment === index ? theme.primary : `${theme.sectionText}15`,
                    color: activeTreatment === index ? "white" : `${theme.sectionText}B0`,
                  }}
                >
                  {treatment.shortTitle}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
