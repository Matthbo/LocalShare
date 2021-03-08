const BASE_URL = "/api"

export function create(): Promise<Session> {
    return fetch(BASE_URL + "/session", { method: "POST" }).then(res => res.json());
}

export function getAll(): Promise<Session[]>{
    return fetch(BASE_URL + "/session").then(res => res.json());
}

export function get(code: string): Promise<Session> {
    return fetch(BASE_URL + `/session/${code}`).then(res => {
        if(!res.ok)
            throw res.status;

        return res.json();
    });
}

export function update(code: string, body: Session) {
    return fetch(BASE_URL + `/session/${code}`, { method: "PUT", body: JSON.stringify(body), headers: { "Content-type": "application/json" } });
}

export function remove(code: string) {
    return fetch(BASE_URL + `/session/${code}`, { method: "DELETE" });
}

export type Session = {
    code: string,
    isOpen: boolean
}
