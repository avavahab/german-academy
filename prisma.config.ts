import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "./prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"), // നിങ്ങളുടെ .env ഫയലിൽ ഡാറ്റാബേസ് ലിങ്ക് സേവ് ചെയ്തിരിക്കുന്ന പേര് (DATABASE_URL അല്ലെങ്കിൽ DIRECT_URL) ഇവിടെ നൽകുക
  },
});