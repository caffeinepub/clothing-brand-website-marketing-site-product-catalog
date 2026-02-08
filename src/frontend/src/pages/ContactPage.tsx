import { useState } from 'react';
import ContactForm from '@/components/contact/ContactForm';
import { CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">Get in Touch</h1>
          <p className="text-lg text-muted-foreground">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          {/* Contact Form */}
          <div>
            {submitted ? (
              <Alert className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                <AlertDescription className="text-green-800 dark:text-green-200">
                  Thank you for your message! We'll get back to you soon.
                </AlertDescription>
              </Alert>
            ) : (
              <ContactForm onSuccess={() => setSubmitted(true)} />
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 text-2xl font-light">Visit Us</h2>
              <p className="text-muted-foreground">
                Our showroom is open by appointment. Contact us to schedule a visit and experience our collection in person.
              </p>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-light">Customer Service</h2>
              <div className="space-y-2 text-muted-foreground">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>

            <div>
              <h2 className="mb-4 text-2xl font-light">FAQ</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="mb-1 font-medium">Do you ship internationally?</h3>
                  <p className="text-sm text-muted-foreground">
                    Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location.
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium">What is your return policy?</h3>
                  <p className="text-sm text-muted-foreground">
                    We accept returns within 30 days of purchase for unworn items in original condition.
                  </p>
                </div>
                <div>
                  <h3 className="mb-1 font-medium">How do I care for my garments?</h3>
                  <p className="text-sm text-muted-foreground">
                    Each item comes with specific care instructions. Generally, we recommend gentle washing and air drying.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
