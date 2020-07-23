/**
 * Common pattern for strings in lnk files. extract, split, and take first.
 *
 * @param {BufferEncoding} encoding
 * @param {Buffer} bytes
 * @param {number} index
 * @param {number} count
 * @returns {string}
 */

const fs = require("fs");

module.exports = function decode_lnk_string(encoding, bytes, index, count) {
  return bytes.toString(encoding, index, index + count).split("\0")[0];
};
