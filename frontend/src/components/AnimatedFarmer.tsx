import React from 'react';

const AnimatedFarmer = () => {
  return (
    <div className="w-full max-w-md mx-auto">
      <svg
        viewBox="0 0 400 400"
        className="w-full h-auto"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Background */}
        <rect
          x="0"
          y="0"
          width="400"
          height="400"
          fill="#E8F5E9"
          className="animate-pulse"
        />

        {/* Sun */}
        <circle
          cx="320"
          cy="80"
          r="40"
          fill="#FFD700"
          className="animate-pulse"
        >
          <animate
            attributeName="r"
            values="40;45;40"
            dur="3s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Farmer */}
        <g className="animate-bounce">
          {/* Body */}
          <rect
            x="180"
            y="200"
            width="40"
            height="60"
            fill="#4A5568"
          />
          {/* Head */}
          <circle
            cx="200"
            cy="180"
            r="20"
            fill="#FBD38D"
          />
          {/* Hat */}
          <path
            d="M180 170 L220 170 L200 150 Z"
            fill="#2D3748"
          />
        </g>

        {/* Hoe */}
        <g className="animate-spin" style={{ transformOrigin: '200px 260px' }}>
          <rect
            x="195"
            y="260"
            width="10"
            height="60"
            fill="#8B4513"
          />
          <rect
            x="170"
            y="260"
            width="40"
            height="5"
            fill="#8B4513"
          />
        </g>

        {/* Ground */}
        <rect
          x="0"
          y="320"
          width="400"
          height="80"
          fill="#795548"
        />

        {/* Plants */}
        <g className="animate-grow">
          <path
            d="M100 320 L100 280 L110 290 L100 300 L110 310 L100 320"
            fill="#4CAF50"
            className="animate-pulse"
          />
          <path
            d="M300 320 L300 280 L310 290 L300 300 L310 310 L300 320"
            fill="#4CAF50"
            className="animate-pulse"
          />
        </g>

        {/* Clouds */}
        <g className="animate-float">
          <circle
            cx="100"
            cy="100"
            r="20"
            fill="white"
          />
          <circle
            cx="130"
            cy="100"
            r="25"
            fill="white"
          />
          <circle
            cx="160"
            cy="100"
            r="20"
            fill="white"
          />
        </g>
      </svg>
    </div>
  );
};

export default AnimatedFarmer; 