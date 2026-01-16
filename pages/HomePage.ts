import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import { LoginPage } from "./LoginPage";
import { ResultsPage } from "./ResultsPage";

export class HomePage{

    // 1. page locators or page objects or object repository

    readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly loginLink:Locator;
    private readonly logoutLink:Locator;
    private readonly search:Locator;
    private readonly searchIcon:Locator;
    
    //2. page class constructor......

    
    constructor(page:Page){
    this.page=page;
    this.eleUtil = new ElementUtil(page);
    this.loginLink=page.getByRole('link',{name:'Login'});
    this.logoutLink = page.getByRole('link', { name: 'Logout' });
    this.search=page.getByRole('textbox', { name: 'Search' });
    this.searchIcon=page.locator('.btn.btn-default.btn-lg');

    }
    // 3. page action/methods
    
    async isUserLoggedIn(){

        return await this.eleUtil.isVisible(this.logoutLink,0);
    }

    async logout():Promise<LoginPage>{
        await this.eleUtil.click(this.logoutLink,{timeout:5000},1);
        await this.eleUtil.click(this.loginLink,{timeout:5000},1);
        return new LoginPage(this.page);
    }

    async doSearch(searchkey:string){
        console.log(`search key : ${searchkey}`);
        await this.eleUtil.fill(this.search,searchkey);
        await this.eleUtil.click(this.searchIcon);
        return new ResultsPage(this.page);
    }


    
}
