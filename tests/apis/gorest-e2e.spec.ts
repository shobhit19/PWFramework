// e2e test
/**
 * 1. create a user - post - 201 - user = 123 - 201
 * 2. get a user with user id = 123 - 200
 * 3. update the user with user id = 123 - 200
 * 4. delete the user with user id = 123 - 204
 * 5. Get the user with user id = 123 - 404
 * 
 * 
 */

import {test,expect} from '@playwright/test';

const TOKEN = '9539ec98bf581fcff919b8100caaa42d6cf14983af9871588a72d5668096520b';

const BASE_URL = 'https://gorest.co.in/public/v2/users'

const headers={
    'Authorization':`Bearer ${TOKEN}`,
    'Content-Type':'application/json',
    'Accept':'application/json'
};

test('e2e crud flow test', async ({request})=>{

    // 1. create a user - post - 201 - user = 123 - 201

    console.log("============== POST Call ================");

    const requstBody = {
            name:'PW Test User',
            email:`pwtest${Date.now()}@mail.com`,
            gender:'male',
            status:'active'
        };
    
        const responsePOST = await request.post(BASE_URL,{headers,
            data:requstBody,
        });
        expect(responsePOST.status()).toBe(201);
        const createUser = await responsePOST.json();
        console.log(createUser);

        const userId = createUser.id;
        console.log('Created User id '+userId);

        //2. get a user with user id = 123 - 200

        console.log("============== GET Call ================");

        const responseGET = await request.get(BASE_URL+'/'+userId,{headers});
            expect(responseGET.status()).toBe(200);
            const data = await responseGET.json();
            console.log(data);

        console.log("============== UPDATE Call ==================");
        
      //  3. update the user with user id = 123 - 200

            
            
            const updateBody = {
                name:'PW Test Automation User',
                status:'inactive'
            };
        
            const responsePUT = await request.put(BASE_URL+'/'+userId,{headers,
                data:updateBody,
            });

            expect(responsePUT.status()).toBe(200);
            const updatedData = await responsePUT.json();
            console.log(updatedData);
            
        //4. delete the user with user id = 123 - 204

        console.log("=============== DELETE CALL ================");

            const responseDELETE = await request.delete(`${BASE_URL}/${userId}`,{headers,
            });
            expect(responseDELETE.status()).toBe(204);
            console.log("User is deleted successfully ......");


            //5. Get the user with user id = 123 - 404

          console.log("=============== GET CALL ================");   

           const responseGETAfterDelte = await request.get(BASE_URL+'/'+userId,{headers});
            expect(responseGETAfterDelte.status()).toBe(404);
    });
