import React from "react";
import CreateCampaign from "../CreateCampaign";

const LoginNavBar = () => {
    return (
        <nav className="navbar bg-base-100">
            <div className="flex flex-1 justify-between ">
                <div>
                    <a className="btn btn-ghost text-xl">G(OLD)</a>
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
                        <CreateCampaign />
                    </div>
                    <div className="px-2">
                        <a className="btn btn-ghost text-lg">Manage</a>
                    </div>
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="avatar" />
                            </div>
                        </label>
                        <ul
                            tabIndex={0}
                            className="menu dropdown-content mt-3 p-1 shadow bg-base-100 rounded-box w-52"
                        >
                            <li>
                                <a className="text-md font-semibold">Logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default LoginNavBar;
