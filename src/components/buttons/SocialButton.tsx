import React from "react";

interface SocialButtonProps {
  handleClick: () => void;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const SocialButton: React.FC<SocialButtonProps> = ({ handleClick, Icon }) => {
  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-gray-700 shadow-sm hover:bg-gray-50">
      <Icon className="h-5 w-5" />
    </button>
  );
};

export default SocialButton;
