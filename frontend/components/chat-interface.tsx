"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, User, Bot } from "lucide-react";

type Message = {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
};

type ChatInterfaceProps = {
  initialMessage: string;
};

export default function ChatInterface({ initialMessage }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: initialMessage,
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState<string>("");
  const [history, setHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll messages container to bottom
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    // Display user's message immediately
    const userMsg: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);

    // Clear input and set loading
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.content, history }),
      });

      if (!res.ok) {
        console.error("Chat API error:", await res.text());
        return;
      }

      const { response } = (await res.json()) as { response: string };

      // Update history
      setHistory((h) => [
        ...h,
        { role: "user", content: userMsg.content },
        { role: "assistant", content: response },
      ]);

      // Display bot reply
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error("Chat API error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-xl h-[70vh] overflow-hidden">
      {/* Header */}
      <div className="bg-purple-700 p-4 border-b border-purple-600 text-white">
        <h2 className="text-xl font-semibold">Chat with Zoe</h2>
        <p className="text-sm text-purple-100">
          Your AI companion for emotional support
        </p>
      </div>

      {/* Messages container */}
      <div
        ref={containerRef}
        className="flex-grow overflow-y-auto p-4 space-y-4"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                msg.sender === "user"
                  ? "bg-purple-100 text-gray-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <div className="flex items-center mb-1">
                {msg.sender === "user" ? (
                  <>
                    <span className="font-medium mr-2">You</span>
                    <User size={14} className="text-purple-700" />
                  </>
                ) : (
                  <>
                    <span className="font-medium mr-2">Zoe</span>
                    <Bot size={14} className="text-purple-700" />
                  </>
                )}
              </div>
              <p className="whitespace-pre-wrap">{msg.content}</p>
              <p className="mt-1 text-xs text-gray-500">
                {msg.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {/* Typing indicator replaced with text */}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[60%] p-3 rounded-lg bg-gray-100 text-gray-800 italic">
              Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Sticky Input Bar */}
      <div className="sticky bottom-0 z-10 bg-gray-50 border-t border-gray-200 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center space-x-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={loading}
            className="flex-grow border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />
          <Button
            type="submit"
            disabled={loading}
            className="bg-purple-700 hover:bg-purple-800 text-white"
          >
            {loading ? "..." : <Send size={18} />}
          </Button>
        </form>
      </div>
    </div>
  );
}
