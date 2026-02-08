import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export function useContactMutation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: ContactFormData) => {
      if (!actor) {
        throw new Error('Actor not initialized');
      }

      const timestamp = BigInt(Date.now() * 1_000_000); // Convert to nanoseconds
      await actor.submitContactMessage(data.name, data.email, data.message, timestamp);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contactMessages'] });
    },
  });
}

export function useContactMessages() {
  const { actor, isFetching } = useActor();

  return useMutation({
    mutationFn: async () => {
      if (!actor) return [];
      return actor.getAllContactMessages();
    },
  });
}
