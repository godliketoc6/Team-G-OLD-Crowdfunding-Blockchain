import React, { useEffect, useState } from "react";
import { CreateCampaign } from "../CreateCampaign";
import { useConnectionStatus } from "@thirdweb-dev/react";
import { ConnectButton } from "../ConnectButton";
import * as  UserAPI  from '../../network/UserAPI'
import toast from "react-hot-toast";

const LoginNavBar = () => {

    const [isConnected, setIsConnected] = useState(false);
    const connectionStatus = useConnectionStatus();

    useEffect(() => {
        setIsConnected(connectionStatus === "connected");
    }, [connectionStatus]);

    async function logout() {
        try {
            await UserAPI.logout();
        } catch (error) {
            console.error(error);
            toast.error("Failed to log out");
        }
    }

    return (
        <nav className="navbar bg-base-100">
            <div className="flex flex-1 justify-between ">
                <div>
                    <a className="btn btn-ghost text-xl" href="/">G(OLD)</a>
                </div>
                <div className="w-full">
                    <input
                        type="text"
                        placeholder="Search"
                        className="input input-md input-bordered w-full max-w-xs"
                    />
                </div>
                <div className="flex">
                <div className="flex flex-end">
                    {isConnected ? <CreateCampaign /> : <ConnectButton onConnect={() => setIsConnected(true)} />}
                    </div>
                    <div className="px-2">
                        <a className="btn btn-ghost text-lg" href="/manage">Manage</a>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="avatar" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 p-1 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a className="text-md font-semibold" onClick={logout}>Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LoginNavBar;
