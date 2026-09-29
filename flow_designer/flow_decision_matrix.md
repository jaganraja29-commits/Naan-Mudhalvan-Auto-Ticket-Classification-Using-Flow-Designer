# Flow Designer Decision Matrix & Logic

## 1. Flow Overview
- **Flow Name:** `Auto Classify School IT Tickets`
- **Trigger:** Record Created on `u_incident_workflow` where `Category is empty`.

---

## 2. Decision Logic Tree

```
Trigger: Record Created [Category is empty]
│
├── Step 1: IF Short description contains "Wi-Fi" OR contains "Network"
│   └── Action: Update Record -> Category: "Network", Subcategory: "Wi-Fi"
│
├── Step 2: ELSE IF Short description contains "Projector" OR contains "Hardware"
│   └── Action: Update Record -> Category: "Hardware", Subcategory: "Projector"
│
├── Step 3: ELSE IF Short description contains "Forgot password" OR contains "Password"
│   └── Action: Update Record -> Category: "Access", Subcategory: "Forgot Password"
│
├── Step 4: ELSE IF Short description contains "Slow Computer" OR contains "Performance"
│   └── Action: Update Record -> Category: "Performance", Subcategory: "Slow computer"
│
└── Step 5: ACTION Send Email
    ├── To: Caller -> Email
    ├── Subject: "Your Request for the issue has been submitted."
    └── Body: Ticket Confirmation Template
```

---

## 3. Keyword Match Table

| Priority | Rule Label | Condition Expression | Target Category | Target Subcategory |
|:---:|:---|:---|:---:|:---:|
| 1 | SD is Wifi or Network | `short_description LIKE %Wi-Fi% OR %Network%` | **Network** | **Wi-Fi** |
| 2 | SD is Projector or Hardware | `short_description LIKE %Projector% OR %Hardware%` | **Hardware** | **Projector** |
| 3 | SD is Forgot password or Access | `short_description LIKE %Forgot password% OR %Password%` | **Access** | **Forgot Password** |
| 4 | SD is Slow Computer or Performance | `short_description LIKE %Slow Computer% OR %Performance%` | **Performance** | **Slow computer** |

---

## 4. Execution Behavior & Edge Cases
- **Case-Insensitivity:** ServiceNow Flow Designer string operators (`contains`) evaluate case-insensitively.
- **Multiple Keywords Present:** The First-Match-Wins principle applies through the `If` $\rightarrow$ `Else If` ladder. For example, a ticket mentioning both Wi-Fi and Slow Computer evaluates to Rule 1 (`Network / Wi-Fi`).
- **No Keyword Match:** The record remains with `Category = empty`, allowing tier-1 service desk agents to triage manually without system errors.
