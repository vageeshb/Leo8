$(document).ready( function () {

  $('tbody').on('click','tr td a#delRow', function () {
    $(this).parent().parent().remove();
  });

  $('#addLine').click( function () {
    var row = $('tbody tr:first').html();
    $('tbody').append('<tr>' + row + '</tr>');
    $('tr:last td:first a').removeClass('disabled');
    row = null;
  });

  $('tbody').on('change', 'tr td select#itemName', function (e) {
    var qtyBox = $(this).parent().next().children().first();
    qtyBox.children().remove();

    var id = this.options[e.target.selectedIndex].id;
    if(id) {
      $.ajax({
        url: '/inventory/' + id,
        method: 'GET'
      }).done( function (qty) {
        qtyBox.removeClass('error');
        for(var i = 1; i <= qty; i++)
          qtyBox.append('<option>' + i + '</option>');
        qtyBox.attr('disabled', null);
      });
    } else {
      qtyBox.attr('disabled', 'disabled');
    }
  });
  
  $('tbody').on('change', 'tr td select#itemToCompanyName', function (e) {
    var repBox = $(this).parent().next().children().first();
    repBox.children().remove();

    var id = this.options[e.target.selectedIndex].id;
    if(id) {
      $.ajax({
        url: '/company/' + id + '/getReps',
        method: 'GET'
      }).done( function (representatives) {
        if(representatives) {
          repBox.removeClass('error');
          representatives.forEach(function(rep) {
            repBox.append('<option>' + rep.name + '</option>');
          });
          repBox.attr('disabled', null);
        }
      });
    } else {
      repBox.attr('disabled', 'disabled');
    }
  });

  // Date Picker
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

  $('tbody').on('change', 'tr td', function() {
    $(this).find('input').removeClass('error');
    $(this).find('select').removeClass('error');
  });

  $('#challanForm').submit( function(e) {
    var shouldSubmit = true;
    
    var def = $('#default-row');
    def.remove();

    $('tbody tr').each( function(i, row) {
     
      var rows = $(row).children();
      for (var i = 1; i < rows.length; i++) {
        var element = rows[i];
        if(!($(element).find('input').val() || $(element).find('select').val())) {
          $(element).find('input').addClass('error');
          $(element).find('select').addClass('error');
          shouldSubmit = false;
        }
      }
    });

    if(!shouldSubmit)
      $('tbody').prepend(def);
    
    return shouldSubmit;
  });
});