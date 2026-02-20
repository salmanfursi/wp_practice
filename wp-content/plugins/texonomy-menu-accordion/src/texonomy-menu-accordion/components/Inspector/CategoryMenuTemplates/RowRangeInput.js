import { RangeControl } from '@wordpress/components';
import { Desktop, PX, Reload } from '../../../assets/icons/svgIcons';
import { useState } from '@wordpress/element';
const RowRangeInput = ({ label = "Size", value, onChange, min = 0, max = 100 }) => {
    const [spin, setSpin]=useState(false);
    // হ্যান্ডলার: ইনপুট বক্স থেকে ভ্যালু চেঞ্জ
    const onInputChange = (val) => {
        const newValue = val === '' ? 0 : parseInt(val);
        onChange(newValue);
    };

    return (
        <div className="ea-responsive-range">
            {/* ১. হেডার সেকশন */}
            <div className="ea-responsive-range__header">
                <div className="ea-responsive-range__label-group">
                    {label}
                    <button className="ea-responsive-range__device-btn">
                        <Desktop />
                    </button>
                </div>
                <div className="ea-responsive-range__actions">
                    <div
                        className={`ea-responsive-range__reset-btn ${spin ? 'is-spinning' : ''}`}
                        onClick={() => {
                            setSpin(true);
                            onChange(0);
                            setTimeout(() => setSpin(false), 500);
                        }}
                        title="Reset"
                    >
                        <Reload />
                    </div>
                    <div className="ea-responsive-range__device-btn">
                        <PX />
                    </div>
                </div>
            </div>

            {/* ২. বডি সেকশন (Slider + Input) */}
            <div className="ea-responsive-range__body">
                <div className="ea-range-wrapper">
                    <RangeControl
                        value={value}
                        onChange={onChange}
                        min={min}
                        max={max}
                        withInputField={false}
                        hideLabelFromVision
                    />
                </div>
                
                {/* ডানপাশের ইনপুট বক্স */}
                <div className="ea-number-input">
                    <input 
                        type="number" 
                        value={value} 
                        onChange={(e) => onInputChange(e.target.value)}
                        min={min}
                        max={max}
                    />
                </div>
            </div>
        </div>
    );
};

export default RowRangeInput;