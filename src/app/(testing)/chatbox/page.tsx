'use client';
import React, { useState } from 'react';

const Page = () => {
    const [messages, setMessages] = useState([
        { text: 'Hi, how are you?', sender: 'other' },
        { text: "I'm good, thank you! How about you?", sender: 'user' },
        { text: "I'm doing great!", sender: 'other' },
    ]);

    const [inputValue, setInputValue] = useState('');

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            setMessages([...messages, { text: inputValue, sender: 'user' }]);
            setInputValue('');
        }
    };

    return (
        <div className="flex h-screen flex-col bg-gray-100">
            {/* Chat Header */}
            <div className="bg-green-500 p-4 text-white">
                <h1 className="text-xl">Chat Room</h1>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${
                            message.sender === 'user' ? 'justify-end' : ''
                        }`}
                    >
                        <div
                            className={`max-w-xs rounded-lg p-3 shadow-md ${
                                message.sender === 'user'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-white'
                            }`}
                        >
                            <p>{message.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Chat Input */}
            <div className="flex items-center bg-white p-4">
                <input
                    type="text"
                    className="flex-1 rounded-lg border border-gray-300 p-2"
                    placeholder="Type a message"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                />
                <button
                    className="ml-4 rounded-lg bg-green-500 px-4 py-2 text-white"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Page;
