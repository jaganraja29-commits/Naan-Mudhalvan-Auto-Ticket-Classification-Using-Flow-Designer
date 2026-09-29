/**
 * Client Script: onCellEdit - Prevent state change via list edit
 * 
 * Table: incident
 * Type: onCellEdit
 * Field: state
 * Active: true
 * 
 * Description:
 * Prevents users from editing the State field directly from the
 * list view. Alerts the user to open the full incident record
 * and rejects the inline edit via callback(false).
 */
function onCellEdit(sysIDs, table, oldValues, newValue, callback) {
    // Alert user that state change via list editing is not allowed
    alert('State cannot be updated using list editing. Please open the Incident.');

    // Reject the cell edit
    callback(false);
}
