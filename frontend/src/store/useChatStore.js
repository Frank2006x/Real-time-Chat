import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessagesLoading: false,
  isUploading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
      console.log(res.data);
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    console.log(userId);
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      console.log(res.data);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data.message);
      console.log(err);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    set({ isUploading: true });

    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data] });
    } catch (err) {
      toast.error(err.response.data.message);
    } finally {
      set({ isUploading: false });
    }
  },
  setSelectedUser: (selectedUser) => {
    set({ selectedUser: selectedUser });
    console.log(selectedUser);
  },
}));
