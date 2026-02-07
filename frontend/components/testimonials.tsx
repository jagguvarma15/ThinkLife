import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "ThinkxLife has been a constant source of support during my difficult times. It's like having a compassionate friend available 24/7.",
      author: "Jamie L.",
      age: 28,
      rating: 5,
    },
    {
      quote:
        "I was skeptical about AI therapy, but ThinkxLife surprised me with its depth of understanding and personalized advice.",
      author: "Alex M.",
      age: 35,
      rating: 5,
    },
    {
      quote:
        "The daily check-ins and personalized insights have helped me develop better coping mechanisms for my anxiety.",
      author: "Sam K.",
      age: 42,
      rating: 5,
    },
  ];

  return (
    <section
      id="testimonials"
      className="py-24 px-6 md:px-12 lg:px-24 bg-slate-950"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-300 to-indigo-400 text-transparent bg-clip-text">
            What Our Users Say
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto">
            Hear from people who have experienced the support and guidance of
            ThinkxLife.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg border border-slate-800 bg-slate-800/20 hover:bg-slate-800/30 transition-colors"
            >
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-purple-400 text-purple-400"
                  />
                ))}
              </div>
              <p className="text-slate-300 mb-6 italic">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="font-semibold text-white">{testimonial.author}</p>
                <p className="text-slate-400 text-sm">Age {testimonial.age}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
