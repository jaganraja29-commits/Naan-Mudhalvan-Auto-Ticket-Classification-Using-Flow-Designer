# Deployment & Migration Guide — Milestone 5

## 1. Overview
This guide provides step-by-step instructions to deploy the **Auto Ticket Classification Using Flow Designer** solution to any ServiceNow instance using the exported XML Update Set.

---

## 2. Prerequisites
- A ServiceNow instance (Utah, Vancouver, Washington DC, Xanadu, or newer).
- System Administrator (`admin`) role.
- Outbound email enabled (System Properties $\rightarrow$ Email Properties).

---

## 3. Step-by-Step Deployment Instructions

### Phase A: Importing the Remote Update Set (Target Instance)
1. **Navigate to Retrieved Update Sets:**
   - In the filter navigator, type `System Update Sets` $\rightarrow$ click **Retrieved Update Sets**.
2. **Import XML:**
   - Under **Related Links**, click **Import Update Set from XML**.
   - Select the file: `servicenow_configurations/update_set/sys_remote_update_set_Auto_Ticket_Classification.xml`.
   - Click **Upload**.
3. **Preview Update Set:**
   - Open the retrieved record (`Project Update Set`).
   - Click **Preview Update Set**.
   - Verify that there are 0 errors and 0 collisions. (If any collision exists with out-of-the-box fields, choose *Accept Remote Update*).
4. **Commit Update Set:**
   - Click **Commit Update Set**.
   - Wait for the progress bar to complete (100%).

---

### Phase B: Activating Flow Designer Workflow
1. Navigate to **Process Automation** $\rightarrow$ **Flow Designer**.
2. Search for the flow: **`Auto Classify School IT Tickets`**.
3. Open the flow record.
4. Review the Trigger and Action pills to ensure they reference the target instance table (`u_incident_workflow` or `incident`).
5. In the top-right header, click **Activate**.
6. Confirm the activation status changes from **Draft** to **Active**.

---

### Phase C: Post-Deployment Verification
1. Navigate to **Incident** (or custom table) $\rightarrow$ **Create New**.
2. Enter a test Short Description: `Wi-Fi connection failed in student lab`.
3. Select any test user in **Caller**.
4. Click **Submit** or **Save**.
5. Verify:
   - Category updates to `Network`.
   - Subcategory updates to `Wi-Fi`.
   - An outbound email record is generated in `sys_email`.

---

## 4. Rollback & Uninstallation Plan
If required, the update set can be backed out:
1. Navigate to **System Update Sets** $\rightarrow$ **Local Update Sets**.
2. Open `Project Update Set`.
3. Under Related Links, click **Back Out**.
4. Confirm back-out operation.
