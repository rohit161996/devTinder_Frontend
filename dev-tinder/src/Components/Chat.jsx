import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import { useSelector } from 'react-redux';

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
            userId,
            targetUserId,
            text: newMessage
        });
        setNewMessage("");
    }

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
            ({ firstName, text }) => {
                console.log(firstName + " : " + text);
                setMessages((messages) => [...messages, { firstName, text }]);
            }
        )

        return () => {
            socket.disconnect();
        }

    }, [userId, targetUserId]);

    return (
        <div className="border border-gray-600 w-3/4 mx-auto m-5 h-[70vh] flex flex-col">
            {/* Heading with Chat written in it. */}
            <h1 className="p-5 border-5 border-gray-600">
                Chat
            </h1>

            {/* Message Displaying Window */}
            <div className="flex-1 overflow-scroll p-5">
                {/* Display Messages */}
                {
                    messages.map((msg, index) => {
                        return <div key={index} className="chat chat-start">
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">2 hours ago</time>
                            </div>
                            <div className="chat-bubble">
                                {msg.text}
                            </div>
                            <div className="chat-footer opacity-50">Seen</div>
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
