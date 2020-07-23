const {
  resolve_lnk_basic,
  resolve_lnk_basic_from
} = require("../src/resolve_lnk_basic.js");

const { ResolveLnkException } = require("../src/resolve_lnk_exception.js");

const path = require("path");
const fs = require("fs");

function setup_helpers() {
  const test_helpers = {
    resolve_lnk_basic_from: () => ({
      expectedOutput:
        "C:\\ashbeats\\software-source-codes\\2020-projects\\2020-YoutubeReactorsTools",
      testInput: path.join(__dirname, "sample-lnks/folder-link1.lnk")
    })
  };
  return test_helpers;
}

describe("Can parse lnks?", () => {
  const input = setup_helpers().resolve_lnk_basic_from();

  test("and extract details from lnk buffer", () => {
    let output = resolve_lnk_basic(fs.readFileSync(input.testInput));
    expect(output).toMatch(input.expectedOutput);
  });

  test("and extract details from lnk files?", async () => {
    let output = await resolve_lnk_basic_from(input.testInput);
    expect(output).toMatch(input.expectedOutput);
  });

  test("throws ResolveLnkException", () => {
    expect(() =>  resolve_lnk_basic(Buffer.alloc(32))).toThrow(ResolveLnkException);
  });

  // todo - test if it
});
