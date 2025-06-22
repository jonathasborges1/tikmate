import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="text-center text-sm text-purple-300/70 mt-8">
      Desenvolvido por{" "}
      <a
        href="https://github.com/jonathasborges1"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-200 underline transition-colors"
      >
        <FaGithub className="w-4 h-4" />
        Jonathas Borges
      </a>
    </footer>
  );
};

export default Footer;
