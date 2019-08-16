$(document).ready(function () {
    var URLactual = window.location.pathname;//para que no cargue todo innecesariamente
    $('li.menu').removeClass("active");
    if (URLactual == "/Agenda") {
        $("#Age").addClass("active");
    } else if (URLactual == "/Registrar") {
        $("#Reg").addClass("active");
    } else if (URLactual == "/ConfiEncuesta") {
        $("#Conf").addClass("active");
    } else if (URLactual == "/ResulEncuesta") {
        $("#Re").addClass("active");
    } else if (URLactual == "/TestigosElectores") {
        $("#Tes").addClass("active");
    } else if (URLactual == "/Usuarios") {
        $("#us").addClass("active");
    } else if (URLactual == "/" || URLactual == "/Home") {
        $("#i1").addClass("active");
    } else if (URLactual == "/" || URLactual == "/SendMensajes") {
        $("#Send").addClass("active");
    }
    
   
});





var sizeModal = "";
// Permite escojer las fechas en los calendarios 
var seleccionFecha = {
    labelMonthNext: 'Ir al siguiente mes',
    labelMonthPrev: 'Ir al mes anterior',
    labelMonthSelect: 'Seleccionar mes',
    labelYearSelect: 'Seleccionar año',
    labelDaySelect: 'aqui',
    klass: {
        navPrev: '',
        navNext: '',
    },

    selectMonths: true,
    selectYears: 100,
    min: new Date(1800, 1, 1),
    today: 'Hoy',
    close: 'Cerrar',
    clear: '',

    onSet: function (context) {
        if (context.select != undefined) {
            var date = new Date(context.select);
            var formatdate = formatDate(date);
            $(this.$node).val(formatdate).trigger("change");
        } else {
            var date2 = new Date(parseInt("" + context.highlight[0]), parseInt("" + context.highlight[1]), parseInt("" + context.highlight[2]));
            var formatdate2 = formatDate(date2);
            $(this.$node).val(formatdate2).trigger("change");
        }
    }
}

function SwalErrorMsj(data) {
    CloseModalBox();
    swal.fire({
        title: "¡Error!",
        text: data.Msj,
        //confirmButtonColor: "#ab2328",
        type: "error",
        closeOnConfirm: true,
    });
}
var seleccionFechaApartirdeHoy = {
    labelMonthNext: 'Ir al siguiente mes',
    labelMonthPrev: 'Ir al mes anterior',
    labelMonthSelect: 'Seleccionar mes',
    labelYearSelect: 'Seleccionar año',
    klass: {
        navPrev: '',
        navNext: '',
    },

    selectMonths: true,
    selectYears: 100,
    min: new Date(),
    today: 'Hoy',
    close: 'Cerrar',
    clear: '',
    onSet: function (context) {
        if (context.select != undefined) {
            var date = new Date(context.select);
            var formatdate = formatDate(date);
            $(this.$node).val(formatdate).trigger("change");
        } else {
            var date2 = new Date(parseInt("" + context.highlight[0]), parseInt("" + context.highlight[1]), parseInt("" + context.highlight[2]));
            var formatdate2 = formatDate(date2);
            $(this.$node).val(formatdate2).trigger("change");
        }
    }
}

var seleccionFechaHastaHoy = {
    labelMonthNext: 'Ir al siguiente mes',
    labelMonthPrev: 'Ir al mes anterior',
    labelMonthSelect: 'Seleccionar mes',
    labelYearSelect: 'Seleccionar año',
    klass: {
        navPrev: '',
        navNext: '',
    },

    selectMonths: true,
    selectYears: 100,
    max: new Date(),
    today: 'Hoy',
    close: 'Cerrar',
    clear: '',
    onSet: function (context) {
        if (context.select != undefined) {
            var date = new Date(context.select);
            var formatdate = formatDate(date);
            $(this.$node).val(formatdate).trigger("change");
        } else {
            var date = new Date(parseInt("" + context.highlight[0]), parseInt("" + context.highlight[1]), parseInt("" + context.highlight[2]));
            var formatdate = formatDate(date);
            $(this.$node).val(formatdate).trigger("change");
        }
    }
}

function NDate(cadena, withtime) {
    var d = new Date();
    if (cadena != undefined)
        d = new Date(cadena);
    if (withtime == false || withtime == undefined || withtime == "")
        d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);
    return d;
}

function NDateR(cadena) {
    var d = new Date();
    if (cadena != undefined)
        d = new Date(cadena);
    return d;
}

function OpenModalBox(titulo, body, botones, headerBg, sizeclass, nombPropiedad, valPropiedad, stmodal) {
    var modal = $("#modalBox");
    modal.find(".modal-dialog").attr("class", "modal-dialog");

    if (sizeclass != undefined && sizeclass != null) {
        modal.find(".modal-dialog").addClass(sizeclass);
        sizeModal = sizeclass;
    }

    modal.find(".modal-title").html(titulo);

    modal.find(".modal-body").html(body);

    modal.find(".modal-footer").html("<div  class=' ' >" + botones + "</div>");

    if (headerBg != undefined && headerBg != null)
        modal.find(".modal-header").addClass(headerBg);

    if (nombPropiedad != undefined && nombPropiedad != null && valPropiedad != undefined && valPropiedad != null)
        modal.find(".modal-dialog").css(nombPropiedad, valPropiedad);

    modal.on('hide.bs.modal', function (e) { return e });
    if (stmodal != undefined) {
        modal.modal({
            backdrop: stmodal.backdrop,
            keyboard: stmodal.keyboard,
            show: true
        });
    } else {
        modal.modal({
            backdrop: true,
            keyboard: false,
            show: true
        });
    }
}

function OpenModalBoxAux(titulo, body, botones, headerBg, sizeclass, nombPropiedad, valPropiedad, stmodal) {
    var modal = $("#modalBoxAux");
    modal.find(".modal-dialog").attr("class", "modal-dialog");

    if (sizeclass != undefined && sizeclass != null) {
        modal.find(".modal-dialog").addClass(sizeclass);
        sizeModal = sizeclass;
    }

    modal.find(".modal-title").html(titulo);

    modal.find(".modal-body").html(body);

    modal.find(".modal-footer").html("<div  class=' ' >" + botones + "</div>");

    if (headerBg != undefined && headerBg != null)
        modal.find(".modal-header").addClass(headerBg);

    if (nombPropiedad != undefined && nombPropiedad != null && valPropiedad != undefined && valPropiedad != null)
        modal.find(".modal-dialog").css(nombPropiedad, valPropiedad);

    modal.on('hide.bs.modal', function (e) { return e });
    if (stmodal != undefined) {
        modal.modal({
            backdrop: stmodal.backdrop,
            keyboard: stmodal.keyboard,
            show: true
        });
    } else {
        modal.modal({
            backdrop: true,
            keyboard: false,
            show: true
        });
    }
}

function OpenModalBoxId(idmodal) {
    var modal2 = $("#" + idmodal);
    modal2.modal("show");
    modal2.on('hide.bs.modal', function (e) { return e });
}

function ShowLoading() {
    OpenModalBoxId("pleaseWaitDialog");
}

function CloseLoading() {
    CloseModalBoxId("pleaseWaitDialog");
}

function CloseModalBox() {
    var modal = $("#modalBox");
    setTimeout(function () {
        modal.modal("hide");
    }, 1000);

}
function CloseModalBoxAux() {
    var modal = $("#modalBoxAux");
    setTimeout(function () {
        modal.modal("hide");
    }, 1000);

}
function CloseModalBoxId(idmodal) {
    var modal2 = $("#" + idmodal);
    setTimeout(function () {
        modal2.modal("hide");
    }, 500);
}

function ShowError(error) {
    $("#msj").html(error);
}

function Validador(idform, rules, mensajes) {
    if (mensajes == undefined)
        mensajes = []
    var validator = $("#" + idform).validate({
        lang: "ES",
        ignore: 'input[type=hidden], .select2-search__field', // ignore hidden fields
        errorElement: 'span',
        errorPlacement: function (error, element) {
            error.addClass('invalid-feedback');
            element.closest('.form-group').append(error);
        },
        highlight: function (element, errorClass, validClass) {
            $(element).addClass('is-invalid');
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).removeClass('is-invalid');
        },
        rules: rules,
        messages: mensajes
    });
    return validator;
}

function ConfirmationModal(config, ajaxobj, elseconfirm) {
    swal({
        title: config.title,
        text: config.body,
        type: config.tipo,
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: false,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {
                $.ajax(ajaxobj);
            } else {
                if (elseconfirm != undefined)
                    elseconfirm();
            }
        });
}

function RenderTable(id, ncol, anchoColum, parametros, orden) {

    $.extend($.fn.dataTable.defaults, {
        columnDefs: [{
            targets: ncol,
            orderable: false
        }],
        "columns": anchoColum,
        autoWidth: false,
        "ordering": false,
        order: orden,
        //dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
        language: {
            search: 'Buscar: _INPUT_',
            lengthMenu: 'Mostrar: _MENU_ ',
            paginate: {
                first: 'Primero',
                last: 'Último',
                next: '&rarr;',
                previous: '&larr;'
            },

            zeroRecords: "No se encontraron resultados",
            emptyTable: "Ningún dato disponible en esta tabla",
            info: "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            infoEmpty: "Ningún dato disponible",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoPostFix: "",
            infoThousands: ",",
            loadingRecords: "Cargando...",
            aria: {
                sortAscending: ": Activar para ordenar la columna de manera ascendente",
                sortDescending: ": Activar para ordenar la columna de manera descendente"
            }
        }
    });

    if (parametros != null && parametros != undefined) {
        $('#' + id).DataTable(parametros);
    } else {
        // Basic datatable
        $('#' + id).DataTable();
    }

    //// Alternative pagination
    //$('.datatable-pagination').DataTable({
    //    pagingType: "simple",
    //    language: {
    //        "url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
    //    }
    //});


    // Datatable with saving state
    $('.datatable-save-state').DataTable({
        stateSave: true
    });


    // Scrollable datatable
    $('.datatable-scroll-y').DataTable({
        autoWidth: true,
        scrollY: 300
    });

    // External table additions
    // ------------------------------

    // Add placeholder to the datatable filter option
    $('.dataTables_filter input[type=search]').attr('placeholder', 'Búsqueda...');


    // Enable Select2 select for the length option
    $('.dataTables_length select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function AddRowsDataTable(id, data) {
    var table = $('#datatable-' + id).DataTable();
    table.row.add(data).draw(false);
    table.columns.adjust().draw();
}

function ClearDataTable(id) {
    var table = $('#datatable-' + id).DataTable();
    table.clear().draw();
}

function LimpiarChecbox(idform, valor) {
    var Params = $("#" + idform);
    $.each(Params, function (index, item) {
        $.each(item, function (index2, item2) {
            var input = $("#" + item2.id);
            if (input.is(':checkbox')) {
                 
                if (valor !== input.is(':checked')) {
                    input.trigger("click");
                } 
            }
            else {
                input.val("").trigger("change");
            }
        });
    });
}

function LimpiarOnlyCheckBox(idChkBox, valor) {
    var input = $("#" + idChkBox);
    if (input.is(':checkbox')) {
        input.prop('checked', valor);
        if (input.checked) {
            input.parent().addClass("checked")
        } else {
            input.parent().removeClass("checked");
        }
    }
}

function limpiarFormulario(idform, camposexluidos) {
    var arrayexcluidas = [];
    if (camposexluidos != null && camposexluidos != undefined) {
        $.each(camposexluidos, function (index, item) {
            arrayexcluidas.push({ "key": item, value: $("#" + item).val() });
        });
    }
    var Hid2 = $('#Hid').val();
    $("#" + idform)[0].reset();
    LimpiarChecbox(idform, false);
    $('#Hid').val(Hid2);


    $.each(arrayexcluidas, function (index, item) {
        $("#" + item.key).val(item.value).trigger("change");
    });

}

function IsNotEmpty(param) {
    return param != null && param != undefined && param != ""
}

function formatDate(date) {
    var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    return year + "-" + monthNames[monthIndex] + "-" + (day > 9 ? day : "0" + day);
}

function formatDateWithTime(date) {
    var monthNames = [
        "01", "02", "03",
        "04", "05", "06", "07",
        "08", "09", "10",
        "11", "12"
    ];

    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
    var hours = date.getHours();
    var min = date.getMinutes();
    return year + "-" + monthNames[monthIndex] + "-" + (day > 9 ? day : "0" + day) + " " + hours + ":" + min;
}

function Atras() {
    window.history.back();
}

function redondeaAlAlza(x, r) {
    x = x == "" ? 0 : x;
    xx = Math.trunc(x / r)
    xd = (x / r) - xx;
    if (xd >= 0.5)
        xx++;

    return (xx * r)
}

function JSONDateconverter(fecha, withtime, getjsdate, real) {
    var strdate = fecha.substr(6, fecha.length - 8);
    var myDate = "";
    if (real == true)
        myDate = NDateR(parseInt(strdate));
    else
        myDate = NDate(parseInt(strdate), withtime);
    if (getjsdate)
        return myDate;

    if (withtime)
        return formatDateWithTime(myDate);
    else
        return formatDate(myDate);
}

function stringMoneyFormat(value) {
    return '$ ' + value.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

}

function stringMoneyFormat2(value) {
    if (value == 0)
        return "$ 0";
    else
        return '$ ' + value.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

}

function stringFormatConPuntos(value) {
    if (value == 0)
        return "0";
    else
        return value.toFixed().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1.");

}

function formatMoneyToString(value) {
    return value.replace(/[^0123456789]/g, '');
}

function formatMoneyToNumber(value) {
    value = value.toString();
    if (value == "")
        value = "0";

    return parseFloat(value.replace(/[^0123456789]/g, ''));
}

function format(input) {
    var op = true;
    var num = input.value.replace(/[^0123456789]/g, '');
    num = redondeaAlAlza(num, 1000);
    if (!isNaN(num)) {
        if (num < 0) {
            op = false;
            num = num * -1;
        }
        input.value = stringMoneyFormat(num);
    }
    else {
        alert('Solo se permiten numeros');
        input.value = input.value.replace(/[^\d\.]*/g, '');
    }
}

function formatNum(input) {
    var op = true;
    var num = input.value.replace(/[^0123456789]/g, '');
    num = redondeaAlAlza(num, 1);
    if (!isNaN(num)) {
        if (num < 0) {
            op = false;
            num = num * -1;
        }
        input.value = stringFormatConPuntos(num);
    }
    else {
        alert('Solo se permiten numeros');
        input.value = input.value.replace(/[^\d\.]*/g, '');
    }
}

function soloNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    //-/()¡=)(/&%$#¿?.;_:
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz";
    especiales = "8-37-39-46";

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial) {
        return false;
    }
}

function groupBy(array, f) {
    var groups = {};
    array.forEach(function (o) {
        var group = JSON.stringify(f(o));
        groups[group] = groups[group] || [];
        groups[group].push(o);
    });
    return Object.keys(groups).map(function (group) {
        return groups[group];
    })
}

function IrInicio() {
    window.location.href = "/home";
}

String.prototype.capitalize = function () {
    var cadenas = this.split(" ");
    var result = "";
    for (var i = 0; i < cadenas.length; i++) {
        result += cadenas[i].charAt(0).toUpperCase() + cadenas[i].slice(1).toLowerCase() + " ";
    }
    return result;
}

function VerPDF(tipo, id) {
    var formURL = '/report?tipo=' + tipo + "&Id=" + id;
    window.open(formURL, "_blank");
}

function DescargarPDF(tipo, id) {
    var formURL = '/report?tipo=' + tipo + "&Id=" + id + "&View=true";
    window.open(formURL, "_black");
}

function GenerarTokenFirma(formURL, swalsetup, callbackswalsuccess, callbackajaxerror, mensaje, Devo) {
    ShowLoading();
    if (callbackswalsuccess == undefined) {
        callbackswalsuccess = function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("Por favor ingrese un valor valido!");
                return false
            }

            if (callback != undefined) {
                callback();
            }
            //EnviarSolicitudSolicitud(formURL2, form_data, inputValue);
        }
    }

    $.ajax(
        {
            url: formURL,
            content: "application/json; charset=utf-8",
            type: "GET",
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (data) {
                console.log(data);
                CloseLoading();
                if (!data.Is_Error) {
                    swal({
                        title: "<label  style='font-weight: bold;color:#ff6a00;' >¡Codigo generado!</label>",
                        text: mensaje != undefined && mensaje != "" && mensaje != null ? mensaje : data.Msj != "" && isNaN(data.Msj) ? data.Msj : "<label style='font-weight: bold; color:#004b87;' >Se ha enviado a su correo el código electrónico para que firme la solicitud, por favor ingréselo aquí.</label>",
                        type: "input",
                        html: true,
                        showCancelButton: true,
                        closeOnConfirm: Devo == true ? true : false,
                        confirmButtonText: "Aceptar",
                        cancelButtonText: "Cancelar",
                        animation: "slide-from-top",
                        inputPlaceholder: "Ingrese Token"
                    },
                        callbackswalsuccess
                    );

                } else {
                    if (callbackajaxerror == undefined) {
                        swal({
                            title: "¡Advertencia!",
                            text: data.Msj,
                            html: true,
                            confirmButtonColor: "#66BB6A",
                            type: "warning"

                        });
                    } else {
                        callbackajaxerror();
                    }
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                swal("¡Error!", errorThrown, "error");
                CloseLoading();
            }
        });

}

function sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

function esconde_Clase(c) {
    var Sec = document.getElementsByClassName(c);
    for (var i = 0; i < Sec.length; i++) {
        Sec[i].style.display = "none";
    }
}

function visible_Clase(c) {
    var Sec = document.getElementsByClassName(c);
    for (var i = 0; i < Sec.length; i++) {
        Sec[i].style.display = "block";
    }
}

function visible_Clase_Inline(c) {
    var Sec = document.getElementsByClassName(c);
    for (var i = 0; i < Sec.length; i++) {
        Sec[i].style.display = "inline-block";
    }
}

function esconde_elemento(x) {
    var elemento = document.getElementById(x);
    elemento.style.display = 'none';
}

function visible_elemento(x) {
    var elemento = document.getElementById(x);
    elemento.style.display = 'block';
}

function visible_elemento_Inline(x) {
    var elemento = document.getElementById(x);
    elemento.style.display = 'inline-block';
}

function validarReload() {
    var T = $('.reloadValue').val();
    if (T == 1) {
        $('.reloadValue').val("")
        $('.reloadValue').css("display", "none");
    }
    else {
        $('.reloadValue').css("display", "blok");
        $('.reloadValue').val("1")
        location.reload();
    }
}

function ToTimeString(objtime) {
    var str = "";
    var hora = "";
    var min = "";
    var meridian = "AM";
    if (objtime.Hours > 11)
        meridian = "PM";
    if (objtime.Hours > 12)
        hora = objtime.Hours - 12 < 10 ? "0" + (objtime.Hours - 12) : "" + objtime.Hours - 12
    else
        hora = objtime.Hours < 10 ? "0" + (objtime.Hours) : "" + objtime.Hours

    min = objtime.Minutes < 10 ? "0" + objtime.Minutes : "" + objtime.Minutes

    return hora + ":" + min + " " + meridian;
}

var DatosCargue = "";
function InformeGC() {
    if (DatosCargue == "") {
        swal({
            title: "¡advertencia!",
            text: "No se genero un informe valido.",
            confirmButtonColor: "#ab2328",
            type: "error",
            closeOnConfirm: true,
        });
    } else {

        var formURL = '/CargarData/Get_HistorialCargue?NumCargue=' + DatosCargue;
        $.ajax({
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var DatosCargueHC = data;
                console.log(DatosCargueHC);
                DatosCargueHC.FechaRegistro = moment(new Date(DatosCargueHC.FechaRegistro.match(/\d+/)[0] * 1)).format("YYYY-MM-DD   hh:ss ");

                var formulario = "";
                formulario += "   <div class='box-content'>";
                formulario += "      <div class='form-horizontal' id='defaultForm'>";
                formulario += "        <div class='form-group  col-xs-offset-1 col-xs-10 ' id='codCargo'>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Tipo:</strong></label>  <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.DesTipoCargue + "</label>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Usuario:</strong></label>  <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.Username + "</label>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Nombre:</strong></label>  <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.Nombre + " " + DatosCargueHC.Apellido + "</label>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Fecha:</strong></label> <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.FechaRegistro + "</label>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Total Registros:</strong></label> <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.TotalRegistros + "</label>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Total Reg. Procesados:</strong></label>  <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.RegProcesados + "</label>";
                formulario += "            <label class='col-sm-6 control-label text-left'><strong>	Total Reg. No Procesados:</strong></label>  <label class='col-sm-6 control-label text-left'>" + DatosCargueHC.RegNoProcesados + "</label>";
                formulario += "        </div>";
                formulario += "      </div>";
                formulario += "   </div>";

                var id = '"form-modal"';
                var nombPropiedad = 'margin-top';
                var valPropiedad = '110px';

                OpenModalBox('Informe general de cargue', formulario, "", "bg-warning-900", null, nombPropiedad, valPropiedad);

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });


    }
}

function SetUrlForQuery(stringrelativeserver) {
    console.log(window.location.origin);
    //if (stringrelativeserver !== undefined && stringrelativeserver !== ""){
    //    stringrelativeserver.substr(1, stringrelativeserver.length);
    //}
    return window.location.origin + stringrelativeserver;
}

function RecortarTexto(Valor, NumCar) {
    var NumOrg = Valor.length;
    var Texto = Valor.substr(0, NumCar);

    if (Texto.length != NumOrg)
        Texto += "...";

    return Texto;
}

function Get_Years(A1, A2, Id) {
    var fecha = new Date();
    var YearActual = parseInt(fecha.getFullYear());
    var ListaYear = [];

    for (var i = (YearActual); i < (YearActual + A2); i++) {
        ListaYear.push(i);
    }

    for (var i = YearActual; i >= (YearActual - A1); i--) {
        ListaYear.push(i);
    }

    ListaYear = ListaYear.sort(comparar);
    Set_Years(ListaYear, Id);
    return ListaYear;

}

function Set_Years(Lista, Id) {
    var html_rol = '';
    $.each(Lista, function (key, value) {
        html_rol += '<option value="' + value + '">' + value + '</option>';
    });
    $('#' + Id).html(html_rol);
    $('#' + Id).val("");
    $('#' + Id).select2();
}

function Get_Meses(Num, Id) {

    var ListaMesesString = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var html_rol = '';
    $.each(ListaMesesString, function (key, value) {
        if (key <= Num)
            html_rol += '<option value="' + value + '">' + value + '</option>';
    });

    $('#' + Id).html(html_rol);
    $('#' + Id).val("");
    $('#' + Id).select2();
}

function comparar(b, a) { return a - b; }

function Set_Estampillas(Lista, Id, ListaDefaull) {
    var html_rol = '';
    $.each(Lista, function (key, value) {
        html_rol += '<option  value="' + value.Tipo + ';' + value.Valor + '">' + value.Descripcion + '</option>';
    });

    $('#' + Id).html(html_rol);
    $('#' + Id).val("");
    $('#' + Id).select2();

    SelectDefaul = [];
    $.each(ListaDefaull, function (key, value) {
        SelectDefaul.push(value.Tipo + ';' + value.Valor);
    });

    $('#' + Id).val(SelectDefaul).trigger("change");
}

function fireMouseEvents(query, eventNames) {
    var element = document.querySelector(query);
    if (element && eventNames && eventNames.length) {
        for (var index in eventNames) {
            var eventName = eventNames[index];
            if (element.fireEvent) {
                element.fireEvent('on' + eventName);
            } else {
                var eventObject = document.createEvent('MouseEvents');
                eventObject.initEvent(eventName, true, false);
                element.dispatchEvent(eventObject);
            }
        }
    }
}

function VerSolicitud(IdSolicitud, IdDevo, IdTipoSolEsp, OpcionRevisar) {

    var formURL = '/RevisionSolicitudDevoluciones/VerSolicitudDellates?IdSolicitud=' + IdSolicitud + '&IdTipoSol=' + IdTipoSolEsp + '&IdDevo=' + IdDevo;
    ShowLoading();
    $.ajax(
        {
            url: formURL,
            content: "application/json; charset=utf-8",
            type: "POST",
            dataType: "json",
            contentType: false,
            processData: false,
            success: function (data) {
                CloseLoading();
                ObjetoSolicitud = data.Objeto;
                if (ObjetoSolicitud.Devoluciones[0].UsuarioRevisor == ObjetoSolicitud.Revisor.IdUsuario || OpcionRevisar==true) {
                    window.location.href = '/RevisionSolicitudDevoluciones/VerSolicitudDevolucion?IdSolicitud=' + IdSolicitud + '&IdDevo=' + IdDevo + '&IdTipoSol=' + IdTipoSolEsp;
                }
                else {
                    swal({
                        title: "¡Atención!",
                        text: "La solicitud fue reasignada a otro funcionario. Se actualizara la interfaz para que desaparezca de sus PENDIENTES.",
                        confirmButtonColor: "#66BB6A",
                        type: "warning",
                    }, function (isconfirm) {
                        if (isconfirm) {

                            window.location.reload(false);
                        }
                    });

                }

            }
        });
}

function AprobarSolicitudDevolucion(IdDevo) {

    swal({
        title: "¡Atención!",
        text: "¿Esta seguro que desea aceptar el desistimiento de esta solicitud? ",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    },
        function (isConfirm) {
            if (isConfirm) {

                var formURL = '/RevisionSolicitudDevoluciones/AprobarSolicitudDesistimiento?IdDevo=' + IdDevo;
                ShowLoading();
                $.ajax(
                    {
                        url: formURL,
                        content: "application/json; charset=utf-8",
                        type: "POST",
                        dataType: "json",
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            CloseLoading();
                            if (!data.Is_Error) {
                                swal({
                                    title: "¡Solicitud desistida!",
                                    text: "Usted acaba de aceptar el desistimiento solicitado por el contribuyente para esta solicitud de Devolución y/o Compensación. A partir de este momento queda anulado cualquier proceso de revisión iniciado para esta solicitud.",
                                    confirmButtonColor: "#66BB6A",
                                    type: "success",
                                }, function (isconfirm) {
                                    if (isconfirm) {

                                        window.location.reload(false);
                                        //window.location.href = '/Devolucion/AsignacionSolicitudes';
                                    }
                                });


                            } else {
                                swal({
                                    title: "¡Advertencia!",
                                    text: data.Msj,
                                    html: true,
                                    confirmButtonColor: "#66BB6A",
                                    type: "warning"
                                }, function (isconfirm) {
                                    if (isconfirm) {

                                        window.location.reload(false);
                                    }
                                });
                            }
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            console.log(errorThrown);
                            CloseLoading();
                        }
                    });


            }
        });


}

function Ver_ActaCPF(IdActa) {

    var formURL = '/ActaFiscalizacion/Get_ActaFByIdActa?Id=' + IdActa;
    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.Is_Error) {

                    Acta = data.Objeto;
                    Acta.FechaReg = moment(new Date(Acta.FechaReg.match(/\d+/)[0] * 1)).format("YYYY-MM-DD");

                    var formulario = "";
                    formulario += " <div class='box-content' >";

                    formulario += "<div class='col-xs-12'>";
                    formulario += "    <div class='row' >";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Programa</label><label class='col-sm-9 control-label text-lfet' id='txtProgramaSCPF2' >" + Acta.NroProgramaF + " - " + Acta.Nom_Programa + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Acta</label><label class='col-sm-9 control-label text-lfet' id='txtActaPF2' >" + Acta.NroActa + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Fecha del acta</label><label class='col-sm-9 control-label text-lfet' id='txtFechaActaSC2' >" + Acta.FechaReg + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Tipo de declaración</label><label class='col-sm-9 control-label text-lfet' id='txtTipoDeclaSC2' >" + Acta.Des_TipoDecla + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Periodicidad</label><label class='col-sm-9 control-label text-lfet' id='txtPeriodicidadSC2' >" + Acta.Des_Periodicidad + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Año Gravable</label><label class='col-sm-9 control-label text-lfet' id='txtYearGravableSC2' >" + Acta.Year + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Periodo</label><label class='col-sm-9 control-label text-lfet' id='txtPeriodoSC2' >" + Acta.Periodo + "</label>";
                    formulario += "    </div>";
                    formulario += "</div>";

                    formulario += "</div>";

                    var botones = "<button id='event_cancel' onclick='CloseModalBox();' type='button' class='btn btn-xs btn-danger bg-danger-900'>Cancelar</button>";


                    OpenModalBox('Detalle', formulario, botones, "bg-warning-900", "modal-ms", "margin-top", "100px");


                } else {
                    alert("Pailas");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });



};

function VerInfoContribuyenteById(IdContribuyente) {


    var formURL = '/ContribuyenteFiscalizacion/GetContribuyenteById?Id=' + IdContribuyente;
    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.Is_Error) {

                    Expd = data.Objeto;
                    Expd.Fecha_Reg_Acta = moment(new Date(Expd.Fecha_Reg_Acta.match(/\d+/)[0] * 1)).format("YYYY-MM-DD");
                    Expd.Fecha_Reg_DocumentoF = moment(new Date(Expd.Fecha_Reg_DocumentoF.match(/\d+/)[0] * 1)).format("YYYY-MM-DD");
                    Expd.Des_Periodicidad = Expd.Des_Periodicidad != null ? Expd.Des_Periodicidad : "N/A";

                    var formulario = "";
                    formulario += " <div class='box-content' >";

                    formulario += "<div class='col-xs-12'>";
                    formulario += "    <div class='row' >";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Programa</label><label class='col-sm-9 control-label text-lfet' id='txtProgramaSCPF2' >" + Expd.NroProgramaF + " - " + Expd.Nom_ProgramaF + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Acta</label><label class='col-sm-9 control-label text-lfet' id='txtActaPF2' >" + Expd.NroActa + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Fecha del acta</label><label class='col-sm-9 control-label text-lfet' id='txtFechaActaSC2' >" + Expd.Fecha_Reg_Acta + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Tipo de declaración</label><label class='col-sm-9 control-label text-lfet' id='txtTipoDeclaSC2' >" + Expd.Des_TipoDecla + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Periodicidad</label><label class='col-sm-9 control-label text-lfet' id='txtPeriodicidadSC2' >" + Expd.Des_Periodicidad + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Año Gravable</label><label class='col-sm-9 control-label text-lfet' id='txtYearGravableSC2' >" + Expd.Year + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Periodo</label><label class='col-sm-9 control-label text-lfet' id='txtPeriodoSC2' >" + Expd.Periodo + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>N°. Dcto. Selección</label><label class='col-sm-9 control-label text-lfet' id='txtNroDFC2' >" + Expd.NroDocumentoF + "</label>";
                    formulario += "        <label class='col-sm-3 control-label text-left'>Fecha Dcto</label><label class='col-sm-9 control-label text-lfet' id='txtFechaRegDFC2' >" + Expd.Fecha_Reg_DocumentoF + "</label>";
                    formulario += "    </div>";
                    formulario += "</div>";
                    formulario += "</div>";

                    var botones = "<button id='event_cancel' onclick='CloseModalBox();' type='button' class='btn btn-xs btn-danger bg-danger-900'>Cancelar</button>";


                    OpenModalBox('Detalle', formulario, botones, "bg-warning-900", "modal-ms", "margin-top", "100px");


                } else {
                    alert("Pailas");
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });


}

function ActivarSelectContribuyenteSCF() {

    $('.ContribuyentesSelect').select2({
        ajax: {
            url: "/ContribuyenteFiscalizacion/GetContribuyenteSCF",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    Nit: params.term
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Contribuyentes = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    data[i] = { id: data[i].Identif_Tributaria, text: data[i].Identif_Tributaria + " - " + data[i].Contribuyente };
                }
                return {
                    results: data,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });

    $('.ContribuyentesSelect').text("");

};

function GetTipoResolucion() {

    var formURL = '/NormalizacionCartera/GetTipoResolucion';

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {

                TipoResolucion = data.Objeto;
                var html_Resolucion = "";
                html_Resolucion = '<option value="">Seleccionar</option>';

                jQuery.each(TipoResolucion, function (key, value) {

                    html_Resolucion += '<option value="' + value.Codigo + '">' + value.Descripcion + '</option>';
                });
                $(".TipoResolucion").html(html_Resolucion);
                $(".TipoResolucion").select2({ placeholder: "Tipo de resolución" });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });

};

function GetTipoNormalizacion() {

    var formURL = '/NormalizacionCartera/GetTipoNormalizacion';

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {

                tipoNormalizacion = data.Objeto;
                var html_Normalizacion = "";
                html_Normalizacion = '<option value="" >Seleccionar</option>';

                jQuery.each(tipoNormalizacion, function (key, value) {

                    html_Normalizacion += '<option value="' + value.Codigo + '">' + value.Descripcion + '</option>';
                });
                $(".CboTipoNorma").html(html_Normalizacion);
                $(".CboTipoNorma").select2({ placeholder: "Tipo de normalización" });

            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });

};

function GetImpuesto() {
    ShowLoading();
    var formURL = '/NormalizacionCartera/GetImpuesto';

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                CloseLoading();
                Impuesto = data.Objeto;
                var html = "";
                html += "<option value=''>Seleccionar</option>";
                jQuery.each(Impuesto, function (key, value) {

                    html += '<option value="' + value.CodImpuesto + '">' + value.DesImpuesto + '</option>';
                });

                $(".CboImpuesto").html(html);
                $(".CboImpuesto").select2({
                    placeholder: "Impuesto"
                });


            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });

};

function GetImpuestoSelect() {
    ShowLoading();
    var formURL = '/NormalizacionCartera/GetImpuesto';

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                CloseLoading();
                Impuesto = data.Objeto;
                var html = "<option value=''>Seleccionar</option>";

                jQuery.each(Impuesto, function (key, value) {

                    html += '<option value="' + value.CodImpuesto + '">' + value.DesImpuesto + '</option>';
                });

                $(".CboImpuesto").html(html);
                $(".CboImpuesto").select2({ placeholder: "Impuesto" });


            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });

};

function SeleccionarContribuyente() {
    $(".CboContribuyenteNc").select2({
        ajax: {
            url: "/Solicitud/GetSolicitudContainNroORNombre",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, tipo: "APROBADA-CANCELADO"
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Contribuyentes = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    data[i] = { id: data[i].Identif_Tributaria, text: data[i].Identif_Tributaria + " - " + data[i].Contribuyente };
                }
                return {
                    results: data,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        allowClear: true,
        placeholder: { id: "", text: "Seleccionar" },
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });
};

function SeleccionarContribuyenteTOTAL() {
    $(".CboContribuyenteNc").select2({
        ajax: {
            url: "/Solicitud/GetContribuyenteTotal",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, tipo: "APROBADA-CANCELADO"
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Contribuyentes = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    data[i] = { id: data[i].Identif_Tributaria, text: data[i].Identif_Tributaria + " - " + data[i].Contribuyente };
                }
                return {
                    results: data,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        allowClear: true,
        placeholder: { id: "", text: "Seleccionar Contribuyente" },
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });
};

function SeleccionarContribuyenteSolicitud() {
    $(".CboContribuyenteIdSol").select2({
        ajax: {
            url: "/Solicitud/GetSolicitudContainNroORNombre",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term, tipo: "APROBADA-CANCELADO"
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Contribuyentes = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    data[i] = { id: data[i].IdSolicitud, text: data[i].Identif_Tributaria + " - " + data[i].Contribuyente };
                }
                return {
                    results: data,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        allowClear: true,
        placeholder: { id: "", text: "Seleccionar" },
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });
};

function GetFuncionarioByPermiso(permiso, IdUsuarioExc) {
    var Funcionario = [];
    var formURL = '/NormalizacionCartera/GetFuncionarioRevisor?Permiso=' + permiso;

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {

                Funcionario = data.Objeto;
                var htmlFuncio = "";
                htmlFuncio = '<option value="" >Seleccionar</option>';
                jQuery.each(Funcionario, function (key, value) {
                    if (IdUsuarioExc != value.IdUsuario)
                        htmlFuncio += '<option value="' + value.IdUsuario + '">' + value.Nombre + " " + value.Apellido + '</option>';
                });

                $(".CboFuncionario").html(htmlFuncio);
                $(".CboFuncionario").select2();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });
};

function ActivarSelectAuditoresSCF() {

    $('.AuditoresSelect').select2({
        ajax: {
            url: "/ContribuyenteFiscalizacion/GetAuditoresSCF",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    Nit: params.term
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Contribuyentes = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    data[i] = { id: data[i].IdUsuario, text: data[i].Username + " - " + data[i].Nombre };
                }
                return {
                    results: data,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });

    $('.AuditoresSelect').text("");

};

function ActivarSelectExpedienteSCF() {

    $('.ExpedientesSelect').select2({
        ajax: {
            url: "/GestionExpediente/GetExpedienteSCF",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    Nit: params.term
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Contribuyentes = JSON.parse(JSON.stringify(data));
                for (var i = 0; i < data.length; i++) {
                    data[i] = { id: data[i].NroExpedienteF, text: data[i].NroExpedienteF };
                }
                return {
                    results: data,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });

    $('.ExpedientesSelect').text("");
};

function GetProgramaByNro(NroPF) {

    var formURL = '/ProgramaFiscalizacion/Get_ProgramaFByNro?Nro=' + NroPF;
    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                if (!data.Is_Error) {
                    var Programa = data.Objeto;
                    MostrarInfoPrograma(Programa);
                } else {
                    swal({
                        title: "¡Advertencia!",
                        text: data.Msj,
                        confirmButtonColor: "#66BB6A",
                        type: "error",
                        html: true
                    });
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });

};

function MostrarInfoPrograma(Programa) {
    $(".InfoPrograma").text("Programa: " + Programa.NroProgramaF.trim() + "  -  " + Programa.Nombre.trim());
    Programa.FechaReg = moment(new Date(Programa.FechaReg.match(/\d+/)[0] * 1)).format("YYYY-MM-DD");
    $(".InfoPrograma2").text("Creado el: " + Programa.FechaReg);
}

function ValidarMesAutoInNamisorioFunci(Devolucions) {


    var formURL = '/RevisionSolicitudDevoluciones/ValidarMesVencidoActoInamisorio'
    var Vencimientos = JSON.stringify(Devolucions);
    var form_data = new FormData();
    form_data.append("TiempoVencidoDevolucion", Vencimientos);
    $.ajax(
        {
            url: formURL,
            content: "application/json; charset=utf-8",
            type: "POST",
            dataType: "json",
            data: form_data,
            contentType: false,
            processData: false,
            success: function (data) {
                var DevolucionesValidacionAutoInadmisorios = data.Objeto;

                if (data.Msj == "True")
                    location.reload();

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                CloseLoading();
            }
        });


}

function PdfObligacionByNumero(Nro) {
    var decla = [];
    var formURL = '/RevisionSolicitudDevoluciones/GetObligacion?Nro=' + Nro;
    $.ajax({
        url: formURL,
        type: "GET",
        dataType: "json",
        success: function (data) {
            decla = data.Objeto;
            $.each(decla, function (index, item) {
                PDF = '/report?tipo=' + item.Codigo + "&Id=" + item.Id_Declaracion;
                window.open(PDF, "_blank");

            })
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(errorThrown);
        }
    });


}

function VerActosNormalizados(NroObligaciones) {
    var ArrayNros = [];
    if (typeof NroObligaciones == 'string') {
        ArrayNros.push(NroObligaciones);
    } else if (typeof NroObligaciones == 'object') {
        ArrayNros = NroObligaciones;
    }

    //if (NroObligaciones.length > 1)
    //    ArrayNros = NroObligaciones;
    //else


    var formURL = '/NormalizacionCartera/GetNormalizacionByNro';
    var form_data = new FormData();
    var ObligacioNros = JSON.stringify(ArrayNros);
    form_data.append("ObligacionesNro", ObligacioNros);

    ShowLoading();
    $.ajax(
        {
            url: formURL,
            content: "application/json; charset=utf-8",
            type: "POST",
            dataType: "json",
            data: form_data,
            contentType: false,
            processData: false,
            success: function (data) {
                if (!data.Is_Error) {
                    CloseLoading();
                    MultiPdfNormalizacion(data.Objeto);

                } else {
                    CloseLoading();

                    swal({
                        title: "¡Error!",
                        text: data.Msj,
                        type: "error",
                        confirmButtonClass: "btn-danger",
                        confirmButtonText: "ACEPTAR ",
                        closeOnConfirm: true,
                    });
                }

            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });
}

function MultiPdfNormalizacion(ListId) {
    var formURL = '/Report/NormalizacionCarteraReport?Ids=' + ListId;
    window.open(formURL, "_blank");
}

function FormatoConPuntosSinRedPA(input) {
    var num = input.value.replace(/\./g, '');
    if (num == "0") {
        var aux = parseInt(num, 0);
        num = aux;
    }
    var op = true;
    num = num == "" ? "0" : num.toString();
    num = num.replace(/[.]/gi, "");
    if (!isNaN(num)) {
        if (num < 0) {
            op = false;
            num = num * -1;
        }
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
        num = num.split('').reverse().join('').replace(/^[\.]/, '');
        num = op ? num : "-" + num;
    } else {
        num = "0";
        num = num.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g, '$1.');
    }
    $("#" + input.id).val(num);
}

function setTwoNumberDecimal(input) {
    input.value = parseFloat(input.value == "" ? 0 : input.value).toFixed(2);
}

function setNumberDecimal(input, decimales) {
    input.value = parseFloat(input.value == "" ? 0 : input.value).toFixed(decimales);
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        };
    };
    return 0;
};

function getPivotArray(dataArray, rowIndex, colIndex, dataIndex) {

    var result = {}, ret = [];
    var newCols = [];
    for (var i = 0; i < dataArray.length; i++) {

        if (!result[dataArray[i][rowIndex]]) {
            result[dataArray[i][rowIndex]] = {};
        }
        result[dataArray[i][rowIndex]][dataArray[i][colIndex]] = dataArray[i][dataIndex];

        //To get column names
        if (newCols.indexOf(dataArray[i][colIndex]) == -1) {
            newCols.push(dataArray[i][colIndex]);
        }
    }

    newCols.sort();
    var item = [];

    //Add Header Row
    item.push('Item');
    item.push.apply(item, newCols);
    ret.push(item);

    //Add content 
    for (var key in result) {
        item = [];
        item.push(key);
        for (var i = 0; i < newCols.length; i++) {
            item.push(result[key][newCols[i]] || "-");
        }
        ret.push(item);
    }
    return ret;
}

function GetContribuyenteRefCatastral() {
    $('.ReferenciaC').select2({
        ajax: {
            url: "/Predial/GetPredioByRefAndDireccion",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                return {
                    q: params.term
                };
            },
            processResults: function (data, params) {
                params.page = params.page || 1;
                Predios = JSON.parse(JSON.stringify(data.Objeto));
                for (var i = 0; i < data.Objeto.length; i++) {
                    data.Objeto[i] = { id: data.Objeto[i].NumeroPredio, text: data.Objeto[i].NumeroPredio + " - " + data.Objeto[i].Direccion };
                }
                return {
                    results: data.Objeto,
                    pagination: {
                        more: (params.page * 10) < data.count_filtered
                    }
                };
            },
            cache: true
        },
        allowClear: true,
        placeholder: "Escriba para buscar...",
        minimumInputLength: 1,
        language: {
            errorLoading: function () {
                return "La carga falló";
            },
            inputTooLong: function (e) {
                var t = e.input.length - e.maximum, n = "Por favor, elimine " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            inputTooShort: function (e) {
                var t = e.minimum - e.input.length, n = "Por favor, introduzca " + t + " car"; return t == 1 ? n += "ácter" : n += "acteres", n;
            },
            loadingMore: function () {
                return "Cargando más resultados…";
            },
            maximumSelection: function (e) {
                var t = "Sólo puede seleccionar " + e.maximum + " elemento"; return e.maximum != 1 && (t += "s"), t;
            },
            noResults: function () {
                return "No se encontraron resultados";
            },
            searching: function () {
                return "Buscando…";
            }
        }
    });

}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

/// se debe crear una funcion con el nombre DataModalActoYFechas para obtener los datos
function ShowMaestroCitacionesCobro(Expediente) {


    var formulario = "";
    formulario += "   <div class='box-content'>";
    formulario += "      <div class='form-horizontal'>";

    formulario += "        <div class='form-group'>";
    formulario += "            <label class='col-sm-3 control-label text-left'>Actuaciones</label>";
    formulario += "            <div class='col-sm-9'>";
    formulario += "<select class='form-control TipoActo' id='SelectTipoActo' name='SelectTipoActo'></select>"
    formulario += "            </div>";
    formulario += "        </div>";


    formulario += "        <hr>";
    formulario += "            <label class='col-sm-3 control-label text-left'>Fechas de Actuaciones</label>";
    formulario += "        <div class='col-xs-8'>";
    formulario += "        <div class='col-xs-6'>";
    formulario += "            <label class='col-sm-12 control-label text-left'>Fecha desde</label>";

    formulario += "               <input type='text' class='form-control pickdate' id='txtFechaInicio' name='txtFechaInicio' >";

    formulario += "            </div>";
    formulario += "        <div class='col-xs-6'>";
    formulario += "            <label class='col-sm-12 control-label text-left' >Fecha hasta</label>";

    formulario += "               <input type='text' class='form-control pickdate' id='txtFechaVencimiento' name='txtFechaVencimiento' >";

    formulario += "            </div>";
    formulario += "        </div>";
    formulario += "        <br/>";
    formulario += "        <br/>";
    formulario += "        <br/>";




    formulario += "        <div class='text-center' id='div_msj'>";
    formulario += "            <p id='msj' style='color: red; font-size: 11px;'></p>";
    formulario += "        </div>";
    formulario += "        </div>";
    formulario += "        <input type='hidden' id='Hid' name='Hid' value=0 />";

    //Version Fisco Campo Oculto.

    formulario += "        <div class='col-xs-12'></div>";
    var id = '"form-modal"';
    var botones = "";
    botones += "<button id='event_cancel' onclick='CloseModalBox();' type='button' class='btn btn-xs btn-danger bg-danger-900'>Cancelar</button>";
    botones += "<button type='button' onclick='DataModalActoYFechas();' class='btn btn-xs btn-primary bg-primary-900'>Guardar</button>";
    var nombPropiedad = 'margin-top';
    var valPropiedad = '110px';

    OpenModalBox(('Generación de Citaciones'), formulario, botones, "bg-warning-900", null, nombPropiedad, valPropiedad);
    GetTiposDeActosCobros("TipoActo", "400");

    form_Validator = Validador("form-modal", {

        SelectTipoActo: {
            required: true,
            //caracterCampo: true

        },
        txtFechaInicio: {
            required: true
        },
        txtFechaVencimiento: {
            required: true
        }


    });

    $(".pickdate").pickadate(seleccionFecha);




}

function ShowMaestroAcoByActobyFechas(title) {


    var formulario = "";
    formulario += "   <div class='box-content'>";
    formulario += "      <div class='form-horizontal'>";
    formulario += "            <label class='col-sm-4 control-label text-left'>Fechas de Actuaciones</label>";
    formulario += "        <div class='col-xs-8'>";
    formulario += "        <div class='col-xs-6'>";
    formulario += "            <label class='col-sm-12 control-label text-left'>Fecha desde</label>";

    formulario += "               <input type='text' class='form-control pickdate' id='txtFechaInicio' name='txtFechaInicio' >";

    formulario += "            </div>";
    formulario += "        <div class='col-xs-6'>";
    formulario += "            <label class='col-sm-12 control-label text-left' >Fecha hasta</label>";

    formulario += "               <input type='text' class='form-control pickdate' id='txtFechaVencimiento' name='txtFechaVencimiento' >";

    formulario += "            </div>";
    formulario += "        </div>";
    formulario += "        <br/>";
    formulario += "        <br/>";
    formulario += "        <br/>";




    formulario += "        <div class='text-center' id='div_msj'>";
    formulario += "            <p id='msj' style='color: red; font-size: 11px;'></p>";
    formulario += "        </div>";
    formulario += "        </div>";
    formulario += "        <input type='hidden' id='Hid' name='Hid' value=0 />";

    //Version Fisco Campo Oculto.

    formulario += "        <div class='col-xs-12'></div>";
    var id = '"form-modal"';
    var botones = "";
    botones += "<button id='event_cancel' onclick='CloseModalBox();' type='button' class='btn btn-xs btn-danger bg-danger-900'>Cancelar</button>";
    botones += "<button type='button' onclick='DataModalActoYFechas();' class='btn btn-xs btn-primary bg-primary-900'>Guardar</button>";
    var nombPropiedad = 'margin-top';
    var valPropiedad = '110px';

    OpenModalBox(title, formulario, botones, "bg-warning-900", null, nombPropiedad, valPropiedad);
    // GetTiposDeActosComunicados("TipoActo", "400");

    form_Validator = Validador("form-modal", {




    });

    $(".pickdate").pickadate(seleccionFecha);
}

//function GetTiposDeActosComunicados(IdHtml) {
//    var formURL = '/Actos/Get_ActosCobros';

//    $.ajax(
//        {
//            url: formURL,
//            type: "GET",
//            dataType: "json",
//            success: function (data) {
//                CloseLoading();
//                Impuesto = data.Objeto;
//                var html = "<option value=''>Seleccionar</option>";

//                jQuery.each(Impuesto, function (key, value) {
//                    if (value.Codigo == '404' || value.Codigo == '413') {
//                        html += '<option value="' + value.Codigo + '">' + value.Nombre + '</option>';
//                    }
//                });

//                $("." + IdHtml).html(html);
//                $("." + IdHtml).select2();


//            },
//            error: function (jqXHR, textStatus, errorThrown) {
//                CloseLoading();
//                console.log(errorThrown);
//            }
//        });

//};

function GetTiposDeActosCobros(IdHtml, DataDiferente) {
    ShowLoading();
    var formURL = '/Actos/Get_ActosCobros';

    $.ajax(
        {
            url: formURL,
            type: "GET",
            dataType: "json",
            success: function (data) {
                CloseLoading();
                Impuesto = data.Objeto;
                var html = "<option value=''>Seleccionar</option>";

                jQuery.each(Impuesto, function (key, value) {
                    if (value.Codigo != DataDiferente) {
                        html += '<option value="' + value.Codigo + '">' + value.Nombre + '</option>';
                    }
                });

                $("." + IdHtml).html(html);
                $("." + IdHtml).select2();


            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });

};

function setCookieGeneral(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookieGeneral(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function ValidarContribuyente(identificacion) {
    var rep = getCookieGeneral('representado');
    var obj = JSON.parse(Base64.decode(rep));
    var retorno = obj.Identif_Tributaria == identificacion;
    return retorno;
}

function RecargarContribuyente() {
    swal({
        title: "¡Atención!",
        text: "Usted ha realizado un cambio de contribuyente, la página se actualizará automáticamente.",
        type: "warning",
        showCancelButton: false,
        confirmButtonColor: "#EF5350",
        confirmButtonText: "OK",
        closeOnConfirm: true
    });
    setTimeout(function () { window.location.reload(); }, 5000);
}


