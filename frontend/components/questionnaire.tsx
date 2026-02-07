"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type QuestionnaireData = {
  mentalHealth: string;
  goals: string;
  challenges: string;
  supportNeeded: string;
};

type QuestionnaireProps = {
  onSubmit: (data: QuestionnaireData) => void;
};

export default function Questionnaire({ onSubmit }: QuestionnaireProps) {
  const [mentalHealth, setMentalHealth] = useState("");
  const [goals, setGoals] = useState("");
  const [challenges, setChallenges] = useState("");
  const [supportNeeded, setSupportNeeded] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors: { [key: string]: string } = {};

    if (!mentalHealth) {
      newErrors.mentalHealth = "Please select an option";
    }

    if (!goals.trim()) {
      newErrors.goals = "This field is required";
    }

    if (!challenges.trim()) {
      newErrors.challenges = "This field is required";
    }

    if (!supportNeeded.trim()) {
      newErrors.supportNeeded = "This field is required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    onSubmit({
      mentalHealth,
      goals,
      challenges,
      supportNeeded,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <Label className="text-white text-lg">
          How would you describe your current mental wellbeing?
        </Label>
        <RadioGroup
          value={mentalHealth}
          onValueChange={setMentalHealth}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="excellent"
              id="excellent"
              className="border-purple-400"
            />
            <Label htmlFor="excellent" className="text-white">
              Excellent - I'm thriving
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="good"
              id="good"
              className="border-purple-400"
            />
            <Label htmlFor="good" className="text-white">
              Good - I'm doing well overall
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="okay"
              id="okay"
              className="border-purple-400"
            />
            <Label htmlFor="okay" className="text-white">
              Okay - I have good and bad days
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="struggling"
              id="struggling"
              className="border-purple-400"
            />
            <Label htmlFor="struggling" className="text-white">
              Struggling - I'm having a difficult time
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="crisis"
              id="crisis"
              className="border-purple-400"
            />
            <Label htmlFor="crisis" className="text-white">
              In crisis - I need immediate support
            </Label>
          </div>
        </RadioGroup>
        {errors.mentalHealth && (
          <p className="text-red-400 text-sm">{errors.mentalHealth}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="goals" className="text-white text-lg">
          What are your main goals or what would you like to achieve?
        </Label>
        <Textarea
          id="goals"
          value={goals}
          onChange={(e) => setGoals(e.target.value)}
          placeholder="E.g., Reduce anxiety, improve relationships, find purpose..."
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
        />
        {errors.goals && <p className="text-red-400 text-sm">{errors.goals}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="challenges" className="text-white text-lg">
          What challenges are you currently facing?
        </Label>
        <Textarea
          id="challenges"
          value={challenges}
          onChange={(e) => setChallenges(e.target.value)}
          placeholder="E.g., Work stress, relationship issues, self-doubt..."
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
        />
        {errors.challenges && (
          <p className="text-red-400 text-sm">{errors.challenges}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportNeeded" className="text-white text-lg">
          What kind of support are you looking for from ThinkxLife?
        </Label>
        <Textarea
          id="supportNeeded"
          value={supportNeeded}
          onChange={(e) => setSupportNeeded(e.target.value)}
          placeholder="E.g., Daily check-ins, coping strategies, someone to listen..."
          className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 min-h-[100px]"
        />
        {errors.supportNeeded && (
          <p className="text-red-400 text-sm">{errors.supportNeeded}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
      >
        Start Chatting
      </Button>
    </form>
  );
}
