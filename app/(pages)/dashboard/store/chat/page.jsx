"use client"
import React, { useEffect, useState } from 'react';
import { Send, Phone, Search, Paperclip, Smile, Menu, X } from 'lucide-react';
import { useGetChatMessagesQuery } from '@/app/redux/user/slices/chatSlice';
import { mySubstring, timeSince } from '@/app/utils/format';
import Link from 'next/link';
import { useChatData, useUserData } from '@/app/hooks/useData';
import Image from 'next/image';
import { useGetUsersToChatQuery } from '@/app/redux/business/slices/chatSlice';
import StoreLeftSideBar from '@/app/components/view/store/LeftSideBar';

const ChatApp = () => {
    const [selectedContact, setSelectedContact] = useState({});
    const [messageLog, setMessageLog] = useState({});
    const [sideBar, OpenSideBar] = useState(false)
    const [message, setMessage] = useState('');
    const [notSent, setNotSent] = useState([]);
    const { userInfo } = useUserData()
    const { data, isLoading: storeListLoading, refetch: refetchStores } = useGetUsersToChatQuery({});
    const {
        socket,
        isSocketConnected,
        sendMessage,
        activeChats,
        markAsRead
    } = useChatData("store")

    const storeList = (data && data?.data) || {};
    const stores = storeList.chat || [];
    const empty = storeList.chat?.length === 0;
    const { id: chatId, branchId } = selectedContact
    const { data: storeChat, isLoading: loadingChat, refetch: refetchMessages } = useGetChatMessagesQuery({ chatId, branchId: selectedContact.branchId, username: userInfo.username });

    useEffect(() => {
        setMessageLog(storeChat?.data || {});
    }, [storeChat]);

    useEffect(() => {
        const newUpdates = activeChats?.[chatId]
        console.log({ newUpdates })
        setMessageLog((prev) => {
            if (prev.log && newUpdates.message?._id) {
                const newLog = [...prev.log, newUpdates.message]
                return ({ ...prev, log: newLog })
            }
        })
    }, [activeChats?.[chatId]])


    const handleSendMessage = async () => {
        if (isSocketConnected) {
            sendMessage(chatId, message, branchId);
        } else {
            try {
                const previousPending = JSON.parse(localStorage.getItem("pendingMessages") || "[]")
                localStorage.setItem("pendingMessages", JSON.stringify([...previousPending, { chatId, message, branchId }]))
            } catch (error) {
            }

            setNotSent((prev) => {
                const newLog = [
                    ...prev,
                    {
                        feedback: {
                            isSent: false,
                            isDelivered: false,
                            isSeen: false,
                        },
                        time: new Date(),
                        by: "store",
                        edited: { isEdited: false },
                        message,
                    },
                ];
                return newLog;
            })
        }
        setMessage("");
    };

    const contacts = stores?.map((each) => ({
        id: each._id,
        name: each.customer?.fullname,
        phone: each.branchDetails?.phone,
        username: mySubstring(each.customer?.fullname, 17),
        myPic: each.customer.profile_picture,
        role: 'customer',
        log: each.log,
        avatar: each.branchDetails?.profile_image,
        branchId: each.branchDetails?.branchId,
        lastMessage: each.lastMessage.message,
        time: timeSince(each.lastMessage.time),
        unread: each.storeUnread,
        online: true
    }))


    const opened = selectedContact
    const messages = messageLog?.log?.map((each) => (
        { id: each._id, sender: each.by, text: each.message, time: timeSince(each.time) }
    )) || []

    // const handleSendMessage = () => {
    //     if (message.trim()) {
    //         const message = {
    //             id: messages.length + 1,
    //             sender: 'seller',
    //             text: message,
    //             time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    //             type: 'message'
    //         };
    //         setMessage('');
    //     }
    // };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    console.log({ selectedContact, messageLog })

    return (
        <StoreLeftSideBar
            hidebreadCrumb
            subListBar={false}
            path={{ sidebar: "chat" }}
            noFooter
        >
            <div className="flex h-[84vh] bg-gray-50">
                {/* Contacts Sidebar */}
                <div className={`w-full md:w-80 bg-white shadow-2xl md:shadow-none fixed md:sticky z-30 ${!chatId ? "flex" : !sideBar && "hidden"} h-[84vh] border-r border-gray-200 md:flex flex-col`}>
                    {/* Header */}
                    <div className="p-6 border-b border-gray-100">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
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
                        {contacts.map((contact, index) => (
                            <div
                                key={contact.id}
                                onClick={() => setSelectedContact(contact)}
                                className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer border-l-4 transition-all duration-200 ${chatId === contact.id
                                    ? 'bg-brand-50 border-brand-500'
                                    : 'border-transparent'
                                    }`}
                            >
                                <div className="relative">
                                    <img
                                        src={contact.avatar}
                                        alt={contact.username}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    {contact.online && (
                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                                    )}
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="font-semibold text-gray-900 truncate">{contact.username}</p>
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
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                {opened.id ? <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="bg-white border-b border-gray-200 p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <div className="relative">
                                    <imgselectedContact
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
                                <button onClick={() => OpenSideBar(!sideBar)} className="p-2 md:hidden hover:bg-gray-100 rounded-full transition-colors">
                                    {!sideBar ? <Menu className="w-5 h-5 text-gray-600" /> : <X className="w-5 h-5 text-gray-600" />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
                        {messages.map((msg) => {
                            if (msg.sender === 'notification') {
                                return (
                                    <div key={msg.id} className="flex justify-center">
                                        <div className="bg-brand-100 text-brand-800 px-4 py-2 rounded-full text-sm font-medium">
                                            {msg.text}
                                        </div>
                                    </div>
                                );
                            }

                            const isStore = msg.sender === 'customer';
                            return (
                                <div key={msg.id} className={`flex ${isStore ? 'justify-start' : 'justify-end'}`}>
                                    <div className="flex items-end space-x-2 max-w-xs lg:max-w-md">
                                        {isStore && (
                                            <img
                                                src={selectedContact.avatar}
                                                alt="Customer"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        )}
                                        <div
                                            className={`px-4 py-3 rounded-2xl ${isStore
                                                ? 'bg-white text-gray-900 rounded-bl-sm'
                                                : 'bg-brand-500 text-white rounded-br-sm'
                                                } shadow-sm`}
                                        >
                                            <p className="text-sm">{msg.text}</p>
                                            <p
                                                className={`text-xs mt-1 ${isStore ? 'text-gray-500' : 'text-brand-100'
                                                    }`}
                                            >
                                                {msg.time}
                                            </p>
                                        </div>
                                        {!isStore && (
                                            <img
                                                src={selectedContact.myPic}
                                                alt="Customer"
                                                className="w-8 h-8 rounded-full object-cover"
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
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
                </div> : <div className="flex w-full flex-col items-center justify-center">
                    <Image
                        src="/images/misc/startChat.png"
                        width={300}
                        height={200}
                        alt="image"
                        className="w-32 h-32"
                    />
                    <h4>Select a store to chat with</h4>
                </div>}
            </div>
        </StoreLeftSideBar>
    );
};

export default ChatApp;