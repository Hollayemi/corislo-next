'use client'
import React, { useRef } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css' // Quill's CSS for snow theme

function QuillTextEditor({ onChange, value, className = '' }) {
   const quillRef = useRef(null)
  return (
    <div className={className}>
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={QuillTextEditor.modules}
        formats={QuillTextEditor.formats}
        theme="snow" // Theme can be 'snow' or 'bubble'
        className="!rounded-md h-[140px]"
      />
    </div>
  )
}

// Define the modules for Quill (custom toolbar and other settings)
QuillTextEditor.modules = {
  toolbar: [
    [{ header: '1' }, { header: '2' }, { font: [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ align: [] }],
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
  'align',
]

export default QuillTextEditor
