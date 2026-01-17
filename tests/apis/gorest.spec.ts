import {test,expect} from '@playwright/test';

const TOKEN = '9539ec98bf581fcff919b8100caaa42d6cf14983af9871588a72d5668096520b';


test('GET - fetch all users', async ({request})=>{


    const response = await request.get('https://gorest.co.in/public/v2/users',{
        headers:{
            Authorization:`Bearer ${TOKEN}`
        }

    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

test('GET - fetch single user', async ({request})=>{


    const response = await request.get('https://gorest.co.in/public/v2/users/8333304',{
        headers:{
            Authorization:`Bearer ${TOKEN}`
        }

    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

test('POST - create a user', async({request})=>{

    const requstBody = {
        name:'PW Test User',
        email:`pwtest${Date.now()}@mail.com`,
        gender:'male',
        status:'active'
    };

    const response = await request.post('https://gorest.co.in/public/v2/users/',{
        headers:{
            Authorization:`Bearer ${TOKEN}`
        },
        data:requstBody,
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
});