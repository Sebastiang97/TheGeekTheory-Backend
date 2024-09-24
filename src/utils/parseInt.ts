export const PARSE_INT = (value: any):number | undefined=>{
    return typeof value === "string" ? parseInt(value) : value
}