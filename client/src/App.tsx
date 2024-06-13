import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { Register } from "./pages/Register";
import { Signin } from "./pages/Signin";

export function App() {
  return (
        <Register />
        // <Signin />
  );
}

{/* <ConnectButton
            client={client}
            appMetadata={{
              name: "Example app",
              url: "https://example.com",
            }}
          /> */}