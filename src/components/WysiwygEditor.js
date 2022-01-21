import React, { useState } from 'react';

// The editor core
//import type { Value } from '@react-page/editor';
import Editor from '@react-page/editor';

// The rich text area plugin
import slate from '@react-page/plugins-slate';
// image
import image from '@react-page/plugins-image';
import '@react-page/plugins-slate/lib/index.css';
import '@react-page/plugins-image/lib/index.css';

const cellPlugins = [slate(), image];

export default function SimpleExample() {
  const [value, setValue] = useState(null);

  return (
    <Editor cellPlugins={cellPlugins} value={value} onChange={setValue} />
  );
}