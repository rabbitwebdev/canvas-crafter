<?php
/*
Plugin Name: Canvas Crafter
Description: Draw on a canvas and create interactive behaviors with VisualScript.
Version: 1.0
Author: Pip (with a hint of AI wizardry)
*/

// Enqueue assets
add_action('wp_enqueue_scripts', function () {
    wp_enqueue_style('canvas-crafter-style', plugin_dir_url(__FILE__) . 'assets/style.css');
wp_enqueue_script('visualscript-lib', 'https://unpkg.com/visualscript@1.2.0/dist/visualscript.min.js', [], null, true);

    wp_enqueue_script('canvas-crafter-script', plugin_dir_url(__FILE__) . 'assets/script.js', ['visualscript-lib'], null, true);
});

// Shortcode to render canvas
add_shortcode('canvas_crafter', function () {
    ob_start();
    ?>
    <div id="canvas-crafter-wrapper">
        <canvas id="canvas-crafter" width="800" height="500"></canvas>
        <div class="controls">
            <label>Color: <input type="color" id="color-picker" value="#000000"></label>
            <label>Brush Size: <input type="range" id="brush-size" min="1" max="20" value="5"></label>
               <button id="tool-brush">✏️ Brush</button>
            <button id="tool-rectangle">▭ Rectangle</button>
            <button id="tool-circle">◯ Circle</button>
            <button id="clear-canvas">Clear</button>
            <button id="save-canvas">Save as PNG</button>
        </div>
        <div id="vs-editor" style="height: 300px; border: 1px solid #ccc; margin-top: 1em;"></div>
    </div>
    <?php
    return ob_get_clean();
});
