module.exports = ({ env }) => {
  return {
    babel: {
      plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-proposal-class-properties'],
    },
  };
};
