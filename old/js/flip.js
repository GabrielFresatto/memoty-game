$('.card-game').css('height', $('.down-side').css('height'));

// Todas as cartas
const cardGames = $('.card-game');
let count = 0;
let firstValueCard = "";
let secondValueCard = "";

// Click quando estiver virada pra baixo
cardGames.find('.up-side').click(function (evt) { 
	let upSide = $(this);
	let parent = upSide.parent();
	let downSide = $(this).siblings();

	// Essa verificação impede a carta de girar novamente
	if(!parent.hasClass('selecionado')){
		count ++;
		flipCard(upSide, downSide); 
		
		// Adiciona a classe selecionado ao pai (card-game)
		parent.addClass('selecionado');
		
		if(count === 1){
			firstValueCard = downSide.attr('value');
		}

		// Se tiver 2 cartas viradas pra cima
		if(count === 2){
			secondValueCard = downSide.attr("value");
			if(firstValueCard === secondValueCard) {
				setTimeout(function(){
					alert("Well done!");
					count = 0;
				}, 500);
				
			} else {
				// Cartas selecionadas
				let selectCards = $('.selecionado');
				setTimeout(function(){
					// Vira as cartas ao normal
					flipCard(selectCards.find('.down-side'), selectCards.find('.up-side'));
					selectCards.removeClass('selecionado');
					count = 0;
				}, 1000);
			}
		}
	}
});

// Click quando estiver virada pra cima
cardGames.find('.down-side').click(function (evt) {
	if(!$(this).parent().hasClass('selecionado')){
		flipCard($(this), $(this).siblings());
	}
});

// Função pra animar
function flipCard(elemToHide, elemToShow){
	elemToHide.toggleClass('hide show');
	elemToShow.toggleClass('show hide');
}

