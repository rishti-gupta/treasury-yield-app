export const baseUrl = import.meta.env.VITE_API_GATEWAY_URL;

export class StatusError extends Error {
  constructor(public status: number, message?: string) {
    super(message);
  }
}
