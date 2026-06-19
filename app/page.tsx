import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Process } from "@/components/process"
import { Treatments } from "@/components/treatments"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { CTA } from "@/components/cta"
import { FAQ } from "@/components/faq"
import { KitShowcase } from "@/components/kit-showcase"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Process />
      <Treatments />
      <KitShowcase />
      <Testimonials />
      <Pricing />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}
