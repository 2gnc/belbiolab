'use strict';
var allFerments = document.querySelectorAll( '.ferment' ),
	allFermentsDetails = document.querySelectorAll( '.ferment-details' ),
	allCloseLinks = document.querySelectorAll( '.ferment-details__close' ),
	reactions = document.querySelectorAll( '.reactions__item' ); 

// слушаем клики по карточкам ферментов
for( var i = 0; i < allFerments.length; i++) {
	allFerments[i].addEventListener( 'click', showFermentDetails )
	};
//слушаем клики по ссылкам "закрыть"
for ( var k = 0; k < allCloseLinks.length; k++ ) {
	allCloseLinks[k].addEventListener( 'click', hideFermentDetails )
	};
// показываем подробные сведения фермента
function showFermentDetails(e) {
// получили элемент, по которому кликнули, прочли его ID
	var targetFermentID = e.currentTarget.id;
	// нашли по этому ID подходящий ferment-description
	for( var i = 0; i < allFermentsDetails.length; i++ ) {
		if ( allFermentsDetails[i].getAttribute('data-ferment') == targetFermentID ) {
			allFermentsDetails[i].classList.remove( 'ferment-details--hidden' );
			allFermentsDetails[i].classList.add( 'ferment-details--visible' );
// начинаем слушать событие клика мимо карточки с подробными сведениями
			document.addEventListener( 'click', closeFromOutside );
			}
		}
	};
// закрываем карточку кликом на строчке "закрыть"
function hideFermentDetails(e) {
	var elementToClose = this.parentNode.parentNode;
	elementToClose.classList.remove( 'ferment-details--visible' );
	elementToClose.classList.add( 'ferment-details--hidden' );
// прекращаем слушать событие клика мимо карточки с подробными сведениями
	document.removeEventListener( 'click', closeFromOutside );
	};
// закрываем карточку кликом на любое место вне карточки
function closeFromOutside(e) {
	if( e.target.tagName == 'ARTICLE' ) {
		e.target.classList.remove( 'ferment-details--visible' );
		e.target.classList.add( 'ferment-details--hidden' );
// прекращаем слушать событие клика мимо карточки с подробными сведениями
		document.removeEventListener( 'click', closeFromOutside );
	}
}
// переключение выбранного типа реакций
for ( var l = 0; l < reactions.length; l++ ) {
	reactions[l].addEventListener( 'click', function(e) {
// элемент, по которому кликнули
		var targetReaction = this;
// переключили модификатор у элемента, по которому кликнули
		targetReaction.classList.toggle('reactions__item--activated');

// проверили остальные и сняли у них ранее установленный активный модификатор
		( () => {
			for ( var m = 0; m < reactions.length; m++ ) {
				if( reactions[m] != targetReaction && reactions[m].classList.contains( 'reactions__item--activated' ) ) {
						reactions[m].classList.remove( 'reactions__item--activated' );
						}
					}
				})();

// проверим есть полускрытые ранее ли карточки
	( () => { for( var i = 0; i < allFerments.length; i++ ) {
				if(allFerments[i].classList.contains('ferment--semi-visible')) {
					allFerments[i].classList.remove( 'ferment--semi-visible' );
					}
				}
			})();

// если нажатый элемент имеет модификатор --activated
	// проверили id элемента, по которому кликнули, запустили отбор подходящих плиток
		var reactionToShow = e.currentTarget.id;
		if(e.currentTarget.classList.contains( 'reactions__item--activated' )) {
	// отобрали все ферменты и для каждого
			( () => { 
				for ( var n = 0; n < allFerments.length; n++ ) {
	// получим список подходящих реакций и преобразуем в массив
				if( allFerments[n].getAttribute('data-reactions') != null ) {
					var reactionsList = allFerments[n].getAttribute('data-reactions').split( ', ' );
	// в полученном массиве поищем нашу реакцию
					if( reactionsList.indexOf( reactionToShow ) == -1 ) {
						allFerments[n].classList.add( 'ferment--semi-visible' );
						}
					};
				}
			})();
		};
	})
};