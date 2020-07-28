const {
  ResolveLnkException,
  resolveBuffer,
  resolve
} = require("../dist/index.js");

const path = require("path");
const fs = require("fs");

function setup_helpers() {
  const test_helpers = {
    resolve: () => ({
      expectedOutput:
        "C:\\ashbeats\\software-source-codes\\2020-projects\\2020-YoutubeReactorsTools",
      testInput: path.join(__dirname, "sample-lnks/folder-link1.lnk")
    })
  };
  return test_helpers;
}

describe("Can parse lnks?", () => {
  const input = setup_helpers().resolve();

  test("and extract details from lnk buffer", () => {
    let output = resolveBuffer(fs.readFileSync(input.testInput));
    expect(output).toMatch(input.expectedOutput);
  });

  test("and extract details from lnk files?", async () => {
    let output = await resolve(input.testInput);
    expect(output).toMatch(input.expectedOutput);
  });

  test("throws ResolveLnkException", () => {
    expect(() => resolveBuffer(Buffer.alloc(32))).toThrow(ResolveLnkException);
  });
});
