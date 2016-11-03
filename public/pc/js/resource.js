(function ($) {
    var app = {
        init: function () {
            var self = this;

            self.cacheElements();
            self.initChart();
            self.initBacktotop();
            self.bindEvents();
        },
        cacheElements: function () {
            var self = this;

            self.$chart = $('#chart');
            self.$backtotop = $('.backtotop');
            self.$input = $('#input');
            self.$form = $('#form');
        },
        initChart: function () {
            var self = this;

            self.$chart.highcharts({
                chart: {
                    type: 'spline'
                },
                title: {
                    text: ''
                },
                subtitle: {
                    text: chartTitle
                },
                xAxis: {
                    categories: categories
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: chartHot
                    }
                },
                tooltip: {
                    headerFormat: '',
                    pointFormat: '{point.category}' + chartHot + ': {point.y}'
                },
                series: [
                    {
                        name: name,
                        data: data
                    }
                ],
                credits:{
                    text: 'Findit.so',
                    href: 'http://findit.so'
                }
            });
        },
        initBacktotop: function () {
            var self = this;

            setInterval(function () {
                if ($(window).scrollTop() > 200) {
                    self.$backtotop.show();
                } else {
                    self.$backtotop.hide();
                }
            }, 100);
        },
        bindEvents: function () {
            var self = this;

            self.$backtotop.on('click', function () {
                $("html, body").animate({ scrollTop: 0 }, 120);
            });

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