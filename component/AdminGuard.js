// components/AdminGuard.js

import { useRouter } from "next/router";
import checkAdminAxios from "./Helper/AxiosFunction";
function AdminGuard({ children }) {
  const { user } = checkAdminAxios(); // Replace with your authentication hook or context

  const router = useRouter();

  // Check if the user is logged in and is an admin
  if (!user) {
    // Redirect the user to a different page (e.g., home page)
    router.push("/"); // Replace with the URL of your choice
    return null;
  }

  return children;
}

export default AdminGuard;
