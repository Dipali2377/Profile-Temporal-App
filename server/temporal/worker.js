// server/temporal/worker.js
import { Worker } from "@temporalio/worker";
import * as activities from "./activities.js";
import connectDB from "../config/db.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Resolve workflows.js in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const workflowsPath = `${__dirname}/workflows.js`;

async function run() {
  await connectDB();

  const worker = await Worker.create({
    workflowsPath,
    activities,
    taskQueue: "user-profile-task-queue",
  });

  console.log("Temporal Worker is now running...🎉");
  await worker.run();
}

run().catch((err) => {
  console.error(" Worker failed: ", err);
});
