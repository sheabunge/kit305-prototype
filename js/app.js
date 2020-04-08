'use strict';

class App {

	constructor() {

		// update the clock time now and every five seconds
		this.update_clock();
		setInterval(this.update_clock, 5000);

		// reroute the phone screen whenever the URL hash changes (due to an anchor click or manual navigation)
		const that = this;
		window.addEventListener('hashchange', () => that.handle_routing());
		this.handle_routing();
	}

	/**
	 * Update the phone screen content according to the current page URL.
	 */
	handle_routing() {
		const screen = document.querySelector('.screen');

		// fetch the URL hash, defaulting to the landing screen.
		const hash = window.location.hash ? window.location.hash.substr(1) : 'landing';
		let discovered = false;

		// update each and every screen content element.
		for (let i = 0; i < screen.childNodes.length; i++) {
			const section = screen.childNodes[i];

			// whitespace is counted as text elements, so ignore those.
			if (!section.id) {
				continue;
			}

			// if the current section matches that indicated in the URL hash, display it and update the page title.
			if (section.id === hash) {
				section.style.display = 'block';
				document.title = 'Raffle Manager: ' + (section.dataset.title ? section.dataset.title : section.id);
				discovered = true;
			} else {
				// otherwise, hide each section.
				section.style.display = 'none';
			}
		}

		// if we did not discover a matching screen, show the final screen block as a fallback.
		if (!discovered) {
			screen.childNodes[screen.childNodes.length - 2].style.display = 'block';
		}
	}

	/**
	 * Update the phone clock with the current system time.
	 */
	update_clock() {
		const clock = document.querySelector('.clock');
		const date = new Date();
		clock.textContent = (date.getHours() < 10 ? '0' : '') + date.getHours() + ':' + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
	}
}

window.addEventListener('DOMContentLoaded', () => {
	window.app = new App();
});
