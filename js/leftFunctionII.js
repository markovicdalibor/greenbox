//window.location.assign("pages/"+name+".html");	



var kategorije = $(".kategorija");
var podkategorije = $(".podkategorija");
var name="";
//kategorije.eq(0).parent().find(podkategorije).show();
kategorije.on('click',function(){
	if(name===$(this).attr('data-name')){
		return;
	}
	name = $(this).attr('data-name');	
	podkategorije.slideUp();
	$(this).parent().find(podkategorije).slideToggle();
});