import React from 'react';
import Lottie from 'lottie-react';

interface AnimationProps {
  animationData: any;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
  speed?: number;
  height?: number | string;
  width?: number | string;
}

const Animation: React.FC<AnimationProps> = ({
  animationData,
  className = '',
  loop = true,
  autoplay = true,
  speed = 1,
  height,
  width,
}) => {
  return (
    <div className={className}>
      <Lottie
        animationData={animationData}
        loop={loop}
        autoplay={autoplay}
        speed={speed}
        style={{ height, width }}
      />
    </div>
  );
};

export default Animation; 