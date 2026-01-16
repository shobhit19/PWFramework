import {LoginPage} from '../pages/LoginPage';
import {test,expect} from '../fixtures/baseFixture';


test('verify valid login @login',
    {
        annotation:[
            {type:'epic',description:'EPIC - 100 - Design login page'},
            {type:'feature',description:'Login Page Feature'},
            {type:'story',description:'US 50 - user can login to app'},
            {type:'severity',description:'Blocker'},
            {type:''}
        ]
    }, async ({homePage})=>{

    await expect(homePage.page).toHaveTitle('My Account');
    
});

test('verify invalid login @login @sanity', async ({page,baseURL})=>{

    // AAA
    let loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(baseURL);
    await loginPage.doLoginToApplication('testPWAuto1@test.com','test@123');
    const errorMsg = await loginPage.getInvalidloginMessage();
    expect(errorMsg).toContain('Warning: No match for E-Mail Address and/or Password.');
    

});

