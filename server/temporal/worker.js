// server/temporal/worker.js
import { Worker } from "@temporalio/worker";
import * as activities from "./activities.js";

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve("./workflows.js"),
    activities,
    taskQueue: "user-profile-task-queue", // Must match what's used in your client
  });

  console.log("👷 Temporal Worker is now running...");
  await worker.run();
}

run().catch((err) => {
  console.error("❌ Worker failed: ", err);
});
