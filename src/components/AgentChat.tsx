'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Zap, BookOpen } from 'lucide-react';
import { useAgentConversation } from '@/hooks/useClaudeFlow';
import { motion, AnimatePresence } from 'framer-motion';

interface AgentChatProps {
  className?: string;
  defaultAgent?: 'asistente' | 'ejecutor' | 'profesor';
  placeholder?: string;
}

const agentInfo = {
  asistente: {
    name: 'Agente Asistente',
    icon: Sparkles,
    color: 'purple',
    bgColor: 'bg-purple-500',
    borderColor: 'border-purple-500',
    textColor: 'text-purple-600'
  },
  ejecutor: {
    name: 'Agente Ejecutor',
    icon: Zap,
    color: 'blue',
    bgColor: 'bg-blue-500',
    borderColor: 'border-blue-500',
    textColor: 'text-blue-600'
  },
  profesor: {
    name: 'Agente Profesor',
    icon: BookOpen,
    color: 'green',
    bgColor: 'bg-green-500',
    borderColor: 'border-green-500',
    textColor: 'text-green-600'
  }
};

export default function AgentChat({ 
  className = '', 
  defaultAgent = 'asistente',
  placeholder = '¿En qué puedo ayudarte hoy?'
}: AgentChatProps) {
  const [input, setInput] = useState('');
  const [selectedAgent, setSelectedAgent] = useState(defaultAgent);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const {
    messages,
    sendMessage,
    connected,
    loading,
    error,
    connect
  } = useAgentConversation();

  // Auto-scroll a nuevos mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Conectar automáticamente si no está conectado
  useEffect(() => {
    if (!connected) {
      connect();
    }
  }, [connected, connect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const message = input.trim();
    setInput('');
    setIsTyping(true);

    try {
      await sendMessage(message, selectedAgent);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={`flex flex-col h-full ${className}`}>
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Bot className="w-5 h-5 text-gray-600" />
            <h3 className="font-semibold text-gray-800">Chat con Agentes IA</h3>
          </div>
          <div className="flex items-center space-x-2">
            {/* Selector de agente */}
            <select
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value as any)}
              className="text-sm border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {Object.entries(agentInfo).map(([key, info]) => (
                <option key={key} value={key}>{info.name}</option>
              ))}
            </select>
            
            {/* Indicador de conexión */}
            <div className={`w-2 h-2 rounded-full ${connected ? 'bg-green-500' : 'bg-red-500'}`} />
          </div>
        </div>
      </div>

      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>¡Hola! Soy tu asistente de Claude Flow.</p>
            <p className="text-sm mt-1">Puedes preguntarme lo que necesites.</p>
          </div>
        )}

        <AnimatePresence>
          {messages.map((message) => {
            const isUser = message.type === 'user';
            const agent = isUser ? null : agentInfo[message.agent as keyof typeof agentInfo];
            const Icon = isUser ? User : (agent?.icon || Bot);

            return (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    isUser ? 'bg-gray-200' : agent?.bgColor || 'bg-gray-300'
                  }`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    isUser 
                      ? 'bg-purple-500 text-white' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {!isUser && agent && (
                      <p className={`text-xs font-medium mb-1 ${agent.textColor}`}>
                        {agent.name}
                      </p>
                    )}
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    <p className={`text-xs mt-1 ${
                      isUser ? 'text-purple-200' : 'text-gray-500'
                    }`}>
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center space-x-2 text-gray-500"
          >
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">El agente está escribiendo...</span>
          </motion.div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t bg-white p-4">
        <div className="flex space-x-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            rows={1}
            className="flex-1 resize-none border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            disabled={loading || !connected}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading || !connected}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Presiona Enter para enviar, Shift+Enter para nueva línea
        </p>
      </form>
    </div>
  );
}
