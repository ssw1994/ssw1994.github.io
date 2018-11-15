import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'syncPage'
})
export class SyncPagination implements PipeTransform {
  transform(iArr: Array<any>,count:number,start:number) {
   try{
    if(iArr){
        let tempArr:Array<any> = [];
        for(let i=start;count>0;i++,count--){
            tempArr.push(iArr[i]);
        }
        return tempArr;
    }
   }catch(error){
       console.error(error);
   }
  }
}