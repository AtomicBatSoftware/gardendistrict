'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { X } from 'lucide-react'


import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Alert, AlertDescription } from './ui/alert'

// Schema for contact form validation
const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Invalid email address' }),
  phone: z.string()
          .optional()
          .refine(val => !val || /^\d{10,15}$/.test(val), { message: 'Phone number must be between 10-15 digits' }),
  message: z
    .string()
    .min(10, { message: 'Message must be at least 10 characters long' }),
})

export default function ContactForm() {
  const [responsePending, setResponsePending] = useState(false);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Simulate a successful contact form submission
      console.log(values)
      console.log("Sending message");
      const url = "https://api.atomicbatsoftware.com/batmail";
      const data = {
        tenantId: '96861870-5477-4df8-bb33-2cd9eef1cff8',
        subject: "[Batmail][GardenDistrict-Contact]",
        message: {
          text: JSON.stringify(values, null, 2)
        }
      };

      setResponsePending(true);
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });

      setResponsePending(false);
      if (response.status === 200) {
        setAlert({ type: 'success', message: 'Message sent successfully!' });
      } else {
        setAlert({ type: 'error', message: 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      console.error("Error sending request:", error);
      setResponsePending(false);
      setAlert({ type: 'error', message: 'Failed to send message. Please try again.' });
    }
  }

  return (
    <div className="flex min-h-[60vh] h-full w-full items-center justify-center px-4 py-4">
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Contact Us</CardTitle>
          <CardDescription>
            Please fill out the form below and we will get back to you shortly.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid gap-4">
                {/* Name Field */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <FormControl>
                        <Input
                          id="name"
                          placeholder="John Doe"
                          type="text"
                          autoComplete="name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="johndoe@mail.com"
                          type="email"
                          autoComplete="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Field */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="phone">Phone (optional) </FormLabel>
                      <FormControl>
                        <Input
                          id="phone"
                          placeholder="1234567890"
                          type="tel"
                          autoComplete="tel"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message Field */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="grid gap-2">
                      <FormLabel htmlFor="message">Message</FormLabel>
                      <FormControl>
                        <Textarea
                          id="message"
                          placeholder="Your message..."
                          autoComplete="off"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-[#b77e08] font-bold text-white" disabled={responsePending}>
                  {responsePending ? <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span> : null}
                  {responsePending ? "Sending..." : "Send Message"}
                </Button>
                {alert && (
                  <Alert className={`relative ${alert.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <button onClick={() => setAlert(null)} className="absolute top-2 right-2 text-black">
                      <X className="w-4 h-4" />
                    </button>
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
