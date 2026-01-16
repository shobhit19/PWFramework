import{Locator, Page} from '@playwright/test';
import {ElementUtil} from '../utils/ElementUtil';

export class ProductInfoPage{

    private readonly productMap = new Map<string,string|number|null>();

    private readonly page:Page;
    private readonly eleUtil:ElementUtil;
    private readonly header:Locator;
    private readonly imageCount:Locator;
    private readonly productMetaData:Locator;
    private readonly productPriceData:Locator;

    constructor(page:Page){
        this.page=page;
        this.eleUtil=new ElementUtil(page);
        this.header=page.locator("h1");
        this.imageCount=page.locator("div#content img");
        this.productMetaData=page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[1]/li");
        this.productPriceData=page.locator("(//div[@id='content']//ul[@class='list-unstyled'])[2]/li");

    }

    async getProductHeader():Promise<string|null>{
       return (await this.eleUtil.getInnerText(this.header)).trim();

    }

    async getProductImagesCount():Promise<number>{
        await this.eleUtil.waitForElementVisible(this.imageCount);
        const imageCount =  await this.imageCount.count();
        console.log(`total number of images for : ${this.getProductHeader} ==> ${imageCount}`);
        return imageCount;
    }   

    /**
     * 
     * @returns this method is returning complete product information i.e. its price, header, product meta data and product price data
     */
    async getProductDetails():Promise<Map<string,string|number|null>>{

        this.productMap.set('header',await this.getProductHeader());
        this.productMap.set('imagecount', await this.getProductImagesCount());
        await this.getProductMetaData();
        await this.getProductPricingData();

        console.log(`Full product details of product: ${this.getProductHeader()}`);
        this.printProductDetails();
        return this.productMap;
    }

    private async printProductDetails(){
        for(const [key,value] of this.productMap){
            console.log(key, value);
        }
    }

     private async getProductMetaData(){
       let productMetaData:string[]= await this.productMetaData.allInnerTexts();
       for(let metaData of productMetaData){

           let meta:string[]= metaData.split(':');
           let metaKey:string = meta[0].trim();
           let metaValue:string=meta[1].trim();
           this.productMap.set(metaKey,metaValue);

       }
    }
    // $2,000.00 - 0th
    // Ex Tax: $2,000.00 - 1th

    private async getProductPricingData(){
       let productPriceData:string[]= await this.productPriceData.allInnerTexts();
       
       let productPrice:string =  productPriceData[0].trim();
       let productExTax=productPriceData[1].split(':')[1].trim();

       this.productMap.set('price',productPrice);
       this.productMap.set('extxprice',productExTax);
       
    }
}