declare module "moji" {
  type CharacterSet = "HE" | "ZE" | "HK" | "ZK";

  interface Moji {
    convert(from: CharacterSet, to: CharacterSet): Moji;
    toString(): string;
  }

  export default function moji(text: string): Moji;
}
