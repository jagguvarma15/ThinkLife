import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Twitter,
  Instagram,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="flex items-center">
                <Image
                  src="/tr_logo.png"
                  alt="Think Round, Inc Logo"
                  width={40}
                  height={40}
                  className="mr-2"
                />
                <span className="text-xl font-bold tracking-wider">
                  Think Round
                </span>
              </div>
            </Link>
            <p className="text-gray-600 mb-4">
              Think Round, Inc is dedicated to creating connections through art,
              education, and community engagement.
            </p>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Facebook size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Twitter size={20} />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-purple-700 transition-colors"
              >
                <Instagram size={20} />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.thinkround.org/aboutus"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="https://thinkround.shop/"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Shop Art
                </Link>
              </li>
              <li>
                <Link
                  href="/chatbot"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Meet Zoe
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Get Involved</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="https://www.thinkround.org/donate"
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Donate
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin
                  size={20}
                  className="mr-2 text-purple-700 flex-shrink-0 mt-1"
                />
                <span>
                  2140 Bush Street, 1<br />
                  San Francisco, CA 94115
                  <br />
                  United States
                </span>
              </li>
              <li className="flex items-center">
                <Phone
                  size={20}
                  className="mr-2 text-purple-700 flex-shrink-0"
                />
                <span>(415) 602-9599</span>
              </li>
              <li className="flex items-center">
                <Mail
                  size={20}
                  className="mr-2 text-purple-700 flex-shrink-0"
                />
                <span>info@thinkround.org</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Think Round, Inc. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
