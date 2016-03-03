
$(".remove").click(function(event) {
    event.preventDefault();
    $(this).parents('.grid-item').remove();
    $grid.masonry();
    alert($(this).parents('.grid-item').children('img').prop('src'))
});

var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  percentPosition: true,
  columnWidth: '.grid-sizer',
  gutter: 3.5
});
$grid.imagesLoaded().progress( function() {
  $grid.masonry();
});




