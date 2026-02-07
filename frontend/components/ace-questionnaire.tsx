"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const ACE_QUESTIONS = [
  "Before 18 years old, Did a parent or other adult in the household often swear at you, insult you, put you down, or humiliate you?",
  "Before 18 years old, Did a parent or other adult in the household often push, grab, slap, or throw something at you?",
  "Before 18 years old, Did an adult or person at least 5 years older ever touch, fondle, or have you touch them in a sexual way?",
  "Before 18 years old, Did you often feel that no one in your family loved you or thought you were important or special?",
  "Before 18 years old, Did you often feel that you didn't have enough to eat, had to wear dirty clothes, or had no one to protect you?",
  "Before 18 years old, Were your parents ever separated, divorced, or did a biological parent leave you for another reason?",
  "Before 18 years old, Was your mother or stepmother often pushed, grabbed, slapped, or had something thrown at her?",
  "Before 18 years old, Did you live with anyone who was a problem drinker, alcoholic, or who used street drugs?",
  "Before 18 years old, Was a household member depressed, mentally ill, or did they ever attempt suicide?",
  "Before 18 years old, Did a household member go to jail or prison?",
];

type Answer = "yes" | "no" | "skip" | null;

type AceQuestionnaireProps = {
  onComplete: (score: number, answers: Answer[]) => void;
};

export default function AceQuestionnaire({
  onComplete,
}: AceQuestionnaireProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>(
    Array(ACE_QUESTIONS.length).fill(null),
  );
  const [currentAnswer, setCurrentAnswer] = useState<Answer>(null);

  const handleNext = () => {
    if (currentAnswer === null) return;

    const newAnswers = [...answers];
    newAnswers[currentQuestion] = currentAnswer;

    setAnswers(newAnswers);

    if (currentQuestion < ACE_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentAnswer(null);
    } else {
      // Calculate score
      const score = calculateAceScore(newAnswers);
      onComplete(score, newAnswers);
    }
  };

  const calculateAceScore = (answers: Answer[]): number => {
    return answers.reduce((score, answer) => {
      if (answer === "yes") return score + 1;
      if (answer === "skip") return score + 0.25;
      return score;
    }, 0);
  };

  const progress = ((currentQuestion + 1) / ACE_QUESTIONS.length) * 100;

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-500">
          <span>
            Question {currentQuestion + 1} of {ACE_QUESTIONS.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">
            {ACE_QUESTIONS[currentQuestion]}
          </h3>

          <RadioGroup
            value={currentAnswer || ""}
            onValueChange={(value) => setCurrentAnswer(value as Answer)}
            className="space-y-3"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="yes" />
              <Label htmlFor="yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="no" />
              <Label htmlFor="no">No</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="skip" id="skip" />
              <Label htmlFor="skip">Prefer not to answer</Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Button
        onClick={handleNext}
        disabled={currentAnswer === null}
        className="w-full bg-purple-700 hover:bg-purple-800 text-white"
      >
        {currentQuestion < ACE_QUESTIONS.length - 1
          ? "Next Question"
          : "Complete Questionnaire"}
      </Button>
    </div>
  );
}
