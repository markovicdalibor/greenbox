var kategorije = $(".kategorija");
var podkategorije = $(".podkategorija");
var woman = $("#woman");
var man = $("#man");
var children = $("#children")
var name;
var aktuelno = $('#aktuelno');
var aktuelnosti=$(aktuelno.children());
kategorije.on('click',function(){
	if(name===$(this).attr('data-name')){
	$(this).parent().find(podkategorije).slideToggle();
	}
	else{
	name = $(this).attr('data-name');	
	podkategorije.slideUp();
	$(this).parent().find(podkategorije).slideToggle();
	};
	aktuelnosti.each(function(i,e){
		$(e).css("display","none");
		if(name==e.id ){
			$(e).css("display","block");	
		}
});

});