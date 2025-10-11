import React from 'react';

const Domino = ({ value1, value2, size = 40, className = '' }) => {
  const halfSize = size / 2;
  const pipSize = halfSize / 4;
  const pipOffset = halfSize / 2;

  const renderPips = (value) => {
    const pips = [];
    const positions = {
      0: [],
      1: [[0, 0]],
      2: [[-1, -1], [1, 1]],
      3: [[-1, -1], [0, 0], [1, 1]],
      4: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
      5: [[-1, -1], [-1, 1], [0, 0], [1, -1], [1, 1]],
      6: [[-1, -1], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 1]],
    };

    const pipsToRender = positions[value] || [];
    pipsToRender.forEach(([x, y], index) => {
      pips.push(
        <circle
          key={index}
          cx={halfSize / 2 + x * pipOffset}
          cy={halfSize / 2 + y * pipOffset}
          r={pipSize}
          fill="black"
        />
      );
    });
    return pips;
  };

  return (
    <svg
      width={size / 2}
      height={size}
      viewBox={`0 0 ${size / 2} ${size}`}
      className={`bg-white border border-gray-400 rounded-md shadow-sm ${className}`}
    >
      {/* Top half */}
      <rect x="0" y="0" width={size / 2} height={size / 2} fill="white" />
      <g transform={`translate(0, 0)`}>{renderPips(value1)}</g>

      {/* Separator line */}
      <line x1="0" y1={size / 2} x2={size / 2} y2={size / 2} stroke="black" strokeWidth="2" />

      {/* Bottom half */}
      <rect x="0" y={size / 2} width={size / 2} height={size / 2} fill="white" />
      <g transform={`translate(0, ${size / 2})`}>{renderPips(value2)}</g>
    </svg>
  );
};

export default Domino;
