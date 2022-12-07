import { reverseString } from "../utils";

const evenString = "1234";
const oddString = "12345";
const evenArrayResult = [
  ["1", "2", "3", "4"],
  ["4", "2", "3", "1"],
  ["4", "3", "2", "1"],
];

const oddArrayResult = [
  ["1", "2", "3", "4", "5"],
  ["5", "2", "3", "4", "1"],
  ["5", "4", "3", "2", "1"],
];

const single = "1";

const singleArrayResult = [["1"]];

const emptyString = "";

describe("test component String:reverse", () => {
  it("Корректно разворачивает строку с чётным количеством символов", () => {
    expect(reverseString(evenString)).toEqual(evenArrayResult);
  });

  it("Корректно разворачивает строку с нечётным количеством символов", () => {
    expect(reverseString(oddString)).toEqual(oddArrayResult);
  });

  it("Корректно разворачивает строку с одним символом", () => {
    expect(reverseString(single)).toEqual(singleArrayResult);
  });
  it("Корректно разворачивает пустую строку", () => {
    expect(reverseString(emptyString)).toEqual([[]]);
  });
});
