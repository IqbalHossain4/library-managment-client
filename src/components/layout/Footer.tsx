import { FactoryIcon, GithubIcon, LinkedinIcon } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="max-w-[1440px] m-auto py-10">
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h2 className="text-xl font-bold mb-4">📚 Library Management</h2>
          <p className="text-sm ">
            Manage your books, borrows, and returns efficiently with our modern
            system.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm ">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to="/borrowsummary">Borrowed Books</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-sm ">
            <li>
              Email:{" "}
              <a href="mailto:info@library.com" className="hover:text-white">
                info@library.com
              </a>
            </li>
            <li>
              Phone:
              <a href="tel:+8801234567890" className="hover:text-white">
                +880 1234 567 890
              </a>
            </li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex space-x-4 ">
            <a href="#" className="hover:text-blue-500" aria-label="Facebook">
              <FactoryIcon />
            </a>

            <a href="#" className="hover:text-blue-300" aria-label="LinkedIn">
              <LinkedinIcon />
            </a>
            <a href="#" className="hover:text-gray-300" aria-label="GitHub">
              <GithubIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm ">
        &copy; 2025 Library Management. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
