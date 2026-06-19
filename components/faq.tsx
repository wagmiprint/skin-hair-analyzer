"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqCategories = [
  {
    title: "Getting Started",
    description: "Era is a DNA-powered skincare and hair regrowth platform. Getting started is easy: order your at-home DNA kit for $65, collect your sample with a quick cheek swab, and mail it back in the prepaid envelope. Then you'll meet with your licensed physician to review your results.",
  },
  {
    title: "Analysis & Plan",
    description: "Once our certified lab decodes your 200+ genetic markers, a licensed physician reviews your DNA profile during a private telehealth consult. They pinpoint what's driving your skin and hair concerns and build a personalized plan—including prescription medications, OTC products, and routine guidance.",
  },
  {
    title: "During Treatment",
    description: "Your prescriptions and OTC products ship straight to your door. Since everyone's skin and hair respond differently, your Era care team stays with you every step of the way—ready to answer questions and fine-tune your routine so you get the best possible results.",
  },
  {
    title: "Membership & Pricing",
    description: "Era offers two memberships: Essentials ($25/month) for your DNA kit, the ability to purchase physician consults, and members-only pricing on OTC products. Complete ($149/month) includes everything: DNA analysis, physician consults, and full access to prescription treatments. No commitments. Cancel anytime.",
  },
]

const faqs = [
  {
    question: "How quickly will I see results?",
    answer: "Many customers notice improvements in their skin within 4-6 weeks of starting their personalized routine. Hair regrowth treatments typically take 3-6 months to show visible results, as your physician fine-tunes your plan based on how you respond.",
  },
  {
    question: "How does the DNA test work?",
    answer: "Your kit includes a simple cheek swab—no blood, no needles. You collect your sample at home in a couple of minutes, then mail it back in the prepaid envelope. Our certified lab sequences 200+ genetic markers related to your skin and hair, with results typically ready within 2-3 weeks.",
  },
  {
    question: "What can my DNA tell me about my skin and hair?",
    answer: "Your genetics influence collagen production, oil balance, sensitivity, pigmentation, hair follicle health, and DHT sensitivity—among many other factors. We analyze these markers to help your physician prescribe treatments specifically suited to your biology, rather than guessing with one-size-fits-all products.",
  },
  {
    question: "Are the prescriptions safe?",
    answer: "All treatments are prescribed and monitored by licensed physicians based on your DNA results and health history. Era uses clinically proven, FDA-approved medications like retinoids, Finasteride, and Minoxidil where appropriate, along with carefully selected OTC solutions.",
  },
  {
    question: "Can I cancel my membership?",
    answer: "Yes, you can cancel your Era membership at any time with no penalties or hidden fees. We also offer a 30-day satisfaction guarantee for new members—if you're not happy with your care, we'll refund your membership fee.",
  },
]

export function FAQ() {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-background">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-primary tracking-widest uppercase mb-4">
            Any Questions?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-medium tracking-tight text-foreground">
            We&apos;ve got answers
          </h2>
        </div>

        {/* Category Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {faqCategories.map((category) => (
            <div 
              key={category.title}
              className="bg-card rounded-2xl p-8 border border-border hover:border-primary/30 transition-colors"
            >
              <h3 className="text-xl font-semibold text-foreground mb-4">
                {category.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional FAQs Accordion */}
        <div className="max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-foreground mb-6 text-center">
            More questions
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-xl mb-3 px-6 border border-border data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Still have questions?{" "}
              <a href="#" className="text-primary font-medium hover:underline">
                Contact our care team
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
