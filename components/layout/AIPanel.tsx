"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useChat } from "@ai-sdk/react";
import { SendHorizontal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ActionCard } from "@/components/portal/ActionCard";
import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";

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

const WELCOME_CONTENT =
  "Welcome back, Walmart Stores Inc. I have access to your live iSeries data. Ask me about inventory, orders, shipments, or anything else. I can also help you reorder, generate reports, or raise returns.";

function TypingIndicator() {
  return (
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
  );
}

/** Extract the text content from a UIMessage's parts array. */
function getMessageText(msg: UIMessage): string {
  return msg.parts
    .filter((p): p is { type: "text"; text: string } => p.type === "text")
    .map((p) => p.text)
    .join("");
}

function getActionType(
  content: string
): "reorder" | "return" | "report" | null {
  const lower = content.toLowerCase();
  if (lower.includes("reorder") || lower.includes("place the order")) {
    return "reorder";
  }
  if (
    (lower.includes("rma") || lower.includes("return")) &&
    lower.includes("initiate")
  ) {
    return "return";
  }
  if (
    lower.includes("report") &&
    (lower.includes("send") || lower.includes("generate"))
  ) {
    return "report";
  }
  return null;
}

const actionMeta: Record<
  "reorder" | "return" | "report",
  { title: string; description: string }
> = {
  reorder: {
    title: "Reorder Confirmation",
    description: "Review and confirm this reorder before it is placed.",
  },
  return: {
    title: "Initiate Return / RMA",
    description: "Review and confirm the return request.",
  },
  report: {
    title: "Generate Report",
    description: "The report will be generated and sent to your email.",
  },
};

export function AIPanel() {
  const [input, setInput] = useState("");
  const initialMessages: UIMessage[] = [
    {
      id: "welcome",
      role: "assistant",
      parts: [{ type: "text", text: WELCOME_CONTENT }],
    },
  ];

  const {
    messages,
    sendMessage,
    status,
  } = useChat({
    messages: initialMessages,
  });

  const isLoading = status === "streaming" || status === "submitted";
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;
    sendMessage({ text: trimmed });
    setInput("");
  }, [input, isLoading, sendMessage]);

  const handleChipClick = useCallback(
    (chip: string) => {
      if (isLoading) return;
      sendMessage({ text: chip });
    },
    [isLoading, sendMessage]
  );

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <aside className="w-96 shrink-0 bg-white border-l flex flex-col h-full">
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
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const text = getMessageText(msg);
          const isUser = msg.role === "user";
          const isAssistant = msg.role === "assistant";
          const actionType = isAssistant ? getActionType(text) : null;

          return (
            <div key={msg.id} className="space-y-2">
              <div
                className={cn(
                  "text-sm leading-relaxed",
                  isUser
                    ? "bg-navy text-white rounded-2xl rounded-br-md px-4 py-2 max-w-[80%] ml-auto"
                    : "bg-muted rounded-2xl rounded-bl-md px-4 py-2 max-w-[85%]"
                )}
              >
                {text}
              </div>
              {actionType && (
                <ActionCard
                  type={actionType}
                  title={actionMeta[actionType].title}
                  description={actionMeta[actionType].description}
                  onConfirm={() => {}}
                  onCancel={() => {}}
                />
              )}
            </div>
          );
        })}
        {isLoading &&
          messages[messages.length - 1]?.role !== "assistant" && (
            <TypingIndicator />
          )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick chips */}
      <div className="flex gap-2 px-4 py-2 overflow-x-auto border-t [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {quickChips.map((chip) => (
          <button
            key={chip}
            type="button"
            onClick={() => handleChipClick(chip)}
            disabled={isLoading}
            className="text-xs border rounded-full px-3 py-1.5 whitespace-nowrap cursor-pointer hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 bottom-2 bg-ampblue text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-ampblue/90 transition-colors disabled:opacity-50"
          >
            <SendHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
