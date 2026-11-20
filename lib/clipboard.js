/* Browser-only helpers: copy to clipboard (with fallback) and the small toast message. */

function fallbackCopy(text) {
  const ta = Object.assign(document.createElement("textarea"), { value: text });
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.opacity = "0";
  document.body.append(ta);
  ta.select();
  ta.setSelectionRange(0, text.length);
  document.execCommand("copy");
  ta.remove();
}

export async function copyText(text) {
  try {
    if (!navigator.clipboard) throw 0;
    // don't hang if the browser stalls on clipboard permission
    await Promise.race([navigator.clipboard.writeText(text), new Promise((_, rej) => setTimeout(rej, 800))]);
  } catch {
    fallbackCopy(text);
  }
}

/** Shows the toast at the bottom of the screen (rendered by <Toaster/> in the layout). */
export const showToast = message => window.dispatchEvent(new CustomEvent("toast", { detail: message }));
