import React, {useState} from 'react';

import CodeEditor from './code-editor';
import Preview from './preview';
import {Bundler} from '../bundler/';

const CodeCell = () => {
  const [input, setInput] = useState<string>('');
  const [codeOutput, setCodeOutput] = useState<string>('');

  const onSubmitCode = async () => {
    const bundledCode = await Bundler(input);

    setCodeOutput(bundledCode); // Our transpiled and bundled code
  };

  return (
    <div style={{margin: 16}}>
      <div style={{textAlign: 'center', margin: 16}}>
        <CodeEditor
          initialValue="const a = 1;"
          onChange={value => setInput(value)}
        />
      </div>

      <div>
        <button onClick={onSubmitCode}>Submit</button>
      </div>

      <Preview code={codeOutput} />
    </div>
  );
};

export default CodeCell;
