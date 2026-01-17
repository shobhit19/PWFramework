import {test,expect} from '@playwright/test';
import {JSONPath} from 'jsonpath-plus';

const BASEURL='https://fakestoreapi.com/products';

const headers={
    'Accept':'application/json',
    'Content-Type':'application/json'
}


test('GET -- all the product test',async ({request})=>{

    const response = await request.get(BASEURL,{headers});
    const data = await response.json();
    console.log(data);

    // get all titles:

    console.log("================== Fetch the titles ================");
    const titles = JSONPath({path:'$.[*].title',json:data});
    console.log(titles);

    console.log("================== Fetch the ids ================");

    //  get all ids:
    const ids = JSONPath({path:'$.[*].id',json:data});
    console.log(ids);

    console.log("================== fetch the rates ================");
    // get rates
    const rates = JSONPath({path:'$.[*].rating.rate',json:data});
    console.log(rates);

    // get all the product titles where category = 'jewelery'

    const jewlTitles  = JSONPath({path:`$[?(@.category=='jewelery')].title`,json:data});
    console.log(jewlTitles);


})