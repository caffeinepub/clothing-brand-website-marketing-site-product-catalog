import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Product, Collection } from '@/backend';

export function useAllCollections() {
  const { actor, isFetching } = useActor();

  return useQuery<Collection[]>({
    queryKey: ['collections'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllCollections();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCollection(collectionId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'collection', collectionId],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductsByCollection(collectionId);
    },
    enabled: !!actor && !isFetching && !!collectionId,
  });
}

export function useProduct(productId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product>({
    queryKey: ['product', productId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getProduct(productId);
    },
    enabled: !!actor && !isFetching && !!productId,
  });
}

export function useCollection(collectionId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Collection>({
    queryKey: ['collection', collectionId],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getCollection(collectionId);
    },
    enabled: !!actor && !isFetching && !!collectionId,
  });
}
