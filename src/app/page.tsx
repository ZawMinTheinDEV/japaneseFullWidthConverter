"use client";

import { Check, Copy, LockKeyhole, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toFullWidth, toHalfWidth } from "@/lib/width";

const example =
  "日本語のテキスト\nｶﾞｯﾂﾎﾟｰｽﾞ・カタカナ・ひらがな\nＡＢＣ 123 / Tokyo ２０２６";

function characterCount(text: string) {
  return Array.from(text).length.toLocaleString();
}

function Output({
  id,
  title,
  japanese,
  value,
}: {
  id: string;
  title: string;
  japanese: string;
  value: string;
}) {
  const field = useRef<HTMLTextAreaElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [notice, setNotice] = useState<{
    value: string;
    copied: boolean;
  } | null>(null);
  const copied = notice?.value === value && notice.copied;
  const failed = notice?.value === value && !notice.copied;

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setNotice({ value, copied: true });
    } catch {
      field.current?.focus();
      field.current?.select();
      setNotice({ value, copied: false });
    }

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNotice(null), 2500);
  }

  return (
    <section className="output" aria-labelledby={`${id}-label`}>
      <div className="output-heading">
        <h2 id={`${id}-label`}>
          {title} <span lang="ja">{japanese}</span>
        </h2>
        <button
          className={`copy-button${copied ? " copied" : ""}`}
          onClick={copy}
          disabled={!value}
          aria-label={`Copy ${title.toLowerCase()} text`}
          title={`Copy ${title.toLowerCase()} text`}
        >
          {copied ? <Check size={15} /> : <Copy size={15} />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <div className="output-field">
        <textarea
          ref={field}
          id={id}
          aria-labelledby={`${id}-label`}
          value={value}
          placeholder={japanese === "全角" ? "ア Ａ １" : "ｱ A 1"}
          readOnly
          spellCheck={false}
        />
        <div className="field-footer">
          <span className="copy-notice" role="status">
            {failed
              ? "Copy unavailable. Text selected for manual copy."
              : copied
                ? "Copied to clipboard"
                : ""}
          </span>
          <span>{characterCount(value)} characters</span>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [text, setText] = useState("");
  const input = useRef<HTMLTextAreaElement>(null);

  function replaceText(value: string) {
    setText(value);
    input.current?.focus();
  }

  return (
    <main className="converter">
      <header className="page-heading">
        <div className="wordmark" lang="ja" aria-hidden="true">
          <span>ア</span>
          <span>ｱ</span>
        </div>
        <div>
          <p className="japanese-title" lang="ja">
            文字幅
          </p>
          <h1>Japanese width converter</h1>
        </div>
      </header>

      <section className="input-section" aria-labelledby="input-label">
        <div className="input-heading">
          <label id="input-label" htmlFor="input">
            Your text <span lang="ja">入力</span>
          </label>
          <div className="input-actions">
            <button
              className="example-button"
              onClick={() => replaceText(example)}
            >
              Example
            </button>
            <span className="action-divider" aria-hidden="true" />
            <button
              className="clear-button"
              onClick={() => replaceText("")}
              disabled={!text}
              title="Clear text"
            >
              <X size={15} /> Clear
            </button>
          </div>
        </div>
        <div className="input-field">
          <textarea
            ref={input}
            id="input"
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="日本語、ｶﾀｶﾅ、ABC 123…"
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
          />
          <div className="field-footer">
            <span>{characterCount(text)} characters</span>
          </div>
        </div>
      </section>

      <div className="outputs">
        <Output
          id="full-width"
          title="Full-width"
          japanese="全角"
          value={toFullWidth(text)}
        />
        <Output
          id="half-width"
          title="Half-width"
          japanese="半角"
          value={toHalfWidth(text)}
        />
      </div>

      <footer className="page-footer">
        <p>
          <LockKeyhole size={12} aria-hidden="true" /> Text stays in your
          browser.
        </p>
        <span lang="ja">全角 / 半角</span>
      </footer>
    </main>
  );
}
