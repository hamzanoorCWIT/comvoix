"use client";
import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

export type DropdownOption = { value: string; label: string };

type Props = {
  id: string;
  options: readonly DropdownOption[];
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  label?: string;
  invalid?: boolean;
  describedBy?: string;
  className?: string;
};

/* A dropdown styled like the text fields: the button is the field, the list opens beneath it in the same surface,
   with a themed scrollbar. Keyboard: arrows, Home/End, Enter/Space, Escape, and typing to jump to a match. */
export function Dropdown({ id, options, value, placeholder, onChange, onBlur, label, invalid, describedBy, className }: Props) {
  const listId = useId();
  const root = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const typed = useRef({ text: "", at: 0 });
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.findIndex(o => o.value === value)));
  const selected = options.find(o => o.value === value);

  useEffect(() => {
    if (!open) return;
    const close = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) { setOpen(false); onBlur?.(); } };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [open, onBlur]);

  useEffect(() => {
    if (!open) return;
    const item = list.current?.children[active] as HTMLElement | undefined;
    item?.scrollIntoView({ block: "nearest" });
  }, [open, active]);

  function show() {
    setActive(Math.max(0, options.findIndex(o => o.value === value)));
    setOpen(true);
  }
  function choose(index: number) {
    const option = options[index];
    if (!option) return;
    onChange(option.value);
    setOpen(false);
    onBlur?.();
  }
  function onKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = options.length - 1;
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) return show();
      setActive(i => Math.min(last, Math.max(0, i + (event.key === "ArrowDown" ? 1 : -1))));
    } else if (event.key === "Home" || event.key === "End") {
      if (!open) return;
      event.preventDefault();
      setActive(event.key === "Home" ? 0 : last);
    } else if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (open) choose(active); else show();
    } else if (event.key === "Escape") {
      if (open) { event.preventDefault(); setOpen(false); }
    } else if (event.key === "Tab") {
      if (open) setOpen(false);
    } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      // Type to jump: letters typed within a second are treated as one search.
      const now = Date.now();
      typed.current = { text: (now - typed.current.at < 1000 ? typed.current.text : "") + event.key.toLowerCase(), at: now };
      const query = typed.current.text;
      const start = query.length === 1 ? active + 1 : 0;
      const order = [...options.keys()].map(i => (start + i) % options.length);
      const hit = order.find(i => options[i].label.toLowerCase().startsWith(query));
      if (hit !== undefined) { setActive(hit); if (!open) onChange(options[hit].value); }
    }
  }

  return <div ref={root} className={`dropdown${open ? " is-open" : ""}${className ? ` ${className}` : ""}`}>
    <button
      id={id}
      type="button"
      role="combobox"
      className={`dropdown-button${selected ? "" : " is-placeholder"}`}
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={listId}
      aria-label={label}
      aria-invalid={invalid || undefined}
      aria-describedby={describedBy}
      onClick={() => (open ? setOpen(false) : show())}
      onKeyDown={onKey}
      onBlur={() => { if (!open) onBlur?.(); }}
    >
      <span>{selected ? selected.label : placeholder}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
    </button>
    {open && <ul ref={list} id={listId} className="dropdown-list" role="listbox" aria-activedescendant={`${listId}-${active}`} tabIndex={-1}>
      {options.map((option, i) => <li
        key={option.value}
        id={`${listId}-${i}`}
        role="option"
        aria-selected={option.value === value}
        className={`dropdown-option${i === active ? " is-active" : ""}${option.value === value ? " is-selected" : ""}`}
        onPointerMove={() => setActive(i)}
        onPointerDown={event => event.preventDefault()}
        onClick={() => choose(i)}
      >{option.label}</li>)}
    </ul>}
  </div>;
}
