/**
 * Business Rule: Fallback Auto Ticket Classifier
 * Table: Incident [incident] / Incident Workflow [u_incident_workflow]
 * When: Before Insert
 * Condition: current.category.nil()
 *
 * Description:
 * Acts as an instantaneous server-side fallback to guarantee classification
 * if the asynchronous Flow Designer queue experiences delays.
 */

(function executeRule(current, previous /*null when async*/) {
    if (!current.category.nil()) {
        return;
    }

    var shortDesc = (current.short_description || '').toString().toLowerCase();

    if (shortDesc.indexOf('wi-fi') > -1 || shortDesc.indexOf('wifi') > -1 || shortDesc.indexOf('network') > -1) {
        current.category = 'Network';
        current.subcategory = 'Wi-Fi';
    } else if (shortDesc.indexOf('projector') > -1 || shortDesc.indexOf('hardware') > -1) {
        current.category = 'Hardware';
        current.subcategory = 'Projector';
    } else if (shortDesc.indexOf('forgot password') > -1 || shortDesc.indexOf('password') > -1) {
        current.category = 'Access';
        current.subcategory = 'Forgot Password';
    } else if (shortDesc.indexOf('slow computer') > -1 || shortDesc.indexOf('performance') > -1) {
        current.category = 'Performance';
        current.subcategory = 'Slow computer';
    }
})(current, previous);
