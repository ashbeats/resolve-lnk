"use strict";

/**
 @see docs/[MS-SHLLINK].pdf 
 @see https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-shllink/16cb4ca1-9339-4d0c-a68d-bf1d6cc0f943?redirectedfrom=MSDN
 @see  https://github.com/EricZimmerman/Lnk/
 @author ash
 
 */
const fs = require("fs");
const util = require("util");
const { castToDataFlags } = require("./dataFlags.js");
// const { dd } = require("dumper.js");
const decode_lnk_string = require("./decode_lnk_string.js");
const {ResolveLnkException} = require("./resolve_lnk_exception.js");

function resolveBuffer(rawBytes) {
  let bag = {};
  try {
    let index = 76;

    const headerBytes = Buffer.alloc(index);
    headerBytes.set(rawBytes.subarray(0, index), 0);

    const dataFlagInt = rawBytes.readInt32LE(20);
    // https://github.com/EricZimmerman/Lnk/blob/9c8c9f49e1386b261cbd0ac6a891fed131cabb7d/Lnk/Header.cs#L9

    let relevant_flags = castToDataFlags(dataFlagInt);
    bag["flags"] = relevant_flags;

    const shellItemSize = rawBytes.readInt16LE(index);
    index += 2;

    index = shellItemSize + index;
    // bag["new-index"] = index;

    const locationItemSize = rawBytes.readInt32LE(index);
    // bag["locationItemSize"] = locationItemSize;

    const locationBytes = Buffer.alloc(locationItemSize);
    locationBytes.set(rawBytes.subarray(index, index + locationItemSize), 0);

    // bag["locationBytes"] = locationBytes.length;

    const locationInfoHeaderSize = locationBytes.readInt32LE(4);
    // bag["locationInfoHeaderSize"] = locationInfoHeaderSize;
    // Local path: C:\
    const localPathOffset = locationBytes.readInt32LE(16);

    // bag["localPathOffset"] = localPathOffset;

    let LocalPath = decode_lnk_string(
      "ascii",
      locationBytes,
      localPathOffset,
      locationBytes.length - localPathOffset
    );

    // Common path:
    // bag["LocalPath"] = LocalPath;

    const commonPathOffset = locationBytes.readInt32LE(24);
    bag["commonPathOffset"] = commonPathOffset;

    let CommonPath = decode_lnk_string(
      "ascii",
      locationBytes,
      commonPathOffset,
      locationBytes.length - commonPathOffset
    );

    if (locationInfoHeaderSize > 28) {
      // unicode.
      const uniLocalOffset = locationBytes.readInt32LE(28);
      const unicodeLocalPath = decode_lnk_string(
        "utf16le",
        locationBytes,
        uniLocalOffset,
        locationBytes.length - uniLocalOffset
      );

      LocalPath = unicodeLocalPath;
    }

    if (locationInfoHeaderSize > 32) {
      // unicode.
      const uniCommonOffset = locationBytes.readInt32LE(32);
      const unicodeCommonPath = decode_lnk_string(
        "utf16le",
        locationBytes,
        uniCommonOffset,
        locationBytes.length - uniCommonOffset
      );

      CommonPath = unicodeCommonPath;
    }

    // bag["CommonPath"] = CommonPath;

    return LocalPath + CommonPath;
  } catch (e) {
    throw new ResolveLnkException(bag, e);     
    // return null;
  }
}

const readFilePromise = util.promisify(fs.readFile);

module.exports = {
  resolveBuffer,
  resolve      : async filename =>
    resolveBuffer(await readFilePromise(filename)),
  
  ResolveLnkException, 
  
};
