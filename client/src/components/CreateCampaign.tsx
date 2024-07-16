import React from "react";

const CreateCampaign = () => {
    return (
            <div className="drawer-end z-50">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer" className="btn btn-primary drawer-button text-lg">
                        Campaign
                    </label>
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        <a className="text-xl p-4">Create campaign</a>
                        <li className="py-2">
                            <input
                                type="text"
                                placeholder="Name"
                                className="input w-full max-w-xs"
                            />
                        </li>
                        <li className="py-2">
                            <input
                                type="text"
                                placeholder="Campaign title"
                                className="input w-full max-w-xs"
                            />
                        </li>
                        <li className="py-2">
                        <textarea className="textarea textarea-bordered" 
                        placeholder="Story" />
                        </li>
                        <li className="py-2">
                            <input
                                type="text"
                                placeholder="Goal"
                                className="input w-full max-w-xs"
                            />
                        </li>
                        <li className="py-2">
                            <input
                                type="date"
                                placeholder="Amount"
                                className="input w-full max-w-xs"
                            />
                        </li>
                        <div className="pt-2 flex justify-end">
                            <button className="btn btn-primary">Submit!</button>
                        </div>
                    </ul>
                </div>
            </div>
    );
};

export default CreateCampaign;
