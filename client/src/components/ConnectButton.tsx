import { createThirdwebClient } from "thirdweb";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";

const client = createThirdwebClient({ 
    clientId: "e4e89e340d9d7445678ba22ed1c70010" 
});

export function ConnectButton({ onConnect }: { onConnect: () => void }) {
  const { connect } = useConnect();

  return (
    <button
      className="btn btn-primary"
      onClick={() =>
        connect(async () => {
          const metamask = createWallet("io.metamask");
          await metamask.connect({ client });
          onConnect(); // Trigger the callback after connecting
          return metamask;
        })
      }
    >
      Connect
    </button>
  );
}
