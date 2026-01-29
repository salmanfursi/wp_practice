

import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import Save from './save';
import metadata from './block.json';
import '../child-block';

registerBlockType(metadata.name, {
    edit: Edit,
    save: Save,
});