import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2, Bot } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { apiFetch } from "@/lib/api";
import { Link } from "react-router-dom";

interface Message {
  role: "user" | "ai";
  content: string;
}

const Chatbot = () => {
  const { session } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "Hi — I'm the Scheme Setu assistant. Sign in to ask about schemes in our catalog.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!session) {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Please sign in to use the assistant. This helps protect the service from abuse.",
        },
      ]);
      return;
    }

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsLoading(true);

    try {
      const res = await apiFetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "API Error");
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: data.reply || data.error || "No reply received." },
      ]);
    } catch (error) {
      const msg =
        error instanceof Error ? error.message : "Sorry, I'm having trouble connecting right now.";
      setMessages((prev) => [...prev, { role: "ai", content: msg }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-quartz text-[#050606] shadow-elegant transition-transform hover:scale-105 active:scale-95 ${
          isOpen ? "pointer-events-none scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
        aria-label="Open AI Assistant"
      >
        <MessageCircle size={22} />
      </button>

      <div
        className={`fixed bottom-6 left-6 z-50 flex h-[500px] max-h-[80vh] w-[350px] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-xl border border-obsidian bg-deep-sea shadow-float transition-all duration-300 ${
          isOpen
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <div className="flex items-center justify-between border-b border-inkline bg-cobalt px-4 py-3">
          <div className="flex items-center gap-2 text-sm font-medium text-quartz">
            <Bot size={18} className="text-lilac" />
            <span>Scheme Setu AI</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="rounded-full p-1 text-ash transition-colors hover:bg-white/10 hover:text-quartz"
          >
            <X size={16} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto bg-abyss/50 p-4">
          {!session && (
            <div className="rounded-lg border border-obsidian bg-void p-3 text-sm text-ash">
              <Link to="/login" className="text-signal underline">
                Sign in
              </Link>{" "}
              to chat about schemes.
            </div>
          )}
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                  msg.role === "user"
                    ? "rounded-br-sm bg-quartz text-[#050606]"
                    : "rounded-bl-sm border border-inkline bg-deep-sea text-mist"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-xl border border-inkline bg-deep-sea px-4 py-3">
                <Loader2 size={14} className="animate-spin text-ash" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-inkline bg-deep-sea p-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={session ? "Ask about schemes…" : "Sign in to chat"}
              className="flex-1 rounded-full"
              disabled={isLoading || !session}
              maxLength={2000}
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading || !session}
              className="h-10 w-10 shrink-0"
            >
              <Send size={15} />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
