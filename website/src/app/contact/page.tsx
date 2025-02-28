import { Navbar } from "@/components/navbar"

export default function ContactPage() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center min-h-screen bg-gray-100">
          <div className="text-center pt-8">
              <h2 className="text-3xl font-semibold text-gray-800">Contact Us</h2>
              <div>Call or email us, and we&apos;ll get back to you ASAP</div>
              <div className="mt-4">
                  <p className="text-gray-600">Email:</p>
                  <a href="mailto:example@email.com" className="text-blue-500 hover:underline">jessica@gardendistrictgr.com</a>
              </div>
              <div className="mt-4">
                  <p className="text-gray-600">Phone:</p>
                  <div>(616) 317-7373</div>
              </div>
            </div>
      </div>
    </div>
  )
}
