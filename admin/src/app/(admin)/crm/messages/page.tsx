'use client'
import React, { useState, useRef, useEffect } from 'react';

interface User {
    name: string;
    avatar: string;
    isOnline: boolean;
    unreadCount?: number;
}

interface Message {
    id: number;
    sender: User;
    content: string;
    timestamp: string;
    isOwn: boolean;
}

const ChatCard: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Mock current user data
    const currentUser: User = {
        name: "You",
        avatar: "https://lh3.googleusercontent.com/a/ACg8ocLRoq7AfC8ZDBmOeyKDmMDamHjilHFkvUn3c9omKjsQPuRA0goH=s288-c-no",
        isOnline: true
    };

    // Mock contacts data
    const [contacts] = useState<User[]>([
        {
            name: "Vanessa Tucker",
            avatar: "https://picsum.photos/200",
            isOnline: true,
            unreadCount: 5
        },
        {
            name: "William Harris",
            avatar: "https://picsum.photos/200",
            isOnline: true,
            unreadCount: 2
        },
        {
            name: "Sharon Lessman",
            avatar: "https://picsum.photos/200",
            isOnline: true
        },
        {
            name: "Christina Mason",
            avatar: "https://picsum.photos/200",
            isOnline: false
        },
        {
            name: "Fiona Green",
            avatar: "https://picsum.photos/200",
            isOnline: false
        }
    ]);

    // Mock messages data
    const [messages] = useState<Message[]>([
        {
            id: 1,
            sender: currentUser,
            content: "Hey, how are you?",
            timestamp: "2:33 am",
            isOwn: true
        },
        {
            id: 2,
            sender: contacts[2], // Sharon Lessman
            content: "I'm good, thanks! How about you?",
            timestamp: "2:34 am",
            isOwn: false
        },
        {
            id: 3,
            sender: currentUser,
            content: "Doing well, just working on some new features.",
            timestamp: "2:35 am",
            isOwn: true
        },
        {
            id: 4,
            sender: contacts[2], // Sharon Lessman
            content: "That sounds interesting! What kind of features are you working on?",
            timestamp: "2:36 am",
            isOwn: false
        }
    ]);

    // Function to scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Scroll to bottom when messages change
    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Active chat is the first contact by default
    const [activeChat, setActiveChat] = useState<User>(contacts[2]);

    // Filter contacts based on search query
    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Handle sending new message
    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const newMsg: Message = {
                id: messages.length + 1,
                sender: currentUser,
                content: newMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                isOwn: true
            };
            messages.push(newMsg);
            setNewMessage('');
            scrollToBottom();
        }
    };

    // Handle pressing enter to send message
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSendMessage();
        }
    };

    return (
        <div className="card h-100">
            <div className="card-body h-100 p-0">
                <div className="row g-0 h-100">
                    {/* Contacts Sidebar */}
                    <div className="col-12 col-lg-5 col-xl-3 border-end list-group h-100 overflow-auto">
                        <div className="px-4 d-none d-md-block">
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1">
                                    <input
                                        type="text"
                                        className="form-control my-3"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        {filteredContacts.map((contact, index) => (
                            <a
                                key={index}
                                href="#"
                                className={`list-group-item list-group-item-action border-0 ${activeChat.name === contact.name ? 'active' : ''}`}
                                onClick={() => setActiveChat(contact)}
                            >
                                {contact.unreadCount && (
                                    <div className="badge bg-success float-end">{contact.unreadCount}</div>
                                )}
                                <div className="d-flex align-items-start">
                                    <img
                                        src={contact.avatar}
                                        className="rounded-circle me-1"
                                        alt={contact.name}
                                        width="40"
                                        height="40"
                                    />
                                    <div className="flex-grow-1 ms-3">
                                        {contact.name}
                                        <div className="small">
                                            <span className={`fas fa-circle chat-${contact.isOnline ? 'online' : 'offline'}`}></span>
                                            {' '}{contact.isOnline ? 'Online' : 'Offline'}
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}

                        <hr className="d-block d-lg-none mt-1 mb-0" />
                    </div>

                    {/* Chat Area */}
                    <div className="col-12 col-lg-7 col-xl-9 d-flex flex-column h-100">
                        {/* Chat Header */}
                        <div className="py-2 px-4 border-bottom d-none d-lg-block">
                            <div className="d-flex align-items-center py-1">
                                <div className="position-relative">
                                    <img
                                        src={activeChat.avatar}
                                        className="rounded-circle me-1"
                                        alt={activeChat.name}
                                        width="40"
                                        height="40"
                                    />
                                </div>
                                <div className="flex-grow-1 ps-3">
                                    <strong>{activeChat.name}</strong>
                                    <div className="text-muted small"><em>Typing...</em></div>
                                </div>
                                <div>
                                    <button className="btn btn-primary btn-lg me-1 px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-phone feather-lg">
                                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                                        </svg>
                                    </button>
                                    <button className="btn btn-info btn-lg me-1 px-3 d-none d-md-inline-block">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-video feather-lg">
                                            <polygon points="23 7 16 12 23 17 23 7"></polygon>
                                            <rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect>
                                        </svg>
                                    </button>
                                    <button className="btn btn-light border btn-lg px-3">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal feather-lg">
                                            <circle cx="12" cy="12" r="1"></circle>
                                            <circle cx="19" cy="12" r="1"></circle>
                                            <circle cx="5" cy="12" r="1"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div className="position-relative flex-grow-1 overflow-auto">
                            <div className="chat-messages p-4" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                                {messages.map((message, index) => (
                                    <div key={index} className={`chat-message-${message.isOwn ? 'right' : 'left'} pb-4`}>
                                        <div>
                                            <img
                                                src={message.sender.avatar}
                                                className="rounded-circle me-1"
                                                alt={message.sender.name}
                                                width="40"
                                                height="40"
                                            />
                                            <div className="text-muted small text-nowrap mt-2">{message.timestamp}</div>
                                        </div>
                                        <div className={`flex-shrink-1 bg-light rounded py-2 px-3 ${message.isOwn ? 'me-3' : 'ms-3'}`} style={{ maxWidth: '80%' }}>
                                            <div className="font-weight-bold mb-1">{message.isOwn ? 'You' : message.sender.name}</div>
                                            {message.content}
                                        </div>
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </div>

                        {/* Chat Input */}
                        <div className="flex-grow-0 py-3 px-4 border-top">
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Type your message"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                />
                                <button
                                    className="btn btn-primary"
                                    onClick={handleSendMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatCard; 