 


import { ComboboxControl } from '@wordpress/components';
import { Icon, chevronDown } from '@wordpress/icons';
import { useEffect, useRef } from '@wordpress/element';
import { DownArrow } from '../../assets/icons/svgIcons';

const CustomDropDown = ({
    label,
    value,
    onChange,
    options = [],
    placeholder = 'Select...',
    help,
    className = '',
    inline = false, // ✅ New prop for layout control

}) => {
    const wrapperRef = useRef(null);

    useEffect(() => {
        if (!wrapperRef.current) return;

        const button = wrapperRef.current.querySelector('.components-button[aria-label="Reset"]');
        if (!button) return;

        // Remove original SVG
        const originalSvg = button.querySelector('svg');
        if (originalSvg) {
            originalSvg.remove();
        }

        // Create new icon wrapper
        const iconWrapper = document.createElement('span');
        iconWrapper.className = 'custom-dropdown-icon';

        // Render WordPress Icon component
        const iconSvg = `
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.0046 10.5547L12.0001 16.0134L5.99561 10.5547L7.00461 9.44482L12.0001 13.9862L16.9956 9.44483L18.0046 10.5547Z" fill="#2F2F2F"/>
           </svg>
        `;

        iconWrapper.innerHTML = iconSvg;
        button.appendChild(iconWrapper);
    }, []);

    return (
        <div ref={wrapperRef} className={`ea-dropdown-wrapper ${inline ? 'ea-dropdown-inline' : ''}`}>
            <ComboboxControl
                label={label}
                value={value}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                help={help}
                className={className}
            />
        </div>
    );
};

export default CustomDropDown;