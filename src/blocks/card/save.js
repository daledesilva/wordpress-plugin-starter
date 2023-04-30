import { RichText } from '@wordpress/block-editor';

const Save = (props) => {
  const { attributes } = props;

  return (
    <div>
      <RichText.Content tagName="p" value={attributes.content} />
    </div>
  );
};

export default Save;