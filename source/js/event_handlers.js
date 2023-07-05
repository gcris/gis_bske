import getStations from "./get_stations.js";

getStations();

$(".dropDownStation").hide();
$('#voting_precincts').on('click', function () {
  $(".dropDownStation").slideToggle('fast');
});

$(".dropdown-menu li a").on('click', function(){
  var value = $(this).attr('value');
  var selText = $(this).text();
  $(this).parents('.dropend').find('.dropdown-toggle').html(selText+' <span class="caret"></span>');

  if (value == "all") {
    $(".precincts").show();
  }
  else {
    $(".precincts").hide();
    $(`.marker-${value}`).show();
  }
});