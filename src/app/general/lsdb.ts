export class localDB{
    constructor(){
        try{

        }catch(error){
            console.error(error);
        }
    }
    /**
     * @author SSW
     * @description this function is used for get data from localstorage by key
     * @param key 
     */
    public static getDatabyKey(key:string){
        try{
            if(sessionStorage && sessionStorage.getItem(key)){
                return JSON.parse(sessionStorage.getItem(key));
            }else{
                return null;
            }
        }catch(error){
            console.error(error);
        }
    }

    /**
     * @author SSW
     * @param key 
     * @param iObj
     * @description this function is used for saving data in localstorage 
     */
    public static setDatabyKey(key:string,iObj:any){
        try{
            if(sessionStorage){
                sessionStorage.setItem(key,JSON.stringify(iObj));
                return true;
            }else{
                return false;
            }
        }catch(error){
            console.error(error);
        }
    }
}