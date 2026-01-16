import {LoginPage} from '../pages/LoginPage';
import {test,expect} from '../fixtures/baseFixture';
import {RegisterPage} from '../pages/RegisterPage';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

type regData = {
    firstName:string,
    lastName:string,
    telephone:string,
    password:string,
    subscribeNewsletter:string
}

let fileContent = fs.readFileSync('./data/register.csv','utf8');

let registrationData:regData[]=parse(fileContent,{
    columns:true,
    skip_empty_lines:true,
});

for(let user of registrationData){
test(`user is able to register ${user.firstName}`,async ({page,baseURL}) =>{

    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    let registerPage:RegisterPage=await loginPage.navigateToTheRegistrationPage();
    let isUserRegistered:boolean = await registerPage.registerUser(user.firstName,user.lastName,user.telephone,user.password,getRandomEmail(),user.subscribeNewsletter);
    expect(isUserRegistered).toBeTruthy();
});
}

function getRandomEmail():string{
    let randomValue = Math.random().toString(36).substring(2,9);
    return `auto_${randomValue}@nal.com`;
}