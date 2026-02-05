import { createBlock } from '@wordpress/blocks';

const transforms = {
    from: [
        {
            type: 'block',
            isMultiBlock: true, // একসাথে অনেক ইমেজ সিলেক্ট করতে এটি জরুরি
            blocks: ['core/image'], // সোর্স হলো কোর ইমেজ ব্লক
            transform: (items) => {
                // প্রতিটি ইমেজকে চাইল্ড ব্লকে রূপান্তর করা
                const innerBlocks = items.map((img) => {
                    return createBlock('create-block/child-block', {
                        url: img.url,
                        alt: img.alt,
                        id: img.id,
                        name: 'Team Member Name', // ডিফল্ট ভ্যালু
                        bio: 'Write something about them...', // ডিফল্ট ভ্যালু
                        socialLinks: [] 
                    });
                });

                // মেইন প্যারেন্ট ব্লক রিটার্ন করা
                return createBlock(
                    'create-block/faq-accordion',
                    { column: items.length }, // যতগুলো ছবি ততগুলো কলাম অটো সেট হবে
                    innerBlocks
                );
            },
        },
    ],
};

export default transforms;