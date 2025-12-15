/**
 * Example Usage of API Integration
 *
 * This file demonstrates how to use the API hooks and services
 */

import React, { useState } from 'react';
import {
  useLogin,
  useRegister,
  useCards,
  useCreateCard,
  useCategories,
  useCreateSession,
} from './hooks';

import { WSServerMessage, LoginRequest, RegisterRequest, CardCreate } from './types';
import { useWebSocket } from './hooks/useWebSocket';

// ===== Authentication Example =====
export const LoginExample = () => {
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: '',
  });

  const loginMutation = useLogin({
    onSuccess: (data) => {
      console.log('Login successful!', data);
      // Redirect to dashboard or update UI
    },
    onError: (error) => {
      console.error('Login failed:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate(credentials);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          placeholder="Username"
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
        />
        <button type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// ===== Registration Example =====
export const RegisterExample: React.FC = () => {
  const [formData, setFormData] = useState<RegisterRequest>({
    username: '',
    email: '',
    password: '',
  });

  const registerMutation = useRegister({
    onSuccess: (data) => {
      console.log('Registration successful!', data);
      // Auto-login after registration (tokens already saved)
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        placeholder="Username"
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
      />
      <input
        type="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
      />
      <button type="submit" disabled={registerMutation.isPending}>
        {registerMutation.isPending ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
};

// ===== Cards List Example =====
export const CardsListExample: React.FC = () => {
  const { data: cards, isLoading, error, refetch } = useCards();
  const createCardMutation = useCreateCard({
    onSuccess: () => {
      console.log('Card created successfully!');
      refetch(); // Refresh the list
    },
  });

  const handleCreateCard = () => {
    const newCard: CardCreate = {
      text_to_speak: 'Hello, this is a new card!',
      category_id: null,
    };
    createCardMutation.mutate(newCard);
  };

  if (isLoading) return <div>Loading cards...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <button onClick={handleCreateCard} disabled={createCardMutation.isPending}>
        Create New Card
      </button>
      <ul>
        {cards?.map((card) => (
          <li key={card.card_id}>
            <strong>{card.text_to_speak}</strong>
            <audio src={card.s3_audio_url} controls />
            <span>Duration: {card.duration_ms}ms</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ===== Filtered Cards by Category Example =====
export const FilteredCardsExample: React.FC<{ categoryId: number }> = ({ categoryId }) => {
  const { data: cards, isLoading } = useCards({ category_id: categoryId });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h3>Cards in Category {categoryId}</h3>
      {cards?.map((card) => <div key={card.card_id}>{card.text_to_speak}</div>)}
    </div>
  );
};

// ===== Categories Tree Example =====
export const CategoriesTreeExample: React.FC = () => {
  const { data: rootCategories } = useCategories({ parent_id: undefined });
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const { data: subCategories } = useCategories(
    { parent_id: selectedCategory || undefined },
    { enabled: !!selectedCategory },
  );

  return (
    <div>
      <h3>Root Categories</h3>
      <ul>
        {rootCategories?.map((category) => (
          <li key={category.category_id} onClick={() => setSelectedCategory(category.category_id)}>
            {category.name}
          </li>
        ))}
      </ul>

      {selectedCategory && (
        <>
          <h3>Subcategories</h3>
          <ul>
            {subCategories?.map((category) => <li key={category.category_id}>{category.name}</li>)}
          </ul>
        </>
      )}
    </div>
  );
};

// ===== WebSocket Real-time Session Example =====
export const SessionExample: React.FC = () => {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<WSServerMessage[]>([]);

  const createSessionMutation = useCreateSession({
    onSuccess: (session) => {
      console.log('Session created:', session);
      setSessionId(session.session_id);
    },
  });

  const { isConnected, sendCardClick } = useWebSocket({
    sessionId: sessionId || '',
    enabled: !!sessionId,
    onMessage: (message) => {
      console.log('Received message:', message);
      setMessages((prev) => [...prev, message]);
    },
    onOpen: () => {
      console.log('WebSocket connected!');
    },
    onClose: () => {
      console.log('WebSocket disconnected');
    },
  });

  const handleStartSession = () => {
    createSessionMutation.mutate({
      interlocutor_name: 'Jane Doe',
    });
  };

  const handleCardClick = (cardId: number) => {
    sendCardClick(cardId);
  };

  return (
    <div>
      {!sessionId ? (
        <button onClick={handleStartSession} disabled={createSessionMutation.isPending}>
          Start Session
        </button>
      ) : (
        <>
          <div>
            <strong>Session ID:</strong> {sessionId}
          </div>
          <div>
            <strong>Status:</strong> {isConnected ? 'Connected' : 'Disconnected'}
          </div>
          <button onClick={() => handleCardClick(1)}>Send Card #1</button>
          <button onClick={() => handleCardClick(2)}>Send Card #2</button>

          <div>
            <h4>Messages:</h4>
            <ul>
              {messages.map((msg, index) => (
                <li key={index}>
                  {msg.type === 'audio_url' && (
                    <>
                      <strong>Audio:</strong> {msg.text}
                      <audio src={msg.url} controls />
                    </>
                  )}
                  {msg.type === 'transcription' && (
                    <>
                      <strong>Transcription:</strong> {msg.text}
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

// ===== Direct Service Usage (without hooks) =====
import { cardsService, authService } from '../api';

export const directServiceExample = async () => {
  try {
    // Login
    const loginResponse = await authService.login({
      username: 'admin',
      password: 'admin123',
    });
    console.log('Logged in:', loginResponse);

    // Fetch cards
    const cards = await cardsService.list({ search: 'hello' });
    console.log('Cards:', cards);

    // Create a card
    const newCard = await cardsService.create({
      text_to_speak: 'Good morning!',
      category_id: 1,
    });
    console.log('Created card:', newCard);

    // Update the card
    const updatedCard = await cardsService.update(newCard.card_id, {
      text_to_speak: 'Good morning, everyone!',
    });
    console.log('Updated card:', updatedCard);

    // Delete the card
    await cardsService.delete(newCard.card_id);
    console.log('Card deleted');
  } catch (error) {
    console.error('Error:', error);
  }
};
