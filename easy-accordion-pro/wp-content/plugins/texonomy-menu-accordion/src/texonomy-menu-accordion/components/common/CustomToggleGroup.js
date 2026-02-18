
import {
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';

const CustomToggleGroup = ({
    label,
    value,
    onChange,
    options = [],
    isBlock = true,
    className = '',
    help,
}) => {
    return (
        <ToggleGroupControl
            label={label}
            value={value}
            onChange={onChange}
            isBlock={isBlock}
            className={`ea-custom-toggle ${className}`.trim()}
            help={help}
        >
            {options.map((option) => (
                <ToggleGroupControlOption
                    key={option.value}
                    value={option.value}
                    label={option.label}
                />
            ))}
        </ToggleGroupControl>
    );
};

export default CustomToggleGroup;