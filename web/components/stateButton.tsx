import React from "react";

interface StateButtonProps {
  wrapperClassNames?: string;
  classNames?: string;
  label: string;
  state: "disabled" | "enabled" | "fetching";
  onClick: Function;
}

const StateButton: React.FC<StateButtonProps> = ({
  classNames,
  wrapperClassNames,
  label,
  state,
  onClick,
}) => {
  return (
    <div className={wrapperClassNames}>
      <button
        className={`w-20 px-4 py-2 text-white bg-blue-600 transition-opacity duration-100 focus:outline-none ${
          state === "enabled"
            ? "hover:opacity-95 active:bg-blue-700 active:opacity-100"
            : "opacity-50 cursor-not-allowed"
        } rounded-md ${classNames}`}
        onClick={() => (state === "enabled" ? onClick() : null)}
      >
        {state === "fetching" ? (
          <img src="/svg/spinner.svg" className="mx-auto animate-spin" />
        ) : (
          label
        )}
      </button>
    </div>
  );
};

export default StateButton;
