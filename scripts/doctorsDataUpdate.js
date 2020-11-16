
$('.doc').each( function () { 
     var prefix = $(this).attr('id');
     var selector = '#' + prefix + '> .description > .docInfo > .docIcon';
     var newID = '';
    $(selector).attr('data-target', function (index, attr) { 
      //   alert();
      if (attr != undefined) {
          newID = attr + '_' + prefix;
          return attr = newID;
      }
          
    });

    $('#' + prefix + '> .description > div > .collapse').attr('id', function(index, attr) {
     newID = attr + '_' + prefix;
     return attr = newID.slice(0);
});
});
