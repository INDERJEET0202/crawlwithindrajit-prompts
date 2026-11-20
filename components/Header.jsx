"use client";
import { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { InstagramIcon, YouTubeIcon } from "./Icons";
import { SITE } from "@/data/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav">
      <Logo />
      <nav className={`nav-links${open ? " open" : ""}`} id="navLinks" aria-label="Main">
        <Link href="/#prompts" onClick={close}>Prompts</Link>
        <Link href="/#shop" onClick={close}>Shop</Link>
        <Link href="/#how" onClick={close}>How it works</Link>
        <Link href="/#about" onClick={close}>About</Link>
        {SITE.youtube && (
          <a href={SITE.youtube} className="nav-yt" target="_blank" rel="noopener" aria-label="YouTube channel" onClick={close}>
            <YouTubeIcon /><span className="nav-yt-label">YouTube</span>
          </a>
        )}
        <a href={SITE.instagram} className="btn-ig" target="_blank" rel="noopener" aria-label="Follow on Instagram" onClick={close}>
          <InstagramIcon /><span>Follow</span>
        </a>
      </nav>
      <button
        className="nav-toggle"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => setOpen(o => !o)}
      >
        <span /><span />
      </button>
    </header>
  );
}
