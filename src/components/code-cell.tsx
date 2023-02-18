import React, {useState, useEffect} from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import {Bundler} from '../bundler/';

import ResizableWrapper from './resizable-wrapper';

const CodeCell = () => {
  const [input, setInput] = useState<string>('');
  const [codeOutput, setCodeOutput] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await Bundler(input);
      setCodeOutput(bundledCode);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  const onSubmitCode = async () => {
    const bundledCode = await Bundler(input);

    setCodeOutput(bundledCode); // Our transpiled and bundled code
  };

  return (
    <ResizableWrapper direction="vertical">
      <div style={{height: '100%', display: 'flex', flexDirection: 'row'}}>
        <ResizableWrapper direction="horizontal">
          <CodeEditor
            initialValue="const a = 1;"
            onChange={value => setInput(value)}
          />
        </ResizableWrapper>

        {/* <div>
          <button onClick={onSubmitCode}>Submit</button>
        </div> */}

        <Preview code={codeOutput} />
      </div>
    </ResizableWrapper>
  );
};

export default CodeCell;
