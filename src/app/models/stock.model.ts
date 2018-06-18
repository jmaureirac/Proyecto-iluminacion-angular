export class Stock {

    constructor(
        public producto: any,
        public cantidad: number,
        public precio_compra: number,
        public update_at?: string,
        public created_at?: string,
        public _id?: string
    ) {

    }

}
