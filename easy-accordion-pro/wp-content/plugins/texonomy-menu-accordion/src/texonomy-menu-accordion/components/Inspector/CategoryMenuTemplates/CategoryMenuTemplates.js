
import {
    PanelBody,
    
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption
} from '@wordpress/components';

import { useState } from '@wordpress/element';
import TemplateSlider from './TemplateSlider';
 import CustomDropDown from '../../common/CustomDropDown';
import CustomToggleGroup from '../../common/CustomToggleGroup';
import CustomToggleInput from '../../common/CustomToggleInput';
import RowRangeInput from './RowRangeInput';


const CategoryMenuTemplates = ({ attributes, setAttributes }) => {
    if (!attributes) return null;

    const [currentSlide, setCurrentSlide] = useState(0);
    // Options data
    const taxonomyOptions = [
        { label: 'Post Category', value: 'category' },
        { label: 'Post Tag', value: 'post_tag' },
        { label: 'Product Category', value: 'product_cat' },
        { label: 'Custom Categories', value: 'custom_cat' },
    ];
    const ordersOptions = [
        { label: 'ID', value: 'id' },
        { label: 'Title', value: 'title' },
        { label: 'Count', value: 'count' },
        { label: 'Menu Order', value: 'menu_order' },
    ];
    const HierarchyOptions = [
        { label: 'Parent Only', value: 'Parent Only' },
        { label: 'Upto Child', value: 'Upto Child' },
        { label: 'Up to Grand Child', value: 'Up to Grand Child' },
        { label: 'Up to Great-Grand Child', value: 'Up to Great-Grand Child' },
    ]

    // ১. ডাটা সোর্স কন্ডিশন চেক করা
    // const isTaxonomy = attributes.dataSource === 'taxonomy';
    // const isMenu = attributes.dataSource === 'menu';

    // ডিফল্ট ভ্যালু সেট করে নেওয়া যাতে রেন্ডারিং মিস না হয়
    const currentSource = attributes.dataSource || 'taxonomy';
    const isTaxonomy = currentSource === 'taxonomy';
    const isMenu = currentSource === 'menu';

    return (
        <PanelBody title="Category or Menu Templates" initialOpen={true}>

            {/* কমন ফিল্ডস: সব সময় দেখা যাবে */}
            <TemplateSlider
                value={attributes?.template || 0}
                onChange={(val) => setAttributes({ template: val })}
            />

            <RowRangeInput
                label="Item Gap"
                value={attributes.itemGap || 16}
                onChange={(val) => setAttributes({ itemGap: val })}
                min={0}
                max={100}
            />

            <CustomToggleGroup
                label="Data Source"
                value={attributes?.dataSource || 'taxonomy'}
                onChange={(val) => setAttributes({ dataSource: val })}
                options={[
                    { value: 'taxonomy', label: 'Taxonomy' },
                    { value: 'menu', label: 'Menu' },
                ]}
            />

            {/* --- কন্ডিশনাল রেন্ডারিং শুরু --- */}

            {/* ২. শুধুমাত্র Taxonomy সিলেক্টেড থাকলে */}
            { isTaxonomy && (
                <>
                    <CustomDropDown
                        label="Taxonomy Type"
                        value={attributes.taxonomy || 'product_cat'}
                        onChange={(val) => setAttributes({ taxonomy: val })}
                        options={taxonomyOptions}
                    />

                    <CustomToggleGroup
                        label="Categories to Show"
                        value={attributes.catShow || 'all'}
                        onChange={(val) => setAttributes({ catShow: val })}
                        options={[
                            { value: 'all', label: 'All' },
                            { value: 'specific', label: 'Specific' },
                            { value: 'exclude', label: 'Exclude' },
                        ]}
                    />

                    <CustomDropDown
                        inline={true}
                        label="Order By"
                        value={attributes.orderBy || 'title'}
                        onChange={(val) => setAttributes({ orderBy: val })}
                        options={ordersOptions}
                    />

                    <CustomToggleGroup
                        label="Order Direction"
                        value={attributes.orderDirection || 'ascending'}
                        onChange={(val) => setAttributes({ orderDirection: val })}
                        options={[
                            { value: 'ascending', label: 'Ascending' },
                            { value: 'descending', label: 'Descending' },
                        ]}
                    />
                </>
            )}

            {/* ৩. শুধুমাত্র Menu সিলেক্টেড থাকলে (নতুন যোগ করা হয়েছে) */}
            { isMenu && (
                <>
                    <CustomDropDown
                        label="Select a Menu"
                        value={attributes.menuId || ''}
                        onChange={(val) => setAttributes({ menuId: val })}
                        options={[
                            { label: 'Primary Menu', value: 'primary' },
                            { label: 'Footer Menu', value: 'footer' },
                        ]}
                        placeholder="Select Menu"
                    />
                </>
            )}

            {/* ৪. কমন ফিল্ডস যা দুই সোর্স এর জন্যই প্রযোজ্য */}
            <CustomDropDown
                label="Hierarchy Depth"
                value={attributes.depth || 'Up to Grand Child'}
                onChange={(val) => setAttributes({ depth: val })}
                options={HierarchyOptions}
            />

            {/* Taxonomy থাকলেই শুধু লিমিট দেখাবে */}
            { isTaxonomy && (
                <CustomToggleInput
                    type="number"
                    label="Display Limit"
                    value={attributes.limit || 8}
                    onChange={(val) => setAttributes({ limit: parseInt(val) })}
                />
            )}

            {/* ডাইনামিক লেবেল: Taxonomy হলে "Empty Terms", Menu হলে "Empty or Hashtag Links" */}
            <CustomToggleInput
                label={isTaxonomy ? "Empty Terms" : "Empty or Hashtag Links"}
                value={attributes.emptyTerms}
                onChange={(val) => setAttributes({ emptyTerms: val })}
            />

            <CustomToggleInput
                label="Multiple Open Together"
                value={attributes.multiOpen}
                onChange={(val) => setAttributes({ multiOpen: val })}
            />

            <RowRangeInput
                label="Max Width"
                value={attributes.maxWidth || 0}
                onChange={(val) => setAttributes({ maxWidth: val })}
                min={0}
                max={1000}
            />

        </PanelBody>
    );
};

export default CategoryMenuTemplates;
