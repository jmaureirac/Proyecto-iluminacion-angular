export class Producto {

    constructor(
        public nombre: string,
        public subcategoria: string,
        public marca: string,
        public precio_unitario: number,
        public descripcion?: string,
        public material?: string,
        public temperatura?: string,
        public vida_util?: string,
        public voltaje?: string,
        public potencia?: string,
        public flujo_luminoso?: string,
        public grado_proteccion?: string,
        public img?: string,
        public medidas?: any,
        public _id?: string
    ) {

    }

}
