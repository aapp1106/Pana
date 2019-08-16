jQuery.validator.addMethod("DateGreaterThan", function (value, element, params) {
    var datev = new Date($(params[0]).val());
    params[1] = formatDate(datev);

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) >= new Date($(params[0]).val());
    }

    return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val()));
}, jQuery.validator.format("Por favor escoja una fecha mayor a {1} "));

jQuery.validator.addMethod("FechaMayorQue", function (value, element, params) {
    var datev = NDate($(params[0]).val());
    params[1] = formatDate(datev);
    if (!/Invalid|NaN/.test(NDate(value))) {
        return NDate(value) >= NDate($(params[0]).val());
    }
    return isNaN(value) && isNaN($(params).val()) || (Number(value) > Number($(params).val()));
}, jQuery.validator.format("Por favor escoja una fecha mayor a {1} "));

jQuery.validator.addMethod("DateLessThan", function (value, element, params) {

    var date1 = new Date(value);
    var date2 = new Date($(params).val());
    if (!/Invalid|NaN/.test(new Date(value))) {
        return date1 <= date2;
    }

    return isNaN(value) && isNaN($(params).val()) || (Number(value) <= Number($(params).val()));
}, jQuery.validator.format("Por favor escoja una fecha menor a {0}"));

jQuery.validator.addMethod("DateLessToday", function (value, element) {

    if (!/Invalid|NaN/.test(new Date(value))) {
        return new Date(value) <= new Date();
    }

    return (isNaN(value) || Number(value))
}, "Por favor escoja una fecha menor a hoy.");

jQuery.validator.addMethod("email2", function (value, element) {

    return (/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(value))
}, "Por favor, escribe una dirección de correo válida.");

jQuery.validator.addMethod("Nonull", function (value, element) {
    return value != null
}, "Este campo es obligatorio.");
// Permite crear campos solo con caracteres no acentuados y el caracter '_' 
jQuery.validator.addMethod("caracterCampo", function (value, element) {

    if (!/^[A-Za-z 0-9 '_]+$/.test(value)) {
        $(element).val('');

        return false
    }
    return true;

}, "Por favor, combine sólo letras [a-Z] y números [0-9] con o sin '_'.");

// Valida que solo se ingresen letras.
jQuery.validator.addMethod("soloLetras", function (value, element) {

    if (!/^[a-zA-ZñÑáéíóúÁÉÍÓÚ '_-]+$/.test(value)) {
        $(element).val('');

        return false
    }
    return true;

}, "Por favor, escribe sólo letras [a-Z].");

jQuery.validator.addMethod("StringEmpty", function (value, element) {

    if (value.trim() == "") {
        $(element).val("");
        return false;
    }
    return true;

}, "Este campo es obligatorio.");

jQuery.validator.addMethod("NotRepeatTPerson", function (value, element, params) {
    var input = $("#" + params[0]);
    var Registros = Soltud.Secciones[params[1]].Registros.filter(function (val) {
        return val.CodCampo == input.attr("Field") && val.Valor == input.val() && EnEdicion[params[2]] != val.Renglon;
    });

    return Registros.length == 0

}, jQuery.validator.format("Ya ha agregado un tercero con este tipo de relación."));

jQuery.validator.addMethod("NotRepeatRV", function (value, element, params) {

    var select = $("#_TIPO_RELA61033");
    var input = $(element);
    if (select.val() == 2) {
        var Registros = Soltud.Secciones[params].Registros.filter(function (val) {
            return val.CodCampo == input.attr("Field") && val.Valor == value && EnEdicion[6] != val.Renglon;
        });
        return Registros.length == 0;
    } else {
        var SelectTipos = Soltud.Secciones[params].Registros.find(function (val) { return val.CodCampo == "_TIPO_RELA" && val.Valor == "2" });
        if (SelectTipos != null && SelectTipos != undefined) {
            var Registros = Soltud.Secciones[params].Registros.find(function (val) {
                return val.CodCampo == input.attr("Field") && val.Valor == value && EnEdicion[6] != val.Renglon && val.Renglon == SelectTipos.Renglon;
            });
            return Registros != undefined && Registros != null ? false : true;
        }
    }
    return true

}, jQuery.validator.format("Esta cédula no puede ser usada. Ha sido asignada para otro tercero y otro tipo de relación."));
//NUEVO
jQuery.validator.addMethod("NotRepLegalMismaCedulaContrib", function (value, element, params) {

    var select = $("#_TIPO_RELA61033");
    if (select.val() == 6) {
        var input = $(element);

        var TipoDocContribuyente = params[0];
        var IdenTercVinculado = $(params[1]).val();

        return !(TipoDocContribuyente.TipoIdentidadId == IdenTercVinculado && TipoDocContribuyente.it == input.val());
    }
    return true

}, jQuery.validator.format("Número de Identificación pertenece al contribuyente."));
//FIN-NUEVO
jQuery.validator.addMethod("RegistroFileRequired", function (value, element) {

    var input = $(element);
    var Registros = Soltud.Secciones[5].Registros.filter(function (val) {
        return val.idhtml == input.attr("id");
    });
    return Registros.length == 0;

}, jQuery.validator.format("Falta cargar este archivo."));

jQuery.validator.addMethod("NoRevisor", function (value, element, params) {
    var input = $(element);
    return !(input.val() == 2 && params == 1);

}, jQuery.validator.format("Para persona natural no es permitido agregar revisor fiscal."));

jQuery.validator.addMethod("MoneyGreaterThan", function (value, element, params) {
    var num = value.replace(/[^0123456789]/g, '');
    if (num != "") {
        num = redondeaAlAlza(num, 1000);
        if (num <= params)
            return false;
        else
            return true;
    }
    return false;

}, "El valor debe ser mayor a $ {0}");

jQuery.validator.addMethod("MoneyGreaterEqualThan", function (value, element, params) {
    var num = value.replace(/[^0123456789]/g, '');
    if (num != "") {
        num = redondeaAlAlza(num, 1000);
        if (num < params)
            return false;
        else
            return true;
    }
    return false;

}, "El valor debe ser mayor  o igual a $ {0}");

jQuery.validator.addMethod("MoneyLessThan", function (value, element, params) {
    var num = value.replace(/[^0123456789]/g, '');
    if (num != "") {
        num = redondeaAlAlza(num, 1000);
        if (num > params)
            return false;
        else
            return true;

    }
    return false;

}, "El valor debe ser menor o igual a $ {0}");

jQuery.validator.addMethod("ValorMinimo", function (value, element, params) {
    var num = value.replace(/[^0123456789]/g, '');
    if (num != "") {
        num = redondeaAlAlza(num, 1);
        return (num >= params);
    }
    return false;

}, "El valor debe ser mayor o igual a  {0}");



