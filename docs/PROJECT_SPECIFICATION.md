# Project Specification: Auto Ticket Classification Using Flow Designer

## 1. Executive Summary

In educational institutions, IT helpdesks receive dozens to hundreds of support requests daily from students, faculty, and administrative staff. These requests span common technical bottlenecks, including campus Wi-Fi drops, classroom projector failures, password resets, and sluggish computer lab workstations.

Under traditional operations, IT support staff manually inspect each incoming ticket, interpret the issue, select appropriate Category and Subcategory fields, assign groups, and trigger notifications. This manual triage is:
- **Time-Consuming:** High Mean Time to Acknowledge (MTTA) and Mean Time to Resolve (MTTR).
- **Inconsistent:** Different agents categorize the same issue differently.
- **Unscalable:** Inability to handle ticket surges during exam periods or semester startups.

This project delivers an automated, no-code/low-code ITSM solution on the **ServiceNow** platform using **Flow Designer**, custom table architecture, dependent choice dictionaries, and automated email notifications.

---

## 2. Business Objectives & Key Success Metrics

| Objective | Target Before Project | Target After Implementation | Business Impact |
|:---|:---:|:---:|:---|
| **Ticket Categorization Latency** | 15–45 minutes | < 2 seconds (Instantaneous) | Immediate routing & triage |
| **Categorization Accuracy** | ~78% (Human error) | > 98% (Keyword rule engine) | Eliminates misrouted tickets |
| **First Acknowledgment to Caller** | 30–60 minutes | Immediate (< 5 seconds) | Drastically improves user trust |
| **IT Staff Administrative Hours** | 12 hours/week | < 1 hour/week | Focus on active problem resolution |

---

## 3. Scope of Work

### In-Scope:
1. **Milestone 1 — Requirement Analysis & Planning:**
   - Define business problem, use case criteria, and scope boundaries.
   - Initialize and configure ServiceNow Local Update Set (`Project Update Set`).
2. **Milestone 2 — Backend Development & Configuration:**
   - Create and configure custom table / Incident Workflow table (`u_incident_workflow` / `incident`).
   - Define data types, field layouts, and auto-numbering.
   - Implement dynamic dependent choice relationships between `Category` and `Subcategory`.
3. **Milestone 3 — Automation using Flow Designer & Email Notifications:**
   - Build Flow `Auto Classify School IT Tickets`.
   - Configure trigger on record creation where Category is empty.
   - Implement branching decision logic (If / Else If) based on Short Description keyword parsing.
   - Automate record updates (`Category` and `Subcategory`).
   - Send formatted confirmation email notifications to the caller (`Caller -> Email`).
   - Activate flow in Global scope.
4. **Milestone 4 — Testing, Validation & Security:**
   - Execute test scenarios covering all keyword triggers (Wi-Fi, Projector, Password, Slow Computer).
   - Verify email dispatch via System Logs (`sys_email`).
   - Validate fallback and edge-case behavior.
5. **Milestone 5 — Deployment & Delivery:**
   - Finalize Local Update Set (`State = Complete`).
   - Export Update Set to XML for migration across environments.
   - Publish complete artifacts, repository, and operational runbook.

### Supplementary ITSM Capabilities:
- Client-side validation scripts: `onChange` (auto-set urgency), `onSubmit` (mandatory field verification), and `onCellEdit` (prevent unauthorized list edits).

---

## 4. User Personas

| Persona | Role | Key Interactions |
|:---|:---|:---|
| **Student / Teacher** | Caller / End User | Submits incident through portal/form, receives instant confirmation email with ticket details. |
| **IT Helpdesk Agent** | First Responder | Receives pre-categorized tickets with subcategories already set; immediately works on resolution. |
| **System Administrator** | Platform Owner | Manages keyword decision rules, monitors Flow Designer execution logs, and exports update sets. |

---

## 5. Acceptance Criteria

1. **Auto-Trigger:** Every incident created without a pre-selected category must trigger the Flow Designer execution.
2. **Keyword Mapping:**
   - Contains `Wi-Fi` or `Network` $\rightarrow$ Category: `Network`, Subcategory: `Wi-Fi`.
   - Contains `Projector` or `Hardware` $\rightarrow$ Category: `Hardware`, Subcategory: `Projector`.
   - Contains `Forgot Password` or `Password` $\rightarrow$ Category: `Access`, Subcategory: `Forgot Password`.
   - Contains `Slow Computer` or `Performance` $\rightarrow$ Category: `Performance`, Subcategory: `Slow computer`.
3. **Dependency Enforcement:** Subcategory dropdown must only display options relevant to the active Category.
4. **Notification:** Caller receives email notification within 5 seconds of ticket creation containing the generated ticket number.
5. **Portability:** Solution can be imported into any ServiceNow Utah/Vancouver/Washington/Xanadu instance via standard Update Set XML.
