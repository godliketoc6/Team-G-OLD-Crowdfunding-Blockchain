import { createThirdwebClient } from "thirdweb";

const secretKey = import.meta.env.VITE_TEMPLATE_SECRET_KEY;
const clientKey = import.meta.env.VITE_CLIENT_KEY;

export const client = createThirdwebClient({
  clientId: [clientKey, secretKey].join(" ")
});
