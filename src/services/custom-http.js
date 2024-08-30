import {Auth} from "./auth";

export class CustomHttp {
    static async request(url, method = "GET", body = null) {

        const params = {
            method: method,
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json',
            }
        };

        const token = localStorage.getItem(Auth.accessTokenKey);

        if (token) {
            params.headers['x-auth-token'] = token;
        }

        if (body) {
            params.body = JSON.stringify(body);
        }

        try {
            const response = await fetch(url, params);

            if (response.status < 200 || response.status >= 300) {
                if (response.status === 401) {
                    const result = await Auth.processUnauthorizedResponse();
                    if (result) {
                        return await this.request(url, method, body);
                    } else {
                        return null;
                    }
                }

                const errorText = await response.text();
                const errorMessage = errorText || response.statusText || 'Ошибка запроса';
                throw new Error(`Ошибка ${response.status}: ${errorMessage}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Ошибка при выполнении запроса:', error);
            throw error;
        }

    }
}