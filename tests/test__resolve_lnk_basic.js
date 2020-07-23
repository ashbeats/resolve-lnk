const {
  resolve_lnk_basic,
  resolve_lnk_basic_from
} = require("../src/resolve_lnk_basic.js");

const path = require("path");
const fs = require("fs");

describe("Can parse lnks?", () => {
  
  const testData = path.join(__dirname, "sample-lnks/folder-link1.lnk");
  const testDataResult = JSON.parse(
    fs
      .readFileSync(
        path.join(__dirname, "sample-outputs/folder-link1.lnk.json"),
        {
          encoding: "utf-8"
        }
      )
      .toString()
  );
  
  
  test("and extract details from lnk files?", async () => {
    let data = await resolve_lnk_basic_from(testData);
    expect(data).toMatch("C:\\ashbeats\\software-source-codes\\2020-projects\\2020-YoutubeReactorsTools");
  });
});
