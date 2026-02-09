
import { registerBlockType } from '@wordpress/blocks';
import './style.scss';
import Edit from './edit';
import metadata from './block.json';
 
import MyIcon from './../../assets/icons/Block-Icons.svg';

registerBlockType(metadata.name, {
	icon: () => <img src={ MyIcon } alt="icon" />,
 	edit: Edit,
});
