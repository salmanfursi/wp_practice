
// import { __ } from '@wordpress/i18n';


// import { useBlockProps } from '@wordpress/block-editor';


// import './editor.scss';


// export default function Edit({attributes}) {
// 	  const { content9 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>

//             <div>{content9 || ' content 9 is here !'}</div>
//         </div>
//     );
// }


// import { __ } from '@wordpress/i18n';


// import { __ } from '@wordpress/i18n';


// import { useBlockProps } from '@wordpress/block-editor';


// import './editor.scss';


// export default function Edit({attributes}) {
// 	  const { content9 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>

//             <div>{content9 || ' content 9 is here !'}</div>
//         </div>
//     );
// }


// import { __ } from '@wordpress/i18n';


 
import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function Edit({ attributes, setAttributes }) {
	const { title } = attributes;

	return (
		<div {...useBlockProps()}>
			<RichText
				tagName="h2"
				value={title}
				onChange={(value) => setAttributes({ title: value })}
				placeholder="Enter title"
			/>
		</div>
	);
}



 