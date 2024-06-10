import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import { Register } from "./components/Register";
import { Signin } from "./components/Signin";

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