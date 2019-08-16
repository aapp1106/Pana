$(document).ready(function () {
    RenderTable('datatable-Resultados', [0, 1, 2, 3, 4, 5], null, {
        "paging": true,
        "ordering": true,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        //dom: 'frtip',

        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b><i class=' icon-download4 position-left'></i></b>Excel ",
                filename: "Aqui el nombre",
                titleAttr: 'Excel',
            },

        ]
    });
    tabla_User = $('#datatable-Resultados').DataTable();

    RenderTable('datatable_CantidadVotantesReferentes', [0, 1, 2], null, {
        "ordering": false,
        "info": true,
        "searching": true,
        "dom": '<"top"flB>rt<"bottom"ip><"clear">',
        buttons: [
            {
                extend: 'excelHtml5',
                text: " <b><i class=' icon-download4 position-left'></i></b>Excel ",
                filename: "Cantidad Votos por comuna y referente",
                titleAttr: 'Excel',
            },

        ]

    });
    tabla_CantidadVotantesReferentes = $('#datatable_CantidadVotantesReferentes').DataTable();

    //var sparklineCharts = function () {
    //    $("#sparkline6").sparkline([5, 3], {
    //        type: 'bar',
    //        height: '140',
    //        sliceColors: ['#1ab394', '#F5F5F5']
    //    });
    //};

    //var sparkResize;

    //$(window).resize(function (e) {
    //    clearTimeout(sparkResize);
    //    sparkResize = setTimeout(sparklineCharts, 500);
    //});

    //sparklineCharts();

    

    //var mem = $('#Fech .input-group.date').datepicker({
    //    todayBtn: "linked",
    //    keyboardNavigation: false,
    //    forceParse: false,
    //    calendarWeeks: true,
    //    autoclose: true
    //});
    
    //Get_Puestos();
    //estadisticas();
    //get_grafica();

    
    get_Agenda();
    Get_PuestosDeVotacionYCantidad();
    CargarTablaCantidadvotantesreferentes();


});

function CargarTablaCantidadvotantesreferentes() {

    $.ajax(
        {
            url: SetUrlForQuery('/ResulEncuesta/GetCantidadVotosPorComuna'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    Votos = data.Objeto;
                    tabla_CantidadVotantesReferentes.clear().draw();
                    var nom = "";
                    var com = "Sin comuna";
                    var can = 0;

                    $.each(Votos, function (index, item) {
                        if (item.NombreRef == "" || item.NombreRef == null) {
                            if (item.Referente1 == "" || item.Referente1 == null) {
                                nom = "Sin Referente"
                            } else {
                                nom = item.Referente1
                            }
                        } else {
                            nom = item.NombreRef
                        }
                        if (item.Comuna > 0) {
                            com = item.Comuna;
                        } else {
                            com = "Sin comuna";
                        }
                        

                        tabla_CantidadVotantesReferentes.row.add([
                            com,
                            nom,
                            item.Cantidad
                        ]).draw(false);
                    });
                    CloseLoading();
                } else {
                    CloseLoading();
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                CloseLoading();
                console.log(errorThrown);
            }
        });
}


function get_Agenda() {
    $.ajax(
        {
            url: SetUrlForQuery('/Agenda/GetPostAgendaAllMovilWeb'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var ListaAgrupada = data.Objeto;
                    var t=0;
                    $.each(ListaAgrupada, function (index, item) {
                        t = t + item.length
                    });
                    $.each(ListaAgrupada, function (index, item) {
                        if (item[0].Comuna!=null) {
                            switch (item[0].Comuna.trim()) {
                                case "01":
                                    var total = item.length / t;
                                    var Porcent = (total * 100).toFixed() + "%)";
                                    document.getElementById('Comuna1').innerHTML = "Comuna 1 - " + item.length + " visitas (" + Porcent;
                                    break;
                                case "02":
                                    var total1 = item.length / t;
                                    var Porcent1 = (total1 * 100).toFixed() + "%)";
                                    document.getElementById('Comuna2').innerHTML = "Comuna 2 - " + item.length + " visitas (" + Porcent1;
                                    break;
                                case "03":
                                    var total2 = item.length / t;
                                    var Porcent2 = (total2 * 100).toFixed() + "%)";
                                    document.getElementById('Comuna3').innerHTML = "Comuna 3 - " + item.length + " visitas (" + Porcent2;
                                    break;
                                case "04":
                                    var total3 = item.length / t;
                                    var Porcent3 = (total3 * 100).toFixed() + "%)";
                                    document.getElementById('Comuna4').innerHTML = "Comuna 4 - " + item.length + " visitas (" + Porcent3;
                                    break;
                                case "05":
                                    var total4 = item.length / t;
                                    var Porcent4 = (total4 * 100).toFixed() + "%)";
                                    document.getElementById('Comuna5').innerHTML = "Comuna 5 - " + item.length + " visitas (" + Porcent4;
                                    break;
                                case "06":
                                    var total5 = item.length/t;
                                    var Porcent5 = (total5 * 100).toFixed() + "%)";
                                    document.getElementById('Comuna6').innerHTML = "Comuna 6 - " + item.length + " visitas (" + Porcent5;
                                    break;
                                default:
                                    break;
                            }
                        }
                    })
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function Get_PuestosDeVotacionYCantidad() {
    $.ajax(
        {
            url: SetUrlForQuery('/Agenda/PorcentajeVisitasPorBarrio'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var PVyC = data.Objeto;
                    var t = 0;
                    $.each(PVyC, function (index, item) {
                        t = t + item.cantidad
                    });
                    document.getElementById('TotVisitas').innerHTML = t;

                    var porcentaje = 0;
                    var contenido="";
                    $.each(PVyC, function (index, item) {
                        porcentaje = (item.cantidad/t)*100;
                        contenido = contenido + '<div>' +
                            '<span>' + item.NombreB + '</span>' +
                            '<h3>' + porcentaje.toFixed() +'%    <small class="float-right">'  + item.cantidad +' </small></h3>'+
                            
                            '</div>' +
                            '<div class="progress progress-small">' +
                            '<div style="width: ' + porcentaje+'%;" class="progress-bar"></div>' +
                            '</div>';
                    });
                    $('#PuestoYVotacion').append(contenido);

                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}


function get_grafica() {
    var oilCanvas = document.getElementById("oilChart");
    Chart.defaults.global.defaultFontFamily = "Lato";
    Chart.defaults.global.defaultFontSize = 20;
    var VectorCandidatos;
    $.ajax(
        {
            url: SetUrlForQuery('/ResulEncuesta/GetCandidatos'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    VectorCandidatos = data.Objeto;
                    var cantidad = VectorCandidatos.length;
                    var i = 0;
                    var VectorColores = [];
                    var color;
                    var ban = false;
                    while (i < cantidad) {
                        color = colors();
                        ban = false;
                        for (x = 0; x < VectorColores.length; x++) {
                            if (color == VectorColores[x]) {
                                ban = true;
                                x = VectorColores.length + 1;
                            }
                        }
                        if (!ban) {
                            VectorColores[i] = color;
                            i++;
                        }
                    }
                    var VectorNombresCandidatos = [];
                    var VectorCantidadCandidatos = [];
                    $.each(VectorCandidatos, function (index, item) {
                        VectorNombresCandidatos[index] = item.NombreCandidato;
                        VectorCantidadCandidatos[index] = item.Cantidad;
                    })



                    var barData = {
                        labels: ["'",
                            $.each(VectorCandidatos, function (index, item) {
                                item.NombreCandidato;
                            })

                            , "/'"
                        ],
                        datasets: [
                            
                            {
                                label: "Data 2",
                                backgroundColor: 'rgba(26,179,148,0.5)',
                                borderColor: "rgba(26,179,148,0.7)",
                                pointBackgroundColor: "rgba(26,179,148,1)",
                                pointBorderColor: "#fff",
                                data: [VectorCantidadCandidatos]
                            }
                        ]
                    };

                    var barOptions = {
                        responsive: true
                    };

                    var ctx2 = document.getElementById("barChart").getContext("2d");
                    new Chart(ctx2, { type: 'bar', data: barData, options: barOptions });



                    //var oilData = {
                    //    labels: VectorNombresCandidatos,
                    //    datasets: [
                    //        {
                    //            data: VectorCantidadCandidatos,
                    //            backgroundColor: VectorColores
                    //        }]
                    //};
                    //var pieChart = new Chart(oilCanvas, {
                    //    type: 'bar',
                    //    data: oilData
                    //});
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function colors() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color ;
}

function Get_Puestos() {

    $.ajax(
        {
            url: SetUrlForQuery('/Registrar/GetPuestoVotacion'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var DataPartido = data.Objeto;
                    var HtmlPuesto = "";
                    HtmlPuesto += "<option value=''>Seleccionar</option>";
                    $.each(DataPartido, function (index, item) {
                        HtmlPuesto += "<option value=" + item.IdPuesto + ">" + item.Departamentos + " - " + item.Municipio + " - " + item.Direccion + "</option>";


                    })
                    $('#PuestoVotacion').html(HtmlPuesto);
                    $('#PuestoVotacion').select2();
                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}

function estadisticas() {
    var Buena;
    var Mala;
    var Regular;
    var Total;
    $.ajax(
        {
            url: SetUrlForQuery('/ResulEncuesta/GetEncuesta'),
            type: "GET",
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                if (!data.Is_Error) {
                    var Encuestas = data.Objeto;
                    //Buena = parseInt(Encuestas.Split('-')[0].ToString());
                    Buena = parseInt(Encuestas.split('-')[0]);
                    Mala = parseInt(Encuestas.split('-')[1]);
                    Regular = parseInt(Encuestas.split('-')[2]);
                    Total = parseInt(Encuestas.split('-')[3]);

                    document.getElementById("Buena").innerHTML = Buena;
                    document.getElementById("BuenaPorc").innerHTML = ((Buena * 100) / Total).toFixed(2) + "%";

                    document.getElementById("Mala").innerHTML = Mala;
                    document.getElementById("MalaPorc").innerHTML = ((Mala * 100) / Total).toFixed(2) + "%";

                    document.getElementById("Regular").innerHTML = Regular;
                    document.getElementById("RegularPorc").innerHTML = ((Regular * 100) / Total).toFixed(2) + "%";

                } else {
                    SwalErrorMsj(data);
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
            }
        });
}