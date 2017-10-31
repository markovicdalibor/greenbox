var tes=0;
var testx=window.location.pathname
console.log('to mi treba '+testx)
if (testx=="/C:/Documents%20and%20Settings/Call%20Center/Desktop/GreenBox2410/index.html"){
	tes=0;
}
else{
	tes=1;
}
jQuery(document).ready(function ($) {
var about = $('#about');
var brend = $("#brend");
var proizvodjaci = $("#proizvodjaci");
var kategorije = $("#kategorije");
var dugme = $(".dugme");
var carticon = $('#carticon');
var cart = $('#cart');
var kupi = $('.kupi');
var odustani = $('.odustani');
var cou = $("#cou");
var tbody = $('tbody');
var iznos = $('#iznos');
var li = $("ul li");
var t = $('#t');

var aha =$("#aha")

if (JSON.parse(localStorage.getItem("korpa"))){
	loadCard();
}
else{
	var korpa=[];
}

carticon.on('click',function(){
	cart.slideToggle();
	});
// plusevi
cart.on('click',".plus",function(){
var u=$(this).attr('data-name');
addItemToCart(u,0,1);
displayCart();
saveCart();
});

aha.on('click',".plus",function(){
var u=$(this).attr('data-name');
addItemToCart(u,0,1);
displayCart();
saveCart();
});
// minusi
cart.on('click',".minus",function(){
	var name=$(this).attr('data-name');
	minusCart(name);
	displayCart();
	saveCart();
});

aha.on('click',".minus",function(){
	var name=$(this).attr('data-name');
	minusCart(name);
	displayCart();
	saveCart();
});
// brisanje
cart.on('click',".delete",function(){
	var name = $(this).attr('data-name');
	removeItem(name);
	displayCart();
	saveCart();
});

aha.on('click',".delete",function(){
	var name = $(this).attr('data-name');
	removeItem(name);
	displayCart();
	saveCart();
});

odustani.on('click',removeAll);
kupi.click(function(){
	if (korpa.length==0){
		alert("Korpa je prazna");
		return;
	}
	if(tes==0){
	window.location.assign('pages/second.html');
	}
	else{window.location.assign('second.html');
	};
	saveCart()
});
li.on('click',padajuci);

//function from cart
var Item = function(name,price,count){
	this.name=name,
	this.price=price,
	this.count=count
};
dugme.on('click',function(){
	var name = $(this).parent().attr('data-name');
	var price =Number($(this).parent().attr('data-price'));
	addItemToCart(name,price,1);
	displayCart();
});

function addItemToCart(name,price,count){
	var shoppingCart={
		name:name,
		price:price,
		count:count
	};
	for(var i in korpa){
		if(korpa[i].name===name){
			korpa[i].count+=count;
			return;
		}
		
	};
	item = new Item(name,price,count)
	korpa.push(item);
	saveCart();
};

function removeItem(name){
	$(korpa).each(function(i,e){
		if(name===e.name){
			console.log(e);
		korpa.splice(i,1)};	
	});
	saveCart();
};

function displayCart(name,price,count){
	var forPay = 0;
	var output = "";
	$(korpa).each(function(i,e){
	forPay+=e.price*e.count;
	output += "<tr><td>"
	+e.name+"</td><td>"
	+e.count+"</td><td>"+e.price+"</td><td>"+e.price*e.count+"</td><td><span class='glyphicon glyphicon-plus-sign plus' data-name='"+e.name+"'></span>"+" "+"<span class='glyphicon glyphicon-minus-sign minus' data-name='"+e.name+"'></span>"+" "+"<span class='glyphicon glyphicon-trash delete' data-name='"+e.name+"'></span></td></tr>"
	});
	tbody.html(output);
	iznos.text(forPay);
	cou.html(countCart());
};

function saveCart(){
	localStorage.setItem('korpa',JSON.stringify(korpa));
};
function minusCart(name){
	$(korpa).each(function(i,e){
		if (name==e.name){
			e.count--;
			if(e.count==-1){
			korpa.splice(i,1);
			displayCart();
			};
		};
	});
};
function countCart(){
	var totalCount = 0;
	$(korpa).each(function(i,e){
		totalCount+=e.count;	
	});
	return totalCount;
	};
function removeAll(){
	if(korpa.length==0){
	cart.toggle();
	}
	else{
	var test = confirm("Zelite da odustanete od kupovine?")
	if(test===true){
	korpa=[];
	displayCart();
	cart.toggle();
	}
	else{displayCart();}
	saveCart();
	};
};
function padajuci(){ //za prikazivanje padajuceg menija
	var v=$(this).attr('data-name');
	var m = $(this).offset().left;

	if(v==='about'){
		about.toggle();
		brend.css('display','none');
		about.css('left',m)
	}
	else if(v==="brend"){
		about.css('display','none');
		brend.toggle();
		brend.css('left',m)
	}
	else{
		about.css('display','none');
		brend.css('display','none');
	}
};
//24.10.2017
var akcija=$("#akcija");
var radi = $('.radi');
var opis = $("#opis");
var nesto ="";
var slika1 =$("#slika1");
var slika2 =$("#slika2");
var slika3 =$("#slika3");
var xml = new XMLHttpRequest();
var myModal = $("#myModal");
xml.onreadystatechange = function () {
  if (xml.status == 200 && xml.readyState == 4) {
    myData(xml);
  }
}
xml.open('get','proizvodiDB.json');
xml.send();
function myData(xml) {
  var asortiman = JSON.parse(xml.responseText);
  for(var i in asortiman){
	  nesto+="<div class='paneli panel panel-default col-xs-6'><div class='panel-heading'><h4>"+asortiman[i].name+"</h4></div><div class='panel-body'><div class='row'><div class='col-xs-6'><img src='"
	  +asortiman[i].img+"'class='img-responsive img-thumbnail'><p>cena: "+asortiman[i].price+"RSD</p></div><div class='col-xs-6'>"+asortiman[i].info.substring(0,200)+"...<button class='saznaj btn brn-default pull-right' data-toggle='modal' data-target='#myModal' data-name='"+asortiman[i].name+"'>Vise o proizvodu</button></div></div></div><div class='panel-footer' data-name='"+asortiman[i].name+"' data-price='"+asortiman[i].price+"'><button class='dugme btn btn-success pull-right btn-block'>kupi</button></div></div>"
	  akcija.html(nesto);
  }
  var dugme = $(".dugme");
  var saznaj=$(".saznaj");
  saznaj.on('click',function(){
	var name = $(this).attr('data-name');
	$(asortiman).each(function(i,e){
		if (name==e.name){
	radi.html(e.name);
	opis.html(e.info);
	slika1.html("<img src='"+e.img1+"'width='200px' height='200px' class='img-responsive'>");
	slika2.html("<img src='"+e.img2+"'width='200px' height='200px' class='img-responsive'>");
	slika3.html("<img src='"+e.img3+"'width='200px' height='200px' class='img-responsive'>");
		console.log(e.img3)};
	});
  });
  dugme.on('click',function(){
	console.log($(this).parent());
	var name = $(this).parent().attr('data-name');
	var price =Number($(this).parent().attr('data-price'));
	addItemToCart(name,price,1);
	displayCart();
});
}
//24.10.2017 kraj
//Ovde JSON za Cart
	function loadCard(){
		korpa = JSON.parse(localStorage.getItem("korpa"))
		displayCart();
	};
});
