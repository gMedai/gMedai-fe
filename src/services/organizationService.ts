import httpRequest from "@/utils/httpRequest";

class OrganizationService {
  async getChildren(id: string) {
    return httpRequest.get("/organization/" + id);
  }

  async getTree() {
    return httpRequest.get<any, any[], any>("/organization");
  }
}

const organizationService = new OrganizationService();

export default organizationService;
