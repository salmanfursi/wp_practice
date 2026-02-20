import { store, getContext } from '@wordpress/interactivity';

store('create-block/texonomy-menu-accordion', {
    actions: {
        toggle: () => {
            const context = getContext();
            // This flips the state for the specific item clicked
            context.isOpen = !context.isOpen;
        },
        stopProp: (event) => {
            // Prevents the toggle when the user just wants to click the link
            event.stopPropagation();
        }
    }
});