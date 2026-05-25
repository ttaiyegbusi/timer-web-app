"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import {
  Bold, Italic, Underline as UnderlineIcon, Strikethrough,
  Link as LinkIcon, Pilcrow, ListOrdered, List, ChevronDown,
} from "lucide-react";

function Btn({ active, onClick, children, title }) {
  return (
    <button
      type="button"
      title={title}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center rounded-md text-[15px] ${
        active ? "bg-primary-soft text-primary" : "text-text-secondary hover:bg-subtle"
      }`}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ content, onChange }) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
    ],
    content: content || "<p></p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "prose-sm max-w-none text-[16px] leading-relaxed text-text outline-none min-h-[120px]",
      },
    },
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  if (!editor) return null;

  const setLink = () => {
    const url = window.prompt("Enter URL");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div>
      <div className="mb-3 inline-flex items-center gap-1 rounded-lg border border-border bg-white px-2 py-1.5 shadow-soft">
        <button
          type="button"
          className="mr-1 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[14px] text-text-secondary hover:bg-subtle"
        >
          Inter <ChevronDown size={14} />
        </button>
        <span className="mx-1 h-5 w-px bg-border" />
        <Btn title="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}>
          <Bold size={16} />
        </Btn>
        <Btn title="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}>
          <Italic size={16} />
        </Btn>
        <Btn title="Underline" active={false} onClick={() => editor.chain().focus().toggleMark("bold").run()}>
          <UnderlineIcon size={16} />
        </Btn>
        <Btn title="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}>
          <Strikethrough size={16} />
        </Btn>
        <Btn title="Link" active={editor.isActive("link")} onClick={setLink}>
          <LinkIcon size={16} />
        </Btn>
        <span className="mx-1 h-5 w-px bg-border" />
        <Btn title="Paragraph" active={editor.isActive("paragraph")} onClick={() => editor.chain().focus().setParagraph().run()}>
          <Pilcrow size={16} />
        </Btn>
        <Btn title="Ordered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <ListOrdered size={16} />
        </Btn>
        <Btn title="Bullet list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <List size={16} />
        </Btn>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
