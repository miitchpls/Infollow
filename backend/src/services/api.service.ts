import { IgApiClient } from "instagram-private-api";

export class ApiService {
  static async getClient(seed: string): Promise<IgApiClient> {
    // Create new Instagram client instance.
    const client: IgApiClient = new IgApiClient();

    // Generate fake device information based on seed.
    client.state.generateDevice(seed);

    return client;
  }
}
