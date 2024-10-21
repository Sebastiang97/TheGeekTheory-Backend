
export class ProductReqUpdate {
    constructor(
        public name: string,
        public description:string,
        public price: number,
        public size: string,
        public color: string,
        public typeStamping:string,
        public quantity: number,
    ){
    }
}