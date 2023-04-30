
<?php
/*
 * Plugin Name:       Falter in Resolute Cards
 * Plugin URI:        https://falterinresolute.com/
 * Description:       Transforms posts into card segments with the card block.
 * Version:           0.0.1
 * Author:            Dale de Silva
 * Author URI:        https://designdebt.club/
 */

 
// prevent accessing this file directly
if( ! defined( 'ABSPATH' ) ){
    exit;
}



// Add new and modify existing categories
/////////////////////////////////////////
function fircards__add_block_categories( $categories, $post ) {
    
    $new_categories = array(
        // This category shouldn't appear because all blocks in it shouldn't be choosable by the user
        // Leaving here for testing and error checking
        array(
            'slug' => 'fir-hidden',
            'title' => __( 'Falter in Resolute (Required)', 'fir-cards' ),
            // 'icon'  => 'wordpress'
        ),
        array(
            'slug' => 'fir-general',
            'title' => __( 'Falter in Resolute', 'fir-cards' ),
            // 'icon'  => 'wordpress'
        ),
    );
    $insert_index = 0;
    $delete_count = 0;
    array_splice( $categories, $insert_index, $delete_count, $new_categories );
    return $categories;    
}
add_filter( 'block_categories_all', 'fircards__add_block_categories', 10, 2 );



// Common function to register a block
function fircards__register_block($block_slug, $options = array () ) {
    
    // register the block and attach it's scripts
    register_block_type(
        $block_slug,
        array_merge(
            array(
                'editor_script' => 'fir-cards_editor-script',
                'editor_style' => 'fir-cards_editor-style',
                'script' => 'fir-cards_display-script',
                'style' => 'fir-cards_display-style'
            ),
            $options
        )
    );

}



// Register Gutenberg blocks
/////////////////////////////////////////
function fircards__register_all_blocks() {
        
    // Register Display side scripts and CSS
    $handle = 'fir-cards_display-script';
    $src = plugins_url( 'display.js', __FILE__ );
    $deps = '';
    wp_register_script( $handle, $src, $deps );
    //
    $handle = 'fir-cards_display-style';
    $src = plugins_url( 'display.css', __FILE__ );
    // $deps = array(
    //     'wp-edit-blocks', // load the wp block styles first so that my styles override them
    // );
    wp_register_style( $handle, $src, $deps );


    // Register Editor side scripts and CSS
    $handle = 'fir-cards_editor-script';
    $src = plugins_url( 'editor.js', __FILE__ );
    $deps = array( 'wp-hooks', 'wp-data', 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-components', 'wp-edit-post', 'wp-compose', 'wp-plugins');
    wp_register_script( $handle, $src, $deps );
    //
    $handle = 'fir-cards_editor-style';
    $src = plugins_url( 'editor.css', __FILE__ );
    // $deps = array(
    //     // 'wp-edit-blocks', // load the wp block styles first so that my styles override them
    //     'fir-cards_display-style', // Load the plugin's display files first incase the editor needs to override them
    // );
    wp_register_style( $handle, $src, $deps );


    // Register the blocks
    // fircards__register_block( 'fir-cards/style-inserter' );
    fircards__register_block( 'fir-cards/card' );
    
}
add_action( 'init', 'fircards__register_all_blocks' );