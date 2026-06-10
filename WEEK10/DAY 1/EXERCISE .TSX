import React, { useState, useEffect } from 'react';

// ==========================================
// EXERCISE 2: TYPE DEFINITIONS & COMPONENT
// ==========================================
interface GreetingProps {
  name: string;
  messageCount: number;
}

const Greeting: React.FC<GreetingProps> = ({ name, messageCount }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '15px 0', borderRadius: '6px' }}>
      <h3>Welcome back, {name}!</h3>
      <p>You have <strong>{messageCount}</strong> unread messages in your inbox.</p>
    </div>
  );
};

// ==========================================
// EXERCISE 3: STATE & UNION TYPES
// ==========================================
type ActionType = 'Increment' | 'Decrement' | 'None';

const Counter: React.FC = () => {
  const [count, setCount] = useState<number>(0);
  const [lastAction, setLastAction] = useState<ActionType>('None');

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setLastAction('Increment');
  };

  const handleDecrement = () => {
    setCount(prev => prev - 1);
    setLastAction('Decrement');
  };

  return (
    <div style={{ border: '1px solid #007acc', padding: '15px', margin: '15px 0', borderRadius: '6px' }}>
      <p style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: '5px 0' }}>Count: {count}</p>
      <p>Last Action: <span style={{ color: '#007acc', fontWeight: 'bold' }}>{lastAction}</span></p>
      <button onClick={handleIncrement} style={{ marginRight: '8px', padding: '6px 12px', cursor: 'pointer' }}>Increment</button>
      <button onClick={handleDecrement} style={{ padding: '6px 12px', cursor: 'pointer' }}>Decrement</button>
    </div>
  );
};

// ==========================================
// EXERCISE 4: OPTIONAL PROPS & DEFAULTS
// ==========================================
interface UserCardProps {
  name?: string;
  age?: number;
  role?: string;
}

const UserCard: React.FC<UserCardProps> = ({ 
  name = 'Guest User', 
  age = 18, 
  role = 'Regular Member' 
}) => {
  return (
    <div style={{ border: '1px solid #4caf50', padding: '15px', margin: '15px 0', borderRadius: '6px', backgroundColor: '#f9fff9' }}>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Age:</strong> {age}</p>
      <p><strong>Role:</strong> {role}</p>
    </div>
  );
};

// ==========================================
// EXERCISE 5: EFFECT HOOK & API FETCHING
// ==========================================
interface User {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p style={{ color: '#666', fontStyle: 'italic' }}>Loading directory users...</p>;
  if (error) return <p style={{ color: '#d32f2f' }}>Error: {error}</p>;

  return (
    <div style={{ border: '1px solid #f44336', padding: '15px', margin: '15px 0', borderRadius: '6px', maxHeight: '300px', overflowY: 'auto' }}>
      <ul style={{ paddingLeft: '20px', margin: 0 }}>
        {users.map(user => (
          <li key={user.id} style={{ marginBottom: '12px' }}>
            <strong>{user.name}</strong> — <span style={{ color: '#555' }}>{user.email}</span>
            <br />
            <small style={{ color: '#777' }}>Company: {user.company.name}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

// ==========================================
// MAIN APP COMPONENT (ORCHESTRATOR)
// ==========================================
export default function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', color: '#333', lineHeight: '1.5' }}>
      <header style={{ borderBottom: '2px solid #eaeaea', paddingBottom: '10px', marginBottom: '30px' }}>
        <h1 style={{ margin: 0, color: '#111' }}>React + TypeScript Workshop</h1>
        <p style={{ color: '#666', margin: '5px 0 0 0' }}>All exercise implementations running inside a single compiled workspace.</p>
      </header>

      {/* Exercise 2 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>🌟 Exercise 2: Strongly Typed Props</h2>
        <Greeting name="Sarah Jenkins" messageCount={7} />
      </section>

      {/* Exercise 3 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>🌟 Exercise 3: State Management & Type Hooks</h2>
        <Counter />
      </section>

      {/* Exercise 4 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>🌟 Exercise 4: Optional Props & Fallback Evaluation</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px' }}>
          <UserCard name="Tony Stark" age={48} role="Lead Engineer" />
          <UserCard name="Peter Parker" /> {/* Leverages default age & role */}
          <UserCard /> {/* Leverages all default fallbacks */}
        </div>
      </section>

      {/* Exercise 5 */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#333', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>🌟 Exercise 5: Asynchronous Lifecycle Side-Effects</h2>
        <UserList />
      </section>
    </div>
  );
}