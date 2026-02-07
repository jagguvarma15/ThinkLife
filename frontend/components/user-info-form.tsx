"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserInfo = {
  name: string;
  age: number | null;
};

type UserInfoFormProps = {
  onSubmit: (data: UserInfo) => void;
  onAgeRestriction: () => void;
};

export default function UserInfoForm({
  onSubmit,
  onAgeRestriction,
}: UserInfoFormProps) {
  const [name, setName] = useState("");
  const [age, setAge] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; age?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    const newErrors: { name?: string; age?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!age.trim()) {
      newErrors.age = "Age is required";
    } else if (isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      newErrors.age = "Please enter a valid age";
    } else if (Number(age) < 18) {
      // Age restriction check
      onAgeRestriction();
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Clear errors and submit
    setErrors({});
    onSubmit({ name, age: Number(age) });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-700">
          Your Name
        </Label>
        <Input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="age" className="text-gray-700">
          Your Age
        </Label>
        <Input
          id="age"
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Enter your age"
          className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
        {errors.age && (
          <p className="text-red-500 text-sm mt-1">{errors.age}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-purple-700 hover:bg-purple-800 text-white"
      >
        Proceed to Questionnaire
      </Button>
    </form>
  );
}
