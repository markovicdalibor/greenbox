var tes=0;
var testx=window.location.pathname
console.log(testx)
if (testx=="/C:/Users/Oljica/Desktop/GreenBox1310/index.html"){
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
	window.location.assign('second.html');
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
//Ovde JSON za Cart
	function loadCard(){
		korpa = JSON.parse(localStorage.getItem("korpa"))
		displayCart();
	};
});
