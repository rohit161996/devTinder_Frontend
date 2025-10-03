import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";

const Premium = () => {

    const handleBuyClick = async (membershipType) => {

        const order = await axios.post(
            BASE_URL + "/payment/create",
            {
                membershipType,
            },
            { withCredentials: true }
        );

        /* It should open the Razorpay Dialogue Box */
        const { amount, keyId, notes, orderId } = order.notes;

        /* Open Razorpay Checkout */
        const options = {
            key: keyId, // Replace with your Razorpay key_id
            amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: 'INR',
            name: "Dev Tinder",
            description: 'Connect to other developer',
            order_id: orderId, // This is the order_id created in the backend
            prefill: {
                name: notes.firstName + " " + notes.lastName,
                email: notes.emailId,
                contact: "9999999999",
            },
            theme: {
                color: '#F37254'
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }


    return (
        <div className="m-10 flex flex-col items-center">
            <h1 className="text-4xl font-extrabold text-white mb-10">
                Choose Your Membership
            </h1>

            <div className="flex flex-col lg:flex-row gap-10 w-full max-w-6xl justify-center">
                {/* Silver Membership */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-gray-200 to-gray-300 text-gray-800 rounded-2xl shadow-xl p-8 w-full lg:w-1/2 transition transform hover:scale-105 hover:shadow-2xl">
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-6">
                            Silver Membership
                        </h2>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-center">
                                ✅ <span className="ml-2">Chat with other people</span>
                            </li>
                            <li className="flex items-center">
                                ✅ <span className="ml-2">100 connection requests/day</span>
                            </li>
                            <li className="flex items-center">
                                ✅ <span className="ml-2">Blue Tick</span>
                            </li>
                            <li className="flex items-center">
                                ✅ <span className="ml-2">3 months</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        className="btn bg-pink-500 hover:bg-pink-600 text-white font-semibold mt-6"
                        onClick={() => handleBuyClick("silver")}
                    >
                        Buy Silver Membership
                    </button>
                </div>

                {/* Gold Membership */}
                <div className="flex flex-col justify-between bg-gradient-to-br from-yellow-300 to-yellow-500 text-gray-900 rounded-2xl shadow-xl p-8 w-full lg:w-1/2 transition transform hover:scale-105 hover:shadow-2xl">
                    <div>
                        <h2 className="text-3xl font-bold text-center mb-6">
                            Gold Membership
                        </h2>
                        <ul className="space-y-3 text-lg">
                            <li className="flex items-center">
                                ✅ <span className="ml-2">Chat with other people</span>
                            </li>
                            <li className="flex items-center">
                                ✅ <span className="ml-2">1000 connection requests/day</span>
                            </li>
                            <li className="flex items-center">
                                ✅ <span className="ml-2">Blue Tick</span>
                            </li>
                            <li className="flex items-center">
                                ✅ <span className="ml-2">6 months</span>
                            </li>
                        </ul>
                    </div>
                    <button
                        className="btn bg-indigo-600 hover:bg-indigo-700 text-white font-semibold mt-6"
                        onClick={() => handleBuyClick("gold")}
                    >
                        Buy Gold Membership
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Premium;
