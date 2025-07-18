
'use client';

import { useState, useRef, useEffect, FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { ArrowUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Message = {
  role: 'user' | 'assistant';
  content: string;
  recommendedProducts?: { name: string; slug: string }[];
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      if (!res.ok) {
        throw new Error('Failed to get response from AI');
      }

      const data = await res.json();
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.response,
        recommendedProducts: data.recommendedProducts,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        role: 'assistant',
        content: "I'm sorry, I encountered an issue. Please try again.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto p-4">
        <div className="rounded-lg bg-gray-100 p-3 text-sm text-secondary-text">
            Hello! I am the Aura Concierge. How may I assist you today? You can ask me about our products.
        </div>
        {messages.map((msg, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className={`flex items-start gap-3 ${
              msg.role === 'user' ? 'justify-end' : ''
            }`}
          >
            <div
              className={`max-w-xs rounded-lg px-4 py-2 md:max-w-md ${
                msg.role === 'user'
                  ? 'bg-accent text-white'
                  : 'bg-gray-100 text-primary-text'
              }`}
            >
              <p className="whitespace-pre-wrap">{msg.content}</p>
              {msg.recommendedProducts && msg.recommendedProducts.length > 0 && (
                <div className="mt-3 border-t border-gray-300/50 pt-3">
                  <p className="mb-2 text-xs font-bold">Recommended for you:</p>
                  <div className="flex flex-col space-y-2">
                    {msg.recommendedProducts.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/products/${p.slug}`}
                        className="rounded-md bg-white/20 p-2 text-sm transition hover:bg-white/30"
                      >
                        {p.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-start gap-3"
            >
                <div className="max-w-xs rounded-lg px-4 py-2 bg-gray-100">
                    <div className="flex items-center space-x-1">
                        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.3s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400 [animation-delay:-0.15s]"></span>
                        <span className="h-2 w-2 animate-pulse rounded-full bg-gray-400"></span>
                    </div>
                </div>
            </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our products..."
            className="w-full rounded-md border-gray-300 p-2 text-sm focus:border-accent focus:ring-accent"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
            <ArrowUp size={20} />
          </Button>
        </form>
      </div>
    </div>
  );
}
