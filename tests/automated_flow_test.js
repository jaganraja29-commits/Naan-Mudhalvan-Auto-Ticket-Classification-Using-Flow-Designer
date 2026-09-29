/**
 * Automated Flow Logic Unit Test Runner
 *
 * Runs test cases from test_data_samples.json against the Flow Designer
 * decision logic to verify 100% test scenario pass rate.
 */

const fs = require('fs');
const path = require('path');

const testCases = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'test_data_samples.json'), 'utf8')
);

function simulateFlowDesignerClassification(shortDesc) {
  const text = (shortDesc || '').toLowerCase();

  // Step 1: Wi-Fi or Network
  if (text.includes('wi-fi') || text.includes('wifi') || text.includes('network')) {
    return { category: 'Network', subcategory: 'Wi-Fi' };
  }

  // Step 2: Projector or Hardware
  if (text.includes('projector') || text.includes('hardware')) {
    return { category: 'Hardware', subcategory: 'Projector' };
  }

  // Step 3: Forgot password or Access
  if (text.includes('forgot password') || text.includes('password') || text.includes('access')) {
    return { category: 'Access', subcategory: 'Forgot Password' };
  }

  // Step 4: Slow computer or Performance
  if (text.includes('slow computer') || text.includes('performance') || text.includes('sluggish')) {
    return { category: 'Performance', subcategory: 'Slow computer' };
  }

  return { category: null, subcategory: null };
}

console.log('====================================================');
console.log('Flow Designer Classification Unit Test Execution');
console.log('====================================================');

let passed = 0;
let failed = 0;

testCases.forEach((tc) => {
  const result = simulateFlowDesignerClassification(tc.short_description);
  const matchCat = result.category === tc.expected_category;
  const matchSub = result.subcategory === tc.expected_subcategory;

  if (matchCat && matchSub) {
    passed++;
    console.log(`[PASS] ${tc.id}: "${tc.short_description}" -> ${result.category} / ${result.subcategory}`);
  } else {
    failed++;
    console.error(`[FAIL] ${tc.id}: "${tc.short_description}"`);
    console.error(`       Expected: ${tc.expected_category} / ${tc.expected_subcategory}`);
    console.error(`       Got:      ${result.category} / ${result.subcategory}`);
  }
});

console.log('----------------------------------------------------');
console.log(`Summary: Total: ${testCases.length} | Passed: ${passed} | Failed: ${failed}`);
console.log(`Pass Rate: ${((passed / testCases.length) * 100).toFixed(1)}%`);
console.log('====================================================');

if (failed > 0) {
  process.exit(1);
} else {
  console.log('All Flow Designer classification scenarios PASSED successfully.');
}
