import { useState } from 'react';
import ProductCard from '@/components/catalog/ProductCard';
import CollectionCard from '@/components/catalog/CollectionCard';
import { useAllProducts, useAllCollections } from '@/hooks/useCatalogQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ShopPage() {
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { data: products, isLoading: productsLoading, error: productsError } = useAllProducts();
  const { data: collections, isLoading: collectionsLoading, error: collectionsError } = useAllCollections();

  const filteredProducts = selectedCollection
    ? products?.filter((p) => p.collectionId === selectedCollection)
    : products;

  const hasError = productsError || collectionsError;

  return (
    <div className="container mx-auto px-4 py-12 md:px-8 md:py-16">
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-light tracking-tight md:text-5xl">Shop</h1>
        <p className="text-lg text-muted-foreground">
          Explore our complete collection of premium clothing
        </p>
      </div>

      {hasError && (
        <Alert variant="destructive" className="mb-8">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Unable to load products. Please try again later.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="all" onClick={() => setSelectedCollection(null)}>
            All Products
          </TabsTrigger>
          <TabsTrigger value="collections">Collections</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-8">
          {/* Collection Filter */}
          {!collectionsLoading && collections && collections.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCollection(null)}
                className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                  selectedCollection === null
                    ? 'border-foreground bg-foreground text-background'
                    : 'border-border hover:border-foreground'
                }`}
              >
                All
              </button>
              {collections.map((collection) => (
                <button
                  key={collection.id}
                  onClick={() => setSelectedCollection(collection.id)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    selectedCollection === collection.id
                      ? 'border-foreground bg-foreground text-background'
                      : 'border-border hover:border-foreground'
                  }`}
                >
                  {collection.name}
                </button>
              ))}
            </div>
          )}

          {/* Products Grid */}
          {productsLoading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          ) : filteredProducts && filteredProducts.length > 0 ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No products found in this collection.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="collections">
          {collectionsLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-96 w-full" />
              ))}
            </div>
          ) : collections && collections.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {collections.map((collection) => (
                <CollectionCard key={collection.id} collection={collection} />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted-foreground">No collections available.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
