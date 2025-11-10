"use client";
import { createContext, useCallback, useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { isAuthenticated } from "../redux/user/api/axiosBaseQuery";

const defaultProvider = {
    socket: null,
    isSocketConnected: false,
    activeChats: {},

    sendMessage: () => { },
    joinChatRoom: () => { },
    createChatRoom: () => { },
    markAsRead: () => { },
    startTyping: () => { },
    stopTyping: () => { },
};

const ChatContext = createContext(defaultProvider);

const ChatDataProvider = ({ children, server, role }) => {
    const [socket, setSocket] = useState(null);
    const [isSocketConnected, setIsSocketConnected] = useState(false);
    const [activeChats, setActiveChats] = useState({});

    // Use ref to prevent multiple socket connections
    const socketRef = useRef(null);
    const reconnectAttempts = useRef(0);
    const maxReconnectAttempts = 5;


    // Socket methods
    const sendMessage = useCallback((chatId, message, branchId) => {
        console.log("hereeeeeeeeeeeee-->")
        if (socket && isSocketConnected) {
            const messageData = {
                chatId,
                message,
                by: role,
                branchId,
                timestamp: new Date().toISOString()
            };
            socket.emit('sendMessage', messageData);
        } else {
            console.error('Socket not connected');
        }
    }, [socket, isSocketConnected]);

    const joinChatRoom = useCallback((chatId) => {
        if (socket && isSocketConnected) {
            socket.emit('joinRoom', { chatId, role: role });
        }
    }, [socket, isSocketConnected]);

    const createChatRoom = useCallback((branchId) => {
        if (socket && isSocketConnected) {
            socket.emit('createChatRoom', { branchId });
        }
    }, [socket, isSocketConnected]);

    const markAsRead = useCallback((chatId) => {
        if (socket && isSocketConnected) {
            socket.emit('markAsRead', { chatId, by: role });
        }
    }, [socket, isSocketConnected]);

    const startTyping = useCallback((chatId) => {
        if (socket && isSocketConnected) {
            socket.emit('typing', { chatId });
        }
    }, [socket, isSocketConnected]);

    const stopTyping = useCallback((chatId) => {
        if (socket && isSocketConnected) {
            socket.emit('stopTyping', { chatId });
        }
    }, [socket, isSocketConnected]);


    // Socket setup with proper cleanup and error handling
    useEffect(() => {
        const setupSocket = async () => {
            try {
                // Prevent multiple connections
                if (socketRef.current?.connected) {
                    return;
                }

                const token = await localStorage.getItem("user_token");
                if (!token) {
                    console.log("No user token found");
                    return;
                }

                // Close existing socket if any
                if (socketRef.current) {
                    socketRef.current.disconnect();
                }

                // Create new socket connection
                const newSocket = io(server, {
                    transports: ["websocket"],
                    forceNew: true,
                    reconnection: true,
                    reconnectionAttempts: maxReconnectAttempts,
                    reconnectionDelay: 1000,
                    timeout: 10000,
                    query: {
                        token: token,
                        by: "user_token",
                    },
                });

                socketRef.current = newSocket;
                setSocket(newSocket);

                // Connection events
                newSocket.on("connect", async () => {
                    setIsSocketConnected(true);
                    reconnectAttempts.current = 0;

                    // const previousPending = JSON.parse(localStorage.getItem("pendingMessages") || "[]")
                    // await previousPending?.map((each) => sendMessage(each?.chatId, each.message, each.branchId))
                    // localStorage.setItem("pendingMessages", "[]")
                    newSocket.emit("registerUser", "user");
                });

                newSocket.on("disconnect", (reason) => {
                    console.log("Socket disconnected:", reason);
                    setIsSocketConnected(false);
                });

                newSocket.on("connect_error", (error) => {
                    console.error("Socket connection error:", error);
                    setIsSocketConnected(false);
                    reconnectAttempts.current++;
                });

                // Registration confirmation
                newSocket.on("userRegistered", (data) => {
                    console.log("User registered successfully:", data);
                });

                // Room events
                newSocket.on("roomJoined", ({ room }) => {
                    console.log(`Successfully joined room: ${room}`);
                });

                newSocket.on("chatRoomCreated", ({ chatId, room }) => {
                    console.log(`Chat room created: ${chatId}`);
                });

                // Message events
                newSocket.on("newMessage", (data) => {
                    console.log("New message received:", data);
                    setActiveChats(prev => ({
                        ...prev,
                        [data.chatId]: data
                    }));

                    // You can also trigger a notification here
                    // or update your chat list in Redux
                });

                newSocket.on("messageSent", (data) => {
                    // console.log("Message sent confirmation:", data);
                    // Update local chat state to show message as sent
                    setActiveChats(prev => ({
                        ...prev,
                        [data.chatId]: data
                    }));
                });

                newSocket.on("markedAsRead", ({ chatId }) => {
                    console.log(`Messages marked as read in chat: ${chatId}`);
                });

                // Typing events
                newSocket.on("userTyping", ({ chatId, username, isTyping }) => {
                    console.log(`${username} is ${isTyping ? 'typing' : 'stopped typing'} in ${chatId}`);
                    // Handle typing indicators in your UI
                });

                // Notification events
                newSocket.on("notify", (data) => {
                    console.log("New notification:", data);
                    // setNotification((prev: any) => [data, ...prev]);
                });

                // Error events
                newSocket.on("error", (error) => {
                    console.error("Socket error:", error);
                });

            } catch (error) {
                console.error("Error setting up socket:", error);
            }
        };

        // Only setup socket if user is authenticated
        (async () => {
            const authenticated = await isAuthenticated();
            if (authenticated) {
                setupSocket();
            }
        })();

        // Cleanup function
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
                setIsSocketConnected(false);
                console.log("Socket disconnected and cleaned up");
            }
        };
    }, []);


    return (
        <ChatContext.Provider
            value={{
                socket,
                isSocketConnected,
                activeChats,

                // function
                sendMessage,
                joinChatRoom,
                createChatRoom,
                markAsRead,
                startTyping,
                stopTyping,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export { ChatContext, ChatDataProvider };