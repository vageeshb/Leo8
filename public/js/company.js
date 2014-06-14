$(document).ready( function () {

  $('#save-rep').click( function() {
    
    var repName = $('#repNameModal').val(),
    repDesignation = $('#repDesignationModal').val(),
    remove = " <a href='#' title='Remove Representative'><span class='glyphicon glyphicon-remove-circle'></span></a>";
    
    if(repDesignation) {
      entry = "<div>" + repName + " - " + repDesignation + remove + "</div>";
      field = "<input type='hidden' name='contacts' value='" + repName + " - " + repDesignation + "' />";
    }
    else {
      entry = "<div>" + repName + remove + "</div>";
      field = "<input type='hidden' name='contacts' value='" + repName + "' />";
    }

    $('#rep-name-list').append(entry);
    $('#rep-name-list').append(field);


    $('#repNameModal').val('');
    $('#repDesignationModal').val('');
    $('#repCommentsModal').val('');

  });
  $('#rep-name-list').on('click','div a', function () {
    $(this).parent().remove();
  });

  $('#companies tbody').on('click', 'td a.deletecompany', function (event) {

    event.preventDefault();

    // Pop up a confirmation dialog
    var confirmation = confirm('Are you sure you want to delete this company contact?');
    var row = $(this).parent().parent();

    if(confirmation === true) {    
      $.ajax({
        type:'DELETE',
        url: '/company/' + $(this).attr('rel')
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