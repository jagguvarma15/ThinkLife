"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import ChatInterface from "@/components/chat-interface";

type AceResultsProps = {
  score: number;
  userName: string;
};

export default function AceResults({ score, userName }: AceResultsProps) {
  const [chatStarted, setChatStarted] = useState(false);

  const getMessageBasedOnScore = () => {
    if (score <= 3) {
      return "Your responses indicate a lower level of childhood adversity. Everyone's experiences shape them differently, and I'm here to support you in your journey.";
    } else if (score <= 6) {
      return "Your responses indicate a moderate level of childhood adversity. These experiences can have lasting effects, but resilience can be built with support and understanding.";
    } else {
      return "Your responses indicate a higher level of childhood adversity. It takes courage to acknowledge these experiences, and I'm here to provide a safe space for you.";
    }
  };

  if (chatStarted) {
    return <ChatInterface initialMessage={getMessageBasedOnScore()} />;
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-xl">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        💬 Questionnaire Complete
      </h2>

      <div className="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-100">
        <p className="text-gray-700 mb-4">{getMessageBasedOnScore()}</p>
        <p className="text-gray-700">
          Thank you for sharing, {userName}. I'm here to listen and support you
          in a judgment-free space.
        </p>
      </div>

      <Button
        onClick={() => setChatStarted(true)}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white py-3 text-lg"
      >
        Start Chat with Zoe
      </Button>
    </div>
  );
}
