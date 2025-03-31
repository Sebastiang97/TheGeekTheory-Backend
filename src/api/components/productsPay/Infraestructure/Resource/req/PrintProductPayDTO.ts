export type PrintProductPayDTO = {
    idProduct: string
    print: Print[]
}

type Print = {
    size: string,
    position: string
    url: string
}