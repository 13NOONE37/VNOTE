import React, { useEffect, useRef, useState } from 'react';
import handleClickOutside from 'utils/ModalsFunctions/HandleClickOutside';
import { createPortal } from 'react-dom';
import handleContentChange from 'utils/Global/handleContentChange';
import 'css/modals/InsertImage.css';
import 'css/modals/InsertCode.css';
import AceEditor from 'react-ace-builds';
import 'react-ace-builds/webpack-resolver-min';

export default function InsertCode({
  notebooks,
  setnotebooks,
  id,
  showBox,
  setshowBox,
  currentPage,
  numberOfElement,
  data,
}) {
  const box = useRef(null);

  const languages = [
    'html',
    'javascript',
    'typescript',
    'sass',
    'css',
    'python',
    'java',
    'ruby',
    'golang',
    'c#',
    'mysql',
    'json',
    'xml',
    'markdown',
    'handlebars',
    'elixir',
  ];
  const themes = [
    'terminal',
    'monokai',
    'github',
    'tommorow',
    'kuroir',
    'twilight',
    'xcode',
    'textmate',
    'solarized_dark',
    'solarized_light',
  ];
  const sizes = [12, 14, 16, 18, 20, 22, 24, 28, 32, 36, 44, 52];

  const [currentFontSize, setcurrentFontSize] = useState(18);
  const [currentLanguage, setcurrentLanguage] = useState('javascript');
  const [currentTheme, setcurrentTheme] = useState('terminal');
  const [currentCode, setcurrentCode] = useState('');
  useEffect(() => {
    setcurrentFontSize(data && data.data ? data.data.fontSize : 18);
    setcurrentLanguage(data && data.data ? data.data.mode : 'javascript');
    setcurrentTheme(data && data.data ? data.data.theme : 'terminal');
    setcurrentCode(data && data.data ? data.data.value : '');
  }, [showBox]);

  const handleOnChange = (newValue) => {
    setcurrentCode(newValue);
  };

  const handleSubmit = () => {
    !isNaN(numberOfElement)
      ? setnotebooks(
          notebooks.map((item1, index1) => {
            if (item1.id == id) {
              item1.cards.map((item2, index2) => {
                if (index2 + 1 == currentPage) {
                  item2.elements[numberOfElement] = {
                    type: 'code',
                    frame: data.frame,
                    value: (
                      <div
                        style={{
                          border: '5px solid #333',
                          width: '100%',
                          height: '100%',
                          padding: '0',
                          margin: '0',
                        }}
                        className='iframeBox'
                      >
                        <AceEditor
                          mode={currentLanguage}
                          theme={currentTheme}
                          name='editorExample'
                          style={{ width: '100%' }}
                          // width={'500px'}
                          fontSize={currentFontSize}
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={currentCode}
                          wrapEnabled={true}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                            wrapBehavioursEnabled: true,
                            wrap: true,
                          }}
                        />
                      </div>
                    ),
                    data: {
                      mode: currentLanguage,
                      theme: currentTheme,
                      fontSize: currentFontSize,
                      value: currentCode,
                    },
                  };
                }
                return item2;
              });
            }
            return item1;
          }),
        )
      : setnotebooks(
          notebooks.map((item1, index1) => {
            if (item1.id == id) {
              item1.cards.map((item2, index2) => {
                if (index2 + 1 == currentPage) {
                  item2.elements.push({
                    type: 'code',
                    frame: {
                      translate:
                        data && data.data ? data.frame.translate : [0, 0],
                      rotate: data && data.data ? data.frame.rotate : 0,
                      width: data && data.data ? data.frame.width : null,
                      height: data && data.data ? data.frame.height : null,
                    },
                    value: (
                      <div
                        style={{
                          border: '5px solid #333',
                          width: '100%',
                          height: '100%',
                          padding: '0',
                          margin: '0',
                        }}
                        className='iframeBox'
                      >
                        <AceEditor
                          mode={currentLanguage}
                          theme={currentTheme}
                          name='editorExample'
                          style={{ width: '100%' }}
                          // width={'500px'}
                          fontSize={currentFontSize}
                          showPrintMargin={true}
                          showGutter={true}
                          highlightActiveLine={true}
                          value={currentCode}
                          wrapEnabled={true}
                          setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                            wrapBehavioursEnabled: true,
                            wrap: true,
                          }}
                        />
                      </div>
                    ),
                    data: {
                      mode: currentLanguage,
                      theme: currentTheme,
                      fontSize: currentFontSize,
                      value: currentCode,
                    },
                  });
                }
                return item2;
              });
            }
            return item1;
          }),
        );

    setcurrentCode('');
    setshowBox(false);
  };
  return createPortal(
    <>
      {showBox && (
        <div
          ref={box}
          className='modalBox'
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => handleClickOutside(e, box, setshowBox)}
        >
          <div className='imageBox'>
            <div className='topBar'>
              <span>Add code</span>
            </div>
            <div className='codeField scrollClass'>
              <div className='options'>
                <span className='option'>
                  <select
                    onChange={(e) => {
                      setcurrentLanguage(e.target.value);
                    }}
                  >
                    {languages.map((item) => (
                      <option selected={currentLanguage == item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </span>
                <span className='option'>
                  <select
                    onChange={(e) => {
                      setcurrentTheme(e.target.value);
                    }}
                  >
                    {themes.map((item) => (
                      <option selected={currentTheme == item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </span>
                <span className='option fontSizeField' title='Font size'>
                  <button
                    onClick={() => setcurrentFontSize(currentFontSize - 1)}
                  >
                    <i className='fas fa-minus'></i>
                  </button>
                  <select
                    onChange={(e) => {
                      setcurrentFontSize(parseInt(e.target.value));
                    }}
                  >
                    {sizes.map((item) => (
                      <option value={item}>{item}</option>
                    ))}
                  </select>
                  <button
                    onClick={() => setcurrentFontSize(currentFontSize + 1)}
                  >
                    <i className='fas fa-plus'></i>
                  </button>
                </span>
              </div>
              <AceEditor
                mode={currentLanguage}
                theme={currentTheme}
                name='editorExample'
                onChange={handleOnChange}
                width={'100%'}
                fontSize={currentFontSize}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                value={currentCode}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  enableSnippets: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  wrapBehavioursEnabled: true,
                  wrap: true,
                }}
              />
            </div>
            <div className='bottomBar'>
              <button
                onClick={() => {
                  setshowBox(false);
                }}
              >
                Cancel
              </button>
              <button onClick={handleSubmit}>Add</button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.getElementById('modal'),
  );
}
