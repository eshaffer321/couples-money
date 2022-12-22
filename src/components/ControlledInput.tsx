import React, { useState } from 'react';

interface Props {
  value: string | number | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  rightAligned?: boolean;
}

export const ControlledInput = ({ value, onChange, rightAligned = false }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!isFocused) {
      onChange(event);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLInputElement>) => {
    // Stop the event from propagating to the parent element
    event.stopPropagation();
  };

  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onChange(event);
  };

  return (
    <input
      className={rightAligned ? "text-right" : ""}
      size={inputValue ? inputValue.toString().length : 1}
      value={inputValue ? inputValue : ""}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onClick={handleClick}
    />
  );
};

