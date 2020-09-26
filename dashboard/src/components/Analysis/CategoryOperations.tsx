import { Table } from 'antd';
import React, { FC } from 'react';

interface CategoryOperationsProps {
  from?: string;
  to?: string;
  categoryId: string;
}

const CategoryOperations: FC<CategoryOperationsProps> = () => {
  return <Table dataSource={[]} />;
};

export default CategoryOperations;
