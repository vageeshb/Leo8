$(document).ready( function () {
  $('tbody tr').on('click', 'td a', function () {
    
    var ele = $(this),
    status = ele.attr('data-status'),
    id = ele.attr('data-id').replace(/"/g, "");
    $.ajax({
      url: '/challan/' + id + '/status/' + status,
      method: 'GET'
    }).done( function (message) {
      if(message) {
        ele.toggleClass('btn-danger');
        ele.toggleClass('btn-success');
        ele.find('span').toggleClass('glyphicon-ok-circle ');
        ele.find('span').toggleClass('glyphicon-remove-circle ');
        if(status === 'complete')
          ele.attr('data-status', 'incomplete');
        else
          ele.attr('data-status', 'complete');
      }
      else {
        alert('There was some problem');
      }
    });
  });
})