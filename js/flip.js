const tabuleiro = $('.tabuleiro');
const moveCountElem = $('#moveCount');
let moveCount = 0;
let tempo = '';
construirGrid();



/**
 * @description Constrói o grid com cartas aleatórias e adiciona o evento as cartas
 */
function construirGrid(){
	// Timer
	let minute = 00;
	let seconds = 00;
	setInterval(function (){
		seconds++;
		if(seconds === 59) {
			seconds = 0;
			minute ++;
		}

		tempo = minute+ " minuto(s) e "+seconds+" segundo(s).";
	},1000);

	// Seta 3 estrelas inicial
	starRating(3);
	tabuleiro.children().remove();
	const values = shuffle([1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8]);
	for(value of values){
		switch (value){
			case 1:
				tabuleiro.append(construirCarta('<i class="fas fa-anchor"></i>', value));
				break;
			case 2:
				tabuleiro.append(construirCarta('<i class="fab fa-android"></i>', value));
				break;
			case 3:
				tabuleiro.append(construirCarta('<i class="fas fa-angry"></i>', value));
				break;
			case 4:
				tabuleiro.append(construirCarta('<i class="fas fa-bath"></i>', value));
				break;
			case 5:
				tabuleiro.append(construirCarta('<i class="fas fa-bomb"></i>', value));
				break;
			case 6:
				tabuleiro.append(construirCarta('<i class="fas fa-gamepad"></i>', value));
				break;
			case 7:
				tabuleiro.append(construirCarta('<i class="fas fa-heart"></i>', value));
				break;
			case 8:
				tabuleiro.append(construirCarta('<i class="fas fa-music"></i>', value));
				break;
		}
	}
	addClickEvent();
	moveCount = 0;
	moveCountElem.text(moveCount);
}

/** 
 * @description constrói o HTML da carta
 * @param {HTMLElement} conteudoDaCarta
 * @param {number} value
 * */ 
function construirCarta(conteudoDaCarta, value){
	return `<article class="col-3 card-game" style="height:${$('.down-side').css('height')}"><div class="up-side show"></div><div class="down-side hide" value="${value}">${conteudoDaCarta}</div></article>`;
}

/**
 * @description Evento de click no lado de cima (.up-side) das cartas
 */

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
			const upSide = $(this);
			const downSide = $(this).siblings();
			flipCard(upSide, downSide);
			switch(count) {
				case 1:
					twoCardOpen = false;	
					firstCard = downSide;
					break;
				case 2:
					count = 0;
					moveCount++;
					// Muda o star rating dependendo da quantidade de movimentos
					switch (moveCount){
						case 12:
							starRating(2);
							break;
						case 16:
							starRating(1);
							break;
					}
					moveCountElem.text(moveCount);
					// Duas cartas estão abertas, isso impede que o usuário clique em outra
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
								$('#starRatingModal').text($('.starRating').text());
								// Personaliza o texto de movimentos do modal vitória
								$('#moveCountModal').text(moveCount);
								// O modal aparece
								$('#modalWin').css("display", "block");
								$('#tempo').text(tempo);
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

/**
 * @description muda o star rating
 * @param {HTMLElement} elem elemento que contém as estrelas
 * @param {number} qtdStar pra quantas estrelas vai 
 */

function starRating(qtdStar) {
	const elem = $('.starRating');
	
	switch(qtdStar) {
		case 1:
			elem.text('★☆☆');
			break;
		case 2:
			elem.text('★★☆');
			break;
		case 3:
			elem.text('★★★');
			break;
	}
}



