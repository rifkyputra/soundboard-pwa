# API Integration Documentation

This directory contains the complete API integration for the Soundboard PWA, implementing the OpenAPI specification.

## 📁 Structure

```
src/api/
├── types.ts              # TypeScript types from OpenAPI schemas
├── config.ts             # API configuration and environment variables
├── client.ts             # Axios client with interceptors
├── services/             # API service modules
│   ├── auth.service.ts
│   ├── cards.service.ts
│   ├── categories.service.ts
│   ├── situations.service.ts
│   ├── sessions.service.ts
│   ├── pronunciation.service.ts
│   └── index.ts
├── hooks/                # React Query hooks
│   ├── index.ts
│   └── useWebSocket.ts
├── examples.tsx          # Usage examples
└── index.ts              # Main exports
```

## 🚀 Quick Start

### 1. Install Dependencies

```bash
pnpm add axios @tanstack/react-query
```

### 2. Environment Setup

Create a `.env.local` file:

```env
VITE_API_BASE_URL=http://localhost
VITE_WS_URL=ws://localhost
```

### 3. Setup React Query Provider

In your `App.tsx` or `main.tsx`:

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return <QueryClientProvider client={queryClient}>{/* Your app */}</QueryClientProvider>;
}
```

## 📚 Usage Examples

### Authentication

```tsx
import { useLogin, useRegister, useLogout } from './api';

function LoginForm() {
  const login = useLogin({
    onSuccess: () => {
      console.log('Logged in!');
    },
  });

  const handleLogin = () => {
    login.mutate({
      username: 'admin',
      password: 'admin123',
    });
  };

  return <button onClick={handleLogin}>Login</button>;
}
```

### Fetching Data

```tsx
import { useCards, useCategories } from './api';

function CardsList() {
  const { data: cards, isLoading, error } = useCards();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <ul>{cards?.map((card) => <li key={card.card_id}>{card.text_to_speak}</li>)}</ul>;
}
```

### Creating/Updating Data

```tsx
import { useCreateCard, useUpdateCard, useDeleteCard } from './api';

function CardManager() {
  const createCard = useCreateCard({
    onSuccess: () => alert('Card created!'),
  });

  const updateCard = useUpdateCard();
  const deleteCard = useDeleteCard();

  const handleCreate = () => {
    createCard.mutate({
      text_to_speak: 'Hello World',
      category_id: 1,
    });
  };

  const handleUpdate = (id: number) => {
    updateCard.mutate({
      id,
      data: { text_to_speak: 'Updated text' },
    });
  };

  const handleDelete = (id: number) => {
    deleteCard.mutate(id);
  };

  return (
    <div>
      <button onClick={handleCreate}>Create Card</button>
      <button onClick={() => handleUpdate(1)}>Update Card #1</button>
      <button onClick={() => handleDelete(1)}>Delete Card #1</button>
    </div>
  );
}
```

### WebSocket Sessions

```tsx
import { useCreateSession, useWebSocket } from './api';

function RealtimeSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);

  const createSession = useCreateSession({
    onSuccess: (session) => setSessionId(session.session_id),
  });

  const { isConnected, sendCardClick } = useWebSocket({
    sessionId: sessionId || '',
    enabled: !!sessionId,
    onMessage: (message) => {
      if (message.type === 'audio_url') {
        console.log('Audio URL:', message.url);
        // Play audio
      } else if (message.type === 'transcription') {
        console.log('Transcription:', message.text);
      }
    },
  });

  return (
    <div>
      {!sessionId ? (
        <button onClick={() => createSession.mutate({})}>Start Session</button>
      ) : (
        <>
          <div>Status: {isConnected ? 'Connected' : 'Disconnected'}</div>
          <button onClick={() => sendCardClick(1)}>Play Card #1</button>
        </>
      )}
    </div>
  );
}
```

### Using Services Directly (without hooks)

```tsx
import { cardsService, authService, categoriesService } from './api';

async function example() {
  // Login
  await authService.login({
    username: 'admin',
    password: 'admin123',
  });

  // Fetch cards
  const cards = await cardsService.list({ category_id: 1 });

  // Create card
  const newCard = await cardsService.create({
    text_to_speak: 'Hello',
    category_id: 1,
  });

  // Update card
  await cardsService.update(newCard.card_id, {
    text_to_speak: 'Hello World',
  });

  // Delete card
  await cardsService.delete(newCard.card_id);
}
```

## 🔑 Available Hooks

### Authentication

- `useLogin()` - Login user
- `useRegister()` - Register new user
- `useLogout()` - Logout (clear tokens)

### Categories

- `useCategories(params?)` - List categories
- `useCategory(id)` - Get single category
- `useCreateCategory()` - Create category
- `useUpdateCategory()` - Update category
- `useDeleteCategory()` - Delete category

### Cards

- `useCards(params?)` - List cards
- `useCard(id)` - Get single card
- `useCreateCard()` - Create card
- `useUpdateCard()` - Update card
- `useDeleteCard()` - Delete card

### Situations

- `useSituations(params?)` - List situations
- `useSituation(id)` - Get single situation
- `useCreateSituation()` - Create situation
- `useUpdateSituation()` - Update situation
- `useDeleteSituation()` - Delete situation

### Sessions

- `useSessions(params?)` - List sessions
- `useSession(id)` - Get single session
- `useCreateSession()` - Create session
- `useEndSession()` - End session
- `useSessionLogs(id)` - Get session logs
- `useWebSocket(options)` - WebSocket connection

### Pronunciation

- `usePronunciations()` - List pronunciation entries
- `useCreatePronunciation()` - Add pronunciation entry

## 🔧 Services API

All services return Promises and can be used directly:

### `authService`

- `register(data)` - Register user
- `login(data)` - Login user
- `logout()` - Logout user
- `isAuthenticated()` - Check auth status
- `getAccessToken()` - Get current token
- `healthCheck()` - Service health check

### `categoriesService`

- `list(params?)` - List categories
- `getById(id)` - Get category
- `create(data)` - Create category
- `update(id, data)` - Update category
- `delete(id)` - Delete category

### `cardsService`

- `list(params?)` - List cards
- `getById(id)` - Get card
- `create(data)` - Create card
- `update(id, data)` - Update card
- `delete(id)` - Delete card

### `situationsService`

- `list(params?)` - List situations
- `getById(id)` - Get situation
- `create(data)` - Create situation
- `update(id, data)` - Update situation
- `delete(id)` - Delete situation

### `sessionsService`

- `list(params?)` - List sessions
- `getById(id)` - Get session
- `create(data?)` - Create session
- `end(id)` - End session
- `getLogs(id)` - Get session logs
- `createWebSocket(sessionId, callbacks)` - Create WebSocket connection
- `sendCardClick(ws, cardId)` - Send card click message
- `sendAudioStream(ws, audioData)` - Send audio stream

### `pronunciationService`

- `list()` - List pronunciation entries
- `create(data)` - Add pronunciation entry

## 🔐 Authentication Flow

The API client automatically handles:

1. **Token Storage**: Access and refresh tokens stored in localStorage
2. **Token Injection**: Authorization header added to all requests
3. **Token Refresh**: Automatic refresh on 401 errors
4. **Auto-Logout**: Redirects to login on refresh failure

```tsx
// Login
await authService.login({ username, password });
// Tokens are automatically stored

// Make authenticated requests
const cards = await cardsService.list();
// Authorization header automatically included

// Logout
authService.logout();
// Tokens cleared, redirected to login
```

## 🌐 WebSocket Usage

The `useWebSocket` hook provides:

- Automatic connection management
- Auto-reconnection with configurable attempts
- Type-safe message sending/receiving
- Connection status tracking

```tsx
const { isConnected, sendCardClick, disconnect } = useWebSocket({
  sessionId: 'uuid-here',
  enabled: true,
  reconnect: true,
  reconnectInterval: 3000,
  maxReconnectAttempts: 5,
  onMessage: (message) => {
    // Handle incoming messages
  },
  onOpen: () => console.log('Connected'),
  onClose: () => console.log('Disconnected'),
  onError: (error) => console.error(error),
});
```

## 📝 TypeScript Types

All types are fully typed from the OpenAPI specification:

```tsx
import type {
  Card,
  Category,
  Situation,
  Session,
  LoginRequest,
  CardCreate,
  WSServerMessage,
} from './api';
```

## 🎯 Error Handling

```tsx
const { data, error } = useCards();

if (error) {
  // Error is typed as AxiosError<ApiError>
  console.error(error.response?.data.message);
}

// Or with mutations
const createCard = useCreateCard({
  onError: (error) => {
    alert(`Failed: ${error.response?.data.message}`);
  },
});
```

## 🔄 Query Invalidation

React Query automatically refetches when mutations succeed:

```tsx
const createCard = useCreateCard(); // Automatically invalidates card lists
const updateCard = useUpdateCard(); // Invalidates specific card + lists
const deleteCard = useDeleteCard(); // Invalidates card lists
```

Manual invalidation:

```tsx
import { useQueryClient } from '@tanstack/react-query';
import { queryKeys } from './api';

const queryClient = useQueryClient();
queryClient.invalidateQueries({ queryKey: queryKeys.cards.all });
```

## 🏗️ Architecture

- **Client Layer** (`client.ts`): Axios instance with interceptors
- **Services Layer** (`services/`): API calls organized by resource
- **Hooks Layer** (`hooks/`): React Query hooks for component integration
- **Types Layer** (`types.ts`): TypeScript definitions from OpenAPI

This separation allows using services directly or via hooks, providing flexibility for different use cases.
