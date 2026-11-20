/* Simple content blocks used on the home page and prompt pages. */
import { SITE } from "@/data/content";

const pad = n => String(n).padStart(2, "0");

export function SectionHead({ kicker, title, sub, id }) {
  return (
    <div className="section-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2 id={id}>{title}</h2>
      {sub && <p className="sub">{sub}</p>}
    </div>
  );
}

export function Steps({ steps, withTags = false }) {
  return (
    <ol className="steps">
      {steps.map((s, i) => (
        <li className="step" key={s.title}>
          <span className="step-num">{pad(i + 1)}</span>
          <h3>{s.title}</h3>
          <p>{s.text}</p>
          {withTags && s.tag && <span className="tag">{s.tag}</span>}
        </li>
      ))}
    </ol>
  );
}

const FACT_LABELS = { ai: "AI fact", bike: "Biker fact", tip: "Pro tip" };

export function Facts({ facts }) {
  return (
    <div className="facts">
      {facts.map((f, i) => (
        <div className="fact" key={i}>
          <span className={`fact-type ${f.type}`}>{FACT_LABELS[f.type] || f.type}</span>
          <p>{f.text}</p>
        </div>
      ))}
    </div>
  );
}

export function Products({ products }) {
  return (
    <div className="products">
      {products.map(p => {
        const live = p.status === "live" && p.link;
        return (
          <div className="product" key={p.title}>
            <span className="product-icon" aria-hidden="true">{p.icon}</span>
            <h3>{p.title}</h3>
            <p>{p.text}</p>
            <div className="product-foot">
              <span className={`status${live ? " live" : ""}`}>{live ? p.price : "Coming soon"}</span>
              {live
                ? <a className="btn btn-primary btn-sm" href={p.link} target="_blank" rel="noopener">Buy now</a>
                : <a className="btn btn-ghost btn-sm" href={SITE.dm} target="_blank" rel="noopener">Get early access</a>}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function Faq({ items }) {
  return (
    <div className="faq-list">
      {items.map(f => (
        <details className="faq-item" key={f.q}>
          <summary>{f.q}</summary>
          <p>{f.a}</p>
        </details>
      ))}
    </div>
  );
}
