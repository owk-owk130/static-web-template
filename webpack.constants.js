const path = require("path");

const SRC = "./src";
const STATIC = "./src/static";
const DIST = "./dist";
const BASE_DIR = "/";
const PAGES_DIR = `./${path.join(SRC, "/pages")}`;

const HOST = "0.0.0.0";
const PORT = 3000;

module.exports = {
  SRC,
  STATIC,
  DIST,
  BASE_DIR,
  PAGES_DIR,
  HOST,
  PORT
};
