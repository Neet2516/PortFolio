import { FiHome, FiUser, FiCode, FiLayers, FiMail } from "react-icons/fi";

const navLinks = [
  { name: "Home", href: "#home", icon: <FiHome /> },
  { name: "About", href: "#about", icon: <FiUser /> },
  { name: "Skills", href: "#skills", icon: <FiCode /> },
  { name: "Projects", href: "#projects", icon: <FiLayers /> },
  { name: "Contact", href: "#contact", icon: <FiMail /> },
];

export default function Navbar() {
  return (
    <>
      {/* ================= DESKTOP NAVBAR ================= */}
      <nav className="fixed top-0 left-0 w-full z-50 hidden md:block bg-black/60 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="text-white text-2xl font-bold">
            Navneet<span className="text-purple-500">.</span>
          </div>

          {/* Links */}
          <ul className="flex items-center gap-8 text-white">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="text-sm uppercase tracking-wider hover:text-purple-400 transition"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE BOTTOM NAVBAR ================= */}
      <nav className="fixed bottom-0 left-0 w-full z-50 md:hidden bg-black/70 backdrop-blur-xl border-t border-white/10">
        <ul className="flex justify-around items-center py-3 text-white">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="flex flex-col items-center text-xs gap-1 hover:text-purple-400 transition"
              >
                <span className="text-lg">{link.icon}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
