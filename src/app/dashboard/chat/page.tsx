"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Send,
  Bot,
  User,
  Sparkles,
  Wind,
  Cloud,
  MessageCircle,
  Loader2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { Header } from "@/components/header";

export default function ChatPageDesign() {
  const [isTyping, setIsTyping] = useState(false);
  const headerHeight = 72; // px
  const sidebarWidth = 256; // px

  const suggestedQuestions = [
    "What's the current air quality in my area?",
    "When is the best time for outdoor exercise today?",
    "How does weather affect air pollution?",
    "What are the health effects of poor air quality?",
  ];

  const fakeMessages = [
    { id: "1", role: "user", content: "Hi, how’s the weather today?" },
    {
      id: "2",
      role: "assistant",
      content: "It looks sunny with a UV index of 6. Stay hydrated!",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[72px]">
        <Header />
      </div>

      {/* Fixed Sidebar */}
      <div
        className="fixed top-[72px] left-0 h-[calc(100vh-72px)] bg-background border-r border-border z-40"
        style={{ width: sidebarWidth }}
      >
        <DashboardSidebar />
      </div>

      {/* Main Chat Layout */}
      <div
        className="flex flex-col"
        style={{
          marginLeft: sidebarWidth,
          marginTop: headerHeight,
          height: `calc(100vh - ${headerHeight}px)`,
        }}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">
                AirWatch AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Your air quality & weather assistant
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">AI-Powered</span>
          </div>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Welcome State */}
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center animate-bounce">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <div className="absolute inset-0 h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 animate-ping opacity-20" />
            </div>
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-foreground">
                Welcome to AirWatch AI
              </h2>
              <p className="text-muted-foreground max-w-md">
                Ask me anything about air quality, weather forecasts, or
                environmental health recommendations.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl">
              {suggestedQuestions.map((question, index) => (
                <Card
                  key={index}
                  className="p-4 cursor-pointer hover:shadow-md transition-all duration-200 hover:scale-105 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border-dashed"
                >
                  <p className="text-sm text-foreground">{question}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Example Messages */}
          {fakeMessages.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start space-x-3 animate-in slide-in-from-bottom-2 duration-300",
                message.role === "user"
                  ? "flex-row-reverse space-x-reverse"
                  : ""
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Avatar
                className={cn(
                  "h-8 w-8",
                  message.role === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500"
                )}
              >
                <AvatarFallback className="text-white">
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </AvatarFallback>
              </Avatar>

              <Card
                className={cn(
                  "max-w-[80%] p-4 animate-in fade-in duration-500",
                  message.role === "user"
                    ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                    : "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
                )}
              >
                <p
                  className={cn(
                    "mb-2 last:mb-0",
                    message.role === "user" ? "text-white" : "text-foreground"
                  )}
                >
                  {message.content}
                </p>
              </Card>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-start space-x-3 animate-in slide-in-from-bottom-2">
              <Avatar className="h-8 w-8 bg-gradient-to-r from-blue-500 to-cyan-500">
                <AvatarFallback className="text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <Card className="p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
                  <span className="text-sm text-muted-foreground">
                    AirWatch AI is thinking...
                  </span>
                </div>
              </Card>
            </div>
          )}
        </div>

        {/* Input Form */}
        <div className="p-6 border-t border-border/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <form onSubmit={(e) => e.preventDefault()} className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                placeholder="Ask about air quality, weather, or health recommendations..."
                className="pr-12 bg-white/60 dark:bg-gray-700/60 backdrop-blur-sm border-2 focus:border-blue-500 transition-colors"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
                <Wind className="h-4 w-4 text-blue-500" />
                <Cloud className="h-4 w-4 text-cyan-500" />
              </div>
            </div>
            <Button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            AirWatch AI can help with air quality data, weather forecasts, and
            health recommendations.
          </p>
        </div>
      </div>
    </div>
  );
}
