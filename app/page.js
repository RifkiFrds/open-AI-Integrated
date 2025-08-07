'use client';

import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || '❌ Gagal merespons';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (err) {
      console.error('Error:', err);
      setMessages([...newMessages, { role: 'assistant', content: '❌ Error API' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-xl mx-auto p-4 font-sans">
      <h1 className="text-2xl text-center font-bold mb-4">Test AI Chat</h1>
      <div className="border h-80 overflow-y-auto p-3 bg-gray-100 rounded">
        {messages.map((msg, i) => (
          <p key={i} className="mb-2">
            <strong>{msg.role === 'user' ? '👤 Kamu' : '🤖 AI'}:</strong> {msg.content}
          </p>
        ))}
        {loading && <p><em>⏳ Mengetik...</em></p>}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Tulis pesan..."
        className="w-full border mt-4 p-2 rounded"
      />
      <button
        onClick={handleSend}
        className="bg-blue-600 text-white px-4 py-2 mt-2 rounded hover:bg-blue-700"
      >
        Kirim
      </button>
    </main>
  );
}
