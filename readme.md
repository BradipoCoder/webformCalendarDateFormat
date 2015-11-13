D7 Webform Calendar Date Format
================================

This component substitutes the ugly the select boxes for the date component with a readonly textfield
in which to visualize the date selected by tha calendar. The date, before visualization will be submitted
by ajax request to Drupal, and formatted according your configurations set in (admin/config/regional/settings) and
according to the current site language(admin/config/regional/date-time/locale).

To use a specific format on a date component you can set the following classes in the "Wrapper CSS classes"
 under the Display fieldset:

  - `date_format_long` === Long (default)
  - `date_format_medium` === Medium
  - `date_format_short` === Short
  
In addition, because the "Date and time" configuration in (admin/config/regional/settings) does not allow you to select
 a format without time you can set the `date_format_notime` class (in the "Wrapper CSS classes") to remove time
  information from the formatted date.
   



