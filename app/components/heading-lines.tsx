"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

const SELECTOR = "main h1, main h2";
const SKIP = ".legal-page, dialog";

function textNodes(heading: HTMLElement) {
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];
  for (let node = walker.nextNode(); node; node = walker.nextNode()) nodes.push(node as Text);
  return nodes;
}

function insertBreak(heading: HTMLElement, afterWord: number) {
  let seen = 0;
  for (const node of textNodes(heading)) {
    const pattern = /\S+/g;
    let match: RegExpExecArray | null;
    while ((match = pattern.exec(node.data))) {
      seen += 1;
      if (seen !== afterWord) continue;
      const end = match.index + match[0].length;
      const rest = node.data.slice(end).replace(/^\s+/, "");
      node.data = node.data.slice(0, end);
      const br = document.createElement("br");
      br.dataset.headingBreak = "true";
      node.after(br);
      if (rest) br.after(document.createTextNode(rest));
      return true;
    }
  }
  return false;
}

function removeBreak(heading: HTMLElement) {
  heading.querySelectorAll("br[data-heading-break]").forEach(br => {
    const before = br.previousSibling, after = br.nextSibling;
    br.remove();
    if (before?.nodeType === Node.TEXT_NODE && after?.nodeType === Node.TEXT_NODE) {
      (before as Text).data = `${(before as Text).data} ${(after as Text).data}`;
      after.remove();
    } else if (before?.nodeType === Node.TEXT_NODE) {
      (before as Text).data = `${(before as Text).data} `;
    }
  });
}

function lineCount(heading: HTMLElement) {
  const lineHeight = parseFloat(getComputedStyle(heading).lineHeight) || 1;
  return Math.round(heading.getBoundingClientRect().height / lineHeight);
}

// Keeps the first two or three words of a heading on line one and the rest on line two.
// Each split is measured; one that would spill onto a third line (leaving a lone word) is undone.
function breakHeading(heading: HTMLElement) {
  if (heading.closest(SKIP)) return;
  if (heading.dataset.lines) removeBreak(heading);
  const words = textNodes(heading).map(n => n.data).join("").trim().split(/\s+/).filter(Boolean);
  if (words.length < 4) return;
  heading.dataset.lines = "auto";
  for (const afterWord of words.length >= 6 ? [3, 2, 4] : [2, 3]) {
    if (!insertBreak(heading, afterWord)) continue;
    if (lineCount(heading) <= 2) { heading.dataset.lines = String(afterWord); return; }
    removeBreak(heading);
  }
}

export function HeadingLines() {
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    const run = () => { frame = requestAnimationFrame(() => document.querySelectorAll<HTMLElement>(SELECTOR).forEach(breakHeading)); };
    run();
    document.fonts?.ready.then(run);
    let timer = 0;
    const onResize = () => { window.clearTimeout(timer); timer = window.setTimeout(run, 150); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(timer); window.removeEventListener("resize", onResize); };
  }, [pathname]);
  return null;
}
