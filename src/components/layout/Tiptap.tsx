import {
    MenuButtonBold,
    MenuButtonBulletedList,
    MenuButtonEditLink,
    LinkBubbleMenu,
    MenuButtonItalic,
    MenuButtonOrderedList,
    MenuControlsContainer,
    MenuDivider,
    MenuSelectHeading,
    RichTextEditor,
    type RichTextEditorRef,
} from "mui-tiptap";
import { useRef, useEffect, useState } from "react";
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';

interface TiptapProps {
    onContentChange: (content: string) => void;
    initialContent?: string;
}

const Tiptap: React.FC<TiptapProps> = ({ onContentChange, initialContent = "" }) => {
    const rteRef = useRef<RichTextEditorRef>(null);
    const [editor, setEditor] = useState<any>(null);
    const [content, setContent] = useState(initialContent); // State for the editor content


    useEffect(() => {
        if (rteRef.current) {
            const currentEditor = rteRef.current.editor;
            if (currentEditor) {
                setEditor(currentEditor);

                currentEditor.on('update', ({ editor }) => {
                    const html = editor.getHTML();
                    setContent(html); // Update the content state
                    onContentChange(html);
                });

                // Set initial content if it's different or if it's the very first load
                if (initialContent && (currentEditor.getHTML() !== initialContent || !currentEditor.getHTML())) {
                    currentEditor.commands.setContent(initialContent);
                }
            }
        }

        return () => {
          if (editor) {
            editor.destroy()
          }
        }
    }, []);

    // Update editor content if initialContent prop changes (important for updates!)
    useEffect(() => {
        if (editor && initialContent !== content) {
            editor.commands.setContent(initialContent);
            setContent(initialContent)
        }
    }, [initialContent, editor, content]);


    return (
        <RichTextEditor
            ref={rteRef}
            extensions={[StarterKit, Link]}
            content={content}
            className="taptip-editor"
            renderControls={() => (
                <MenuControlsContainer>
                    <MenuSelectHeading />
                    <MenuDivider />
                    <MenuButtonBold />
                    <MenuButtonItalic />
                    <MenuButtonBulletedList />
                    <MenuButtonOrderedList />
                </MenuControlsContainer>
            )}
        />
    );
};

export default Tiptap;