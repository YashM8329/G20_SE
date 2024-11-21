
$('a.remove').click(function(){
  event.preventDefault();
  $( this ).parent().parent().parent().hide( 400 );
 
})

  $('a.btn.continue').click(function(){
    $('li.items').show(400);
  })