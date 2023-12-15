import httpRequest from "@/utils/httpRequest";

class BenhkhopgoiService {

  async postLoadModelKhopGoi() {
    return httpRequest.post("load-model/benhkhopgoi-loadmodel");

  }
  async postChuandoanKhopGoi(datasend: any) {
    return httpRequest.post("/benhkhopgoi/benhkhopgoi-uploadfile",datasend);

  }
}

const benkhopgoiService = new BenhkhopgoiService();

export default benkhopgoiService;
