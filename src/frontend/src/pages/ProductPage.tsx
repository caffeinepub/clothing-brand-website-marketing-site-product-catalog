import { useParams, Link } from '@tanstack/react-router';
import { useProduct } from '@/hooks/useCatalogQueries';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function ProductPage() {
  const { productId } = useParams({ from: '/product/$productId' });
  const { data: product, isLoading, error } = useProduct(productId);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          <Skeleton className="h-[600px] w-full" />
          <div className="space-y-6">
            <Skeleton className="h-12 w-3/4" />
            <Skeleton className="h-8 w-1/4" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 md:px-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Product not found or unable to load. Please try again later.
          </AlertDescription>
        </Alert>
        <div className="mt-8">
          <Link to="/shop">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-8">
      <div className="mb-8">
        <Link to="/shop">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Shop
          </Button>
        </Link>
      </div>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-lg bg-muted/30">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="mb-2 text-4xl font-light tracking-tight">{product.name}</h1>
            <p className="text-3xl font-light">{product.price}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {product.available ? (
              <Badge variant="default">In Stock</Badge>
            ) : (
              <Badge variant="secondary">Out of Stock</Badge>
            )}
            {product.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          <Separator />

          <div>
            <h2 className="mb-3 text-lg font-medium">Description</h2>
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          </div>

          {product.sizeVariants && product.sizeVariants.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-medium">Available Sizes</h2>
              <div className="flex flex-wrap gap-2">
                {product.sizeVariants.map((size) => (
                  <button
                    key={size}
                    className="rounded border border-border px-4 py-2 text-sm transition-colors hover:border-foreground hover:bg-muted"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.colorVariants && product.colorVariants.length > 0 && (
            <div>
              <h2 className="mb-3 text-lg font-medium">Available Colors</h2>
              <div className="flex flex-wrap gap-2">
                {product.colorVariants.map((color) => (
                  <button
                    key={color}
                    className="rounded border border-border px-4 py-2 text-sm transition-colors hover:border-foreground hover:bg-muted"
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          <Separator />

          <div className="space-y-3 text-sm text-muted-foreground">
            <p>• Premium quality materials</p>
            <p>• Carefully crafted design</p>
            <p>• Timeless style</p>
          </div>
        </div>
      </div>
    </div>
  );
}
