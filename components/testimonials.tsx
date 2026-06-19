"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const testimonials = [
  {
    id: 444,
    quote: "After years of trying random products, the DNA kit finally explained why nothing worked. My prescribed routine cleared my skin in about six weeks.",
    name: "Jarred",
    age: 42,
    image: "/images/testimonial-jarred.jpg",
  },
  {
    id: 111,
    quote: "The swab took two minutes and the results were fascinating. My physician built a regimen around my genetics and my hairline has noticeably filled in.",
    name: "Shannon",
    age: 38,
    image: "/images/testimonial-shannon.jpg",
  },
  {
    id: 194,
    quote: "Very thorough review of my DNA results with honest, helpful guidance. They didn't push extra products—just what my skin actually needed.",
    name: "Josh",
    age: 37,
    image: "/images/testimonial-josh.jpg",
  },
  {
    id: 132,
    quote: "My thinning had me worried for years. The personalized Minoxidil and Finasteride plan from Era's doctor has been a genuine confidence boost.",
    name: "Dom",
    age: 41,
    image: "/images/testimonial-dom.jpg",
  },
  {
    id: 1947,
    quote: "Knowing the science behind my skin changed everything. My fine lines have softened and my complexion looks healthier than it has in years.",
    name: "Dustin",
    age: 52,
    image: "/images/testimonial-dustin.jpg",
  },
  {
    id: 732,
    quote: "I feel really well supported by the Era physician, and my breakouts cleared up within just a few weeks of starting my prescribed routine.",
    name: "Polly",
    age: 44,
    image: "/images/testimonial-polly.jpg",
  },
]

export function Testimonials() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section id="testimonials" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 text-center lg:text-left">
          <div>
            <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
              Real People. Real Stories.
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground">
              Transformations that speak
            </h2>
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-center lg:justify-start gap-2 mt-6 lg:mt-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonials</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-12 h-12"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="h-5 w-5" />
              <span className="sr-only">Next testimonials</span>
            </Button>
          </div>
        </div>

        {/* Testimonials Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6 snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex-shrink-0 w-[320px] lg:w-[360px] snap-start group"
            >
              <div className="bg-card rounded-3xl overflow-hidden h-full border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={`${testimonial.name}'s transformation`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Story number overlay */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
                    <p className="text-xs font-medium text-foreground">
                      Story No. {testimonial.id}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Author */}
                  <p className="font-semibold text-foreground mb-3">
                    {testimonial.name}, {testimonial.age}*
                  </p>

                  {/* Quote */}
                  <blockquote className="text-sm text-muted-foreground leading-relaxed">
                    {testimonial.quote}
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-muted-foreground mt-8">
          * Compensated Era Patient. Individual results may vary.
        </p>
      </div>
    </section>
  )
}
