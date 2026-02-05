<?php
// This file is generated. Do not modify it manually.
return array(
	'child-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/child-block',
		'version' => '0.1.0',
		'title' => 'Child Block',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'name' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'h4'
			),
			'bio' => array(
				'type' => 'string',
				'source' => 'html',
				'selector' => 'p'
			),
			'id' => array(
				'type' => 'number'
			),
			'alt' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'img',
				'attribute' => 'alt',
				'default' => ''
			),
			'url' => array(
				'type' => 'string',
				'source' => 'attribute',
				'selector' => 'img',
				'attribute' => 'src'
			),
			'sizeSlug' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'socialLinks' => array(
				'type' => 'array',
				'default' => array(
					
				),
				'source' => 'query',
				'selector' => '.wp-block-blocks-course-team-member-social-links ul li',
				'query' => array(
					'icon' => array(
						'source' => 'attribute',
						'attribute' => 'data-icon'
					),
					'link' => array(
						'source' => 'attribute',
						'selector' => 'a',
						'attribute' => 'href'
					)
				)
			)
		),
		'parent' => array(
			'create-block/faq-accordion'
		),
		'textdomain' => 'child-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'faq-accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/faq-accordion',
		'version' => '0.1.0',
		'title' => 'Faq Accordion',
		'category' => 'widgets',
		'icon' => 'index-card',
		'description' => 'Example block scaffolded with Create Block tool.',
		'supports' => array(
			'reusable' => false,
			'html' => false,
			'align' => array(
				'wide',
				'full'
			)
		),
		'attributes' => array(
			'column' => array(
				'type' => 'number',
				'default' => 2
			)
		),
		'example' => array(
			'attributes' => array(
				'column' => 2
			),
			'innerBlocks' => array(
				array(
					'name' => 'create-block/child-block',
					'attributes' => array(
						'name' => 'John Doe',
						'bio' => 'Web Developer',
						'url' => 'https://images.unsplash.com/photo-1761839258753-85d8eecbbc29?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
						'socialLinks' => array(
							array(
								'icon' => 'facebook',
								'link' => '#'
							),
							array(
								'icon' => 'twitter',
								'link' => '#'
							)
						)
					)
				),
				array(
					'name' => 'create-block/child-block',
					'attributes' => array(
						'name' => 'John Doe',
						'bio' => 'Web Developer',
						'url' => 'https://images.unsplash.com/photo-1761839262867-af53d08b0eb5?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
						'socialLinks' => array(
							array(
								'icon' => 'facebook',
								'link' => '#'
							),
							array(
								'icon' => 'twitter',
								'link' => '#'
							)
						)
					)
				)
			)
		),
		'textdomain' => 'faq-accordion',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
