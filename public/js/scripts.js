$(function() {
        $('#addImage').submit(function(event) {

        event.preventDefault();
        var data = {
            search: $('#search').val(),
        };
    
        $.post('/auth/add', data, function(resp) {
            $('#search').val('');
            var addImage = '<div class="grid-item"><img src="'+ resp.search + '" /><a href="#" class="remove"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div>';
            //$('#userImages').append(addImage)
            //$('#userImages').append(addImage).masonry('appended', addImage);
            $( $grid ).prepend( addImage);
            $( $grid ).masonry( 'reloadItems' );
            $( $grid ).masonry( 'layout' );
            $('img').attr('onError', "this.onerror=null;this.src='http://resources.macmillanusa.com/jackets/186W/0000000000001.jpg';");
            
        });
    });
    
    
    
    
        $(document).on("click", ".remove", function(evnt){
            evnt.preventDefault();
            $(this).parents('.grid-item').remove();
            $grid.masonry();
            var removeImage = {remove: $(this).parents('.grid-item').children('img').attr('id')}
            $.post('/auth/remove', removeImage, function(resp2) {
                
            });
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

        $(document).on("click", ".remove", function(evnt){
            evnt.preventDefault();
            $(this).parents('.grid-item').remove();
            $grid.masonry();
        
        //alert($(this).parents('.grid-item').children('img').prop('src'));
        });
    
    
})