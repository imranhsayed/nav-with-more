(function () {

	const menu = {
		init: () => {
			menu.initializeVariables();
			menu.insertMenu();
			menu.doAdapt(); // adapt immediately on load
			window.addEventListener('resize', menu.doAdapt) // adapt on window resize
		},

		initializeVariables: () => {
			menu.container = document.querySelector('.nav');
			menu.primaryContainer = menu.container.querySelector('.-primary');
			menu.primaryItems = menu.container.querySelectorAll('.-primary > li:not(.-more)');
		},

		insertMenu: () => {

			menu.container.classList.add('--jsfied');

			// insert "more" button and duplicate the list

			menu.primaryContainer.insertAdjacentHTML('beforeend', `
				  <li class="-more">
				    <button type="button" aria-haspopup="true" aria-expanded="false">
				      More &darr;
				    </button>
				    <ul class="-secondary">
				      ${menu.primaryContainer.innerHTML}
				    </ul>
				  </li>
				`);


			// add secondary items
			menu.secondary = menu.container.querySelector('.-secondary');
			menu.secondaryItems = menu.secondary.querySelectorAll('li');
			menu.allItems = menu.container.querySelectorAll('li');
			menu.moreLi = menu.primaryContainer.querySelector('.-more');
			menu.moreBtn = menu.moreLi.querySelector('button');

		},

		doAdapt: () => {
			// reveal all items
			menu.allItems.forEach((item) => {
				item.classList.remove('--hidden')
			});

			/**
			 * Check if the item fits in the container, hide the item if not and save its index for later use.
			 * @type {number}
			 */
			let moreBtnWidth = menu.moreBtn.offsetWidth;
			let hiddenItems = [];
			const primaryContainerWidth = menu.primaryContainer.offsetWidth;
			console.warn( 'PrimaryContainer: ul width', primaryContainerWidth );

			menu.primaryItems.forEach((item, i) => {
				console.warn( 'item: each li width', item.offsetWidth );
				console.warn( 'moreBtnWidth+ item li width', (moreBtnWidth + item.offsetWidth) );
				if( ( moreBtnWidth + item.offsetWidth ) <= primaryContainerWidth ) {
					moreBtnWidth += item.offsetWidth;
					console.warn( i,'badi' );
				} else {
					item.classList.add('--hidden');
					hiddenItems.push(i);
					console.warn( i,'ab-choti' );
				}
				console.warn( 'moreBtnWidth', moreBtnWidth );
			});
			console.warn( 'hiddenItemsArray', hiddenItems );

			// hide “more” button if no tabs were hidden
			if(!hiddenItems.length) {
				menu.moreLi.classList.add('--hidden')
				menu.container.classList.remove('--show-secondary')
				menu.moreBtn.setAttribute('aria-expanded', false)
			}
			// hide the equivalent items from the secondary list that remained visible in the primary one
			else {
				menu.secondaryItems.forEach((item, i) => {
					if(!hiddenItems.includes(i)) {
						item.classList.add('--hidden')
					}
				})
			}
		}
	}

	menu.init();
})();
