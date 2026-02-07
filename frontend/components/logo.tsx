import Link from "next/link";
import { Brain } from "lucide-react";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center">
      <div className="flex items-center">
        <Brain className="w-8 h-8 text-purple-400 mr-2" />
        <span className="text-xl font-bold tracking-wider">
          Think<span className="text-purple-400">x</span>Life
        </span>
      </div>
    </Link>
  );
}
