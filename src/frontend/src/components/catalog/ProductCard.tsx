import { Link } from '@tanstack/react-router';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Product } from '@/backend';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to="/product/$productId" params={{ productId: product.id }}>
      <Card className="group overflow-hidden border-border/40 transition-all hover:border-border hover:shadow-lg">
        <div className="aspect-[3/4] overflow-hidden bg-muted/30">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="font-medium leading-tight">{product.name}</h3>
            {!product.available && (
              <Badge variant="secondary" className="shrink-0 text-xs">
                Sold Out
              </Badge>
            )}
          </div>
          <p className="mb-3 text-lg font-light">{product.price}</p>
          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
