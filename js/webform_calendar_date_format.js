(function ($) {
    $(document).ready(function () {
        var $webformDatepickerContainer = $('.webform-datepicker');
        if ($webformDatepickerContainer.length == 0) {
            return;
        }
        $.each($webformDatepickerContainer, function () {
            var self = $(this);
            var $calendarTrigger = $("input[type=image]", self);
            if ($calendarTrigger.length == 0) {
                return;
            }
            var $newField = $('<input class="edit-submitted-date form-control" readonly="readonly" />');
            self.prepend($newField);
            $newField.click(function () {
                $("input[type=image]", self).datepicker("show");
            });
            $calendarTrigger.datepicker("option", {"changeMonth": true, "changeYear": true});
            $calendarTrigger.datepicker("option", "onClose", function () {
                getFullDate(self);
            });
        });
        var getFullDate = function ($self) {
            var year, month, day = false;
            var format = "short";
            if ($self.parent().hasClass("date_format_medium")) {
                format = "medium";
            }
            if ($self.parent().hasClass("date_format_long")) {
                format = "long";
            }
            var $dateSelects = $("select", $self);
            if ($dateSelects.length == 0) {
                return;
            }
            $.each($dateSelects, function () {
                if ($(this).hasClass("year")) {
                    year = $(this).val();
                }
                if ($(this).hasClass("month")) {
                    month = $(this).val();
                }
                if ($(this).hasClass("day")) {
                    day = $(this).val();
                }
            });
            if (year && month && day) {
                var $dateField = $(".edit-submitted-date", $self);
                var temp_date = new Date(month + "/" + day + "/" + year);
                dates.push(temp_date);
                $.ajax({
                    method: "POST",
                    type: "POST",
                    url: Drupal.settings.basePath + Drupal.settings.pathPrefix + "webform_calendar_date_format/format",
                    data: {year: year, month: month, day: day, format: format}
                }).success(function (data) {
                    if (data['formatted']) {
                        $dateField.val(data['formatted']);
                    } else {
                        $dateField.val(day + "/" + month + "/" + year);
                    }
                }).error(function () {
                    $dateField.val(day + "/" + month + "/" + year);
                });
            }
        };
        //@TODO: leaving date always after arrival date?
    });
})(jQuery);