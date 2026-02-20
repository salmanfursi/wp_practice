import { 
    ToggleControl, 
    __experimentalNumberControl as NumberControl 
} from '@wordpress/components';

const CustomToggleInput = ({
    type = 'toggle',
    label,
    value,
    onChange,
    min = 0,
    max = 100,
    className = '',
}) => {
    return (
        <div className={`ea-custom-toggle-input ${className}`}>
            <span className="ea-label">{label}</span>
            <div className="ea-field">
                {type === 'number' ? (
                    <NumberControl
                        value={value}
                        onChange={onChange}
                        min={min}
                        max={max}
                        __nextHasNoMarginBottom
                    />
                ) : (
                    <ToggleControl
                        checked={value}
                        onChange={onChange}
                        __nextHasNoMarginBottom
                    />
                )}
            </div>
        </div>
    );
};

export default CustomToggleInput;