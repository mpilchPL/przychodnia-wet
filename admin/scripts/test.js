

$('#testBtn').click(function (e) { 
    test();
    
});

var test = () => {
    $.getJSON( "jsontest.json", function( data ) {
        $.each(data, function (key, val) { 
             $('#demo').html(val);
        });
    });
}