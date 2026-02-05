

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import transforms from './transforms';
import '../child-block';

registerBlockType(metadata.name, {
    transforms,
    edit: Edit,
    save: Save,
});