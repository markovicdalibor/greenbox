var kategorije = $(".kategorija");
var podkategorije = $(".podkategorija");
var woman = $("#woman");
var man = $("#man");
var child = $("#child");
var name;
var aktuelno = $('#aktuelno');
var druginaslov=$("#druginaslov")
var drugi = $("#drugi");
var aktuelnosti=$(aktuelno.children());
kategorije.on('click',function(){
	if($(this).attr('data-name')=='woman'){
		druginaslov.html("Zenska kolekcija");
	}
	if($(this).attr('data-name')=='man'){
		druginaslov.html("Muska kolekcija");
	}
	if($(this).attr('data-name')=='child'){
		druginaslov.html("Decija kolekcija");
	}
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
		drugi.css("display","block");
		if(name==e.id ){
			$(e).css("display","block");
		}
});

});
