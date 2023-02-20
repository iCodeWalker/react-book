import React, {useState, useEffect} from 'react';
import {useActions} from '../hooks/useActions';

import CodeEditor from './code-editor';
import Preview from './preview';
import {Bundler} from '../bundler/';

import ResizableWrapper from './resizable-wrapper';
import {Cell} from '../state/cell';

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [codeOutput, setCodeOutput] = useState<string>('');
  const [error, setError] = useState<string>('');

  const {updateCell} = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const bundledCode = await Bundler(cell.data);
      setCodeOutput(bundledCode.code);
      setError(bundledCode.err);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.data]);

  // const onSubmitCode = async () => {
  //   const bundledCode = await Bundler(input);
  //   setCodeOutput(bundledCode.code); // Our transpiled and bundled code
  // };

  return (
    <ResizableWrapper direction="vertical">
      <div
        style={{
          height: 'calc(100% - 10px)',
          display: 'flex',
          flexDirection: 'row',
        }}>
        <ResizableWrapper direction="horizontal">
          <CodeEditor
            initialValue={cell.data}
            onChange={value => updateCell(cell.id, value)}
          />
        </ResizableWrapper>

        {/* <div>
          <button onClick={onSubmitCode}>Submit</button>
        </div> */}

        <Preview code={codeOutput} err={error} />
      </div>
    </ResizableWrapper>
  );
};

export default CodeCell;
