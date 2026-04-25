import React, { useState, useRef, useEffect } from 'react';
import { Pencil, Check } from 'lucide-react';

export function EditableText({ value, onChange, className = '', multiline = false, placeholder = 'Click to edit...' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  useEffect(() => { setDraft(value); }, [value]);

  useEffect(() => {
    if (editing && ref.current) {
      ref.current.focus();
      if (ref.current.setSelectionRange) {
        const len = ref.current.value.length;
        ref.current.setSelectionRange(len, len);
      }
    }
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onChange(draft);
  };

  const handleKey = (e) => {
    if (!multiline && e.key === 'Enter') { e.preventDefault(); commit(); }
    if (e.key === 'Escape') { setDraft(value); setEditing(false); }
  };

  if (editing) {
    const shared = {
      ref,
      value: draft,
      onChange: (e) => setDraft(e.target.value),
      onBlur: commit,
      onKeyDown: handleKey,
      placeholder,
      className: `w-full bg-primary/5 border border-secondary/40 rounded-md px-2 py-1 outline-none focus:ring-2 focus:ring-secondary/40 resize-none ${className}`,
    };
    return multiline
      ? <textarea {...shared} rows={3} />
      : <input {...shared} />;
  }

  return (
    <span
      className={`group relative inline-flex items-start gap-1 cursor-pointer hover:text-foreground transition-colors ${className}`}
      onClick={() => setEditing(true)}
      title="Click to edit"
    >
      <span className={!value ? 'text-muted-foreground italic text-xs' : ''}>{value || placeholder}</span>
      <Pencil className="w-3 h-3 opacity-0 group-hover:opacity-40 mt-0.5 flex-shrink-0 transition-opacity" />
    </span>
  );
}

export function EditableTag({ value, onChange, onDelete, className = '' }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const ref = useRef(null);

  useEffect(() => { if (editing && ref.current) ref.current.focus(); }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft.trim()) onChange(draft.trim());
    else onDelete();
  };

  if (editing) {
    return (
      <input
        ref={ref}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') commit();
          if (e.key === 'Escape') { setDraft(value); setEditing(false); }
        }}
        className={`text-xs px-2.5 py-1 rounded-full border border-secondary/50 bg-secondary/10 outline-none w-28 ${className}`}
      />
    );
  }

  return (
    <span
      className={`group relative text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full cursor-pointer hover:bg-secondary/10 hover:text-secondary transition-colors flex items-center gap-1 ${className}`}
    >
      <span onClick={() => setEditing(true)}>{value}</span>
      <button
        onClick={onDelete}
        className="opacity-0 group-hover:opacity-60 hover:!opacity-100 text-destructive font-bold ml-0.5 leading-none"
      >×</button>
    </span>
  );
}