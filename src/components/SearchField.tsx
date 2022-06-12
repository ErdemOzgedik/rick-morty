import React, { useState, useRef, useEffect } from "react";

interface Props {
  term: string;
  setTerm: React.Dispatch<React.SetStateAction<string>>;
}

function SearchField({ setTerm }: Props) {
  const [inputVal, setInputVal] = useState("");

  const inputRef = useRef("");
  const timeoutId = useRef<NodeJS.Timeout>();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputVal(e.target.value);
    inputRef.current = e.target.value;
  }

  useEffect(() => {
    clearTimeout(timeoutId.current);

    timeoutId.current = setTimeout(() => {
      setTerm(inputRef.current);
    }, 800);
  }, [inputVal, setTerm]);

  return (
    <div className="w-full flex">
      <input
        className="w-full p-4 text-gray-900 rounded-lg bg-gray-50 sm:text-md"
        onChange={handleChange}
        placeholder="search by name.."
        value={inputVal}
      />
    </div>
  );
}

export default SearchField;
