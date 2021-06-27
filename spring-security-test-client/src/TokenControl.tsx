import { ChangeEvent, MouseEvent } from "react";

export const TokenControl =
({token, loginFunction, logoutFunction}: 
    {token: string | undefined, 
        loginFunction: (u:string, p: string) => void, 
        logoutFunction: () => void }) : React.ReactElement => {

    let username: string | undefined = undefined;
    let password: string | undefined = undefined;

    const setPassword = (evt: ChangeEvent) => password = (evt.target as HTMLInputElement).value;
    const setUsername = (evt: ChangeEvent) => username = (evt.target as HTMLInputElement).value;

    const login = ():void => {
        if (username && password) {
            loginFunction (username, password);
        }
    }

    const decodeToken = (): string => {
        if (token) {
            return token.split('.').map((enc:string, idx: number, origArr: string[]) =>  idx < origArr.length - 1 ? atob(enc) : enc).join('\n'); 
        } else {
            return '';
        }

    }

    return ( 
        <>
            <label>User name: </label><input type="text" onChange={ setUsername }></input><br/>
            <label>Password: </label><input type="password" onChange={ setPassword }></input><br/>
            { token ?
                <><button onClick={(e: MouseEvent) => logoutFunction()}>Logout</button><br/></>
                :
                <><button onClick={(e: MouseEvent) => login()}>Login</button><br/></>
            }

            <textarea cols={ 80 } rows={ 150 } value={ decodeToken() } readOnly={true}></textarea>
        </>
    );
}