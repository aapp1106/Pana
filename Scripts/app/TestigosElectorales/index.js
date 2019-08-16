$(document).ready(function () {
    RenderTable('datatable-ReporteMesas', [0, 1, 2, 3, 4, 5, 6], null, {
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
    tabla_User = $('#datatable-ReporteMesas').DataTable();
    
});