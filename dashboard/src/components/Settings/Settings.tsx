import React, { FC } from 'react';
import { useGetProfileQuery } from 'src/generated/graphql';

const Settings: FC = () => {
  const { data } = useGetProfileQuery();

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Settings;
