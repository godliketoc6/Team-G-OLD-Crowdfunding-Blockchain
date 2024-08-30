import { createThirdwebClient } from "thirdweb";
import { useConnect } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import {client} from '../client'

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
