import moji from "moji";

export function toFullWidth(text: string): string {
  // Limit compatibility normalization to half-width kana, preserving symbols like ① and ㍿.
  const kana = text.replace(/[\uff61-\uff9f]+/g, (run) =>
    run
      .normalize("NFKC")
      .replace(/\u3099/g, "\u309b")
      .replace(/\u309a/g, "\u309c"),
  );
  return moji(kana).convert("HE", "ZE").toString().replace(/ /g, "\u3000");
}

export function toHalfWidth(text: string): string {
  const kana = text.replace(/[\u30a1-\u30fa][\u3099\u309a]/g, (pair) =>
    pair.normalize("NFC"),
  );
  return moji(kana)
    .convert("ZK", "HK")
    .convert("ZE", "HE")
    .toString()
    .replace(/\u3000/g, " ");
}
