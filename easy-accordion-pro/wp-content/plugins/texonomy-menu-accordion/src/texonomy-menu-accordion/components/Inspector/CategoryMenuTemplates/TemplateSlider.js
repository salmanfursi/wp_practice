import { useState } from '@wordpress/element';

import template1 from '../../../assets/images/template_1.svg';
import template2 from '../../../assets/images/template_2.svg';
import template3 from '../../../assets/images/template_3.svg';

const templates = [
    { id: 1, image: template1, label: 'Template 1' },
    { id: 2, image: template2, label: 'Template 2' },
    { id: 3, image: template3, label: 'Template 3' },
];

const TemplateSlider = ({ value, onChange }) => {
    const [current, setCurrent] = useState(value || 0);
    const [lastDirection, setLastDirection] = useState('next');

    const goNext = () => {
        const next = (current + 1) % templates.length;
        setCurrent(next);
        onChange(next);
        setLastDirection('next');
    };

    const goPrev = () => {
        const prev = (current - 1 + templates.length) % templates.length;
        setCurrent(prev);
        onChange(prev);
        setLastDirection('prev');
    };

    const goTo = (index) => {
        setCurrent(index);
        onChange(index);
    };

    return (
        <div className="ea-template-slider">
            <div className="ea-template-slider__wrapper">

                {/* Previous Button */}
                <button
                    className={`ea-template-slider__btn ea-template-slider__btn--prev ${
                        lastDirection === 'prev' ? 'ea-template-slider__btn--active' : ''
                    }`}
                    onClick={goPrev}
                    aria-label="Previous template"
                >
                    ‹
                </button>

                {/* Template Image */}
                <img
                    className="ea-template-slider__image"
                    src={templates[current].image}
                    alt={templates[current].label}
                />

                {/* Next Button */}
                <button
                    className={`ea-template-slider__btn ea-template-slider__btn--next ${
                        lastDirection === 'next' ? 'ea-template-slider__btn--active' : ''
                    }`}
                    onClick={goNext}
                    aria-label="Next template"
                >
                    ›
                </button>

            </div>

            {/* Dot Navigation */}
            <div className="ea-template-slider__dots">
                {templates.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goTo(index)}
                        aria-label={`Go to template ${index + 1}`}
                        className={`ea-template-slider__dot ${
                            current === index
                                ? 'ea-template-slider__dot--active'
                                : ''
                        }`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TemplateSlider;