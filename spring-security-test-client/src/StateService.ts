export class StateService {

    private URI: string = 'http://localhost:8090/terms';

    public constructor(private token: string| undefined, private updateTermsList: (s: string[]) => void) {}

    public getTerms(): void {
        if (this.token) {
            let h: Headers = new Headers();
            h.append('Authorization', 'Bearer ' + this.token);
            let r: Request = new Request(this.URI, { method: 'GET', headers: h});
            fetch(r)
              .then((res: Response) => res.status === 200 ? res.json() : Promise.reject("Didn't get anything"))
              .then((data: any) => this.updateTermsList(data));
        }
    }
    
    public addTerms(term: string): void {
        if (this.token) {
            let h: Headers = new Headers();
            h.append('Authorization', 'Bearer ' + this.token);
            let r: Request = new Request(this.URI + '/' + term, { method: 'POST', headers: h});
            fetch(r)
              .then((res: Response) => {
                  if (res.status !== 200) {
                    Promise.reject("Didn't work");
                  } 
              });
        }
    }

    public clearTerms(): void {
        if (this.token) {
            let h: Headers = new Headers();
            h.append('Authorization', 'Bearer ' + this.token);
            let r: Request = new Request(this.URI, { method: 'DELETE', headers: h});
            fetch(r)
            .then((res: Response) => {
                if (res.status !== 200) {
                  Promise.reject("Didn't work");
                } 
            });
        }
    }
}