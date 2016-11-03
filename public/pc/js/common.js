$(function () {
  $('.J_Lang').on('click', function () {
    var $t = $(this);
    var lang = $t.data('lang');

    $.cookie('lang', lang, {
      expires: 30,
      path: '/'
    });

    location.reload();
  });
});