import React from 'react';

const Domino = ({ value1, value2, size = 40, className = '' }) => {
  const halfSize = size / 2;
  const pipSize = halfSize / 4;
  const pipOffset = halfSize / 2;

  const halfSize = size / 2;

  return (
    <div
      className={`bg-white border border-gray-400 rounded-md shadow-sm flex flex-col items-center justify-center ${className}`}
      style={{ width: size, height: size * 2 }}
    >
      <div className="text-2xl">{value1}</div>
      <div className="w-full border-t border-gray-400"></div>
      <div className="text-2xl">{value2}</div>
    </div>
  );
};

export default Domino;
