"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header>
      <nav className="py-4 px-6 md:px-12 lg:px-24 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-400 mr-2" />
              <span className="text-xl font-bold tracking-wider">
                Think<span className="text-purple-400">x</span>Life
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="https://www.thinkround.org/aboutus"
              className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium"
            >
              About
            </Link>
            <Link
              href="https://www.thinkround.org/donate"
              className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium"
            >
              Donate
            </Link>
            <Link
              href="https://thinkround.shop/"
              className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium"
            >
              Shop Art
            </Link>
          </div>

          <Link href="/chatbot" className="hidden md:block">
            <Button className="bg-purple-700 hover:bg-purple-800 text-white rounded-md">
              Meet Zoe
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                href="https://www.thinkround.org/aboutus"
                className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="https://www.thinkround.org/donate"
                className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Donate
              </Link>
              <Link
                href="https://thinkround.shop/"
                className="text-gray-700 hover:text-purple-700 uppercase text-sm font-medium py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop Art
              </Link>
              <Link href="/chatbot" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-purple-700 hover:bg-purple-800 text-white rounded-md mt-2">
                  Meet Zoe
                </Button>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
