const {
  removeModuleScopePlugin,
  override,
  addBabelPlugins,
  babelInclude,
} = require("customize-cra");
const path = require("path");

module.exports = override(
  removeModuleScopePlugin(),
  ...addBabelPlugins('@babel/plugin-proposal-class-properties'),
  babelInclude([
    path.resolve(__dirname, '../common'),
    path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
    path.resolve(__dirname, 'node_modules/react-native-elements'),
    path.resolve(__dirname, 'node_modules/react-native-ratings'),
    path.resolve(__dirname, 'src'),
  ])
);
