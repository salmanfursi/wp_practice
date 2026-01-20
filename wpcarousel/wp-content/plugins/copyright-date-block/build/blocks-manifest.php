<?php
// This file is generated. Do not modify it manually.
return array(
	'first-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/first-block',
		'version' => '0.1.0',
		'title' => 'First Block',
		'category' => 'fursi-block',
		'icon' => 'laptop',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true,
			'color' => array(
				'text' => true,
				'background' => true
			),
			'spacing' => array(
				'padding' => true,
				'margin' => true
			),
			'typography' => array(
				'fontSize' => true,
				'lineHeight' => true,
				'textAlign' => true
			),
			'layout' => array(
				'default' => array(
					'type' => 'flex',
					'flexWrap' => 'wrap'
				),
				'allowSwitching' => true
			),
			'background' => array(
				'backgroundImage' => true,
				'backgroundSize' => true
			),
			'dimensions' => array(
				'minHeight' => true,
				'width' => true
			),
			'border' => array(
				'color' => true,
				'radius' => true,
				'style' => true,
				'width' => true
			)
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'right'
			),
			'style' => array(
				'type' => 'object',
				'default' => array(
					'spacing' => array(
						'padding' => array(
							'top' => '100px',
							'bottom' => '100px'
						)
					),
					'background' => array(
						'backgroundImage' => array(
							'url' => 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
							'source' => 'file',
							'title' => 'Default Background'
						),
						'backgroundSize' => 'cover'
					)
				)
			)
		),
		'textdomain' => 'first-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'my-description' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/my-description',
		'version' => '0.1.1',
		'attributes' => array(
			'color' => array(
				'type' => 'string',
				'default' => '#000'
			),
			'backgroundcolor' => array(
				'type' => 'string',
				'default' => '#ffffff'
			),
			'content' => array(
				'type' => 'string'
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'url' => 'https://images.pexels.com/photos/533769/pexels-photo-533769.jpeg'
				)
			)
		),
		'title' => 'My Description',
		'category' => 'widgets',
		'icon' => 'playlist-audio',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'textdomain' => 'src/my-description',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'my-info' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/my-info',
		'version' => '0.1.0',
		'title' => 'My Info',
		'category' => 'fursi-block',
		'icon' => 'smiley',
		'attributes' => array(
			'title' => array(
				'type' => 'string',
				'default' => 'default content is here !'
			)
		),
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'my-info',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css'
	),
	'second-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/second-block',
		'version' => '0.1.0',
		'title' => 'Copyright Date Block',
		'category' => 'tharin-block',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'second-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	),
	'third-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/third-block',
		'version' => '0.1.0',
		'title' => 'third-block',
		'category' => 'media',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'third-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./view.js'
	)
);
