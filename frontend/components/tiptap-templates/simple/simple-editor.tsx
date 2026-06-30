"use client"
import {AlignCenter, AlignLeft, AlignRight, Minus, Plus} from 'lucide-react';

import { useEffect, useRef, useState } from "react"
import {Editor, EditorContent, EditorContext, JSONContent, useEditor} from "@tiptap/react"

// --- Tiptap Core Extensions ---
import { StarterKit } from "@tiptap/starter-kit"
import {FontFamily} from '@tiptap/extension-font-family'
import {TextStyle, FontSize} from '@tiptap/extension-text-style'
import { Image } from "@tiptap/extension-image"
import { TaskItem, TaskList } from "@tiptap/extension-list"
import { TextAlign } from "@tiptap/extension-text-align"
import { Typography } from "@tiptap/extension-typography"
import { Highlight } from "@tiptap/extension-highlight"
import { Subscript } from "@tiptap/extension-subscript"
import { Superscript } from "@tiptap/extension-superscript"
import { Selection } from "@tiptap/extensions"
import {CustomImage} from "@/components/tiptap-templates/simple/extensions/CustomImage";
import { BubbleMenu } from "@tiptap/react/menus";
import { Color } from '@tiptap/extension-color';
import {CustomHeading} from "./extensions/CustomHeading"


// --- UI Primitives ---
import { Button } from "@/components/tiptap-ui-primitive/button"
import { Spacer } from "@/components/tiptap-ui-primitive/spacer"
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator,
} from "@/components/tiptap-ui-primitive/toolbar"

// --- Tiptap Node ---
import { ImageUploadNode } from "@/components/tiptap-node/image-upload-node/image-upload-node-extension"
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension"
import "@/components/tiptap-node/blockquote-node/blockquote-node.scss"
import "@/components/tiptap-node/code-block-node/code-block-node.scss"
import "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss"
import "@/components/tiptap-node/list-node/list-node.scss"
import "@/components/tiptap-node/image-node/image-node.scss"
import "@/components/tiptap-node/heading-node/heading-node.scss"
import "@/components/tiptap-node/paragraph-node/paragraph-node.scss"

// --- Tiptap UI ---
import { HeadingDropdownMenu } from "@/components/tiptap-ui/heading-dropdown-menu"
import { ImageUploadButton } from "@/components/tiptap-ui/image-upload-button"
import { ListDropdownMenu } from "@/components/tiptap-ui/list-dropdown-menu"
import { BlockquoteButton } from "@/components/tiptap-ui/blockquote-button"
import { CodeBlockButton } from "@/components/tiptap-ui/code-block-button"
import {
  ColorHighlightPopover,
  ColorHighlightPopoverContent,
  ColorHighlightPopoverButton,
} from "@/components/tiptap-ui/color-highlight-popover"
import {
  LinkPopover,
  LinkContent,
  LinkButton,
} from "@/components/tiptap-ui/link-popover"
import { MarkButton } from "@/components/tiptap-ui/mark-button"
import { TextAlignButton } from "@/components/tiptap-ui/text-align-button"
import { UndoRedoButton } from "@/components/tiptap-ui/undo-redo-button"

// --- Icons ---
import { ArrowLeftIcon } from "@/components/tiptap-icons/arrow-left-icon"
import { HighlighterIcon } from "@/components/tiptap-icons/highlighter-icon"
import { LinkIcon } from "@/components/tiptap-icons/link-icon"

// --- Hooks ---
import { useIsBreakpoint } from "@/hooks/use-is-breakpoint"
import { useWindowSize } from "@/hooks/use-window-size"
import { useCursorVisibility } from "@/hooks/use-cursor-visibility"

// --- Components ---
import { ThemeToggle } from "@/components/tiptap-templates/simple/theme-toggle"

// --- Lib ---
import { handleImageUpload, MAX_FILE_SIZE } from "@/lib/tiptap-utils"

// --- Styles ---
import "@/components/tiptap-templates/simple/simple-editor.scss"

import content from "@/components/tiptap-templates/simple/data/content.json"

const MainToolbarContent = ({
  onHighlighterClick,
  onLinkClick,
  isMobile,
}: {
  onHighlighterClick: () => void
  onLinkClick: () => void
  isMobile: boolean
}) => {
  return (
    <>
      <Spacer />

      <ToolbarGroup>
        <UndoRedoButton action="undo" />
        <UndoRedoButton action="redo" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <HeadingDropdownMenu modal={false} levels={[1, 2, 3, 4]} />
        <ListDropdownMenu
          modal={false}
          types={["bulletList", "orderedList", "taskList"]}
        />
        <BlockquoteButton />
        <CodeBlockButton />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="bold" />
        <MarkButton type="italic" />
        <MarkButton type="strike" />
        <MarkButton type="code" />
        <MarkButton type="underline" />
        {!isMobile ? (
          <ColorHighlightPopover />
        ) : (
          <ColorHighlightPopoverButton onClick={onHighlighterClick} />
        )}
        {!isMobile ? <LinkPopover /> : <LinkButton onClick={onLinkClick} />}
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <MarkButton type="superscript" />
        <MarkButton type="subscript" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <TextAlignButton align="left" />
        <TextAlignButton align="center" />
        <TextAlignButton align="right" />
        <TextAlignButton align="justify" />
      </ToolbarGroup>

      <ToolbarSeparator />

      <ToolbarGroup>
        <ImageUploadButton text="Add" />
      </ToolbarGroup>

      <Spacer />

      {isMobile && <ToolbarSeparator />}


    </>
  )
}

const MobileToolbarContent = ({
  type,
  onBack,
}: {
  type: "highlighter" | "link"
  onBack: () => void
}) => (
  <>
    <ToolbarGroup>
      <Button variant="ghost" onClick={onBack}>
        <ArrowLeftIcon className="tiptap-button-icon" />
        {type === "highlighter" ? (
          <HighlighterIcon className="tiptap-button-icon" />
        ) : (
          <LinkIcon className="tiptap-button-icon" />
        )}
      </Button>
    </ToolbarGroup>

    <ToolbarSeparator />

    {type === "highlighter" ? (
      <ColorHighlightPopoverContent />
    ) : (
      <LinkContent />
    )}
  </>
)

interface SimpleEditorProps {
    onUpdate?: (props: { editor: unknown}) => void;
    content?: JSONContent;
}

export function SimpleEditor({ onUpdate, content }: SimpleEditorProps) {
  const isMobile = useIsBreakpoint()
  const { height } = useWindowSize()
  const [mobileView, setMobileView] = useState<"main" | "highlighter" | "link">(
    "main"
  )
  const toolbarRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    immediatelyRender: false,
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        "aria-label": "Main content area, start typing to enter text.",
        class: "simple-editor",
      },
    },
    extensions: [
      StarterKit.configure({
        horizontalRule: false,
          heading: false,
        link: {
          openOnClick: false,
          enableClickSelection: true,
        },

      }),
        TextStyle,
        FontFamily,
        FontSize,
        Color,
        CustomImage.configure({
            allowBase64: true,
        }),
        CustomHeading.configure({
            levels: [1, 2, 3, 4],
        }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Image,
      Typography,
      Superscript,
      Subscript,
      Selection,
      ImageUploadNode.configure({
        accept: "image/*",
        maxSize: MAX_FILE_SIZE,
        limit: 3,
        upload: handleImageUpload,
        onError: (error) => console.error("Upload failed:", error),
      }),
    ],
      content: content,
      onUpdate: ({ editor }) => {
          if (onUpdate) {
              onUpdate({ editor });
          }
      },
  })

  const rect = useCursorVisibility({
    editor,
      // eslint-disable-next-line react-hooks/refs
    overlayHeight: toolbarRef.current?.getBoundingClientRect().height ?? 0,
  })

  useEffect(() => {
    if (!isMobile && mobileView !== "main") {
        // eslint-disable-next-line react-hooks/set-state-in-effect
      setMobileView("main")
    }
  }, [isMobile, mobileView])

    if (!editor) return null;

    const fonts = [
        "Arial",
        "Courier New",
        "Georgia",
        "Times New Roman",
        "Verdana"
    ];
    const currentFont = editor.getAttributes('textStyle').fontFamily || "";

    const getCurrentFontSize = () => {

        const inlineSize = editor?.getAttributes("textStyle").fontSize;
        if (inlineSize) {
            return parseInt(inlineSize.replace("px", ""));
        }

        if (editor?.isActive("heading", { level: 1 })) return 32;
        if (editor?.isActive("heading", { level: 2 })) return 24;
        if (editor?.isActive("heading", { level: 3 })) return 20;
        if (editor?.isActive("heading", { level: 4 })) return 16;

        return 16;
    };

    const increaseFontSize = () => {
        const currentSize = getCurrentFontSize();

        editor
            ?.chain()
            .focus()
            .setMark("textStyle", { fontSize: `${currentSize + 1}px` })
            .run();
    };

    const decreaseFontSize = () => {
        const currentSize = getCurrentFontSize();

        editor
            ?.chain()
            .focus()
            .setMark("textStyle", { fontSize: `${Math.max(8, currentSize - 1)}px` })
            .run();
    };

  return (
    <div className="simple-editor-wrapper">
      <EditorContext.Provider value={{ editor }}>
        <Toolbar className="max-w-full overflow-x-auto whitespace-nowrap flex-nowrap scrollbar-hide m-0"
          ref={toolbarRef}
          style={{
            ...(isMobile
              ? {
                  bottom: `calc(100% - ${height - rect.y}px)`,
                    left:0,
                    right:0,
                }
              : {}),
          }}
        >
          {mobileView === "main" ? (
            <MainToolbarContent
              onHighlighterClick={() => setMobileView("highlighter")}
              onLinkClick={() => setMobileView("link")}
              isMobile={isMobile}
            />
          ) : (
            <MobileToolbarContent
              type={mobileView === "highlighter" ? "highlighter" : "link"}
              onBack={() => setMobileView("main")}
            />
          )}
            <ToolbarGroup>
                <select
                    value={currentFont}
                    onChange={(e) => {
                        const selectedFont = e.target.value;
                        if (selectedFont) {
                            editor.chain().focus().setFontFamily(selectedFont).run();
                        } else {
                            editor.chain().focus().unsetFontFamily().run();
                        }
                    }}
                    className="border border-gray-300 rounded-md p-1 text-sm bg-white cursor-pointer text-gray-600 focus:outline-none focus:bg-gray-100 focus:ring-2 focus:ring-purple-500 transition-all duration-200"
                >
                    <option value="">Fonte Padrão</option>
                    {fonts.map((font) => (
                        <option
                            key={font}
                            value={font}
                            style={{ fontFamily: font }}
                        >
                            {font}
                        </option>
                    ))}
                </select>

                <button
                    onClick={decreaseFontSize}
                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors active:bg-gray-200"
                    title="Diminuir fonte"
                    type="button"
                >
                    <Minus className="w-3.5 h-3.5" />
                </button>


                <div className="w-10 h-full flex items-center justify-center border-l border-r border-gray-300 text-xs font-medium text-gray-700 bg-gray-50 cursor-default">
                    {getCurrentFontSize()}
                </div>

                <button
                    onClick={increaseFontSize}
                    className="w-8 h-full flex items-center justify-center hover:bg-gray-100 text-gray-600 transition-colors active:bg-gray-200"
                    title="Aumentar fonte"
                    type="button"
                >
                    <Plus className="w-3.5 h-3.5" />
                </button>
                <input
                    type="color"
                    onInput={(e) => editor.chain().focus().setColor(e.currentTarget.value).run()}
                    value={editor.getAttributes('textStyle').color || '#000000'}
                    className="w-8 h-8 cursor-pointer"
                />
            </ToolbarGroup>

            {editor && (
                <BubbleMenu
                    editor={editor}

                    shouldShow={({ editor }: { editor: Editor }) => editor.isActive('image')}
                >
                    <div className="flex items-center gap-1 p-1 bg-white border border-gray-300 rounded-md shadow-md">

                        <button
                            onClick={() => editor.chain().focus().updateAttributes('image', { align: 'left' }).run()}
                            className={`p-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('image', { align: 'left' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
                            title="Alinhar à esquerda (Texto contorna pela direita)"
                            type="button"
                        >
                            <AlignLeft size={16} />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().updateAttributes('image', { align: 'center' }).run()}
                            className={`p-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('image', { align: 'center' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
                            title="Centralizar"
                            type="button"
                        >
                            <AlignCenter size={16} />
                        </button>

                        <button
                            onClick={() => editor.chain().focus().updateAttributes('image', { align: 'right' }).run()}
                            className={`p-1.5 rounded-md hover:bg-gray-100 ${editor.isActive('image', { align: 'right' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
                            title="Alinhar à direita (Texto contorna pela esquerda)"
                            type="button"
                        >
                            <AlignRight size={16} />
                        </button>

                        <div className="w-px h-5 bg-gray-300 mx-1" />
                        <button
                            onClick={() => editor.chain().focus().updateAttributes('image', { width: '25%' }).run()}
                            className={`px-2 py-1 text-xs font-medium rounded-md hover:bg-gray-100 ${editor.isActive('image', { width: '25%' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
                            type="button"
                        >
                            25%
                        </button>
                        <button
                            onClick={() => editor.chain().focus().updateAttributes('image', { width: '50%' }).run()}
                            className={`px-2 py-1 text-xs font-medium rounded-md hover:bg-gray-100 ${editor.isActive('image', { width: '50%' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
                            type="button"
                        >
                            50%
                        </button>
                        <button
                            onClick={() => editor.chain().focus().updateAttributes('image', { width: '100%' }).run()}
                            className={`px-2 py-1 text-xs font-medium rounded-md hover:bg-gray-100 ${editor.isActive('image', { width: '100%' }) ? 'bg-gray-200 text-blue-600' : 'text-gray-600'}`}
                            type="button"
                        >
                            100%
                        </button>

                    </div>
                </BubbleMenu>
            )}

        </Toolbar>

        <EditorContent
          editor={editor}
          role="presentation"
          className="simple-editor-content"
        />
      </EditorContext.Provider>
    </div>
  )
}
