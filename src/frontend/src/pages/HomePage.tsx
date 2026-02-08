import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/catalog/ProductCard';
import CollectionCard from '@/components/catalog/CollectionCard';
import { useAllProducts, useAllCollections } from '@/hooks/useCatalogQueries';
import { Skeleton } from '@/components/ui/skeleton';

export default function HomePage() {
  const { data: products, isLoading: productsLoading } = useAllProducts();
  const { data: collections, isLoading: collectionsLoading } = useAllCollections();

  const featuredProducts = products?.slice(0, 4) || [];
  const featuredCollections = collections?.slice(0, 2) || [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden bg-muted/30">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/assets/generated/hero-editorial.dim_2400x1400.png)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background/80" />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center md:px-8">
          <h1 className="mb-6 text-4xl font-light tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Timeless Elegance
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-foreground/80 md:text-xl">
            Discover our curated collection of premium clothing designed for the modern individual who values quality and style.
          </p>
          <Link to="/shop">
            <Button size="lg" className="gap-2">
              Explore Collection <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Collections */}
      <section className="container mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-light tracking-tight md:text-4xl">Featured Collections</h2>
          <p className="text-muted-foreground">Explore our carefully curated seasonal collections</p>
        </div>
        {collectionsLoading ? (
          <div className="grid gap-8 md:grid-cols-2">
            {[1, 2].map((i) => (
              <Skeleton key={i} className="h-96 w-full" />
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2">
            {featuredCollections.map((collection) => (
              <CollectionCard key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </section>

      {/* Featured Products */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-light tracking-tight md:text-4xl">New Arrivals</h2>
            <p className="text-muted-foreground">The latest additions to our collection</p>
          </div>
          {productsLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          <div className="mt-12 text-center">
            <Link to="/shop">
              <Button variant="outline" size="lg">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section className="container mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-6 text-3xl font-light tracking-tight md:text-4xl">Our Story</h2>
          <p className="mb-8 text-lg leading-relaxed text-muted-foreground">
            We believe in creating clothing that transcends trends. Each piece is thoughtfully designed to become a staple in your wardrobe, combining timeless aesthetics with exceptional craftsmanship.
          </p>
          <Link to="/about">
            <Button variant="ghost" className="gap-2">
              Learn More <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
