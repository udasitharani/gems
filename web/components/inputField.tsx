import React, { useEffect, useMemo, useRef, useState } from "react";

interface InputFieldProps {
  classNames?: string;
  label: string;
  value: string;
  type?: string;
  showError?: boolean;
  errorMsg?: string;
  validationFn?: Function;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const InputField: React.FC<InputFieldProps> = ({
  classNames,
  label,
  value,
  type,
  errorMsg,
  showError,
  validationFn,
  setValue,
}) => {
  const [focused, setFocused] = useState<boolean>(undefined);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [typingTimer, setTypingTimer] = useState<NodeJS.Timeout | null>(null);
  const inputRef = useRef<HTMLInputElement>(undefined);

  useEffect(() => {
    if (validationFn) validationFn();
  }, [isTyping]);

  return (
    <div className={`relative ${classNames}`}>
      <input
        ref={inputRef}
        className={`w-full px-4 ${
          showError && !isTyping ? "mt-4 mb-2" : "my-4"
        } border border-gray-300 focus:border-gray-600 focus:outline-none transition-colors rounded-lg ${
          focused ? "text-base py-2" : "text-xs py-3"
        }`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(value.trim() ? true : false)}
        value={value}
        type={type}
        onInput={(e) => {
          if (typingTimer) clearTimeout(typingTimer);
          setIsTyping(true);
          setTypingTimer(
            setTimeout(() => {
              setIsTyping(false);
            }, 750)
          );
          setValue(e.currentTarget.value);
        }}
      />
      <p
        className={`text-red-400 text-xs transition-all duration-300 overflow-hidden ${
          showError && !isTyping ? "mb-4" : "mb-0 h-0"
        }`}
      >
        {errorMsg}
      </p>
      <p
        onClick={() => inputRef.current.focus()}
        className={`absolute text-xs transition-all duration-300 ${
          focused === true
            ? "top-2 left-2 px-2 text-gray-700 bg-white"
            : "text-gray-500 top-7 left-4"
        }`}
      >
        {label}
      </p>
    </div>
  );
};

export default InputField;
