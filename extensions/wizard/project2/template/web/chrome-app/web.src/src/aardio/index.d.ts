/// <reference types="aardio" />

declare namespace aardio {
  
    interface External {  
        /** 这是一个 aardio  函数 */
        onCounterUpdate(name:string,value:number):Promise<string>; 
    }
}

