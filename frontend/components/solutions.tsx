import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Solutions() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-200 to-orange-400 text-transparent bg-clip-text">
            AI Solutions for Every Industry
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our AI models are designed to solve complex problems across various
            industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-lg overflow-hidden">
            <Image
              src="/futuristic-ai-healthcare.png"
              alt="Healthcare AI Solution"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Healthcare AI
            </h3>
            <p className="text-gray-300 mb-6">
              Our healthcare AI solutions help medical professionals diagnose
              diseases earlier, develop personalized treatment plans, and
              improve patient outcomes through predictive analytics and medical
              image analysis.
            </p>
            <Button className="w-fit bg-orange-900/30 hover:bg-orange-900/50 text-orange-300 border border-orange-700/50 rounded-md">
              Learn More
            </Button>
          </div>

          <div className="flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Financial Intelligence
            </h3>
            <p className="text-gray-300 mb-6">
              Transform your financial operations with our AI-powered solutions
              that detect fraud, optimize trading strategies, automate risk
              assessment, and provide personalized financial advice to
              customers.
            </p>
            <Button className="w-fit bg-orange-900/30 hover:bg-orange-900/50 text-orange-300 border border-orange-700/50 rounded-md">
              Learn More
            </Button>
          </div>

          <div className="rounded-lg overflow-hidden order-1 md:order-2">
            <Image
              src="/placeholder.svg?key=732el"
              alt="Financial AI Solution"
              width={600}
              height={400}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
