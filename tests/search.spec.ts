
import {LoginPage} from '../pages/LoginPage';
import {HomePage} from '../pages/HomePage';
import { ResultsPage } from '../pages/ResultsPage';
import {test,expect} from '../fixtures/baseFixture';


let searchData=[
    {searchKey:'Macbook',resultCount:3},
    {searchKey:'Samsung',resultCount:2},
    {searchKey:'Imac',resultCount:1},
    {searchKey:'canon',resultCount:1},
    {searchKey:'dummy',resultCount:0},
]

for(let product of searchData){
test(`verify product search ${product.searchKey}`,async ({homePage})=>{

    let resultsPage:ResultsPage = await homePage.doSearch(product.searchKey);
    expect(await resultsPage.getSearchResults()).toBe(product.resultCount);
});
}