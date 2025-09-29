import axios from "axios";

export const validateToken = async (token: string) => {
  try {
    const url = import.meta.env.VITE_API_BASE_URL;
    const response = await axios.get(`${url}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Invalid token:", error);
    return null;
  }
};
