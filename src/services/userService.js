import api from "@/lib/axios";

const userService = {
  getAllUsers: async () => {
    try {
      const res = await api.get(`/users/`);
      return res.data;
    } catch (error) {
      console.error("Lỗi getAllUsers tại userService: ", error);
      throw error;
    }
  },

  login: async (user) => {
    const { username } = user;

    try {
      const res = await api.get(`/users?username=${username}`);
      return res.data;
    } catch (error) {
      console.error("Lỗi login tại userService: ", error);
      throw error;
    }
  },

  register: async (newUser) => {
    const { name, username, password, role } = newUser;

    try {
      const res = await api.post(`/users/`, {
        name,
        username,
        password,
        role,
      });
      return res.data;
    } catch (error) {
      console.error("Lỗi register tại userService: ", error);
      throw error;
    }
  },
};

export default userService;
