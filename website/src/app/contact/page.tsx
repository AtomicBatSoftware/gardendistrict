import { Navbar } from "@/components/navbar"
import ContactForm from "@/components/contact-form"
import { contactMetadata } from "@/config/seo-metadata"

export const metadata = contactMetadata

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <ContactForm/>
    </div>
  )
}
