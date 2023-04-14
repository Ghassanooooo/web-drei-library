const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://reveal.crtil.com"
    : "http://localhost:3333/library-api/trpc";
// new port for client 4111 nginx

console.log("process.env => ", process.env);

export const api = baseURL;

console.log(process.env.TEST, " <= process.env.TEST");

/*const getBaseUrl = () => {
  if (typeof window !== "undefined") return ""; // browser should use relative url
  return `http://localhost:${process.env.PORT ?? 4001}`; // dev SSR should use localhost
};*/
