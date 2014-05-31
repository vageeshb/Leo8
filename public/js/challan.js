$(document).ready( function () {

  $('tbody').on('click','tr td a#delItem', function () {
    $(this).parent().parent().remove();
  });

  $('#addLine').click( function () {
    var row = "\
<tr>\
  <td class='col-sm-1 text-center'>\
    <a id='delItem' class='btn btn-sm btn-danger'>\
      <span class='glyphicon glyphicon-trash'></span>\
    </a>\
  </td>\
  <td class='col-sm-2'>\
    <select class='form-control' id='itemName' name='itemName'>"
    $('#itemName').children().each( function() {
      if($(this).attr('value'))
        row+= "<option value='" + $(this).attr('value') +"' id='" + $(this).attr('id') + "'>" + $(this).html() + "</option>";
      else
        row+= "<option>" + $(this).html() + "</option>";
    });
    row += "\
  </select>\
</td>\
<td class='col-sm-1'>\
  <select class='form-control' id='itemQty' name='itemQty'><option>--</option></select>\
</td>\
<td class='col-sm-2'><input type='text' class='form-control' id='itemOut' name='itemOut'></td><td class='col-sm-2'><input type='text' class='form-control' id='itemIn' name='itemIn'></td><td class='col-sm-2'><input type='text' class='form-control' id='itemTo' name='itemTo'></td><td class='col-sm-2'><input type='text' class='form-control' id='itemFrom' name='itemFrom'></td></tr>";
    $('tbody').append(row);
  });

  $('tbody').on('change', 'tr td select#itemName', function (e) {
    var ele = $(this);
    var id = this.options[e.target.selectedIndex].id;
    $.ajax({
      url: '/inventory/' + id,
      method: 'GET'
    }).done( function (qty) {
      for(var i = 0; i < qty; i++)
        ele.parent().next().children().first().append('<option>' + i + '</option>');
    });
  });

  $('tbody').on('focus', 'tr td input#itemOut', function(e) {
    var dateStart = $(this)
    .datepicker({
        startDate: new Date()
    })
    .on('changeDate', function(ev){
        var dateEnd = $(this).parent().next().children().first();
        $(this).attr('value', dateStart.val());
        dateEnd.datepicker('setStartDate', ev.date);
        dateStart.datepicker('hide');
        dateEnd.focus();

    });
  });

  $('tbody').on('focus', 'tr td input#itemIn', function (e) {
    var dateEnd = $(this)
    .datepicker()
    .on('changeDate', function(ev){
      var dateStart = $(this).parent().prev().children().first();
      $(this).attr('value', dateEnd.val());
      dateStart.datepicker('setEndDate', ev.date);
      dateEnd.datepicker('hide');
    });  
  });
  
});