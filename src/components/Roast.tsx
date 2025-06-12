'use client';
import { useState, FormEvent } from 'react';

export default function Roast() {
  const [name, setName] = useState('');
  const [roast, setRoast] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter a name');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/roast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setRoast(data.roast);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-900">
      <div className="w-full max-w-md bg-gray-700 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-6">Name Roaster 🔥</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Enter your name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Type your name here..."
            />
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 px-4 rounded-md hover:cursor-pointer text-white font-medium ${isLoading ? 'bg-teal-400' : 'bg-teal-600 hover:bg-teal-700'}`}
          >
            {isLoading ? 'Roasting...' : 'Roast Me!'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}

        {roast && (
          <div className="mt-6 p-4 bg-gray-500 border-l-4 border-yellow-400 ">
            <h2 className="font-bold mb-2">Roast:</h2>
            <p className="whitespace-pre-line overflow-y-scroll no-scrollbar">{roast}</p>
          </div>
        )}
      </div>
    </div>
  ); 
}