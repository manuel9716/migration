class facturacion{
    constructor (Identificacion, Nombre, Descripción, Saldo, Concepto, Contrato, Estado, RELLENO, Ciudad, Codigo_servicio, Personalizado2, IdFacturacion, IdDireccion){
            this.Identificacion = Identificacion;
            this.Nombre = Nombre;
            this.Descripción = Descripcion;
            this.Saldo = Saldo;
            this.Concepto = Concepto;
            this.Contrato = Contrato;
            this.Estado = Estado;
            this.RELLENO = RELLENO;
            this.Ciudad = Ciudad;
            this.Codigo_servicio = Codigo_servicio;
            this.Personalizado2 = Personalizado2;
            this.IdFacturacion = IdFacturacion;
            this.IdDireccion = IdDireccion;
    }
}

module.exports = facturacion