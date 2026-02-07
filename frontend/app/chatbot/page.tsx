"use client";

import { useState } from "react";
import UserInfoForm from "@/components/user-info-form";
import AceQuestionnaire from "@/components/ace-questionnaire";
import AceResults from "@/components/ace-results";
import ChatInterface from "@/components/chat-interface";
import AgeRestriction from "@/components/age-restriction";
import Disclaimer from "@/components/disclaimer";

type UserInfo = {
  name: string;
  age: number | null;
};

type Answer = "yes" | "no" | "skip" | null;

export default function ChatbotPage() {
  const [step, setStep] = useState<
    | "disclaimer"
    | "userInfo"
    | "questionnaire"
    | "results"
    | "chat"
    | "ageRestriction"
  >("disclaimer");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [aceScore, setAceScore] = useState<number>(0);
  const [aceAnswers, setAceAnswers] = useState<Answer[]>([]);

  const handleAcceptDisclaimer = () => {
    setStep("userInfo");
  };

  const handleUserInfoSubmit = (data: UserInfo) => {
    setUserInfo(data);
    setStep("questionnaire");
  };

  const handleAgeRestriction = () => {
    setStep("ageRestriction");
  };

  const handleQuestionnaireComplete = (score: number, answers: Answer[]) => {
    setAceScore(score);
    setAceAnswers(answers);
    setStep("results");
  };

  const handleStartChat = () => {
    setStep("chat");
  };

  const getInitialMessage = () => {
    if (aceScore <= 3) {
      return "🌞 Hey sunshine! What can we explore together today?";
    } else if (aceScore <= 6) {
      return "🌻 Hello strong spirit. What would you like to talk about today?";
    } else {
      return "🌸 Hello brave soul. I'm here for you — what's on your mind today?";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {step === "disclaimer" && (
          <Disclaimer onAccept={handleAcceptDisclaimer} />
        )}

        {step === "userInfo" && (
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
              Meet Zoe
            </h1>
            <p className="text-gray-600 text-center mb-8">
              Hi, I'm Zoe, your AI companion. I'm here to provide a safe space
              for you to share and receive support. Let's start with some basic
              information.
            </p>
            <UserInfoForm
              onSubmit={handleUserInfoSubmit}
              onAgeRestriction={handleAgeRestriction}
            />
          </div>
        )}

        {step === "ageRestriction" && <AgeRestriction />}

        {step === "questionnaire" && userInfo && (
          <div className="bg-white rounded-xl p-8 shadow-xl">
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
              Hi {userInfo.name}, please complete this questionnaire
            </h1>
            <p className="text-gray-600 text-center mb-8">
              These questions help me understand your experiences better so I
              can provide more personalized support. Your answers are
              confidential.
            </p>
            <AceQuestionnaire onComplete={handleQuestionnaireComplete} />
          </div>
        )}

        {step === "results" && userInfo && (
          <AceResults
            score={aceScore}
            userName={userInfo.name}
            onStartChat={handleStartChat}
          />
        )}

        {step === "chat" && userInfo && (
          <ChatInterface
            userName={userInfo.name}
            initialMessage={getInitialMessage()}
          />
        )}
      </div>
    </div>
  );
}
