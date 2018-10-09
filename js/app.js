let cardList = [];
let blockClick = false;
let totalMoves = 0;
let time = 0;
let totalStars = 5;

function display() {
	let cards = ["diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb", "diamond", "paper-plane-o", "anchor", "bolt", "cube", "leaf", "bicycle", "bomb"];
	let li = $(".deck li");
	li.removeAttr("style");
	li.empty().removeClass().addClass("card");
	shuffle(cards);
	li.each(function(index, li) {
		let eachLi = $(li);
		eachLi.append("<i class='fa fa-" + cards[index] + "'></i>");
	});
	cardList = [];
	fullStars();
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

function listOfOpenCards(card) {
	card.addClass("open").addClass("show");
	if (cardList.length === 0 || (cardList.length % 2 === 0)) {
		cardList.push(card); // Only for first card
	}else {
		if (cardList[cardList.length - 1].children("i").attr("class") === card.children("i").attr("class")) {
			lockedSameCards(cardList[cardList.length - 1], card);
			cardList.push(card);
		}else {
			blockClick = true;
			card.addClass("not-match");
			cardList[cardList.length - 1].addClass("not-match");
			setTimeout(function() { 
				blockClick = false;
				removeCards(cardList[cardList.length - 1], card);
			}, 1000);
		}
	}
}

function sameCardClicked(card) {
	if (cardList.length === 0) {
		listOfOpenCards(card);
	}else if (cardList.length !== 0 && cardList[cardList.length - 1].index() === card.index()){
		return true;
	}else {
		listOfOpenCards(card);
	}
	if (cardList.length === 16) {
		moves();
		removeStars();
		gameWon();
	}
}
function lockedSameCards(cardOne, cardTwo) {
	cardOne.transition({scale: 1.4}, function() {
		cardOne.transition({scale: 1.0});
	}).addClass("match");
	cardTwo.transition({scale: 1.4}, function() {
		cardTwo.transition({scale: 1.0});
	}).addClass("match");
}

function removeCards(cardOne, cardTwo) {
	cardOne.removeClass("open show not-match");
	cardTwo.removeClass("open show not-match");
	cardList.pop();
}

let clickCard =	$(".deck li").click(function() {
	if (!blockClick) {
		let stopMoves = sameCardClicked($(this));
		if (!stopMoves) {
			moves();
		}
		removeStars();
	}
});

let restartClick = $(".restart").click(function() {
	restartGame();
});

function restartGame() {
	totalMoves = 0;
	time = 0;
	$(".moves").html(totalMoves);
	display();
	$(".modal").hide();
	timePassed;
	$(".checker").transition({
		"background-position": "0 0"});
}

function moves() {
	totalMoves += 1;
	$(".moves").html(totalMoves);
}

function removeStars() {
	let emptyStar = "<li><i class='fa fa-star-o'></i></li>";
	let halfStar = "<li><i class='fa fa-star-half-o'></i></li>";
	switch (totalMoves) {
		case 20:
			$(".stars li:last-child").replaceWith(halfStar);
			totalStars = 4.5;
			break;
		case 22:
			$(".stars li:last-child").replaceWith(emptyStar);
			totalStars = 4;
			break;
		case 24:
			$(".stars li:nth-child(4)").replaceWith(halfStar);
			totalStars = 3.5;
			break;
		case 26:
			$(".stars li:nth-child(4)").replaceWith(emptyStar);
			totalStars = 3;
			break;
		case 28:
			$(".stars li:nth-child(3)").replaceWith(halfStar);
			totalStars = 2.5;
			break;
		case 30:
			$(".stars li:nth-child(3)").replaceWith(emptyStar);
			totalStars = 2;
			break;
		case 32:
			$(".stars li:nth-child(2)").replaceWith(halfStar);
			totalStars = 1.5;
			break;
		case 34:
			$(".stars li:nth-child(2)").replaceWith(emptyStar);
			totalStars = 1;
			break;
		case 36:
			$(".stars li:nth-child(1)").replaceWith(halfStar);
			totalStars = 0.5;
			break;
		case 38:
			$(".stars li:nth-child(1)").replaceWith(emptyStar);
			totalStars = 0;
			break;
	}
}

function fullStars() {
	totalStars = 5;
	$("i.fa fa-star-o").html("<i class='fa fa-star><i>");
	$("i.fa fa-star-half-o").html("<i class='fa fa-star><i>");
	$(".stars li i").removeClass("fa-star-o").addClass("fa-star");
	$(".stars li i").removeClass("fa-star-half-o").addClass("fa-star");
}

function timer ( val ) { return val > 9 ? val : "0" + val; }

let timePassed = setInterval(()=>{
	$("#seconds").html(timer(++time % 60));
	$("#minutes").html(timer(parseInt(time / 60, 10)));
}, 1000);

function clearTimer() {
	clearInterval ( timePassed );
}

function gameWon() {
	$("#winMoves").html(totalMoves);
	$("#winStars").html(totalStars);
	$("#winSeconds").html(time);
	$(".modal").show();
	// Trigger checker transition using jQuery Transit plugin
	$(".checker").transition({
		"background-position": "-7980px 0",
    	transition: "background 1s steps(38)"});
}

let addNumeration = function(cl){
  let table = document.querySelector('table.' + cl);
  let trs = document.querySelectorAll('tr');
  let counter = 1;
  
  Array.prototype.forEach.call(trs, function(x,i){
    let firstChild = x.children[0];
    if (firstChild.tagName === 'TD') {
      let cell = document.createElement('td');
      cell.textContent = counter ++;
      x.insertBefore(cell,firstChild)
    } else {
      firstChild.setAttribute('colspan',2)
    }
  })
};

addNumeration("numbering");

restartGame();