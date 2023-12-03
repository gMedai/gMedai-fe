import httpRequest from "@/utils/httpRequest";

class BenhnaoService {

  async postLoadModelNao() {
    return httpRequest.post("/benhnao/benhnao-loadmodel");

  }
  async postChuandoanNao(datasend: any) {
    return httpRequest.post("/benhnao/benhnao-uploadfile",datasend);

  }
}

const benknaoService = new BenhnaoService();

export default benknaoService;
