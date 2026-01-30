const getBaseUrl = () => {
  const host = window.location.hostname;

  if (host === "localhost" || host === "127.0.0.1") {
    return "http://localhost:1818";
  }

  if (host === "devtinderrr.vercel.app") {
    return "https://devtinder-uw4i.onrender.com";
  }

  // Default for tarunn.xyz or any other production domain using a proxy
  return "/api";
};

export const BASE_URL = getBaseUrl();