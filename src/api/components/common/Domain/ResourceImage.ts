export interface ResourceImage{
    id: string,
    isMain: boolean,
    url:string,
    [x: string]: string | boolean
}