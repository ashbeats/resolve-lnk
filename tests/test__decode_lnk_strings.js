const decode_lnk_string = require("../src/decode_lnk_string.js");
const path = require("path");
const fs = require("fs");
describe("Can decode strings", () => {
  const pathToExample = path.join(
    __dirname,
    "sample-decodables/decode_lnk_string(96)(0).json"
  );
  const { encoding, bytes, index, count, result } = JSON.parse(
    fs
      .readFileSync(pathToExample, {
        encoding: "utf-8"
      })
      .toString()
  );

  const byteBuffer = Buffer.from(bytes["data"]);

  test("from lnk byte arrays?", async () => {
    let data = decode_lnk_string(encoding, byteBuffer, index, count);
    expect(data).toMatch(result);
  });
});
