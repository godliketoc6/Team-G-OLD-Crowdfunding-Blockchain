import { createThirdwebClient } from "thirdweb";

const clientId = import.meta.env.VITE_TEMPLATE_CLIENT_ID;
const secretKey = import.meta.env.VITE_TEMPLATE_SECRET_KEY;

export const client = createThirdwebClient({
  clientId,
  secretKey
});
