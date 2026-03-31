"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ActionCard } from "@/components/portal/ActionCard";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

// Quick chip suggestions
const quickChips = [
  "OTIF this month",
  "Back orders?",
  "Low stock alert",
  "Reorder SGM-STD",
  "Delays this month",
  "Accessorial charges",
  "Generate OTIF report",
  "Raise return",
];

// Message type
interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

// Action detection
function getActionType(content: string): "reorder" | "return" | "report" | null {
  const lower = content.toLowerCase();
  if (lower.includes("reorder") || lower.includes("place the order")) return "reorder";
  if ((lower.includes("rma") || lower.includes("return")) && lower.includes("initiate")) return "return";
  if (lower.includes("report") && (lower.includes("send") || lower.includes("generate"))) return "report";
  return null;
}

const actionMeta = {
  reorder: { title: "Reorder Confirmation", description: "Review and confirm this reorder before it is placed." },
  return: { title: "Initiate Return / RMA", description: "Review and confirm the return request." },
  report: { title: "Generate Report", description: "The report will be generated and sent to your email." },
};

export function AIPanel() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Welcome back, Walmart Stores Inc. I have access to your live iSeries data. Ask me about inventory, orders, shipments, or anything else. I can also help you reorder, generate reports, or raise returns.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dismissedActions, setDismissedActions] = useState<Set<string>>(
    new Set()
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text: string) {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text.trim(),
    };

    const assistantMsg: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: "",
    };

    // Add user message and empty assistant message for streaming
    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Build the messages array for the API (exclude welcome, only include actual conversation)
      const apiMessages = [
        ...messages.filter((m) => m.id !== "welcome"),
        userMsg,
      ].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No reader");

      const decoder = new TextDecoder();
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (!line.startsWith("data: ")) continue;
          const data = line.slice(6);
          if (data === "[DONE]") continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === "text-delta" && parsed.delta) {
              fullText += parsed.delta;
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === assistantMsg.id ? { ...m, content: fullText } : m
                )
              );
            }
          } catch {
            // skip non-JSON lines
          }
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? {
                ...m,
                content:
                  "I'm sorry, I encountered an error connecting to the AI service. Please try again.",
              }
            : m
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  return (
    <aside className="w-96 shrink-0 bg-white border-l flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b">
        <img
          src="https://amplex.com/wp-content/uploads/2020/11/favicon.png"
          alt="Amplex AI"
          className="w-10 h-10 rounded-full shrink-0 object-contain"
        />
        <div>
          <div className="font-display font-semibold text-lg leading-tight">
            Amplex AI
          </div>
          <span className="text-[10px] bg-muted text-muted-foreground rounded-full px-2 py-0.5">
            Powered by OpenAI
          </span>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.role === "user";
          const isAssistant = msg.role === "assistant";
          // Don't show action cards on the welcome message
          const actionType =
            isAssistant && msg.id !== "welcome" && msg.content
              ? getActionType(msg.content)
              : null;

          return (
            <div key={msg.id} className="space-y-2">
              <div
                className={cn(
                  "text-sm leading-relaxed whitespace-pre-wrap",
                  isUser
                    ? "bg-[#0C2340] text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[80%] ml-auto"
                    : "bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-[85%]"
                )}
              >
                {msg.content || (isAssistant && isLoading ? "" : msg.content)}
              </div>
              {actionType && !dismissedActions.has(msg.id) && (
                <ActionCard
                  type={actionType}
                  title={actionMeta[actionType].title}
                  description={actionMeta[actionType].description}
                  onConfirm={() => {
                    setDismissedActions((prev) =>
                      new Set(prev).add(msg.id)
                    );
                    if (actionType === "reorder")
                      toast.success(
                        "\u2713 ORD-2026-2250 placed \u2014 Amplex operations processing"
                      );
                    else if (actionType === "return")
                      toast.success(
                        "\u2713 RMA-2026-0090 created \u2014 Amplex operations notified"
                      );
                    else if (actionType === "report")
                      toast.success(
                        "\u2713 Report generating \u2014 you\u2019ll be notified when ready"
                      );
                  }}
                  onCancel={() => {
                    setDismissedActions((prev) =>
                      new Set(prev).add(msg.id)
                    );
                    toast("Action cancelled");
                  }}
                />
              )}
            </div>
          );
        })}
        {isLoading && (
          <div className="flex gap-1 px-4 py-2">
            <span
              className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
              style={{ animationDelay: "0ms" }}
            />
            <span
              className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
              style={{ animationDelay: "150ms" }}
            />
            <span
              className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce"
              style={{ animationDelay: "300ms" }}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick chips */}
      <div className="flex flex-wrap gap-1.5 px-3 py-2 border-t">
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => sendMessage(chip)}
            disabled={isLoading}
            className="text-[11px] border rounded-full px-2.5 py-1 whitespace-nowrap cursor-pointer hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input area */}
      <div className="border-t p-3">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Amplex AI..."
            rows={1}
            className="min-h-10 resize-none pr-12"
          />
          <button
            type="button"
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 bg-[#C41230] text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-[#a50f28] transition-colors disabled:opacity-50"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
