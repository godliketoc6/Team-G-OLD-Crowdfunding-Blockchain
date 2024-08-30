import { createThirdwebClient } from "thirdweb";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({ 
  clientId: CLIENT_ID as string, 
});
