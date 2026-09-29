/**
 * Client Script: onSubmit - Prevent save if Assigned To missing
 * 
 * Table: incident
 * Type: onSubmit
 * Active: true
 * 
 * Description:
 * When saving an incident with Impact = 1 (High), this script
 * validates that the "Assigned To" field is populated. If empty,
 * it prevents the form submission and shows a field-level error.
 */
function onSubmit() {
    var impact = g_form.getValue('impact');
    var assignedTo = g_form.getValue('assigned_to');

    // If Impact is High and Assigned To is empty
    if (impact == '1' && assignedTo === '') {
        // Show field error on Assigned To
        g_form.showFieldMsg('assigned_to', 'Assigned To is mandatory for High impact incidents.', 'error');

        // Prevent form submission
        return false;
    }

    return true;
}
