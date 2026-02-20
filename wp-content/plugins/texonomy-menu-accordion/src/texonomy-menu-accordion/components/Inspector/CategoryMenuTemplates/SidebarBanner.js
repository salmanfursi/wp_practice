 
import React from 'react';
import { Capawheel, EasyAccordionSidebarLogo } from '../../../assets/icons/svgIcons';
 
const SidebarBanner = () => {
    // স্টাইল অবজেক্টটি আলাদা করে রাখা স্ট্যান্ডার্ড
    const bannerStyle = {
        // background: 'linear-gradient(90deg, #FF4B4B 0%, #FF9021 100%)',
        background: 'var(--ea-gradient-orange)', // CSS variable ব্যবহার করা ভালো
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    return (
        <div className="ea-sidebar-banner" style={bannerStyle}>
            <div className="ea-banner-left" style={{ lineHeight: 0 }}>
                <EasyAccordionSidebarLogo />
            </div>
            <div className="ea-banner-right" style={{ display: 'flex' }}>
                <Capawheel />
            </div>
        </div>
    );
};

export default SidebarBanner;
