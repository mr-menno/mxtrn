import React from 'react';
import Domino from './domino';
import { Button } from './button'; // Assuming button component is available

const DominoButton = ({ value1, value2, onClick, isSelected, ...props }) => {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      onClick={onClick}
      className="p-1 h-auto w-auto"
      {...props}
    >
      <Domino value1={value1} value2={value2} size={30} />
    </Button>
  );
};

export default DominoButton;
