'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

interface Message {
  id: string
  text: string
  sender: 'user' | 'assistant'
  timestamp: Date
}

export function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your travel assistant. I can help you plan trips, find recommendations, answer travel questions, and more. What would you like to know?',
      sender: 'assistant',
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateResponse = (userMessage: string): string => {
    // Simulate AI responses based on keywords
    const lowerMessage = userMessage.toLowerCase()

    if (lowerMessage.includes('weather')) {
      return 'For weather information, I recommend checking weather.com or your destination\'s local weather service for the most up-to-date forecasts.'
    }
    if (lowerMessage.includes('restaurant') || lowerMessage.includes('eat')) {
      return 'Great question! I recommend checking Google Maps or TripAdvisor for highly-rated restaurants near your destination. Look for local specialties!'
    }
    if (lowerMessage.includes('activities') || lowerMessage.includes('things to do')) {
      return 'Some popular activities include visiting museums, exploring local markets, hiking, cultural tours, and trying local cuisines. What interests you most?'
    }
    if (lowerMessage.includes('packing') || lowerMessage.includes('pack')) {
      return 'Check your trip\'s Packing Checklist in the app! Generally, pack comfortable shoes, weather-appropriate clothing, toiletries, and important documents.'
    }
    if (lowerMessage.includes('budget') || lowerMessage.includes('cost')) {
      return 'Budget varies by destination. Track your spending in the Wallet section! Plan ahead and research average costs for food, accommodation, and activities.'
    }
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
      return 'Hi there! How can I help you with your travels today?'
    }

    return 'That\'s a great question! I\'d be happy to help, but I may need more specific details. Try asking about weather, restaurants, activities, packing, or budget tips!'
  }

  const handleSendMessage = async () => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: 'user',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, userMessage])
      setInputValue('')

      // Simulate API call
      setIsLoading(true)
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: generateResponse(inputValue),
          sender: 'assistant',
          timestamp: new Date(),
        }
        setMessages(prev => [...prev, assistantMessage])
        setIsLoading(false)
      }, 800)
    }
  }

  return (
    <div className="pb-24 px-4 pt-4 flex flex-col h-screen">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-balance">Travel Assistant</h1>
        <p className="text-muted-foreground">Ask me anything about your trip</p>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-none'
                  : 'bg-muted text-foreground rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-muted text-foreground px-4 py-2 rounded-lg rounded-bl-none">
              <div className="flex gap-2">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Ask me anything..."
          disabled={isLoading}
        />
        <Button
          onClick={handleSendMessage}
          disabled={isLoading || !inputValue.trim()}
          size="icon"
        >
          <Send size={20} />
        </Button>
      </div>
    </div>
  )
}
