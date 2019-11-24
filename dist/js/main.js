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

	// TABS:

	let 
		tabsContent = document.querySelectorAll(".catalog__tab-content"),
		tabsBar 	= document.querySelector(".catalog__tabs"),
		tabs 		= document.querySelectorAll(".catalog__tab"),
		tabsText 	= document.querySelectorAll(".catalog__tab div");

	tabsBar.addEventListener("click", (event) => {
		for (let x = 0; x < tabs.length; x++) {
			if (event.target == tabs[x] || event.target == tabsText[x]) {
				tabsContent[x].style.display = "flex";
				tabs[x].classList.add("catalog__tab_active");
			} else {
				tabsContent[x].style.display = "none";
				tabs[x].classList.remove("catalog__tab_active");
			}
		}
	});

	tabs[0].click();

	// CARD SWITCH
	
	let 
		card 	 	= document.querySelector(".card-product"),
		moreDetails = document.querySelector(".card-product__toggle"),
		back 		= document.querySelector(".card-product__toggle_back"),	
		main 	 	= document.querySelector(".card-product__main"),
		more 	 	= document.querySelector(".card-product__more");

		card.addEventListener("click", (event) => {
			if (event.target == moreDetails || event.target == back) {
				event.preventDefault();
				main.classList.toggle("switched");
				more.classList.toggle("switched");
			}

		});

	// modal windows

	let 
		modalBg 		= document.querySelector(".modal-bg"),

		consBtns		= document.querySelectorAll("[data-modal=consultation]"),
		consModal		= document.querySelector(".modal"),

		buyBtns			= document.querySelectorAll(".button_buy"),
		orderModal		= document.querySelectorAll(".modal")[1],

		thanksModal		= document.querySelectorAll(".modal")[2],

		x 				= document.querySelectorAll(".modal__x"),

		productTitle	= document.querySelectorAll(".card-product__title");

	x.forEach(function(value) { 
		value.addEventListener("click", function() {
			modalBg.classList.add("fadeOut");
			modalBg.addEventListener("animationend", function() {
				modalBg.classList.remove("fadeIn", "fadeOut");
				consModal.style.display = "none";
				orderModal.style.display = "none";
				thanksModal.style.display = "none";
			}, 
			{once:true}
			);
		});
	});

	consBtns.forEach(function(value) {
		value.addEventListener("click", function() {
			consModal.style.display = "block";
			modalBg.classList.add("fadeIn");
		});
	});

	buyBtns.forEach(function(value) {
		value.addEventListener("click", function(event) { 
			let title = "";
			let index = 0;
			buyBtns.forEach(function(value, key) {
				if (event.target == value) {
					index = key;
				}
			});
			productTitle.forEach(function(value, key) {
				if (key == index) { 
					title = value.textContent;
				}
			});
			orderModal.children[2].textContent = title;
			orderModal.style.display = "block";
			modalBg.classList.add("fadeIn");
		});
	});

	//validation

	function validateForms(form){
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2
                },
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожалуйста, введите свое имя",
                    minlength: jQuery.validator.format("Введите {0} символа!")
                  },
                phone: "Пожалуйста, введите свой номер телефона",
                email: {
                  required: "Пожалуйста, введите свою почту",
                  email: "Неправильно введен адрес почты"
                }
            }
        });
    }

    validateForms('#main-form');
    validateForms('#consultation-form');
	validateForms('#order-form');
	
	// phone mask

	$("input[name=phone]").mask("+7 (999) 999-99-99");

	// send forms on mail

	let 
		forms = document.querySelectorAll("form");

	forms.forEach( function(value) {
		value.addEventListener("submit", function(event) {
			if ( !window.isNull(document.querySelector(".error")) ) { 
				event.preventDefault();

				fetch("mailer/smart.php", {
					method: "POST",
					body: new FormData(this)
				})
					.then( () => {
						thanksModal.style.display = "block";
						modalBg.classList.add("fadeIn");
						forms.forEach( (value) => value.reset() );
					});
			}
		});
	});

	// slow scroll up

	let 
		arrowUp = document.querySelector(".up"),
		up 		= document.querySelector("#scrollTo");

	window.addEventListener("scroll", function() {
		if (this.pageYOffset >= 1200) {
			arrowUp.style.display = "block";
			arrowUp.classList.add("fadeIn");
		} else {
			if (arrowUp.style.display != "none") {
				arrowUp.classList.add("fadeOut");
				arrowUp.addEventListener("animationend", function() {
					this.classList.remove("fadeIn");
					this.classList.remove("fadeOut");
					this.style.display = "none";
				}, {once:true});
			}
		}
	});

	arrowUp.addEventListener("click", function(event) {
		event.preventDefault();
		let	
			animationTime 	= 600, 
			fps				= 60,
			coordY 			= window.pageYOffset * -1,
			pxPerTact 		= coordY / fps,
			intervalId 		= setInterval(function() {
				if (window.scrollY == 0) {
					clearInterval(intervalId);
				}
				window.scrollBy(0, pxPerTact);
			}, animationTime / fps);
	});
});