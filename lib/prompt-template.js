/* Prompt template engine — used to render the default prompt (server) and the live customizer (browser).

   Template syntax inside a prompt:
     {{key}}             value of a field
     {{#key}}...{{/key}} only shown when that field is filled in
     {{list}}            numbered lines of the selected items of a "list" field
     {{list.count}}      how many items are selected
*/
export function defaults(fields) {
  const v = {};
  (fields || []).forEach(f => {
    v[f.key] = f.type === "list" ? f.items.map((_, i) => i) : (f.default ?? "");
  });
  return v;
}

export function render(template, fields, values) {
  fields = fields || [];
  values = Object.assign(defaults(fields), values || {});

  const scalars = {};
  fields.forEach(f => { if (f.type !== "list") scalars[f.key] = String(values[f.key] ?? "").trim(); });
  const sub = s => s.replace(/\{\{\s*(\w+)\s*\}\}/g, (m, k) => (k in scalars ? scalars[k] : m));

  let out = template.replace(/\{\{#(\w+)\}\}([\s\S]*?)\{\{\/\1\}\}/g, (m, k, inner) => (scalars[k] ? inner : ""));

  fields.filter(f => f.type === "list").forEach(f => {
    const picked = f.items.filter((_, i) => values[f.key].includes(i));
    const lines = picked.map((it, i) => `${i + 1}. ${it.label}: ${sub(it.text)}`).join("\n");
    out = out.split(`{{${f.key}.count}}`).join(String(picked.length)).split(`{{${f.key}}}`).join(lines);
  });

  return sub(out);
}
