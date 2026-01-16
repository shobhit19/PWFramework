import {Locator, Page} from '@playwright/test';

type flexibleLocator = string | Locator;

export class ElementUtil{


    private page:Page;
    private defaultTimeOut:number=30000;


    constructor(page:Page,timeOut:number=30000){

        this.page=page;
        this.defaultTimeOut=timeOut;
    }

    /**
     * 
     * @param locator this method to convert the string to Locator else it will return
     * semantic based locators
     * @returns 
     */
    private getLocator(locator:flexibleLocator,index?:number):Locator{

        if(typeof locator === 'string'){
            if(index){
            return this.page.locator(locator).nth(index);
            }
            else{
                return this.page.locator(locator).first();
            }
        }
        else{
            if(index){
                return locator.nth(index);
            }
            else{
                return locator.first();
            }
        }
    }

    /**
     * Click on an element
     * @param locator 
     * @param options 
     */
    async click(locator:flexibleLocator,options?:{force?:boolean,timeout?:number},index?:number):Promise<void>{

        await this.getLocator(locator,index).click({
            force:options?.force,
            timeout:options?.timeout || this.defaultTimeOut

        });
        console.log(`clicked on element : ${locator}`);
    }   

    /**
     * Fill text in to an input field
     * @param locator 
     * @param text 
     */
    async fill(locator:flexibleLocator,text:string):Promise<void>{

        await this.getLocator(locator).fill(text,{timeout:this.defaultTimeOut});

        console.log(`Filled the text ${text} into element : ${locator}`);
    }

    /**
     * Double click on element
     * @param locator 
     */
    async doubleClick(locator:flexibleLocator):Promise<void>{

        await this.getLocator(locator).dblclick({
            timeout:this.defaultTimeOut

        });
        console.log(`double clicked on element : ${locator}`);
    }   

    async rightClick(locator:flexibleLocator):Promise<void>{

        await this.getLocator(locator).click({
            button:'right',
            timeout:this.defaultTimeOut
        });
        console.log(`right clicked on element : ${locator}`);
    }  

    /**
     * type text with delay (default delay: 500ms)
     * @param locator 
     * @param text 
     * @param delay 
     */
    async type(locator:flexibleLocator,text:string,delay:number):Promise<void>{

        await this.getLocator(locator).pressSequentially(text,{
            delay,timeout:this.defaultTimeOut
        });

        console.log(`Typed text as human : ${text} in to element ${locator}`);
    }
    
    async clear(locator:flexibleLocator):Promise<void>{

        await this.getLocator(locator).clear();

        console.log(`cleared the element : ${locator}`);
    }

    /**
     * Get text of an element
     * @param locator 
     * @returns 
     */
    async getText(locator:flexibleLocator):Promise<string|null>{
       const text= this.getLocator(locator).textContent({timeout:this.defaultTimeOut});
       return text;

    }

     /**
     * Get inner text of an element
     * @param locator 
     * @returns 
     */
    async getInnerText(locator:flexibleLocator):Promise<string>{
       const text= this.getLocator(locator).innerText({timeout:this.defaultTimeOut});
       return  (await text).trim();

    }
     /**
     * Get attribute value of an element
     * @param locator 
     * @returns 
     */
    async getAttributeValue(locator:flexibleLocator,attributeName:string):Promise<string|null>{
       return await this.getLocator(locator).getAttribute(attributeName);
    }

         /**
     * Get input(entered) of an element
     * @param locator 
     * @returns 
     */
    async getInputValue(locator:flexibleLocator):Promise<string|null>{
       return await this.getLocator(locator).inputValue();
    }

    async getAllInnerTexts(locator:flexibleLocator):Promise<string[]>{
        return await this.getLocator(locator).allInnerTexts();
    }


    // =========================Element Visibility &  State check ==========================



    /**
     * check element is hidden
     * @param locator
     * @returns 
     */
    async isHidden(locator:flexibleLocator):Promise<boolean>{
        return await this.getLocator(locator).isHidden();
    }
    /**
     * check element is enabled
     * @param locator 
     * @returns 
     */
     async isEnabled(locator:flexibleLocator):Promise<boolean>{
        return await this.getLocator(locator).isEnabled();
    }
    /**
     * check element is disabled
     * @param locator
     * @returns 
     */
     async isDisabled(locator:flexibleLocator):Promise<boolean>{
        return await this.getLocator(locator).isDisabled();
    }
    /**
     * check element is checked (radio button/checkbox)
     * @param locator 
     * @returns 
     */

    async isChecked(locator:flexibleLocator):Promise<boolean>{

        return await this.getLocator(locator).isChecked({timeout:this.defaultTimeOut});
    }

    async isVisible(locator:flexibleLocator,index?:number):Promise<boolean>{
        return  await this.getLocator(locator,index).isVisible();
    }

    /**
     * check element is editable
     * @param locator 
     * @returns 
     */
    
    async isEditable(locator:flexibleLocator):Promise<boolean>{

        return await this.getLocator(locator).isEditable({timeout:this.defaultTimeOut});
    }

    // ======================= wait util ===========================

        /**
     * check element is visible
     * @param locator 
     * @param timeout 
     * @returns 
     */
    async waitForElementVisible(locator:flexibleLocator,timeout:number=5000):Promise<boolean>{
        try{
        await this.getLocator(locator).waitFor({state:'visible',timeout});
        console.log(`waited for element to be visible`);
        return true;
        }
        catch{
            return false;
        }
        
    }

    /**
     * wait for element to be attached to DOM
     * @param locator w
     * @param timeout 
     * @returns 
     */
    async waitForElementAttached(locator:flexibleLocator,timeout:number=5000):Promise<boolean>{
        try{
        await this.getLocator(locator).waitFor({state:'attached',timeout});
        console.log(`waited for element to be visible`);
        return true;
        }
        catch{
            return false;
        }
        
    }

    /**
     *  wait for page load state
     */

    async waitForPageLoad(state:'load' | 'domcontentloaded' | 'networkidle' ='load'):Promise<void>{

        await this.page.waitForLoadState(state);
        console.log(`wait for page load state: ${state}`);

    }  
    
    /**
     * wait for timeout
     */

    async waitFor(timeout:number):Promise<void>{
        this.page.waitForTimeout(timeout);
        console.log(`waited for ${timeout} ms`);
    }
}
