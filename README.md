# Implement Client Script & UI Policy (Incident)

## ServiceNow System Administrator — Naan Mudhalvan Project

### 📋 Project Overview

This project implements **Client Scripts** and **UI Policies** on the ServiceNow **Incident** table to enforce business rules, improve data integrity, and control user interactions on the platform.

---

### 🏗️ Architecture

```
Incident Table
├── UI Policy: "High Impact Control"
│   ├── Condition: Impact = 1 - High
│   ├── Action 1: Assignment Group → Mandatory
│   └── Action 2: Urgency → Read-only
├── Client Script (onChange): "Auto set urgency for high impact"
│   └── Trigger: Impact field change → Auto-set Urgency to High
├── Client Script (onSubmit): "Prevent save if Assigned To missing"
│   └── Trigger: Form save → Block if Impact=High & Assigned To is empty
└── Client Script (onCellEdit): "Prevent state change via list edit"
    └── Trigger: Inline list edit on State → Alert & reject
```

---

### ⚙️ Configurations

#### 1. UI Policy — "High Impact Control"

| Property            | Value                           |
|---------------------|---------------------------------|
| **Table**           | `incident`                      |
| **Name**            | High Impact Control             |
| **Active**          | ✅ true                         |
| **Global**          | ✅ true                         |
| **Reverse if false**| ✅ true                         |
| **Condition**       | `impact=1^EQ` (Impact is 1 - High) |

##### UI Policy Actions

| Field              | Mandatory | Read-only (Disabled) | Visible  |
|--------------------|-----------|----------------------|----------|
| `assignment_group` | ✅ true   | —                    | —        |
| `urgency`          | —         | ✅ true              | Ignore   |

---

#### 2. Client Script — onChange: "Auto set urgency for high impact"

| Property    | Value                               |
|-------------|-------------------------------------|
| **Table**   | `incident`                          |
| **Type**    | onChange                            |
| **Field**   | `impact`                            |
| **Active**  | ✅ true                             |

**Logic:**
- When `newValue == '1'` (High Impact):
  - Sets `urgency` to `'1'` (High)
  - Displays info message: *"Urgency set to High for High impact incident."*

📄 **Script file:** [`scripts/onChange_auto_set_urgency.js`](scripts/onChange_auto_set_urgency.js)

---

#### 3. Client Script — onSubmit: "Prevent save if Assigned To missing"

| Property    | Value                               |
|-------------|-------------------------------------|
| **Table**   | `incident`                          |
| **Type**    | onSubmit                            |
| **Active**  | ✅ true                             |

**Logic:**
- If `impact == '1'` and `assigned_to` is blank:
  - Displays field error on `assigned_to`: *"Assigned To is mandatory for High impact incidents."*
  - Returns `false` to prevent form submission

📄 **Script file:** [`scripts/onSubmit_prevent_save.js`](scripts/onSubmit_prevent_save.js)

---

#### 4. Client Script — onCellEdit: "Prevent state change via list edit"

| Property    | Value                               |
|-------------|-------------------------------------|
| **Table**   | `incident`                          |
| **Type**    | onCellEdit                          |
| **Field**   | `state`                             |
| **Active**  | ✅ true                             |

**Logic:**
- Alerts: *"State cannot be updated using list editing. Please open the Incident."*
- Calls `callback(false)` to reject the inline edit

📄 **Script file:** [`scripts/onCellEdit_prevent_state_change.js`](scripts/onCellEdit_prevent_state_change.js)

---

### 🧪 Testing Evidence (Milestone 6)

#### Test 1: Mandatory Enforcement
- ✅ Set Impact to **1 - High** on Incident form
- ✅ Left **Assigned To** empty
- ✅ Clicked **Save**
- **Expected:** Urgency auto-sets to 1, locks read-only; Assignment Group becomes mandatory; save blocked with error on Assigned To
- **Result:** PASS

#### Test 2: Successful Save
- ✅ Populated **Assigned To** with a valid user (e.g., David Loo)
- ✅ Impact = 1 - High
- ✅ Clicked **Save**
- **Expected:** Save succeeds; Priority computes to **Critical (1)**
- **Result:** PASS

#### Test 3: Reverse Condition
- ✅ Changed Impact to **2 - Medium**
- **Expected:** Urgency unlocks (no longer read-only); Assignment Group no longer mandatory
- **Result:** PASS

#### Test 4: List Edit Prevention
- ✅ Attempted inline list edit on **State** column in Incident list view
- **Expected:** Alert appears: *"State cannot be updated using list editing..."*; edit is rejected
- **Result:** PASS

#### Test 5: Form Update
- ✅ Changed **State** from the record form view
- **Expected:** Update succeeds normally
- **Result:** PASS

---

### 📁 Project Structure

```
NAAN MUDHALVAN/
├── README.md                                   # This file
└── scripts/
    ├── onChange_auto_set_urgency.js             # Auto-set urgency onChange
    ├── onSubmit_prevent_save.js                 # Block save onSubmit
    └── onCellEdit_prevent_state_change.js       # Block list edit onCellEdit
```

---

### 🎯 Milestones

| #  | Milestone                                      | Status      |
|----|-------------------------------------------------|-------------|
| 1  | Requirement Analysis & Planning                 | ✅ Completed |
| 2  | Backend Development & Configuration             | ✅ Completed |
| 3  | Automation using Flow Designer & Email Notification | ✅ Completed |
| 4  | Testing, Validation & Security                  | ✅ Completed |
| 5  | Deployment & Conclusion                         | ✅ Completed |
| 6  | Live Functional Testing                         | ✅ Completed |
| 7  | Conclusion                                      | ✅ Completed |

---

### 🛠️ Platform Details

| Item               | Value                                |
|--------------------|--------------------------------------|
| **Platform**       | ServiceNow (Personal Developer Instance) |
| **SkillWallet**    | myskillwallet.ai                     |
| **User**           | Jagan R (jaganraja29@gmail.com)      |
| **Program**        | ServiceNow System Administrator - NM Eng |
| **Project**        | Implement Client Script & UI Policy (Incident) |

---

### 📝 License

This project is part of the Naan Mudhalvan program — ServiceNow System Administration track.
