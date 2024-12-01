import { authInstance } from "./base";

export const chatbotApi = {
    getResponse: (message: string) =>
        authInstance.post(`/chat`, { message: message }),
};
