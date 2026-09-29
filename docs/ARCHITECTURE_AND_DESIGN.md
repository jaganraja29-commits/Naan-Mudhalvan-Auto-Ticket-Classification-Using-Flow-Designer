# System Architecture & Technical Design

## 1. Architectural Overview

The automated classification solution operates natively within the ServiceNow **Now Platform**, leveraging event-driven architecture powered by the **Flow Designer** engine.

```mermaid
flowchart TD
    A[Caller Submits Ticket via Form/Portal] --> B[(Incident Workflow Table)]
    B -->|Record Insert Event| C{Flow Designer Engine Trigger}
    C -->|Trigger Condition: Category is EMPTY| D[Auto Classify School IT Tickets Flow]
    
    subgraph Flow Designer Logic Engine
        D --> E{Short Description Analysis}
        E -->|Contains 'Wi-Fi' OR 'Network'| F[Set Category = Network<br/>Set Subcategory = Wi-Fi]
        E -->|Contains 'Projector' OR 'Hardware'| G[Set Category = Hardware<br/>Set Subcategory = Projector]
        E -->|Contains 'Forgot Password' OR 'Access'| H[Set Category = Access<br/>Set Subcategory = Forgot Password]
        E -->|Contains 'Slow Computer' OR 'Performance'| I[Set Category = Performance<br/>Set Subcategory = Slow computer]
        
        F --> J[Update Incident Record]
        G --> J
        H --> J
        I --> J
        
        J --> K[Action: Send Email Notification]
    end
    
    K --> L[(sys_email Queue)]
    L --> M[Outbound SMTP to Caller]
    J --> N[(Updated Incident in Database)]
    N --> O[IT Support Dashboard / Agent Workspace]
```

---

## 2. Core Components

### 2.1 Database & Data Model Layer
- **Table Name:** `u_incident_workflow` (or `incident` extending Task)
- **Data Dictionary:**
  - Auto-Numbering system generating unique identifiers (`INC0010001` or `TKT0010001`).
  - Strict field dependencies binding `u_subcategory` to `u_category`.
  - Reference relationships with standard system tables (`sys_user`, `sys_user_group`).

### 2.2 Automation Engine Layer (Flow Designer)
- **Flow Identifier:** `Auto Classify School IT Tickets`
- **Execution Scope:** Global Application Scope (`global`)
- **Trigger Strategy:**
  - Type: **Record Created**
  - Table: `u_incident_workflow`
  - Filter Condition: `categoryISEMPTY^EQ`
- **Actions:**
  - In-line conditional evaluation (`If` / `Else If`) utilizing Flow Data Pills.
  - Core Action: `Update Record` (Applies matched category and subcategory).
  - Core Action: `Send Email` (Dynamic payload rendered from caller reference).

### 2.3 Presentation & Client Interaction Layer
- Form Layout optimized via Form Designer.
- Client Scripts for interactive validation:
  - `onChange`: Immediate real-time feedback when high-impact values are chosen.
  - `onSubmit`: Barrier checking to ensure assigned groups and users are maintained.
  - `onCellEdit`: Guard rails preventing unauthorized state changes from list views.

---

## 3. Data Flow Diagram

```mermaid
sequenceDiagram
    autonumber
    actor Caller as Student / Faculty (Caller)
    participant Form as Incident Form / Service Portal
    participant DB as ServiceNow Database
    participant Flow as Flow Designer Engine
    participant Email as Outbound Email Engine

    Caller->>Form: Enters Short Description & submits ticket
    Form->>DB: INSERT into incident_workflow (Category = null)
    DB->>Flow: Broadcast Record Created event
    Flow->>Flow: Evaluate trigger (Category is EMPTY -> TRUE)
    Flow->>Flow: Inspect keywords in Short Description
    Flow->>DB: UPDATE incident_workflow SET category=..., subcategory=...
    Flow->>Email: Queue notification (To: Caller.email, Subject: Ticket Submitted)
    Email-->>Caller: Delivery confirmation email
    DB-->>Form: Form reload displays classified Category & Subcategory
```

---

## 4. Security & Role-Based Access Control (RBAC)

| Role | Permissions |
|:---|:---|
| `public` / End User | Can submit ticket forms; read-only access to their own tickets. |
| `itil` / Support Agent | Read/Write access to update state, work notes, and assignees. Cannot alter Flow logic. |
| `flow_designer` / `admin` | Full control to modify trigger criteria, actions, and publication states. |
