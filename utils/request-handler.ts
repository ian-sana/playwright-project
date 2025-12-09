
export class RequestHandler {
    private baseUrl: string;
    private defaultHeaders: Record<string, string>;

    url(url: string) {

    }

    path(path: string) {

    }

    params(params: object) {

    }

    headers(headers: object) {

    }

    body(body: object) {

    }


    constructor(baseUrl: string, defaultHeaders: Record<string, string> = {}) {
        this.baseUrl = baseUrl;
        this.defaultHeaders = defaultHeaders;
    }
    async get(endpoint: string, headers: Record<string, string> = {}): Promise<Response> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'GET',
            headers: { ...this.defaultHeaders, ...headers }
        });
        return response;
    }
    async post(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<Response> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', ...this.defaultHeaders, ...headers },
            body: JSON.stringify(body)
        });
        return response;
    }
    async put(endpoint: string, body: any, headers: Record<string, string> = {}): Promise<Response> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', ...this.defaultHeaders, ...headers },
            body: JSON.stringify(body)
        });
        return response;
    }
    async delete(endpoint: string, headers: Record<string, string> = {}): Promise<Response> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            method: 'DELETE',
            headers: { ...this.defaultHeaders, ...headers }
        });
        return response;
    }
}