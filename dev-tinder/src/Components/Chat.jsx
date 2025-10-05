import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {

    const { targetUserId } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const user = useSelector(store => store.user);
    const userId = user?._id;

    const sendMessage = () => {
        const socket = createSocketConnection();
        socket.emit("sendMessage", {
            firstName: user.firstName,
            lastName: user.lastName,
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
    }

    const fetchChatMessages = async () => {
        const chat = await axios.get(
            BASE_URL + "/chat/" + targetUserId,
            { withCredentials: true }
        );

        /* We get the messages object from the chat */
        console.log(chat.data.messages);

        const chatMessages = chat?.data?.messages.map((msg) => {
            return {
                firstName: msg?.firstName,
                lastName: msg?.lastName,
                text: msg?.text
            };
        });

        setMessages(chatMessages);
    }

    useEffect(() => {
        fetchChatMessages();
    }, []);

    useEffect(() => {
        if (!userId) {
            return;
        }

        /* Socket object is created as soon as the page loads */
        const socket = createSocketConnection();

        /* Sockets will be used to emit events */
        /* It will send some data to the backend i.e. sender's and receiver's email id */
        /* It is type of an api call but not an actual API */
        /* As soon as the page loads, the socket connection is made and joinChat event is emitted */
        socket.emit("joinChat", {
            firstName: user.firstName,
            userId,
            targetUserId
        });

        socket.on(
            "messageReceived",
            ({ firstName, lastName, text }) => {
                console.log(firstName + " " + lastName + " : " + text);
                setMessages((messages) => [...messages, { firstName, lastName, text }]);
            }
        )

        return () => {
            socket.disconnect();
        }

    }, [userId, targetUserId]);

    return (
        <div className="border border-gray-600 w-3/4 mx-auto m-5 h-[70vh] flex flex-col bg-gray-900">
            {/* Heading with Chat written in it. */}
            <h1 className="p-5 border-5 border-gray-600">
                Chat
            </h1>

            {/* Message Displaying Window */}
            <div className="flex-1 overflow-scroll p-5">
                {/* Display Messages */}
                {
                    messages.map((msg, index) => {
                        return <div
                            key={index}
                            className="chat chat-start text-white">
                            <div className="chat-header">
                                {/* FirstName LastName*/}
                                {
                                    `${msg.firstName} ${msg.lastName}`
                                }

                                {/* Timestamp */}
                                <time className="text-xs opacity-50">
                                    2 hours ago
                                </time>
                            </div>
                            <div className="chat-bubble">
                                {msg.text}
                            </div>
                            <div className="chat-footer opacity-50">
                                Seen
                            </div>
                        </div>
                    })
                }
            </div>

            {/* Input Box and Send Button */}
            <div className="p-5 border-t border-gray-600 flex items-center gap-2">
                <input
                    value={newMessage}
                    onChange={(event) => setNewMessage(event.target.value)}
                    className="flex-1 border border-gray-500 text-white rounded p-2"
                >
                </input>
                {/* Send Button */}
                <button
                    onClick={sendMessage}
                    className="btn btn-secondary"
                >
                    Send
                </button>
            </div>
        </div>
    )
}

export default Chat
