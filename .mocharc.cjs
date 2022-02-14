module.exports = {
  extension: ["ts"],
  spec: "tests/**/*.spec.ts",
  require: "@swc-node/register",
  "node-option": [
    "experimental-specifier-resolution=node",
    "loader=ts-node/esm"
],
  require: "@swc-node/register",
  timeout: "2000"
};

