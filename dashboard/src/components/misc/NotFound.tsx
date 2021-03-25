import { Button, Result } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from 'src/components/misc/Layout';

interface Props {
  title?: string;
  subTitle?: string;
}

export const NotFound: React.FC<Props> = ({ title, subTitle }) => {
  return (
    <Layout>
      <Result
        status={'404'}
        title={title || '404'}
        subTitle={subTitle || 'Sorry, the page you visited does not exist.'}
        extra={
          <Link to="/">
            <Button type="primary">Back Home</Button>
          </Link>
        }
      />
    </Layout>
  );
};
