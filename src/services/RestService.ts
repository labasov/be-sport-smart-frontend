import axios, { AxiosInstance } from 'axios';

export interface QueryOptions {
  top?: number;
  skip?: number;
}

export interface Entity {
  id?: string;
  created?: Date;
  updated?: Date
}

export abstract class RestServiceBase {
  protected client: AxiosInstance;

  public constructor(baseUrl: string, baseRoute: string) {
    this.client = axios.create({
      baseURL: `${baseUrl}${baseRoute}`
    });
  }

  public async post<T>(url: string, data?: object): Promise<T> {
    const response = await this.client.request<T>({
      method: 'POST',
      url,
      data: data || {},
      withCredentials: true
    });

    return response.data;
  }
}

export abstract class RestService<T extends Entity> extends RestServiceBase {

  public constructor(baseUrl: string, baseRoute: string) {
    super(baseUrl, baseRoute);
  }

  public async getList(queryOptions?: QueryOptions): Promise<T[]> {
    const response = await this.client.request<T[]>({
      method: 'GET',
      data: queryOptions
    });

    return response.data;
  }

  public async getEntity(id: string): Promise<T> {
    const response = await this.client.request<T>({
      method: 'GET',
      url: id
    });

    return response.data
  }

  public async saveEntity(entity: T): Promise<T> {
    return entity.id
      ? await this.putEntity(entity)
      : await this.postEntity(entity);
  }

  public async deleteEntity(id: string): Promise<void> {
    await this.client.request<void>({
      method: 'DELETE',
      url: id
    });
  }

  private async postEntity(entity: T): Promise<T> {
    const response = await this.client.request<T>({
      method: 'POST',
      data: entity
    });

    return response.data;
  }

  private async putEntity(entity: T): Promise<T> {
    const response = await this.client.request<T>({
      method: 'PUT',
      url: entity.id,
      data: entity
    });

    return response.data;
  }

  public async patchEntity(id: string, entity: Partial<T>): Promise<T> {
    const response = await this.client.request<T>({
      method: 'PATCH',
      url: id,
      data: entity
    });

    return response.data;
  }
}
