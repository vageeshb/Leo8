$(document).ready( function () {
  $('#items tbody').on('click', 'td a.deleteitem', function (event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this item?');
    var row = $(this).parent().parent();

    if(confirmation === true) {    
      $.ajax({
        type:'DELETE',
        url: '/inventory/' + $(this).attr('rel')
      }).done( function (response) {
        // Check for a successful (blank) response
        if (response.msg === '') {
          row.remove();
        }
        else {
          alert('Error: ' + response.msg);
        }
      });
    }
    else {
      return false;
    }
  });
});