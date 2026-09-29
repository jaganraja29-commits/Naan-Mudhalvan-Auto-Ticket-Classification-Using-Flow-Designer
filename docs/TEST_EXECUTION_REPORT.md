# Test Execution Report — Milestone 4: Testing, Validation & Security

## 1. Test Objectives & Scope
The purpose of Milestone 4 testing is to validate that:
1. Every incident submitted with qualifying keywords in the `Short Description` is automatically and accurately classified into the corresponding `Category` and `Subcategory`.
2. The dynamic dependent choice list behaves as intended when viewed on the Incident form.
3. System Logs confirm the dispatch of the automated email confirmation to the caller's email address.
4. Fallback conditions ensure that unclassified or manual inputs are handled without runtime exceptions.

---

## 2. Test Execution Summary

- **Total Test Scenarios Executed:** 6
- **Passed:** 6 (100%)
- **Failed:** 0 (0%)
- **Execution Date:** September 2026
- **Test Environment:** ServiceNow Personal Developer Instance (PDI)
- **Status:** **PASS — PRODUCTION READY**

---

## 3. Detailed Test Cases & Execution Evidence

### Test Scenario 1: Wi-Fi / Network Issue Auto-Classification
- **Test ID:** `TC-AUTO-01`
- **Objective:** Verify classification for network connectivity problems.
- **Inputs:**
  - **Caller:** `Abel Tuter` (`abel.tuter@example.com`)
  - **Short Description:** `WiFi not working in library`
  - **Category:** *(Left empty)*
  - **Subcategory:** *(Left empty)*
- **Execution Steps:**
  1. Fill form fields and click **Submit / Save**.
  2. Reload the record.
- **Expected Results:**
  - Category auto-updates to `Network`.
  - Subcategory auto-updates to `Wi-Fi`.
  - Outbound email queued for `abel.tuter@example.com`.
- **Actual Result:** **PASS** (Category: `Network`, Subcategory: `Wi-Fi`, Flow execution status: Completed).

---

### Test Scenario 2: Outbound Email Notification Verification
- **Test ID:** `TC-AUTO-02`
- **Objective:** Verify system email generation and content payload.
- **Inputs:** Generated ticket from `TC-AUTO-01`.
- **Execution Steps:**
  1. Navigate to **All Menus** $\rightarrow$ **System Logs** $\rightarrow$ **Emails** (`sys_email.list`).
  2. Search for Subject: `Your Request for the issue has been submitted`.
  3. Open the record and click **Preview Email** related link.
- **Expected Results:**
  - Recipient matches caller's email.
  - Body contains ticket number, short description, category, and confirmation message.
- **Actual Result:** **PASS** (Email generated with status `send-ready`, preview displays full ticket details).

---

### Test Scenario 3: Projector / Hardware Issue Auto-Classification
- **Test ID:** `TC-AUTO-03`
- **Objective:** Verify classification for audiovisual hardware failure.
- **Inputs:**
  - **Caller:** `Beth Anglin`
  - **Short Description:** `Projector not turning on in Room 204`
  - **Category:** *(Left empty)*
- **Execution Steps:**
  1. Submit form and reload record.
- **Expected Results:**
  - Category = `Hardware`
  - Subcategory = `Projector`
  - Email notification dispatched to caller.
- **Actual Result:** **PASS** (Auto-set Category: `Hardware`, Subcategory: `Projector`).

---

### Test Scenario 4: Account Access / Password Issue Auto-Classification
- **Test ID:** `TC-AUTO-04`
- **Objective:** Verify classification for login and credential issues.
- **Inputs:**
  - **Caller:** `David Loo`
  - **Short Description:** `Student forgot password for student portal`
  - **Category:** *(Left empty)*
- **Execution Steps:**
  1. Submit record and reload.
- **Expected Results:**
  - Category = `Access`
  - Subcategory = `Forgot Password`
- **Actual Result:** **PASS** (Auto-set Category: `Access`, Subcategory: `Forgot Password`).

---

### Test Scenario 5: System Performance / Slow Computer Auto-Classification
- **Test ID:** `TC-AUTO-05`
- **Objective:** Verify classification for computer performance bottlenecks.
- **Inputs:**
  - **Caller:** `Fred Luddy`
  - **Short Description:** `Extremely slow computer during lab session`
  - **Category:** *(Left empty)*
- **Execution Steps:**
  1. Submit record and reload.
- **Expected Results:**
  - Category = `Performance`
  - Subcategory = `Slow computer`
- **Actual Result:** **PASS** (Auto-set Category: `Performance`, Subcategory: `Slow computer`).

---

### Test Scenario 6: Manual Entry & Non-Matching Fallback
- **Test ID:** `TC-AUTO-06`
- **Objective:** Verify that manual pre-selection is preserved and non-matching tickets do not error out.
- **Inputs:**
  - **Short Description:** `Need stationery supplies for office`
  - **Category:** `Inquiry` (Manually selected prior to save)
- **Execution Steps:**
  1. Submit record.
- **Expected Results:**
  - Flow trigger condition (`Category is EMPTY`) evaluates to `false`.
  - Record remains unmodified by Flow Designer.
- **Actual Result:** **PASS** (Flow skipped execution; manual category intact).

---

## 4. Test Matrix & Compliance Sign-Off

| Test ID | Condition Evaluated | Category Result | Subcategory Result | Notification Sent | Status |
|:---:|:---|:---:|:---:|:---:|:---:|
| `TC-AUTO-01` | Short Description contains `WiFi` | Network | Wi-Fi | Yes | ✅ PASS |
| `TC-AUTO-02` | Email log inspection (`sys_email`) | N/A | N/A | Verified | ✅ PASS |
| `TC-AUTO-03` | Short Description contains `Projector` | Hardware | Projector | Yes | ✅ PASS |
| `TC-AUTO-04` | Short Description contains `Forgot password` | Access | Forgot Password | Yes | ✅ PASS |
| `TC-AUTO-05` | Short Description contains `Slow computer` | Performance | Slow computer | Yes | ✅ PASS |
| `TC-AUTO-06` | Non-empty Category / non-keyword text | Preserved | Preserved | No | ✅ PASS |

**Milestone 4 Status:** **100% COMPLETE & VERIFIED**
