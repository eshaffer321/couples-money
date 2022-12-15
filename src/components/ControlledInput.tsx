import React, { useState } from 'react';

interface Props {
  value: string | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ControlledInput = ({ value, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    if (!isFocused) {
      onChange(event);
    }
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
      value={inputValue? inputValue : ''}
      onChange={handleChange}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
};




