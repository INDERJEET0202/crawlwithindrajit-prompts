"use client";
import { useEffect, useState } from "react";

/** The small "Prompt copied" message. Trigger it from anywhere with showToast() in lib/clipboard.js */
export default function Toaster() {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

  useEffect(() => {
    let t;
    const onToast = e => {
      setMsg(e.detail);
      setShow(true);
      clearTimeout(t);
      t = setTimeout(() => setShow(false), 1800);
    };
    window.addEventListener("toast", onToast);
    return () => { window.removeEventListener("toast", onToast); clearTimeout(t); };
  }, []);

  return <div className={`toast${show ? " show" : ""}`} role="status" aria-live="polite">{msg}</div>;
}
