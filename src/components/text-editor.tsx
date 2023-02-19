import React, {useState, useEffect, useRef} from 'react';
import MDEditor from '@uiw/react-md-editor';

import './text-editor.css';

const TextEditor: React.FC = () => {
  const [value, setValue] = React.useState<string | undefined>('# Header');
  const [isEditing, setIsEditing] = useState(false);

  const textEditorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        textEditorRef.current &&
        event.target &&
        textEditorRef.current.contains(event.target as Node)
      ) {
        // console.log('Ediotr is clicked');
        return;
      }

      //   console.log('Clicked outside editor')
      setIsEditing(false);
    };

    document.addEventListener('click', listener, {capture: true});

    return () => {
      document.removeEventListener('click', listener, {capture: true});
    };
  }, []);

  if (isEditing) {
    return (
      <div className="text-editor" ref={textEditorRef}>
        <MDEditor value={value} onChange={setValue} />
      </div>
    );
  }

  return (
    <div
      className="text-editor-markdown card"
      onClick={() => setIsEditing(true)}>
      <div className="">
        <MDEditor.Markdown source={value} />
      </div>
    </div>
  );
};

export default TextEditor;
