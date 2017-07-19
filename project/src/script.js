'use strict';
var allFerments = document.querySelectorAll( '.ferment' ),
	allFermentsDetails = document.querySelectorAll( '.ferment-details' ),
	allCloseLinks = document.querySelectorAll( '.ferment-details__close' ); 

for( var i = 0; i < allFerments.length; i++) {
	allFerments[i].addEventListener( 'click', showFermentDetails )
	};

for ( var k = 0; k < allCloseLinks.length; k++ ) {
	allCloseLinks[k].addEventListener( 'click', hideFermentDetails )
	};

function showFermentDetails(e) {
	// получили элемент, по которому кликнули, прочли его ID
	var targetFermentID = e.currentTarget.id;
	// нашли по этому ID подходящий ferment-description
	for( var i = 0; i < allFermentsDetails.length; i++ ) {
		if ( allFermentsDetails[i].getAttribute('data-ferment') == targetFermentID ) {
			allFermentsDetails[i].classList.remove( 'ferment-details--hidden' );
			allFermentsDetails[i].classList.add( 'ferment-details--visible' );
			}
		} 
	};

function hideFermentDetails(e) {
	var elementToClose = this.parentNode.parentNode;
	elementToClose.classList.remove( 'ferment-details--visible' );
	elementToClose.classList.add( 'ferment-details--hidden' );
	};

// открытие-закрытие модального окна с описанием фермента

// переключение выбранного типа реакций
// отбор ферментов в зависимости от выбранного типа реакции