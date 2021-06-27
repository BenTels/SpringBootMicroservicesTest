const URI: string = 'http://keycloak:8080/auth/realms/SpringBootKeycloak/protocol/openid-connect/token';
const auth: string = btoa('test-app:09d4cc28-9230-4221-b467-f100422da2fa');

export function loginFunction(onSuccess: any, u: string, p: string): void {
    let headers: Headers = new Headers();
    headers.append('Authorization', 'Basic ' + auth);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Accept', '*/*');

    let body : string = 'username=' + u +
                        '&password=' + p +
                        '&grant_type=password';

    let req: Request = new Request(URI,
            {
                method : 'POST',
                headers : headers,
                body: body
            }
        );
    fetch(req)
    .then((res: Response) => res.json())
    .then((data: any) => onSuccess(data.access_token));
}