import axios from "axios";

// Simulated DB save (you can connect this to your DB service)
export async function saveToDatabase(userData) {
  console.log("✅ Saving to local DB:", userData);
  // Simulate DB save delay
  return new Promise((resolve) =>
    setTimeout(() => resolve("Saved to DB"), 1000)
  );
}

// Update crudcrud with a 10-second delay
export async function updateCrudCrud(userData) {
  console.log("🕒 Waiting 10 seconds before updating CrudCrud...");
  await new Promise((resolve) => setTimeout(resolve, 10000)); // 10s delay

  try {
    const response = await axios.post(
      "https://crudcrud.com/api/ed4289d8113d47c4b1a59ae4ceb2eecc/profiles",
      userData
    );
    console.log("✅ CrudCrud updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Failed to update CrudCrud:", error.message);
    throw error;
  }
}
