(function ($) {

  var app = {

    init: function () {
      var self = this;

      self.cacheElements();
      self.initPage();
      self.bindEvents();
    },

    cacheElements: function () {
      var self = this;

      self.$page = $('#page');
      self.$input = $('#input');
      self.$form = $('#form');
    },

    initPage: function () {
      var self = this,
        url = window.location.origin + window.location.pathname + '?q=' + keyword;

      self.$page.jqPaginator({
        totalPages: +totalPages,
        visiblePages: 9,
        currentPage: +currentPage,
        prev: '<a href="javascript:;">«</a>',
        next: '<a href="javascript:;">»</a>',
        page: '<a href="javascript:;">{{page}}</a>',
        onPageChange: function (num, type) {
          if (type === 'change') {
            window.location.href = url + '&p=' + num;
          }
          return false;
        }
      });
    },

    bindEvents: function () {
      var self = this;

      self.$form.on('submit', function () {
        var keyword = self.$input.val();
        if (!$.trim(keyword)) {
          return false;
        }
      });
    }

  };

  $(function () {
    app.init();
  });

})(jQuery);