/**
 * Client Script: onChange - Auto set urgency for high impact
 * 
 * Table: incident
 * Type: onChange
 * Field: impact
 * Active: true
 * 
 * Description:
 * When the Impact field is changed to "1 - High", this script
 * automatically sets the Urgency to "1 - High" and displays an
 * informational message to the user.
 */
function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (isLoading || newValue === '') {
        return;
    }

    // When Impact is set to 1 (High)
    if (newValue == '1') {
        // Auto-set Urgency to 1 (High)
        g_form.setValue('urgency', '1');

        // Display informational message
        g_form.addInfoMessage('Urgency set to High for High impact incident.');
    }
}
