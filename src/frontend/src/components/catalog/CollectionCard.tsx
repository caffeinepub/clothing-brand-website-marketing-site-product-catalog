import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Collection } from '@/backend';

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Card className="group overflow-hidden border-border/40 transition-all hover:border-border hover:shadow-lg">
      <div className="aspect-[4/3] overflow-hidden bg-muted/30">
        <img
          src={collection.imageUrl}
          alt={collection.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="mb-2 text-2xl font-light">{collection.name}</h3>
        <p className="mb-4 text-muted-foreground">{collection.description}</p>
        <Button variant="outline" className="w-full">
          Explore Collection
        </Button>
      </CardContent>
    </Card>
  );
}
