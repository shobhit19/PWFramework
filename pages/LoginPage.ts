import {Locator, Page} from '@playwright/test';
import { ElementUtil } from '../utils/ElementUtil';
import { HomePage } from './HomePage';
import {RegisterPage} from '../pages/RegisterPage';

export class LoginPage{

   // page locators or page objects or object repository

   
   private readonly page:Page;
   private readonly eleUtil;
   private readonly emailId:Locator;   
   private readonly password:Locator; 
   private readonly loginBtn:Locator;
   private readonly warningMsg:Locator;
   private readonly registerLink:Locator;

   // page class constructor......

   constructor(page:Page){
    this.page = page;
    this.eleUtil=new ElementUtil(page);
    this.emailId=page.getByRole('textbox', { name: 'E-Mail Address' });
    this.password=page.getByRole('textbox', { name: 'Password' });
    this.loginBtn=page.getByRole('button', { name: 'Login' });
    this.warningMsg=page.locator('.alert.alert-danger.alert-dismissible');
    this.registerLink=page.getByText('Register', { exact: true });

   }

   // 3. page action/methods

   /**
    *  navigate to the login page
    */
   async goToLoginPage(baseURL:string|undefined){
    await this.page.goto(baseURL+'?route=account/login');
    }

    /**
     * login to the application using the usernama and password
     * @param email 
     * @param password 
     * @returns 
     */
    async doLoginToApplication(email:string,password:string):Promise<HomePage>{
        
        await this.eleUtil.fill(this.emailId,email);
        await this.eleUtil.fill(this.password,password);
        await this.eleUtil.click(this.loginBtn,{force:true,timeout:5000});
        return new HomePage(this.page);

    }

    /**
     * get the warning message in case of invalid login
     * @returns 
     */
    async getInvalidloginMessage():Promise<string|null>{

        const errorMsg = await this.eleUtil.getText(this.warningMsg);
        console.log(errorMsg);
        return errorMsg;
    }


    async navigateToTheRegistrationPage():Promise<RegisterPage>{
        await this.eleUtil.click(this.registerLink,{force:true},1);
        return new RegisterPage(this.page);
    }

}