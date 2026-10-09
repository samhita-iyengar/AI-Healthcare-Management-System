export const API = "http://localhost:8080";

export async function getErrorMessage(response) {
  try {
    const data = await response.json();
    return data.message || "Something went wrong. Please try again.";
  } catch {
    return "Something went wrong. Please try again.";
  }
}
