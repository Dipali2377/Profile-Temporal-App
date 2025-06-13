// server/temporal/workflows.js
import { proxyActivities } from "@temporalio/workflow";

// Wait for a specific time
import { sleep } from "@temporalio/workflow";

// Bind our activities
const { saveToCrudCrud } = proxyActivities({
  startToCloseTimeout: "30 seconds",
});

/**
 * This workflow waits 10 seconds and saves user data to CrudCrud.
 */
export async function saveUserDataWorkflow(userData) {
  console.log("Workflow started. Waiting 10 seconds...");
  await sleep(10000); // wait 10 seconds
  await saveToCrudCrud(userData);
  console.log("User data sent to CrudCrud!");
}
