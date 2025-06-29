import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  load?: boolean;
  ovclassName?: string;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  load = false,
  children,
  disabled = false,
  type,
  ovclassName,
  className = "",
  ...rest
}) => {
  const isVisuallyDisabled = disabled;
  const shouldShowLoader = load && !disabled;

  const cursor = `cursor-pointer`;
  const noCursor = `cursor-not-allowed`;

  const applyDefaultVisual = isVisuallyDisabled
    ? `bg-gray-400 text-white opacity-60 ${noCursor}`
    : `bg-gradient-to-r from-[#8927ec] via-[#3c38d1] to-[#1a68e8] text-white ${cursor}`;

  const defaultClass = `
    w-full py-3 px-6 rounded-xl font-semibold text-base transition-all duration-200 transform
    hover:scale-[1.02]
    border border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.3)]
    ${applyDefaultVisual}
  `;

  const defaultClassName = ovclassName
    ? `${ovclassName} ${isVisuallyDisabled ? noCursor : cursor}`
    : `${defaultClass} ${className}`;

  return (
    <button
      {...rest}
      type={type || "button"}
      disabled={disabled}
      className={defaultClassName}
    >
      {shouldShowLoader ? <ClipLoader size={20} color="#fff" /> : children}
    </button>
  );
};

export default Button;
