import { CheckCircle } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Share Your Information",
      description:
        "Tell us a bit about yourself so we can personalize your experience.",
    },
    {
      number: "02",
      title: "Complete the Questionnaire",
      description:
        "Answer a few questions about your needs, goals, and challenges.",
    },
    {
      number: "03",
      title: "Start Conversing",
      description:
        "Begin your conversation with ThinkxLife and receive personalized support.",
    },
    {
      number: "04",
      title: "Ongoing Support",
      description:
        "Return anytime for continued guidance and support on your journey.",
    },
  ];

  return (
    <section
      id="how-it-works"
      className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-slate-950 to-slate-900"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text">
            How ThinkxLife Works
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Getting started with ThinkxLife is simple. Follow these steps to
            begin your journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-slate-800 bg-slate-800/20 hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex items-center mb-4">
                <span className="text-3xl font-bold text-purple-400 mr-2">
                  {step.number}
                </span>
                <CheckCircle className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {step.title}
              </h3>
              <p className="text-slate-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
