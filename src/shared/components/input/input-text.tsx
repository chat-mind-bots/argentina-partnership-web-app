import React, { useEffect, useState } from "react";
import { Input } from "antd";

interface InputTextProps {
  callback?: (str: string) => void;
  placeholder?: string;
  initialState?: string;
}

const InputText = ({ initialState, placeholder, callback }: InputTextProps) => {
  const [text, setText] = useState(initialState);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  useEffect(() => {
    if (callback)
      if (text) {
        callback(text);
      }
  }, [text]);
  return <Input onChange={handleOnChange} placeholder={placeholder}></Input>;
};

export default InputText;
