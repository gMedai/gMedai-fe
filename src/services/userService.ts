import httpRequest from "@/utils/httpRequest";

class UserService {
  async create(user: any) {
    const data = {
      fullName: user.firstName + " " + user.lastName,
      ...user,
    };

    return httpRequest.post("/user", data);
  }

  async update(user: any) {
    const data = {
      ...user,
      fullName: user.firstName + " " + user.lastName,
    };
    return httpRequest.patch("/user", data);
  }

  async delete(id: string) {
    return httpRequest.delete(`/user/${id}`);
  }
}

export const userService = new UserService();
