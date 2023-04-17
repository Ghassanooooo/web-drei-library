const baseUrl =
  process.env.NODE_ENV !== "production" ? "http://localhost:3333" : "";

export const foldersUrl = baseUrl + "/folders-api";
export const lessonsUrl = baseUrl + "/lessons-api";
export const usersUrl = baseUrl + "/users-api";
