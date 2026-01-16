import {LoginPage} from '../pages/LoginPage';
import {test,expect} from '../fixtures/baseFixture';


test('verify valid login @login @sanity', async ({homePage})=>{

    await expect(homePage.page).toHaveTitle('My Account');
    
});

test('verify invalid login', async ({page,baseURL})=>{

    // AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLoginToApplication('testPWAuto1@test.com','test@123');
    const errorMsg = await loginPage.getInvalidloginMessage();
    expect(errorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');
    

});

