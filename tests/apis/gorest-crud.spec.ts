import {test,expect} from '@playwright/test';

const TOKEN = '9539ec98bf581fcff919b8100caaa42d6cf14983af9871588a72d5668096520b';

const BASE_URL = 'https://gorest.co.in/public/v2/users'

const headers={
    'Authorization':`Bearer ${TOKEN}`,
    'Content-Type':'application/json',
    'Accept':'application/json'
};

test('GET - fetch all users', async ({request})=>{


    const response = await request.get(BASE_URL,{ headers});
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});
test('GET - fetch single user', async ({request})=>{


    const response = await request.get(BASE_URL+'/8333304',{headers});
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

    const response = await request.post(BASE_URL,{headers,
        data:requstBody,
    });
    expect(response.status()).toBe(201);
    const data = await response.json();
    console.log(data);
});

test('PUT - update a user', async({request})=>{

    const userId = 8334616;
    
    const requstBody = {
        status:'inactive'
    };

    const response = await request.put(BASE_URL+'/'+userId,{headers,
        data:requstBody,
    });
    expect(response.status()).toBe(200);
    const data = await response.json();
    console.log(data);
});

test('DELETE - delete a user', async({request})=>{

    const userId = 8334616;

    const response = await request.delete(`${BASE_URL}/${userId}`,{headers,
    });
    expect(response.status()).toBe(204);
});