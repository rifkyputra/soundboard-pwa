# API Integration Installation Guide

## Required Dependencies

The API integration requires the following packages:

```bash
pnpm add axios @tanstack/react-query
```

### Package Descriptions

- **axios** (^1.6.0): HTTP client for making API requests
- **@tanstack/react-query** (^5.0.0): Powerful data fetching and state management for React

## Installation Steps

### 1. Install Dependencies

```bash
cd /Users/rifkyputra/Projects/soundboard-pwa
pnpm add axios @tanstack/react-query
```

### 2. Setup Environment Variables

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your API endpoints:

```env
VITE_API_BASE_URL=http://localhost
VITE_WS_URL=ws://localhost
```

For production, create `.env.production`:

```env
VITE_API_BASE_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
```

### 3. Setup React Query Provider

Update your `src/main.tsx` to include the QueryClientProvider:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import App from './App';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Optional: React Query Devtools for development */}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  </React.StrictMode>,
);
```

### 4. Optional: Install React Query Devtools

For development, install the devtools:

```bash
pnpm add -D @tanstack/react-query-devtools
```

## Verification

After installation, verify the setup:

```tsx
// src/App.tsx or any component
import { useCards } from './api';

function TestComponent() {
  const { data, isLoading, error } = useCards();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>Cards loaded: {data?.length || 0}</div>;
}
```

## Project Structure

After setup, your API integration structure will be:

```
src/
├── api/
│   ├── types.ts              # API type definitions
│   ├── config.ts             # Configuration
│   ├── client.ts             # Axios client
│   ├── services/             # API services
│   │   ├── auth.service.ts
│   │   ├── cards.service.ts
│   │   ├── categories.service.ts
│   │   ├── situations.service.ts
│   │   ├── sessions.service.ts
│   │   ├── pronunciation.service.ts
│   │   └── index.ts
│   ├── hooks/                # React Query hooks
│   │   ├── index.ts
│   │   └── useWebSocket.ts
│   ├── examples.tsx          # Usage examples
│   ├── README.md             # Documentation
│   └── index.ts              # Main exports
├── main.tsx                  # Add QueryClientProvider here
└── App.tsx
```

## Next Steps

1. **Read the Documentation**: Check [src/api/README.md](./README.md) for detailed usage
2. **View Examples**: See [src/api/examples.tsx](./examples.tsx) for implementation examples
3. **Start Development**: Begin integrating API calls into your components

## Troubleshooting

### CORS Issues

If you encounter CORS errors, ensure your backend API has proper CORS configuration:

```typescript
// Backend example (Express.js)
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true,
  }),
);
```

### Authentication Issues

If authentication fails:

1. Check if tokens are stored: Open DevTools → Application → Local Storage
2. Verify API_BASE_URL in `.env.local`
3. Check network tab for request/response details

### WebSocket Connection Issues

If WebSocket fails to connect:

1. Verify WS_URL is correct (ws:// for local, wss:// for production)
2. Check if session was created successfully
3. Ensure authentication token is valid
4. Check browser console for WebSocket errors

## Support

For issues or questions:

- Check the [API README](./README.md)
- Review [examples.tsx](./examples.tsx)
- Consult the OpenAPI specification
