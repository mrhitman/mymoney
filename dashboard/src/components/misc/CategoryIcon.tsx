import React, { FC } from 'react';
import { IconDto } from 'src/generated/graphql';
import Icon from './Icon';

export const CategoryIcon: FC<{ icon?: IconDto | null }> = ({ icon }) => {
  return (
    <div
      className="category-icon"
      style={{
        backgroundColor: icon?.backgroundColor || 'grey',
      }}
    >
      <Icon
        name={icon?.name || 'warning'}
        type={icon?.type || 'AntDesign'}
        color={'white'}
        size={16}
      />
    </div>
  );
};

export default CategoryIcon;
