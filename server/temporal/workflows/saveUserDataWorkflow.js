import { proxyActivities, defineWorkflow } from "@temporalio/workflow";

// Proxy for the activity functions
const { updateMongoUser, sendToCrudCrud } = proxyActivities({
  startToCloseTimeout: "1 minute",
});

// Define the workflow
export const saveUserDataWorkflow = defineWorkflow(
  "saveUserDataWorkflow",
  async (userData) => {
    // 1. Update MongoDB
    await updateMongoUser(userData);

    // 2. Delay for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));

    // 3. Send to CrudCrud
    await sendToCrudCrud(userData);
  }
);
