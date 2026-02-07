import { Brain, Heart, Shield, Sparkles } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Heart className="w-10 h-10 text-purple-400" />,
      title: "Empathetic Understanding",
      description:
        "Experience conversations with an AI that truly understands your emotions and responds with compassion.",
    },
    {
      icon: <Brain className="w-10 h-10 text-purple-400" />,
      title: "Personalized Insights",
      description:
        "Receive tailored advice and insights based on your unique situation and personal journey.",
    },
    {
      icon: <Shield className="w-10 h-10 text-purple-400" />,
      title: "Private & Secure",
      description:
        "Your conversations are completely private and secure, with advanced encryption and data protection.",
    },
    {
      icon: <Sparkles className="w-10 h-10 text-purple-400" />,
      title: "Continuous Growth",
      description:
        "ThinkxLife learns and evolves with you, becoming more helpful with each conversation.",
    },
  ];

  return (
    <section
      id="features"
      className="py-24 px-6 md:px-12 lg:px-24 bg-slate-900/80"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text">
            How ThinkxLife Helps You
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Our AI companion is designed with your wellbeing in mind, offering
            support in multiple ways.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-slate-800 bg-slate-800/20 hover:bg-slate-800/30 transition-colors"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                {feature.title}
              </h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
