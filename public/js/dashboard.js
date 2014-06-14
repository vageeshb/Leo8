$(document).ready( function () {
  $('.deleteuser').click( function () {
    var id = $(this).attr('rel'),
    row = $(this).parent().parent(),
    confirmation = confirm('Are you sure you want to delete this user?');

    if(confirmation) {
      $.ajax({
        url: '/user/' + id,
        method: 'DELETE'
      }).done( function (err) {
        if(err == '') {
          row.remove();
        }
        else {
          alert(err);
        }
      });
    }
  });
})