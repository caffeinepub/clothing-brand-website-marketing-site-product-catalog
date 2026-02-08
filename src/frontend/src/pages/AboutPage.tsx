export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-4xl font-light tracking-tight md:text-5xl">About Us</h1>

        <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
          <section>
            <h2 className="mb-4 text-2xl font-light text-foreground">Our Philosophy</h2>
            <p>
              We believe that true style is timeless. In a world of fast fashion and fleeting trends, we create clothing that transcends seasons and stands the test of time. Each piece in our collection is thoughtfully designed to become a cherished part of your wardrobe.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-light text-foreground">Craftsmanship</h2>
            <p>
              Quality is at the heart of everything we do. We work with skilled artisans and use only the finest materials to ensure that every garment meets our exacting standards. From the initial sketch to the final stitch, we pay attention to every detail.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-light text-foreground">Sustainability</h2>
            <p>
              We're committed to responsible fashion. By creating timeless pieces that last, we encourage mindful consumption. Our focus on quality over quantity means fewer items in your closet, but ones you'll treasure for years to come.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-light text-foreground">Our Vision</h2>
            <p>
              We envision a world where clothing is valued for its craftsmanship, longevity, and the stories it tells. Where each piece is chosen with intention and worn with pride. This is the future we're building, one garment at a time.
            </p>
          </section>
        </div>

        <div className="mt-16 rounded-lg bg-muted/30 p-8 text-center md:p-12">
          <h2 className="mb-4 text-2xl font-light">Join Our Journey</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Thank you for being part of our story. We're honored to create clothing that becomes part of yours.
          </p>
        </div>
      </div>
    </div>
  );
}
