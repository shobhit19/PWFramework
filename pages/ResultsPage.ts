import { Locator, Page } from "@playwright/test";
import { ElementUtil } from "../utils/ElementUtil";
import {ProductInfoPage} from "../pages/ProductInfoPage";


export class ResultsPage{

 // 1. page locators or page objects or object repository

    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly results:Locator;
    
    
    //2. page class constructor......

    
    constructor(page:Page){
    this.page=page;
    this.eleUtil = new ElementUtil(page);
    this.results=page.locator('.product-thumb');

    }
    // 3. page action/methods
    
    async getSearchResults():Promise<number>{
        return this.results.count();
    }
   
    async selectProduct(productName:string):Promise<ProductInfoPage>{
        console.log("===========select product =========");
        await this.eleUtil.click(this.page.getByRole('link', { name: `${productName}`}));
        return new ProductInfoPage(this.page);
    }


}