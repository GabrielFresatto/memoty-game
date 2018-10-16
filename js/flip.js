var tabuleiro = $('.tabuleiro');
var moveCountElem = $('#moveCount');
var moveCount = 0;
construirGrid();

function construirGrid(){
	tabuleiro.children().remove();
	var paresValues = shuffle([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]);
	for(valorPar of paresValues){
		switch (valorPar){
			case 1:
				tabuleiro.append(construirCarta('<i class="fas fa-anchor"></i>', valorPar));
				break;
			case 2:
				tabuleiro.append(construirCarta('<i class="fab fa-android"></i>', valorPar));
				break;
			case 3:
				tabuleiro.append(construirCarta('<i class="fas fa-angry"></i>', valorPar));
				break;
			case 4:
				tabuleiro.append(construirCarta('<i class="fas fa-bath"></i>', valorPar));
				break;
			case 5:
				tabuleiro.append(construirCarta('<i class="fas fa-bomb"></i>', valorPar));
				break;
			case 6:
				tabuleiro.append(construirCarta('<i class="fas fa-gamepad"></i>', valorPar));
				break;
			case 7:
				tabuleiro.append(construirCarta('<i class="fas fa-heart"></i>', valorPar));
				break;
			case 8:
				tabuleiro.append(construirCarta('<i class="fas fa-music"></i>', valorPar));
				break;
		}
	}
	addClickEvent();
	moveCount = 0;
	moveCountElem.text(moveCount);
}

// Cria a carta HTML e atribui value 
function construirCarta(conteudoDaCarta, valorPar){
	return `<article class="col-md-3 card-game" style="height:${$('.down-side').css('height')}"><div class="up-side show"></div><div class="down-side hide" value="${valorPar}">${conteudoDaCarta}</div></article>`;
}

function addClickEvent(){
	// Todas as cartas
	const cardGames = $('.card-game');

	// Contador de cartas reveladas.
	let count = 0;
	let firstCard = "";
	let secondCard = "";
	let twoCardOpen = false;
	// Click quando estiver virada pra baixo
	cardGames.find('.up-side').click(function (evt) { 
		// Se tiver 2 cartas abertas não abre nenhuma outra
		if(!twoCardOpen){
			count++;
			let upSide = $(this);
			let downSide = $(this).siblings();
			flipCard(upSide, downSide);
			switch(count) {
				case 1:
					twoCardOpen = false;	
					firstCard = downSide;
					break;
				case 2:
					count = 0;
					moveCount++;
					moveCountElem.text(moveCount);
					twoCardOpen = true;
					secondCard = downSide;
					// Se os lados forem iguais
					if(firstCard.attr('value') === secondCard.attr('value')) {
						setTimeout(function(){
							firstCard.parent().addClass('acertou');
							secondCard.parent().addClass('acertou');
							twoCardOpen = false;
							// Se achar todas as cartas
							if($('.acertou').length === 16){
								// Personaliza o texto de movimentos do modal vitória
								$('#moveCountModal').text(moveCount);
								// O modal aparece
								$('#modalWin').css("display", "block");
							}
						}, 500);
					}else{
						// Se forem diferentes, volta ao normal
						firstCard.addClass("erro");
						secondCard.addClass("erro");
						setTimeout(function(){
							flipCard(firstCard, firstCard.siblings());
							flipCard(secondCard, secondCard.siblings());
							twoCardOpen = false;
							firstCard.removeClass("erro");
							secondCard.removeClass("erro");
						}, 1000);
					}
					break;
			}
		}
	});

}

// Jogar novamente
function playAgain(){
	construirGrid();
	$('#modalWin').css("display", "none");
}

// Função pra animar
function flipCard(elemToHide, elemToShow){
	elemToHide.toggleClass('hide show');
	elemToShow.toggleClass('show hide');
}

function shuffle(array) {
	var currentIndex = array.length, temporaryValue, randomIndex;
  
	// While there remain elements to shuffle...
	while (0 !== currentIndex) {
  
	  // Pick a remaining element...
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
  
	  // And swap it with the current element.
	  temporaryValue = array[currentIndex];
	  array[currentIndex] = array[randomIndex];
	  array[randomIndex] = temporaryValue;
	}
  
	return array;
}

