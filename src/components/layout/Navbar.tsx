import { ModeToggle } from "../mode-toggler";
import logo from "../../assets/logo.png";
import { Menu, X } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="w-full px-4 py-4 shadow-md   z-50">
      <nav className="max-w-[1440px] m-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} className="h-10 w-10" alt="logo" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">
          <Link className="hover:text-rose-700 transition-colors" to="/books">
            All Books
          </Link>

          <Link
            className="hover:text-rose-700 transition-colors"
            to="/create-book"
          >
            Add Book
          </Link>

          <Link
            to="/borrow-summary"
            className="hover:text-rose-700 transition-colors"
          >
            Borrow Summary
          </Link>

          <ModeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="mt-4 flex flex-col gap-4 md:hidden bg-white dark:bg-gray-900 rounded-lg shadow-lg p-4">
          <Link
            onClick={() => setIsOpen(false)}
            className="hover:text-rose-700 transition-colors"
            to="/books"
          >
            All Books
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            className="hover:text-rose-700 transition-colors"
            to="/create-book"
          >
            Add Book
          </Link>

          <Link
            onClick={() => setIsOpen(false)}
            className="hover:text-rose-700 transition-colors"
            to="/borrow-summary"
          >
            Borrow Summary
          </Link>

          <ModeToggle />
        </div>
      )}
    </header>
  );
};

export default Navbar;
