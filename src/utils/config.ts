interface Config {
  apiBaseUrl: string;
  googleClinetID: string;
  googleClientSecret: string;
}

export const config: Config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || "",
  googleClinetID: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};
