import {test as base,expect} from '../fixtures/baseFixture';
import fs from 'fs';
import {parse} from 'csv-parse/sync';


type regData = {
    firstName:string,
    lastName:string,
    telephone:string,
    password:string,
    subscribeNewsletter:string
}

//let registrationData:regData[]=JSON.parse(fs.readFileSync('./testdata/register.json','utf-8'));


type csvfixture={
    regData:regData[];
}

export const dataTest = base.extend<csvfixture>({

    regData:async ({},use)=>{
        let fileContent = fs.readFileSync('./data/register.csv','utf8');
        let registrationData:regData[]=parse(fileContent,{
        columns:true,
        skip_empty_lines:true,
        });
        await use(registrationData);
    }
});

export {expect};