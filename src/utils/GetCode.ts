export const GET_CODE = (text:string) => {
    if(text){
        return text.split(/\s/).slice(0,4).map(p=> p[0].toUpperCase()).join("") + Date.now()
    }
    return Date.now()
}