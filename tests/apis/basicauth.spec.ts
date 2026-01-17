import {test,expect} from '@playwright/test';

test('basic auth test',async ({request})=>{

    const username = 'admin';
    const password = 'admin';

    const credentials = Buffer.from(`${username}:${password}`).toString('base64');

    const response = await request.get('https://the-internet.herokuapp.com/basic_auth',{

        headers:{
            'Authorization':`Basic ${credentials}`
        }
    }); 

    expect(response.status()).toBe(200);
    const body = await response.text();
    console.log(body);
});

test('basic auth test with credentials in playwright config',async ({request})=>{


    const response = await request.get('https://the-internet.herokuapp.com/basic_auth'); 

    expect(response.status()).toBe(200);
    const body = await response.text();
    console.log(body);
});