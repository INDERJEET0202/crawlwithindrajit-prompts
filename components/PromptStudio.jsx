"use client";
import { useMemo, useState } from "react";
import { defaults, render } from "@/lib/prompt-template";
import { copyText, showToast } from "@/lib/clipboard";

/** "Customize your prompt" + the prompt box + Copy / Share / Download buttons. */
export default function PromptStudio({ template, fields = [], downloads = [] }) {
  const [values, setValues] = useState(() => defaults(fields));
  const [flash, setFlash] = useState(0);
  const [copiedBtn, setCopiedBtn] = useState(null);
  const text = useMemo(() => render(template, fields, values), [template, fields, values]);

  const set = (key, value) => { setValues(v => ({ ...v, [key]: value })); setFlash(f => f + 1); };

  const toggleItem = (key, i) => {
    const current = values[key];
    const next = current.includes(i) ? current.filter(x => x !== i) : [...current, i].sort((a, b) => a - b);
    if (!next.length) { showToast("Keep at least one scene"); return; }
    set(key, next);
  };

  const copy = async which => {
    await copyText(text);
    setCopiedBtn(which);
    setTimeout(() => setCopiedBtn(null), 1600);
    showToast("Prompt copied");
  };

  const share = async () => {
    const url = location.origin + location.pathname;
    if (navigator.share) { try { await navigator.share({ title: document.title, url }); } catch {} }
    else { await copyText(url); showToast("Link copied"); }
  };

  return (
    <div className="feature-body">
      {fields.length > 0 && (
        <div className="builder">
          <div className="builder-head">
            <h2 className="label">Customize your prompt</h2>
            <button type="button" className="link-btn" onClick={() => { setValues(defaults(fields)); setFlash(f => f + 1); }}>Reset</button>
          </div>
          <div className="builder-grid">
            {fields.map(f => {
              if (f.type === "select") return (
                <label className="field" key={f.key}>
                  <span>{f.label}</span>
                  <select value={values[f.key]} onChange={e => set(f.key, e.target.value)}>
                    {f.options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                  </select>
                </label>
              );
              if (f.type === "text") return (
                <label className="field" key={f.key}>
                  <span>{f.label}</span>
                  <input type="text" value={values[f.key]} placeholder={f.placeholder || ""} autoComplete="off" onChange={e => set(f.key, e.target.value)} />
                </label>
              );
              if (f.type === "list") return (
                <fieldset className="field field-list" key={f.key}>
                  <legend>{f.label}</legend>
                  <div className="checks">
                    {f.items.map((it, i) => (
                      <label className="check" key={it.label}>
                        <input type="checkbox" checked={values[f.key].includes(i)} onChange={() => toggleItem(f.key, i)} />
                        <span>{it.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              );
              return null;
            })}
          </div>
        </div>
      )}

      <h2 className="label">The prompt</h2>
      <div className="prompt-wrap">
        <div className="prompt-bar">
          <span>prompt.txt</span>
          <button className="copy-mini" type="button" onClick={() => copy("mini")}>{copiedBtn === "mini" ? "Copied ✓" : "Copy"}</button>
        </div>
        <pre className={`prompt${flash ? " flash" : ""}`} key={flash}>{text}</pre>
      </div>
      <div className="feature-actions">
        <button className="btn btn-primary" type="button" onClick={() => copy("main")}>{copiedBtn === "main" ? "Copied ✓" : "Copy full prompt"}</button>
        <button className="btn btn-ghost" type="button" onClick={share}>Share</button>
        {downloads.map(d => (
          <a key={d.src} className="btn btn-ghost" href={d.src} download={d.download}>⬇ {d.label}</a>
        ))}
      </div>
    </div>
  );
}
