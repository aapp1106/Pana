var PlanesSave = [];
$(document).ready(function () {
    CargarPlanesSave()
});

function CargarPlanesByComprar() {
    var Formulario = '';
    Formulario += '<div class="row" style="padding:10px;">';

    $.each(PlanesSave, function (index,item) {
        Formulario += '  <div class="col-xl-2" style="border:1px solid #676a6c;width:auto;height:50%">';
        Formulario += '         <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-lg-center text-xl-center text-sm-center "><label><strong style="font-weight:bold;font-size:14px" id="TipoPlan">PLAN ' + item.Descripcion +'</strong></label></div>';
        Formulario += '         <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-lg-center text-xl-center text-sm-center "><label><strong style="font-size:90px" id="Valor">$'+item.ValorPlan+' </strong></label></div>';
        Formulario += '         <div class="row ">';
        Formulario += '            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5 "><label>Cuentas asociadas</label></div>';
        Formulario += '            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-lg-center text-xl-center text-sm-center " style="border:1px solid #676a6c;height:20%;width:15%"><label id="NumCuentas">' + item.CantMaxUser +'</label></div>';
        Formulario += '            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 "><a><i class="fa fa-plus-circle ButonIconProyect"></i></a>  <a><i class="fa fa-minus-circle ButonIconProyect"></i></a></div>';
        Formulario += '         </div>';
        Formulario += '         <div class="row">';
        Formulario += '            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5"><label>Capacidad almacenamiento</label></div>';
        Formulario += '            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-lg-center text-xl-center text-sm-center " style="border:1px solid #676a6c;height:20%;width:15%"><label id="NumCAPACIDAD">' + item.CapacidadaMaxAlmacen +'</label></div>';
        Formulario += '            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 "><a><i class="fa fa-plus-circle ButonIconProyect"></i></a>  <a><i class="fa fa-minus-circle ButonIconProyect"></i></a></div>';
        Formulario += '         </div>';

        Formulario += '         <div class="row">';
        Formulario += '            <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-xs-5"><label>Cantidad casos</label></div>';
        Formulario += '            <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-xs-3 text-lg-center text-xl-center text-sm-center " style="border:1px solid #676a6c;height:20%;width:15%"><label id="NumCasos">' + item.CantMaxCasos +'</label></div>';
        Formulario += '            <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-4 "><a><i class="fa fa-plus-circle ButonIconProyect"></i></a>  <a><i class="fa fa-minus-circle ButonIconProyect"></i></a></div>';
        Formulario += '         </div>';
        Formulario += '         <br />';
        Formulario += '         <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 text-lg-center text-xl-center text-sm-center "><button class="btn " style="background-color:#0A7AC4;color:white">COMPRAR</button></div>';
        Formulario += '         <br />';
        Formulario += '  </div>';
        Formulario += '  <div class="col-xl-1"></div>';
    })

    
    Formulario += ' </div > ';
    $('#Contenedor').append(Formulario);
}

function CargarPlanesSave() {
    var formURL = SetUrlForQuery('/PlanFacturacion/Listaplanesfacturacion');

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                PlanesSave = data.Objeto;
                CargarPlanesByComprar(PlanesSave);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}