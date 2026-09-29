/**
 * Custom Script Action for Flow Designer: IT Ticket Keyword Classifier
 *
 * Description:
 * Analyzes short_description and description text strings using regex-based
 * keyword matching to return optimal Category and Subcategory pairs.
 *
 * Inputs:
 * - inputs.short_description (String)
 * - inputs.description (String)
 *
 * Outputs:
 * - outputs.category (String)
 * - outputs.subcategory (String)
 * - outputs.matched (Boolean)
 */

(function execute(inputs, outputs) {
    var text = ((inputs.short_description || '') + ' ' + (inputs.description || '')).toLowerCase();
    
    // Default outputs
    outputs.category = '';
    outputs.subcategory = '';
    outputs.matched = false;

    // Rule 1: Network & Wi-Fi issues
    if (/\b(wi-?fi|network|internet|lan|wlan|router|connectivity|offline)\b/i.test(text)) {
        outputs.category = 'Network';
        outputs.subcategory = 'Wi-Fi';
        outputs.matched = true;
        return;
    }

    // Rule 2: Projector & AV Hardware issues
    if (/\b(projector|display|hdmi|vga|screen|hardware|monitor|cable)\b/i.test(text)) {
        outputs.category = 'Hardware';
        outputs.subcategory = 'Projector';
        outputs.matched = true;
        return;
    }

    // Rule 3: Account Access & Password issues
    if (/\b(password|forgot|login|credentials|unlock|mfa|sso|access|auth)\b/i.test(text)) {
        outputs.category = 'Access';
        outputs.subcategory = 'Forgot Password';
        outputs.matched = true;
        return;
    }

    // Rule 4: System Performance & Slow Computer issues
    if (/\b(slow|freeze|lag|hanging|sluggish|performance|cpu|memory|crash)\b/i.test(text)) {
        outputs.category = 'Performance';
        outputs.subcategory = 'Slow computer';
        outputs.matched = true;
        return;
    }
})(inputs, outputs);
