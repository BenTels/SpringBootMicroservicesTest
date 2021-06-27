import React, { ChangeEvent, MouseEvent, useState } from "react";
import { StateService } from "./StateService";

export const StateManipulation =
    ({ termList, stateService }: { termList: string[], stateService: StateService }): React.ReactElement => {

        const [newTerm, updateTerm]: [string, React.Dispatch<React.SetStateAction<string>>] = useState('');

        const changeTerm = (e: ChangeEvent) => updateTerm((e.target as HTMLInputElement).value);

        return (
            <>
                <button onClick={ (evt:MouseEvent) => stateService.getTerms() }>Get latest state</button>
                <ul>
                    {termList.map((term: string, idx: number) => <li key={idx}>{term}</li>)}
                </ul>
                <div>
                    <label>Add term: </label><input type="text" onChange={changeTerm} value={newTerm} />
                    { newTerm && newTerm !== '' ? <button onClick={ (e: MouseEvent) => stateService.addTerms(newTerm) }>Post new term</button> : <></> }
                </div>
                <button onClick={(e: MouseEvent) => stateService.clearTerms() }>Clear terms</button>
            </>
        );
    }