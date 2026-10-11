import assert from "node:assert/strict";
import { test } from "node:test";
import { toFullWidth, toHalfWidth } from "./width.ts";

test("converts mixed text in both directions", () => {
  const text = "日本語 ひらがな ｶﾀｶﾅ ＡＢＣ123";
  assert.equal(toFullWidth(text), "日本語　ひらがな　カタカナ　ＡＢＣ１２３");
  assert.equal(toHalfWidth(text), "日本語 ひらがな ｶﾀｶﾅ ABC123");
});

test("handles voiced and semi-voiced kana", () => {
  assert.equal(toFullWidth("ｶﾞｯﾂﾎﾟｰｽﾞ ｳﾞ ｦﾞ ﾜﾞ"), "ガッツポーズ　ヴ　ヺ　ヷ");
  assert.equal(toHalfWidth("ガッツポーズ ヴ ヺ ヷ"), "ｶﾞｯﾂﾎﾟｰｽﾞ ｳﾞ ｦﾞ ﾜﾞ");
  assert.equal(toHalfWidth("カ\u3099ハ\u309a"), "ｶﾞﾊﾟ");
});

test("converts Japanese punctuation and ASCII punctuation", () => {
  assert.equal(
    toFullWidth("｡｢ｶﾅ｣､･!@#$%&()[]/"),
    "。「カナ」、・！＠＃＄％＆（）［］／",
  );
  assert.equal(
    toHalfWidth("。「カナ」、・！＠＃＄％＆（）［］／"),
    "｡｢ｶﾅ｣､･!@#$%&()[]/",
  );
});

test("preserves line breaks, tabs, and nonbreaking spaces", () => {
  assert.equal(
    toFullWidth("A B\nC\tD\r\nE\u00a0F"),
    "Ａ　Ｂ\nＣ\tＤ\r\nＥ\u00a0Ｆ",
  );
  assert.equal(
    toHalfWidth("Ａ　Ｂ\nＣ\tＤ\r\nＥ\u00a0Ｆ"),
    "A B\nC\tD\r\nE\u00a0F",
  );
});

test("preserves unrelated Unicode characters and kana without a half-width equivalent", () => {
  const text = "漢字ひらがな①㍿ﬁ😀ヵヶヸヹ";
  assert.equal(toFullWidth(text), text);
  assert.equal(toHalfWidth(text), text);
});

test("does not drop an invalid voiced combination", () => {
  assert.equal(toFullWidth("ｱﾞ"), "ア゛");
  assert.equal(toHalfWidth("ｱﾞ"), "ｱﾞ");
});

test("uses spacing marks for standalone dakuten and handakuten", () => {
  assert.equal(toFullWidth("ﾞﾟ"), "゛゜");
  assert.equal(toHalfWidth("゛゜"), "ﾞﾟ");
});

test("empty text and repeated conversions are stable", () => {
  assert.equal(toFullWidth(""), "");
  assert.equal(toHalfWidth(""), "");
  const text = "ｶﾞ ABC　123\nひらがな";
  assert.equal(toFullWidth(toFullWidth(text)), toFullWidth(text));
  assert.equal(toHalfWidth(toHalfWidth(text)), toHalfWidth(text));
});
