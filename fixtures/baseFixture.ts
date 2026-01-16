import {test as base,expect} from '@playwright/test';
import {HomePage} from '../pages/HomePage';
import {LoginPage} from '../pages/LoginPage';

type myFixture={

    homePage:HomePage;
}

export const test=base.extend<myFixture>({

    homePage:async ({page,baseURL},use,testInfo)=>{
        const loginPage = new LoginPage(page);
        loginPage.goToLoginPage(baseURL);

       const username= testInfo.project.metadata.appUsername;
       const password = testInfo.project.metadata.appPassword;
       
       const homePage= await loginPage.doLoginToApplication(username,password);

       expect(homePage.isUserLoggedIn()).toBeTruthy();

       await use(homePage);
    }
});

export {expect};