import { useState } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';


///////////////
///////////////


export default function Edit({ attributes, setAttributes }) {
  console.log('content', attributes.content);

  return (
    <RichText
      tagName = "p"
      value = {attributes.content}
      onChange = { (content) => setAttributes({content}) }
      placeholder = "Enter text..."
    />
  );
}