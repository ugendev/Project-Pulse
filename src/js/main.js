window.addEventListener("DOMContentLoaded", function() {
	let
		prev     	 = document.querySelector(".slider__prev"),
		next     	 = document.querySelector(".slider__next"),

		noSelectArea = document.querySelector(".slider"),

		itemsWrapper = document.querySelector(".slider__wrapper"),
		items    	 = itemsWrapper.querySelectorAll(".slider__item"),

		currItem 	 = 0,
		prevItem 	 = 2,
		nextItem 	 = 1,

		isMouseDown  = false,

		pointIn		 = 0,
		pointOut	 = 0,
		
		different 	 = 0;
	


	noSelectArea.addEventListener("selectstart", (event) => event.preventDefault());

	function setOrder() {
		items.forEach( (value, key) => {
			if (key == currItem) {
				value.style.order = "1";
			} else if (key == nextItem) {
				value.style.order = "2";
			} else if (key == prevItem) {
				value.style.order = "0";
			}
		});
	}

	function nextSlide() {
		if (
			!items[currItem].classList.contains("toLeft") && 
			!items[nextItem].classList.contains("toLeft")
		   )
		{
			items[currItem].classList.add("toLeft");
			items[nextItem].classList.add("toLeft");
	
			if (currItem == 2) {
				currItem = 0;
			} else {
				currItem++;
			}
	
			if (nextItem == 2) {
				nextItem = 0; 
			} else {
				nextItem++;
			}
	
			if (prevItem == 2) {
				prevItem = 0; 
			} else {
				prevItem++;
			}
	
			let timer = setTimeout( function() {
				items[currItem].classList.remove("toLeft");
				items[prevItem].classList.remove("toLeft");
	
				setOrder();
			}, 1200);
		}
	}

	next.addEventListener("click", nextSlide);

	function prevSlide() {
		if (
			!items[currItem].classList.contains("toRight") && 
			!items[nextItem].classList.contains("toRight")
		   )
		{
			items[currItem].classList.add("toRight");
			items[prevItem].classList.add("toRight");
	
			if (currItem == 0) {
				currItem = 2;
			} else {
				currItem--;
			}
	
			if (nextItem == 0) {
				nextItem = 2; 
			} else {
				nextItem--;
			}
	
			if (prevItem == 0) {
				prevItem = 2; 
			} else {
				prevItem--;
			}
	
			let timer = setTimeout( function() {
				items[currItem].classList.remove("toRight");
				items[nextItem].classList.remove("toRight");
	
				setOrder();
			}, 1200);
		}
	}

	prev.addEventListener("click", prevSlide);

	setOrder();
});