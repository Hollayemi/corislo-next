import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Quill's CSS for snow theme

function QuillTextEditor({ onChange, value, className="" }) {
  const [editorContent, setEditorContent] = useState('')

  const handleEditorChange = (content) => {
    setEditorContent(content)
  }

  return (
    <div className={`${className}`}>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={QuillTextEditor.modules}
        formats={QuillTextEditor.formats}
        theme="snow" // Theme can be 'snow' or 'bubble'
        
        className="!rounded-md h-[120px] md:h-[140px]"
      />
      {/* <div className="editor-output">
        <h3>Preview:</h3>
        <div dangerouslySetInnerHTML={{ __html: editorContent }}></div>
      </div> */}
    </div>
  )
}

// Define the modules for Quill (custom toolbar and other settings)
QuillTextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    // [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    // [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    // [{ color: [] }, { background: [] }],
    [{ align: [] }],
    // ['link', 'image', 'video'],
    // ['clean'], // Remove formatting button
  ],
  clipboard: {
    matchVisual: false, // Disable auto-formatting of pasted content
  },
}

// Define the formats that will be supported in the editor
QuillTextEditor.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'direction',
  'color',
  'background',
  'align',
  'link',
  // 'image',
  // 'video',
]

export default QuillTextEditor
