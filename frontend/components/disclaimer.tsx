"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DisclaimerProps = {
  onAccept: () => void;
};

export default function Disclaimer({ onAccept }: DisclaimerProps) {
  return (
    <div className="bg-white rounded-xl p-8 shadow-xl">
      <div className="flex flex-col items-center text-center mb-6">
        <AlertCircle className="h-12 w-12 text-amber-500 mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Important Disclaimer
        </h1>
      </div>

      <div className="space-y-4 mb-8">
        <p className="text-gray-700">
          Zoe is an AI assistant under constant improvement for empathy and
          support. While Zoe aims to provide helpful and supportive responses,
          please be aware of the following:
        </p>

        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>
            All responses are AI-generated and may not always be perfect or
            fully nuanced.
          </li>
          <li>
            Please verify any factual information, advice, or guidance with
            other reliable sources before making decisions.
          </li>
          <li>
            Zoe is not a replacement for professional mental health services. If
            you're experiencing a crisis or need immediate help, please contact
            a mental health professional or crisis service.
          </li>
          <li>
            Your privacy is important. Information you share helps personalize
            your experience.
          </li>
        </ul>

        <p className="text-gray-700 font-medium">
          By continuing, you acknowledge that you understand these limitations.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Button
          onClick={onAccept}
          className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-2"
        >
          I Understand
        </Button>
        <Link href="/">
          <Button
            variant="outline"
            className="border-gray-300 text-gray-700 hover:bg-gray-100 px-8 py-2"
          >
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
