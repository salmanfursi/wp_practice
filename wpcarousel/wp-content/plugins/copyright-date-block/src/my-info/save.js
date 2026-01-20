import { useBlockProps } from "@wordpress/block-editor";


// export default function save({ attributes }) {
//     const { heading, text, content,content5 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>
//             <h2>{heading || 'Default Heading'}</h2>
//             <p>{text || 'Default text'}</p>
//             <div>{content || 'Default content'}</div>
//             <div>{content5 || ' content no 5 !'}</div>
//         </div>
//     );
// }

// export default function save({ attributes }) {
//     const { content9 } = attributes || {};
//     return (
//         <div {...useBlockProps.save()}>

//             <div>{content9 || ' content 9 is here !'}</div>
//         </div>
//     );
// }

// for invalid error solve we will use dynamic callback as alternative of deprecation
export default function save({ attributes }) {
    return null;
}
