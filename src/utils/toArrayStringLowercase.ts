export const toArrayStringLowercase = (array:string[]) =>{
    if(Array.isArray(array)){
        if(array.length){
            return array.map((a:string)=> a.toLocaleLowerCase())
        }
        return []
    }
    return []
}