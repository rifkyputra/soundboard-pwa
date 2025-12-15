/**
 * React Query Hooks for API Integration
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
  UseMutationOptions,
} from '@tanstack/react-query';
import type {
  Category,
  CategoryCreate,
  CategoryUpdate,
  Card,
  CardCreate,
  CardUpdate,
  Situation,
  SituationCreate,
  SituationUpdate,
  Session,
  SessionCreate,
  SessionLog,
  Pronunciation,
  PronunciationCreate,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  ListCategoriesParams,
  ListCardsParams,
  ListSituationsParams,
  ListSessionsParams,
} from '../types';
import {
  authService,
  categoriesService,
  cardsService,
  situationsService,
  sessionsService,
  pronunciationService,
} from '../services';

// ===== Query Keys =====
export const queryKeys = {
  auth: ['auth'] as const,
  categories: {
    all: ['categories'] as const,
    list: (params?: ListCategoriesParams) => ['categories', 'list', params] as const,
    detail: (id: number) => ['categories', 'detail', id] as const,
  },
  cards: {
    all: ['cards'] as const,
    list: (params?: ListCardsParams) => ['cards', 'list', params] as const,
    detail: (id: number) => ['cards', 'detail', id] as const,
  },
  situations: {
    all: ['situations'] as const,
    list: (params?: ListSituationsParams) => ['situations', 'list', params] as const,
    detail: (id: number) => ['situations', 'detail', id] as const,
  },
  sessions: {
    all: ['sessions'] as const,
    list: (params?: ListSessionsParams) => ['sessions', 'list', params] as const,
    detail: (id: string) => ['sessions', 'detail', id] as const,
    logs: (id: string) => ['sessions', 'logs', id] as const,
  },
  pronunciation: {
    all: ['pronunciation'] as const,
  },
};

// ===== Authentication Hooks =====

export const useLogin = (options?: UseMutationOptions<LoginResponse, Error, LoginRequest>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth });
    },
    ...options,
  });
};

export const useRegister = (
  options?: UseMutationOptions<LoginResponse, Error, RegisterRequest>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth });
    },
    ...options,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  return () => {
    authService.logout();
    queryClient.clear();
  };
};

// ===== Categories Hooks =====

export const useCategories = (
  params?: ListCategoriesParams,
  options?: Omit<UseQueryOptions<Category[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => categoriesService.list(params),
    ...options,
  });
};

export const useCategory = (
  id: number,
  options?: Omit<UseQueryOptions<Category, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.categories.detail(id),
    queryFn: () => categoriesService.getById(id),
    ...options,
  });
};

export const useCreateCategory = (
  options?: UseMutationOptions<Category, Error, CategoryCreate>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoriesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
    ...options,
  });
};

export const useUpdateCategory = (
  options?: UseMutationOptions<Category, Error, { id: number; data: CategoryUpdate }>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => categoriesService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.detail(variables.id) });
    },
    ...options,
  });
};

export const useDeleteCategory = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: categoriesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
    ...options,
  });
};

// ===== Cards Hooks =====

export const useCards = (
  params?: ListCardsParams,
  options?: Omit<UseQueryOptions<Card[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.cards.list(params),
    queryFn: () => cardsService.list(params),
    ...options,
  });
};

export const useCard = (
  id: number,
  options?: Omit<UseQueryOptions<Card, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.cards.detail(id),
    queryFn: () => cardsService.getById(id),
    ...options,
  });
};

export const useCreateCard = (options?: UseMutationOptions<Card, Error, CardCreate>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cardsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards.all });
    },
    ...options,
  });
};

export const useUpdateCard = (
  options?: UseMutationOptions<Card, Error, { id: number; data: CardUpdate }>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => cardsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.cards.detail(variables.id) });
    },
    ...options,
  });
};

export const useDeleteCard = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cardsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.cards.all });
    },
    ...options,
  });
};

// ===== Situations Hooks =====

export const useSituations = (
  params?: ListSituationsParams,
  options?: Omit<UseQueryOptions<Situation[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.situations.list(params),
    queryFn: () => situationsService.list(params),
    ...options,
  });
};

export const useSituation = (
  id: number,
  options?: Omit<UseQueryOptions<Situation, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.situations.detail(id),
    queryFn: () => situationsService.getById(id),
    ...options,
  });
};

export const useCreateSituation = (
  options?: UseMutationOptions<Situation, Error, SituationCreate>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: situationsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.situations.all });
    },
    ...options,
  });
};

export const useUpdateSituation = (
  options?: UseMutationOptions<Situation, Error, { id: number; data: SituationUpdate }>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }) => situationsService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.situations.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.situations.detail(variables.id) });
    },
    ...options,
  });
};

export const useDeleteSituation = (options?: UseMutationOptions<void, Error, number>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: situationsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.situations.all });
    },
    ...options,
  });
};

// ===== Sessions Hooks =====

export const useSessions = (
  params?: ListSessionsParams,
  options?: Omit<UseQueryOptions<Session[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.sessions.list(params),
    queryFn: () => sessionsService.list(params),
    ...options,
  });
};

export const useSession = (
  id: string,
  options?: Omit<UseQueryOptions<Session, Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.sessions.detail(id),
    queryFn: () => sessionsService.getById(id),
    enabled: !!id,
    ...options,
  });
};

export const useCreateSession = (
  options?: UseMutationOptions<Session, Error, SessionCreate | undefined>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    ...options,
  });
};

export const useEndSession = (options?: UseMutationOptions<void, Error, string>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: sessionsService.end,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.sessions.all });
    },
    ...options,
  });
};

export const useSessionLogs = (
  id: string,
  options?: Omit<UseQueryOptions<SessionLog[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.sessions.logs(id),
    queryFn: () => sessionsService.getLogs(id),
    enabled: !!id,
    ...options,
  });
};

// ===== Pronunciation Hooks =====

export const usePronunciations = (
  options?: Omit<UseQueryOptions<Pronunciation[], Error>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey: queryKeys.pronunciation.all,
    queryFn: pronunciationService.list,
    ...options,
  });
};

export const useCreatePronunciation = (
  options?: UseMutationOptions<Pronunciation, Error, PronunciationCreate>,
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: pronunciationService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.pronunciation.all });
    },
    ...options,
  });
};
