// server/temporal/workflows.ts
import { proxyActivities, sleep } from "@temporalio/workflow";
import type { SaveToCrudCrudInput } from "./activities";

// ✅ Define activity types
const { saveToCrudCrud } = proxyActivities<{
  saveToCrudCrud(input: SaveToCrudCrudInput): Promise<any>;
}>({
  startToCloseTimeout: "30 seconds",
});

// ✅ Main workflow
export async function saveUserDataWorkflow(
  userData: SaveToCrudCrudInput
): Promise<void> {
  console.log("Workflow started. Waiting 10 seconds...");
  await sleep(10000); // wait 10 seconds
  await saveToCrudCrud(userData);
  console.log("User data sent to CrudCrud!");
}
