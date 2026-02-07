import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Programs() {
  const programs = [
    {
      title: "Fine Arts Program",
      description:
        "Exhibitions, workshops, and opportunities for artists to showcase their work and connect with the community.",
      image: "/art-exhibition.png",
    },
    {
      title: "Educational Initiatives",
      description:
        "Programs for schools and community centers that integrate arts into curriculum and promote cultural understanding.",
      image: "/classroom-art-education.png",
    },
    {
      title: "Community Projects",
      description:
        "Collaborative art projects that bring together diverse communities to create meaningful public art.",
      image: "/community-mural.png",
    },
  ];

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Our Programs
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore our diverse range of programs designed to inspire
            creativity, foster learning, and build community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {programs.map((program, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <Image
                src={program.image || "/placeholder.svg"}
                alt={program.title}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {program.title}
                </h3>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Link href="#">
                  <Button
                    variant="link"
                    className="text-purple-700 p-0 hover:text-purple-900"
                  >
                    Learn more →
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="#">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-3 rounded-md">
              View All Programs
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
