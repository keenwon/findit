$(function () {
  var $input = $('#input');
  var $form = $('#form');

  $input.focus();

  $form.on('submit', function () {
    var keyword = $input.val();

    if (!$.trim(keyword)) {
      return false;
    }
  });
});