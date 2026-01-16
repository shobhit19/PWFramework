import {test,expect} from '../fixtures/baseFixture';

import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import { ProductInfoPage} from '../pages/ProductInfoPage';

let searchData=[
    {searchkey:'macbook',productname:'MacBook Pro',imagecount:4},
    {searchkey:'macbook',productname:'MacBook Air',imagecount:4},
    {searchkey:'samsung',productname:'Samsung Galaxy Tab 10.1',imagecount:7},

];

for(let ele of searchData){
test(`verify product header ${ele.productname}`, {tag:['@product','@sanity','@regression']},async ({page,baseURL})=>{

    // AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    let homePage:HomePage= await loginPage.doLoginToApplication('testPWAuto2@test.com','Test@1234');
    let resultsPage:ResultsPage = await homePage.doSearch(ele.searchkey);

    let productInfoPage:ProductInfoPage = await resultsPage.selectProduct(ele.productname);
    expect(await productInfoPage.getProductHeader()).toBe(ele.productname);
});

}

for(let ele of searchData){
test(`verify product images ${ele.productname} : ${ele.imagecount}`,{tag:['@product','@sanity']},async ({page,baseURL})=>{

    // AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    let homePage:HomePage= await loginPage.doLoginToApplication('testPWAuto2@test.com','Test@1234');
    let resultsPage:ResultsPage = await homePage.doSearch(ele.searchkey);

    let productInfoPage:ProductInfoPage = await resultsPage.selectProduct(ele.productname);
    expect( await productInfoPage.getProductImagesCount()).toBe(ele.imagecount);
});
}

test(`verify product metadata`,async ({homePage})=>{

    // AAA
    let resultsPage:ResultsPage = await homePage.doSearch('macbook');

    let productInfoPage:ProductInfoPage = await resultsPage.selectProduct('MacBook Pro');
    
    let actualProductFullDetails =await productInfoPage.getProductDetails();

    expect.soft(actualProductFullDetails.get('header')).toBe('MacBook Pro');
    expect.soft(actualProductFullDetails.get('Brand')).toBe('Apple');
    expect.soft(actualProductFullDetails.get('Product Code')).toBe('Product 18');
    expect.soft(actualProductFullDetails.get('Reward Points')).toBe('800');
    expect.soft(actualProductFullDetails.get('Availability')).toBe('Out Of Stock');
});


