import { __ } from '@wordpress/i18n';
import { Icon } from '@wordpress/components';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, item, index, selectedLink, setSelectedLink }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<li
			ref={setNodeRef}
			style={style}
			className={selectedLink === index ? 'is-selected' : null}
 		>
			{/* Click area - for selecting/editing the icon */}
			<button
				aria-label={__('Edit Social Link', 'Faq accordion')}
				onClick={() => setSelectedLink(index)}
				className="icon-button"
                {...attributes} 
				{...listeners}
           
			>
				<Icon icon={item.icon} />
			</button>

		</li>
	);
}

export default SortableItem;

 
 


 