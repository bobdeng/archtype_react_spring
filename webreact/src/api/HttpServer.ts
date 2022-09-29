import axios, {AxiosRequestConfig} from "axios";
import {NewCommodityForm} from "@/api/CommodityForms";
import {NewPromotionForm} from "@/api/NewPromotionForm";

const config: AxiosRequestConfig = {
  validateStatus: () => true
}

export async function ajax(fun: any) {
  const response = await fun();
  if (response.status === 200) {
    return Promise.resolve(response.data);
  }
  if (!response.data) {
    return Promise.reject(response.status)
  }
  if (Array.isArray(response.data)) {
    return Promise.reject(response.data.map((error: any) => error.error).join("；"))
  }
  return Promise.reject(response.data)
}

export interface Profile {
  name: string,
  id?: number
}

export const server = {
  async getSession(): Promise<Profile> {
    return await ajax(() => axios.get("/api/1.0/session", config))
  },
  async listPermissions(): Promise<string[]> {
    return await ajax(() => axios.get("/api/1.0/permissions", config))
  }
}