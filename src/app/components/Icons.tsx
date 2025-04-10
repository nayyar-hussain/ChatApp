import React from 'react';

interface IconsProps {
  Icon: React.ComponentType;
}

const Icons: React.FC<IconsProps> = ({ Icon }) => {
  return (
    <div className='text-white'>
      <Icon />
    </div>
  );
};

export default Icons;