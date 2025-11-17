"use client"
import React, { useEffect, useState, useRef } from 'react';
import { Send, Phone, Video, MoreVertical, Search, Paperclip, Smile, Menu, X } from 'lucide-react';
import UserWrapper from '@/app/components/view/user';
import { useGetChatMessagesQuery, useGetStoresToChatQuery } from '@/app/redux/user/slices/chatSlice';
import { mySubstring, timeSince } from '@/app/utils/format';
import Link from 'next/link';
import { useChatData, useUserData } from '@/app/hooks/useData';
import Image from 'next/image';

const ChatApp = () => {
    const [selectedContact, setSelectedContact] = useState({});
    const [messageLog, setMessageLog] = useState({});
    const [sideBar, OpenSideBar] = useState(false)
    const [message, setMessage] = useState('');
    const [notSent, setNotSent] = useState([]);
    const messagesEndRef = useRef(null);

    const { userInfo } = useUserData()
    const { data, isLoading: storeListLoading, refetch: refetchStores } = useGetStoresToChatQuery({});
    const {
        socket,
        isSocketConnected,
        sendMessage,
        activeChats,
        markAsRead
    } = useChatData()

    const storeList = (data && data?.data) || {};
    const stores = storeList.chat || [];
    const empty = storeList.chat?.length === 0;
    const { id: chatId, branchId } = selectedContact
    const { data: storeChat, isLoading: loadingChat, refetch: refetchMessages } = useGetChatMessagesQuery({
        chatId,
        branchId: selectedContact.branchId,
        username: userInfo.username
    }, {
        skip: !chatId // Don't fetch if no chat is selected
    });

    // Scroll to bottom when messages change
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messageLog?.log]);

    // Initialize messageLog from API data
    useEffect(() => {
        if (storeChat?.data) {
            setMessageLog(storeChat.data);
        }
    }, [storeChat]);

    // Handle real-time updates from socket
    useEffect(() => {
        if (!chatId) return;

        const newUpdates = activeChats?.[chatId];

        if (newUpdates?.log) {
            console.log('Updating messages with:', newUpdates);
            setMessageLog(prev => ({
                ...prev,
                log: newUpdates.log
            }));
        } else if (newUpdates?.message?._id && messageLog?.log) {
            // If we receive a single message, append it
            setMessageLog(prev => {
                const existingIds = new Set(prev.log?.map(msg => msg._id) || []);
                // Only add if message doesn't already exist
                if (!existingIds.has(newUpdates.message._id)) {
                    return {
                        ...prev,
                        log: [...(prev.log || []), newUpdates.message]
                    };
                }
                return prev;
            });
        }
    }, [activeChats, chatId]);

    const handleSendMessage = async () => {
        if (!message.trim()) return;

        const tempMessage = {
            _id: `temp-${Date.now()}`,
            message: message,
            by: "customer",
            time: new Date(),
            feedback: {
                isSent: false,
                isDelivered: false,
                isSeen: false,
            },
            edited: { isEdited: false }
        };

        if (isSocketConnected) {
            // Add optimistic update immediately
            setMessageLog((prev) => ({
                ...prev,
                log: [...(prev.log || []), tempMessage]
            }));

            sendMessage(chatId, message, branchId);
        } else {
            try {
                const previousPending = JSON.parse(localStorage.getItem("pendingMessages") || "[]")
                localStorage.setItem("pendingMessages", JSON.stringify([
                    ...previousPending,
                    { chatId, message, branchId }
                ]))
            } catch (error) {
                console.error('Error saving pending message:', error);
            }

            // Add optimistic update for offline messages
            setMessageLog((prev) => ({
                ...prev,
                log: [...(prev.log || []), tempMessage]
            }));
        }
        setMessage("");
    };

    // Listen for socket events
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (data) => {
            console.log('Socket message event:', data);
            if (data && Array.isArray(data)) {
                setMessageLog((prev) => ({
                    ...prev,
                    log: data
                }));
                refetchStores();
            }
        };

        const handleMessageSent = (data) => {
            console.log('Message sent confirmation:', data);
            // Replace temporary message with confirmed message
            if (data?.message) {
                setMessageLog((prev) => {
                    const tempMessages = prev.log?.filter(msg => msg._id?.startsWith('temp-')) || [];
                    const realMessages = prev.log?.filter(msg => !msg._id?.startsWith('temp-')) || [];

                    // If there's a temp message, remove it and add the real one
                    if (tempMessages.length > 0) {
                        return {
                            ...prev,
                            log: [...realMessages, data.message]
                        };
                    }

                    // Otherwise just add the message if it doesn't exist
                    const existingIds = new Set(prev.log?.map(msg => msg._id) || []);
                    if (!existingIds.has(data.message._id)) {
                        return {
                            ...prev,
                            log: [...(prev.log || []), data.message]
                        };
                    }
                    return prev;
                });
            }
            refetchStores();
        };

        const handleNewMessage = (data) => {
            console.log('New message received:', data);
            // Update the chat with new message from other party
            if (data?.log) {
                setMessageLog((prev) => ({
                    ...prev,
                    log: data.log
                }));
            } else if (data?.lastMessage) {
                setMessageLog((prev) => {
                    const existingIds = new Set(prev.log?.map(msg => msg._id) || []);
                    if (!existingIds.has(data.lastMessage._id)) {
                        return {
                            ...prev,
                            log: [...(prev.log || []), data.lastMessage]
                        };
                    }
                    return prev;
                });
            }
            refetchStores();
        };

        socket.on("message", handleMessage);
        socket.on("messageSent", handleMessageSent);
        socket.on("newMessage", handleNewMessage);

        return () => {
            socket.off("message", handleMessage);
            socket.off("messageSent", handleMessageSent);
            socket.off("newMessage", handleNewMessage);
        };
    }, [socket, refetchStores]);

    const contacts = stores?.map((each) => ({
        id: each._id,
        name: each.branchDetails?.businessName,
        phone: each.branchDetails?.phone,
        shortName: mySubstring(each.branchDetails?.businessName, 17),
        myPic: each.customer?.profile_picture,
        role: 'Store',
        log: each.log,
        avatar: each.branchDetails?.profile_image,
        branchId: each.branchDetails?.branchId,
        lastMessage: each.lastMessage?.message || '',
        time: timeSince(each.lastMessage?.time),
        unread: each.storeUnread || 0,
        online: true
    })) || [];

    const opened = selectedContact;
    const messages = messageLog?.log?.map((each) => ({
        id: each._id,
        sender: each.by,
        text: each.message,
        time: timeSince(each.time)
    })) || [];

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <UserWrapper noFooter>
            <div className="flex h-[84vh] bg-gray-50">
                {/* Contacts Sidebar */}
                <div className={`w-full md:w-3/12 min-w-sm bg-white shadow-2xl md:shadow-none fixed md:sticky z-30 ${!chatId ? "flex" : !sideBar && "hidden"} h-[84vh] border-r border-gray-200 md:flex flex-col`}>
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
                            <button
                                onClick={() => OpenSideBar(!sideBar)}
                                className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors"
                            >
                                {sideBar && <X className="w-5 h-5 text-gray-600" />}
                            </button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search conversations..."
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Contacts List */}
                    <div className="flex-1 overflow-y-auto">
                        {storeListLoading ? (
                            <div className="flex items-center justify-center p-8">
                                <p className="text-gray-500">Loading conversations...</p>
                            </div>
                        ) : contacts.length === 0 ? (
                            <div className="flex items-center justify-center p-8">
                                <p className="text-gray-500">No conversations yet</p>
                            </div>
                        ) : (
                            contacts.map((contact) => (
                                <div
                                    key={contact.id}
                                    onClick={() => {
                                        setSelectedContact(contact);
                                        OpenSideBar(false);
                                    }}
                                    className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-all duration-200 ${chatId === contact.id
                                            ? 'bg-brand-50 border-brand-500'
                                            : 'border-transparent'
                                        }`}
                                >
                                    <div className="relative">
                                        <img
                                            src={contact.avatar}
                                            alt={contact.shortName}
                                            className="w-12 h-12 rounded-full object-cover"
                                        />
                                        {contact.online && (
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="ml-3 flex-1 min-w-0">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <p className="font-semibold text-gray-900 truncate">{contact.shortName}</p>
                                                <p className="text-xs text-brand-600 font-medium">{contact.role}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-500">{contact.time}</p>
                                                {contact.unread > 0 && (
                                                    <div className="mt-1 bg-brand-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                                                        {contact.unread}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate mt-1">{contact.lastMessage}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Chat Area */}
                {opened.id ? (
                    <div className="flex-1 flex flex-col">
                        {/* Chat Header */}
                        <div className="bg-white border-b border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="relative">
                                        <img
                                            src={selectedContact.avatar}
                                            alt={selectedContact.name}
                                            className="w-10 h-10 rounded-full object-cover"
                                        />
                                        {selectedContact.online && (
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        )}
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="font-semibold text-gray-900">{selectedContact.name}</h3>
                                        <p className="text-sm text-gray-500">
                                            {selectedContact.online ? 'Online' : 'Last seen 2h ago'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Link href={`tel:${selectedContact.phone}`} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                        <Phone className="w-5 h-5 text-gray-600" />
                                    </Link>
                                    <button
                                        onClick={() => OpenSideBar(!sideBar)}
                                        className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors"
                                    >
                                        {!sideBar ? <Menu className="w-5 h-5 text-gray-600" /> : <X className="w-5 h-5 text-gray-600" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                            {loadingChat ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">Loading messages...</p>
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="flex items-center justify-center h-full">
                                    <p className="text-gray-500">No messages yet. Start the conversation!</p>
                                </div>
                            ) : (
                                messages.map((msg) => {
                                    if (msg.sender === 'notification') {
                                        return (
                                            <div key={msg.id} className="flex justify-center">
                                                <div className="bg-brand-100 text-brand-800 px-4 py-2 rounded-full text-sm font-medium">
                                                    {msg.text}
                                                </div>
                                            </div>
                                        );
                                    }

                                    const isCustomer = msg.sender === 'store';
                                    return (
                                        <div key={msg.id} className={`flex ${isCustomer ? 'justify-start' : 'justify-end'}`}>
                                            <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                                                {isCustomer && (
                                                    <img
                                                        src={selectedContact.avatar}
                                                        alt="Store"
                                                        className="w-8 h-8 rounded-full object-cover"
                                                    />
                                                )}
                                                <div
                                                    className={`px-4 py-3 rounded-2xl ${isCustomer
                                                            ? 'bg-white text-gray-900 rounded-bl-sm'
                                                            : 'bg-brand-500 text-white rounded-br-sm'
                                                        } shadow-sm`}
                                                >
                                                    <p className="text-sm">{msg.text}</p>
                                                    <p
                                                        className={`text-xs mt-1 ${isCustomer ? 'text-gray-500' : 'text-brand-100'
                                                            }`}
                                                    >
                                                        {msg.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="bg-white border-t border-gray-200 p-4">
                            <div className="flex items-end space-x-3">
                                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                    <Paperclip className="w-5 h-5 text-gray-500" />
                                </button>
                                <div className="flex-1 relative">
                                    <textarea
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        rows="1"
                                        className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                                        style={{ minHeight: '48px', maxHeight: '120px' }}
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
                                        <Smile className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleSendMessage}
                                    className="p-3 bg-brand-500 hover:bg-brand-600 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    disabled={!message.trim()}
                                >
                                    <Send className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex w-full flex-col items-center justify-center">
                        <Image
                            src="/images/misc/startChat.png"
                            width={300}
                            height={200}
                            alt="Start chatting"
                            className="w-32 h-32"
                        />
                        <h4 className="mt-4 text-gray-600">Select a store to chat with</h4>
                    </div>
                )}
            </div>
        </UserWrapper>
    );
};

export default ChatApp;