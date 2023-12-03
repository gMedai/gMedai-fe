import httpRequest from "@/utils/httpRequest";

class RoleService {
  async getAll() {
    return httpRequest.get<any, any[], any>("/role");
  }
}

const roleService = new RoleService();

export default roleService;
