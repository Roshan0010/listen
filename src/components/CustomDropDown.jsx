/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import { FaCaretDown } from 'react-icons/fa';

const CustomDropdown = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block w-[90%]">
      <div
        className="w-full p-2 rounded-lg bg-gray-700 cursor-pointer flex justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value}
        <FaCaretDown />
        {value ? value.label : placeholder}
      </div>

      {isOpen && (
        <div className="absolute z-10 w-full mt-2 bg-gray-700 rounded-lg shadow-md">
          {options.map((option) => (
            <div
              key={option.value}
              className="p-2 cursor-pointer hover:bg-gray-600"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
