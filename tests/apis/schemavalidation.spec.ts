import {test,expect} from '@playwright/test';
import Ajv from 'ajv';
import fs from 'fs';
import path from 'path';

const TOKEN = '9539ec98bf581fcff919b8100caaa42d6cf14983af9871588a72d5668096520b';

// set up Ajv:
const ajv = new Ajv();

// load the schema files:

const getUsersSchema = JSON.parse(fs.readFileSync(path.resolve('./schemas/getuserschema.json'),'utf-8'));
test('GET - fetch all users', async ({request})=>{


    const response = await request.get('https://gorest.co.in/public/v2/users',{
        headers:{
            Authorization:`Bearer ${TOKEN}`
        }

    });
    expect(response.status()).toBe(200);
    const data = await response.json();

    // validate the json schema:
    const validate = ajv.compile(getUsersSchema);
    const isValid = validate(data);

    if(!isValid){
        console.log('schema errors: ',validate.errors);
    }

    expect(isValid).toBe(true);

});