(function($) {
    $( document ).ready(function() {


        var $webformDatepickerContainer = $('.webform-datepicker');
        if ($webformDatepickerContainer.length == 0) {
            return;
        }

        //@todo: controlla se ce ne sono più di uno

        var $dateSelects = $("select", $webformDatepickerContainer);
        if ($dateSelects.length == 0) {
            return;
        }

        var $calendarTrigger = $("input[type=image]", $webformDatepickerContainer);
        if ($calendarTrigger.length == 0) {
            return;
        }


        $('<input class="edit-submitted-date form-control" readonly="readonly" />').insertBefore('.webform-datepicker');
        $(".edit-submitted-date").click(function(){
            $("input[type=image]", $webformDatepickerContainer).focus();
        });

        $calendarTrigger.datepicker("option",{"changeMonth": true,"changeYear":true});

        $calendarTrigger.datepicker("option", "onClose", function() {
            getFullDate();
        });

        var getFullDate = function() {
            var year, month, day= false;

            $.each($dateSelects, function() {
                if($(this).hasClass("year")) {
                    year = $(this).val();
                }
                if($(this).hasClass("month")) {
                    month = $(this).val();
                }
                if($(this).hasClass("day")) {
                    day = $(this).val();
                }
            });

            if(year && month && day) {
                $.ajax({
                    method:"POST",
                    type:"POST",
                    url: Drupal.settings.basePath + Drupal.settings.pathPrefix + "webform_calendar_date_format/format",
                    data:{year:year,month:month,day:day}
                }).success(function(data) {
                    if(data['formatted']) {
                        $(".edit-submitted-date").val(data['formatted']);
                    } else {
                        $(".edit-submitted-date").val(day + "/" + month + "/" + year);
                    }
                }).error(function(data) {
                    $(".edit-submitted-date").val(day + "/" + month + "/" + year);
                });
            }
        };
    });
})(jQuery);