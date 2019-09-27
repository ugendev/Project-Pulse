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

		isTouch  	 = false,
		touchStart	 = 0,
		touchEnd	 = 0,
		swipeDir	 = 0;	

	// images of slider is not allocated
	noSelectArea.addEventListener("selectstart", (event) => event.preventDefault());

	// remove classes, when translate images
	function actAfterAnim() {
		for (let x = 0; x < 3; x++) {
			items[x].classList.remove("toLeft");
			items[x].classList.remove("toRight");
		}

		setOrder();
	}

	itemsWrapper.addEventListener("animationend", actAfterAnim);

	// set order images on animtaion end
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

	// change index of current, previous and next slider image
	function setIndex(ifValue, elseValue, condValue) {
		if (currItem == condValue) {
			currItem = ifValue;
		} else {
			currItem += elseValue;
		}

		if (nextItem == condValue) {
			nextItem = ifValue; 
		} else {
			nextItem += elseValue;
		}

		if (prevItem == condValue) {
			prevItem = ifValue; 
		} else {
			prevItem += elseValue;
		}
	}

	// do not allow leaf next img until animation ends
	function checkClasses() {
		for (let x = 0; x < items.length; x++) {
			if (items[x].classList.contains("toLeft") ||
				items[x].classList.contains("toRight")
			) {
				return false;
			}
		}
		return true;
	}

	// function - handler clicks on next img
	function nextSlide() {
		if ( checkClasses() ) {
			items[currItem].classList.add("toLeft");
			items[nextItem].classList.add("toLeft");

			setIndex(0, 1, 2);
		}
	}

	next.addEventListener("click", nextSlide);

	// -- / -- prev img
	function prevSlide() {
		if ( checkClasses() ) {
			items[currItem].classList.add("toRight");
			items[prevItem].classList.add("toRight");
	
			setIndex(2, -1, 0);
		}
	}

	prev.addEventListener("click", prevSlide);

	// track touchstart
	function watchTouchStart(event) {
		if (event.target == items[currItem]) {
			isTouch = true;
			touchStart = event.touches[0].pageX;
		}
	}

	// track touchend
	function watchTouchEnd(event) {
		isTouch = false;
		touchEnd = event.changedTouches[0].pageX;

		swipe();
	}

	function swipe() {
		items[currItem].classList.add("swipeAnim");
		if (touchEnd < touchStart) {
			swipeDir = -1;

			items[nextItem].classList.add("swipeAnim");

			items[currItem].style.transform = `translateX(${valueToTrans - 900}px)`;
			items[nextItem].style.transform = `translateX(${-900}px)`;
		} else {
			swipeDir = 1;

			items[prevItem].classList.add("swipeAnim");

			items[prevItem].style.transform = `translateX(${900}px)`;
			items[currItem].style.transform = `translateX(${valueToTrans + 900}px)`;
		}
	}

	// 
	let valueToTrans = 0;
	function watchTouchMove(event) {
		if (isTouch) {
			valueToTrans = event.touches[0].pageX - touchStart;
			items[currItem].style.transform = `translateX(${valueToTrans}px)`;
		}
	}

	function actAfterTrans() {
		items.forEach(function(value) {
			value.style.transform = "translateX(0px)";
			value.classList.remove("swipeAnim");
		});

		(~swipeDir) ? setIndex(0, 1, 2) : setIndex(2, -1, 0);

		setOrder();
	}

	itemsWrapper.addEventListener("touchstart", watchTouchStart);
	itemsWrapper.addEventListener("touchend", watchTouchEnd);
	itemsWrapper.addEventListener("touchmove", watchTouchMove);
	itemsWrapper.addEventListener("transitionend", actAfterTrans);

	setOrder();
});