module.exports = {
  extension: ["ts"],
  spec: "tests/**/*.spec.ts",
  "node-option": [
    "experimental-specifier-resolution=node",
    "loader=ts-node/esm"
],
  timeout: "2000"
};

