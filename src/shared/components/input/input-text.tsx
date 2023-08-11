import React, { useEffect, useState } from "react";
import { Input } from "antd";

interface InputTextProps {
  onChange: (str: string) => void;
  value: string;
  placeholder?: string;
}

const InputText = ({ value, placeholder, onChange }: InputTextProps) => {
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <Input onChange={handleOnChange} placeholder={placeholder} value={value} />
  );
};

export default InputText;
