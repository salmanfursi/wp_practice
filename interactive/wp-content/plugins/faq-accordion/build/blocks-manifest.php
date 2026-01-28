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
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'reusable' => false,
			'html' => false
		),
		'attributes' => array(
			'column' => array(
				'type' => 'number',
				'default' => 2
			)
		),
		'textdomain' => 'faq-accordion',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
