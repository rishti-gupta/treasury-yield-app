import { baseUrl, StatusError } from "./utils";
import { type YieldEntry } from "../utils";

class YieldsApi {
  private readonly baseUrl: string;

  constructor() {
    if (!baseUrl) {
      throw new Error("baseUrl is required");
    }
    this.baseUrl = baseUrl;
  }

  async getYieldsData(): Promise<YieldEntry[] | undefined> {
    const url = `${this.baseUrl}/v1/yields`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new StatusError(response.status, response.statusText);
    }

    return await response.json();
  }
}

const _yieldsApi = new YieldsApi();
export { _yieldsApi as YieldsApi };
