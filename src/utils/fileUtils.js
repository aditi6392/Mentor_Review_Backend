const fs = require("fs");
const path = require("path");

function filePath(filename) {
  return path.join(__dirname, "..", "data", filename);
}

function readJson(filename) {
  const p = filePath(filename);
  try {
    const raw = fs.readFileSync(p, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    // if file missing or corrupt, return empty array
    return [];
  }
}

function writeJson(filename, data) {
  const p = filePath(filename);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), "utf8");
}

module.exports = { readJson, writeJson };
