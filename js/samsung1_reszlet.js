$(function(){
	slider();
	slider2();
	//slider_points_positioner();
	slider_points_positioner2();
	change_helper();
	change_helper2();
	//last_tooltip();
	change_ar();
	
});

var valSlider2 = [1690];
var valSlider = [1970, 1970, 2610, 3410, 3470, 3840, 5340, 17810];
	var text0 = ['Move XS díjcsomag','Fun S Aranytárskártya díjcsomag','Like S díjcsomag','Move S díjcsomag','Eco Surf díjcsomag','Move M Aranytárskártya díjcsomag','Move M díjcsomag','Next M készülékkel díjcsomag'];
	var text1 = ['30 MB','50 MB','2 GB','200 MB','50 MB','500 MB','500 MB','1 GB'];
	var text2 = ['internet','internet','internet','internet','internet','internet','internet','internet','internet','internet','internet','internet'];
	var text3 = ['100%-ban felhasználható','100%-ban lebeszélhető','100%-ban lebeszélhető','100%-ban felhasználható','100%-ban lebeszélhető','100%-ban felhasználható','100%-ban felhasználható','Korlátlan beszélgetés és SMS'];
	var text4 = ['havi díj','és felhasználható SMS-ekre belföldön','és felhasználható SMS-ekre belföldön','havi díj','és felhasználható SMS-ekre belföldön','havi díj','havi díj','belföldön'];

function slider(){
	$('#own_slider').change(function() { 
    	modifyText(valSlider2,this.value);
    	move_tooltip(this.value);
	});
}

function modifyText(valSlider,value){
		var full = valSlider[value]*24;
		var single = valSlider[value];
		var full = full;
		single = numberParser(single);
		full = numberParser(full);
    	$('.own_tooltip .tooltip_center span').html(single);
    	$('p.n3 span').html(single);
    	$('.own_tooltip .tooltip_bottom span').html(full);
    	$('.tooltip_egyosszeg span').html(full);
}

function slider2(){
	$('#own_slider2').change(function() { 
		modifyText2(valSlider,text0,text1,text2,text3,text4,this.value);
    	move_tooltip2(this.value);
	});
}

function modifyText2(valSlider,text0,text1,text2,text3,text4,value){
	var full = valSlider[value]*24;
	var single = valSlider[value];
	var p0 = text0[value];
	var p1 = text1[value];
	var p2 = text2[value];
	var p3 = text3[value];
	var p4 = text4[value];

	var full = full;
	single = numberParser(single);	
	
	$('h2.dijcsomag_neve').html(p0);
	$('h2.dijcsomag_ara span').html(numberParser(single));
	$('li.dijcsomag_leiras').html(p3+' '+p4);
	
    $('.own_tooltip2 .tooltip_top2 span').html(numberParser(single));
    $('.own_tooltip2 .tooltip_bottom2_0').html(p0);
    $('.own_tooltip2 .tooltip_bottom2_1').html(p1);
    $('.own_tooltip2 .tooltip_bottom2_2').html(p2);
    $('.own_tooltip2 .tooltip_bottom2_3').html(p3);
    $('.own_tooltip2 .tooltip_bottom2_4').html(p4);
}


function numberParser(num){
	var array = [];
	var string = '';
	if(num<10000){
		return num;
	}else{
		for(var i = 1000000;i>100;i/=1000){
			if(num > i){
					var megvan = Math.floor(num/i);
					array.push(megvan);
					//console.log(megvan);
					num -= Math.floor(megvan*i);	
					//console.log('--');
			}
			
		}
		array.push(num);
		//console.log(array);
		$.each(array,function(key,value){
			if(key < array.length - 1 ){	
				string += value + ' ';
			}else{
				string += value;
			}
		});
		return string;
	}
}

function move_tooltip(point,bool = true){
	if(point == 0){
		$('.own_tooltip').css('left','0px');
		$('.tooltip_arrow').css('left','0px');
		$('.marker').css('left','-9px');
	}
	else if(point == 5){
		var tooltip = $('.own_tooltip').width();
		var width = $('#own_slider').width()-8;
		var sz = $('#slider_holder').width()-17;
		var maradek = width-tooltip-5;
		$('.own_tooltip').css('left',maradek+'px');
		$('.tooltip_arrow').css('left','100%');
		$('.marker').css('left',sz+'px');
	}
	else{
		var tooltip = $('.own_tooltip').width();
		var width = $('#own_slider').width()-15;
		var maradek = width-tooltip-5;
		var left = $('#slider_holder .slider_point_'+point).css('margin-left');
		maradek /= 5;
		maradek *= point;
		$('.tooltip_arrow').css('left',point*(tooltip/5)+'px');
		$('.own_tooltip').css('left',maradek+'px');
		$('.marker').css('left',parseInt(left)-10+'px');
	}
	var b = 0;
	if(point == 0){
	    b = 10;
	}
	else if(point == 1){
	    b = 9;
	    
	}else if(point == 2){
	    b = 8;
	   
	}else if(point == 3){
	    b = 5;
	   
	}
	else if(point == 4){
	    b = 2; 
	}else if(point == 5){
	    b = 0;
	}

	
	if(bool == true){
		modifyText2(valSlider,text0,text1,text2,text3,text4,b);
	    move_tooltip2(b,false);
	    
	    var price = setPrice(point,b);
		var ertek = $('input[name="ar"]:checked').val();
	    if(ertek == 'egy_osszegben'){
	    	var keszulekar = getFelsoAr(point);
	    	var havi = getAlsoAr(b);
		    $('h2.price_month span').html(havi);
		    $('h2.price_final span').html(keszulekar);
		    $('p.top_egyosszeg span').html(keszulekar);
		    
		    $('.reszletek_keszulek').html();
		    $('.reszletek_keszulek_main').hide();
		    $('.reszletek_havi').html(havi);
		    
	    }else{
		    $('h2.price_month span').html(price);
		    
		    var havi = getAlsoAr(point);
	    	var keszulekar = getFelsoAr(b);
	    	
	    	keszulekar = keszulekar.replace(' ', '')/24;
		    $('.reszletek_keszulek').html(keszulekar);
		    $('.reszletek_keszulek_main').show();
		    $('.reszletek_havi').html(havi);
	    }

	}else{
		var price = setPrice(point,b);
	    var ertek = $('input[name="ar"]:checked').val();
	    if(ertek == 'egy_osszegben'){
	    	var keszulekar = getFelsoAr(point);
	    	var havi = getAlsoAr(b);
		    $('h2.price_month span').html(havi);
		    $('h2.price_final span').html(keszulekar);
		    $('p.top_egyosszeg span').html(keszulekar);
		    
		    $('.reszletek_keszulek').html();
		    $('.reszletek_keszulek_main').hide();
		    $('.reszletek_havi').html(havi);
	    }else{
		    $('h2.price_month span').html(price);
		    
		    var havi = getAlsoAr(point);
	    	var keszulekar = getFelsoAr(b);
	    	keszulekar = keszulekar.replace(' ', '')/24;
		    $('.reszletek_keszulek').html(keszulekar);
		    $('.reszletek_keszulek_main').show();
		    $('.reszletek_havi').html(havi);
	    }
	}
	
		
	
}

//felső csúszka árát adja meg
function getFelsoAr(felso){
	var a = [1690];
	return numberParser(24*a[felso]);
}
//alsó csúszka értékét adja meg
function getAlsoAr(also){
	var b = [1970, 1970, 2610, 3410, 3470, 3840, 5340, 17810];
	return numberParser(b[also]);
}

function setPrice(felso,also){
	var a = [1690];
	var b = [1970, 1970, 2610, 3410, 3470, 3840, 5340, 17810];
//	console.log(numberParser(a[felso]+b[also]));
//	console.log(a[felso]+b[also]);
	return numberParser(a[felso]+b[also]);
}

function move_tooltip2(point,bool = true){
	if(point == 0){
		$('.own_tooltip2').css('left','0px');
		$('.tooltip_arrow2').css('left','0px');
		$('.marker2').css('left','-9px');
	}
	else if(point == 6){
		var tooltip = $('.own_tooltip2').width();
		var width = $('#own_slider2').width()-8;
		var sz = $('#slider_holder2').width()-17;
		var maradek = width-tooltip-5;
		$('.own_tooltip2').css('left',maradek+'px');
		$('.tooltip_arrow2').css('left','100%');
		$('.marker2').css('left',sz+'px');
	}
	else{
		var tooltip = $('.own_tooltip2').width();
		var width = $('#own_slider2').width()-15;
		var maradek = width-tooltip-5;
		var left = $('#slider_holder2 .slider_point_'+point).css('margin-left');
		maradek /=6;
		maradek *= point;
		$('.tooltip_arrow2').css('left',point*(tooltip/6)+point*2.5+'px');
		$('.own_tooltip2').css('left',maradek+'px');
		$('.marker2').css('left',parseInt(left)-10+'px');
	}
	
	var b = 0;
	//ez kell, különben folyamatosan mozgatja a két slider egymást
	if(bool == true){
		modifyText(valSlider2,b);
		move_tooltip(b,false);
		var price = setPrice(b,point);
	    var ertek = $('input[name="ar"]:checked').val();
	    if(ertek == 'egy_osszegben'){
	    	var havi = getAlsoAr(point);
	    	var keszulekar = getFelsoAr(b);
		    $('h2.price_month span').html(havi);
		    $('h2.price_final span').html(keszulekar);
		    $('p.top_egyosszeg span').html(keszulekar);
		    
		    //console.log('elrejt');
		    $('.reszletek_keszulek').html();
		    $('.reszletek_keszulek_main').hide();
		    $('.reszletek_havi').html(havi);
		    
	    }else{
	    	var havi = getAlsoAr(point);
	    	var keszulekar = getFelsoAr(b);
	    	keszulekar = keszulekar.replace(' ', '')/24;
	    	$('.reszletek_keszulek').html(keszulekar);
		    $('.reszletek_keszulek_main').show();
		    $('.reszletek_havi').html(havi);
	    
		    $('h2.price_month span').html(price);
	    }
	}else{
		var price = setPrice(b,point);
	    var ertek = $('input[name="ar"]:checked').val();
	    if(ertek == 'egy_osszegben'){
	    	var havi = getAlsoAr(point);
	    	var keszulekar = getFelsoAr(b);
		    $('h2.price_month span').html(havi);
		    $('h2.price_final span').html(keszulekar);
		    $('p.top_egyosszeg span').html(keszulekar);
		    
		    
		    $('.reszletek_keszulek').html();
		    $('.reszletek_keszulek_main').hide();
		    $('.reszletek_havi').html(havi);
		    
		    
	    }else{
	    	var havi = getAlsoAr(point);
	    	var keszulekar = getFelsoAr(b);
	    	keszulekar = keszulekar.replace(' ', '')/24;
	    	$('.reszletek_keszulek').html(keszulekar);
		    $('.reszletek_keszulek_main').show();
		    $('.reszletek_havi').html(havi);
	    
	    
		    $('h2.price_month span').html(price);
	    }
	}
}

function last_tooltip(){
		var tooltip = $('.own_tooltip2').width();
		var width = $('#own_slider2').width()-8;
		var maradek = width-tooltip-5;
		$('.own_tooltip2').css('left',maradek+'px');
		$('.tooltip_arrow2').css('left','100%');
		var left = $('#slider_holder2 .slider_point_10').css('margin-left');
		$('.marker2').css('left',parseInt(left)-15+'px');

}

function slider_points_positioner(){
	var width = $('#own_slider').width()-15;
	var key = 0;
	var single_width = width/5;
	$('.slider_point').each(function(){
		if(key < 5 ){
			var margin = key*single_width;
			$(this).css('margin-left',margin+'px');
			key++;
		}
	});
}

function slider_points_positioner2(){
	var width = $('#own_slider2').width();
	var key = 0;
	var single_width = width/6;
	$('.slider_point2').each(function(){
		if(key < 6 ){
			var margin = key*single_width;
			$(this).css('margin-left',margin+'px');
			key++;
		}
	});
}

//ha a span-okra kattintunk, akkor is dobja odébb
function change_helper(){
	$('.slider_point').click(function(){
		id = $(this).data('id');
		$('#own_slider').val(id);
		$('#own_slider').trigger('change');
	})
}
//ha a span-okra kattintunk, akkor is dobja odébb
function change_helper2(){
	$('.slider_point2').click(function(){
		id = $(this).data('id');
		$('#own_slider2').val(id);
		$('#own_slider2').trigger('change');
	})
}

//váltunk részletfizetés és egy összeg között
function change_ar(){
	$('input[name="ar"]').change(function(){
		var ertek = $(this).val();
		//egy összegben akar fizetni
		if(ertek == 'egy_osszegben'){
			window.location.replace("samsung1_egyben.html");
			/*$('.tooltip_egyosszeg, .tooltip_egyosszeg span').show();
			$('.tooltip_arrow').css('bottom','-28px');
			$('.tooltip_bottom').hide();
			$('.tooltip_center').hide();
			$('.tooltip_top').hide();
			var e = $('p.tooltip_egyosszeg span').html();
			var f = $('p.tooltip_top2 span').html();
			$('.top_egyosszeg span').html(e);
			$('h2.price_final span').html(e);
			$('h2.price_month span').html(f);
			$('span.torlesztoreszlet').hide();
			$('.top_reszlet').hide();
			$('.top_egyosszeg').show();
			$('.kezdoreszlet').hide();*/
		}
		
		else if(ertek == 'reszlet'){
			$('.tooltip_egyosszeg, .tooltip_egyosszeg span').hide();
			$('.tooltip_arrow').css('bottom','-7px');
			$('.tooltip_bottom').show();
			$('.tooltip_center').show();
			$('.tooltip_top').show();
			var e = $('p.tooltip_center span').html();
			e = e.replace(' ', '');
			var f = $('p.tooltip_top2 span').html();
			f = f.replace(' ', '');
			$('h2.price_final span').html(0);
			var sum = parseInt(e)+parseInt(f);
			console.log( parseInt(e));
			console.log( parseInt(f));
			console.log(sum);
			$('h2.price_month span').html(numberParser(sum));
			$('span.torlesztoreszlet').show();
			$('.top_reszlet').show();
			$('.top_egyosszeg').hide();
			$('.kezdoreszlet').show();
		}
	});
}