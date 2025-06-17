// server/temporal/worker.ts
import { Worker } from "@temporalio/worker";
import * as activities from "./activities.js"; // Must point to compiled `.js`
import connectDB from "../config/db.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// ✅ Resolve __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ✅ Reference compiled workflow file
const workflowsPath = join(__dirname, "workflows.js");

async function run(): Promise<void> {
  await connectDB();

  const worker = await Worker.create({
    workflowsPath,
    activities,
    taskQueue: "user-profile-task-queue",
  });

  console.log("✅ Temporal Worker is now running...🎉");
  await worker.run();
}

run().catch((err: unknown) => {
  console.error("❌ Worker failed:", err);
});
