import * as bootstrap from 'bootstrap';

$('#login-modal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus');
});
