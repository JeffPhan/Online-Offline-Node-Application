describe('getlocationtest', function() {
	it('canary is passing', function() {
	  expect(true).to.be.eql(true);
	});

	beforeEach(function() {
		elementToUpdate = {
			value: ''
		}

		button = {
			onclick: undefined
		}

		position= {
			coords: {
				latitude: 1,
				longitude : 2,
				altitude: 3
			}
		}

		error = {
			code: 1
		}
		
		navigator = {
			geolocation: {
				getCurrentPosition: function(info, error) {
					info(position);
				}
			}
		}
	});

	it('function type', function() {
		getGeoLocation(elementToUpdate, button)
		expect(typeof(button.onclick)).to.be.eql('function');
	});

	it('location info', function() {
		getGeoLocation(elementToUpdate, button)
		button.onclick()
		expect(elementToUpdate.value).to.be.eql('Latitude: 1 Longitude: 2 Altitude: 3')
	});

	it('location error', function() {
		navigator = {
			geolocation: {
				getCurrentPosition: function(info, errors) {
					errors(error);
				}
			}
		}
		getGeoLocation(elementToUpdate, button)
		button.onclick()
		expect(elementToUpdate.value).to.be.eql("Permission denied")
	});
});

describe('word count limit', function() {
	it('canary is passing', function() {
	  expect(true).to.be.eql(true);
	});

	beforeEach(function() {
		text = {
			onkeyup: undefined,
			value: "Hello World"
		}

		remaining = {
			innerHTML: ''
		}
	});

	it('word count', function() {
		checkWordCount(text, remaining)
		text.onkeyup()
		expect(remaining.innerHTML).to.be.eql("Words left: 298")
	});

	it('no words', function() {
		text = {
			onkeyup: undefined,
			value: ""
		}
		checkWordCount(text, remaining)
		text.onkeyup()
		expect(remaining.innerHTML).to.be.eql("Words left: 300")
	});

	it('words over 300', function() {
		text = {
			onkeyup: undefined,
			value: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec fringilla non arcu vel ullamcorper. Suspendisse potenti. Quisque eu neque at odio aliquet vehicula. In condimentum lectus vitae neque ornare tristique. Maecenas arcu dolor, porttitor in nulla sed, feugiat hendrerit dui. Suspendisse magna ex, lobortis et nibh sit amet, luctus sodales turpis. Donec ligula nulla, tincidunt vel interdum at, ullamcorper vel lorem. Sed suscipit et justo at dapibus. Pellentesque ac sapien pulvinar, eleifend nisi id, rutrum quam. Donec vitae ligula massa. In lobortis egestas eros, eget auctor tortor elementum in. Suspendisse porta imperdiet augue, id molestie enim interdum id. Vivamus cursus vel quam sit amet fermentum. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aliquam nibh tellus, placerat sed elit id, facilisis molestie augue. Nunc laoreet lorem ac iaculis aliquam. Curabitur a augue consectetur, finibus enim quis, ornare nibh. Ut molestie ex quis nibh varius, eget bibendum lectus dictum. Cras lacinia, lectus id viverra ultricies, lectus risus scelerisque quam, sit amet interdum mi purus eu lorem. Nunc consequat est vel porttitor fringilla. Suspendisse porta velit et metus posuere posuere. Suspendisse potenti. Cras tristique lacus mauris, ac egestas eros tristique vitae. Nam arcu eros, laoreet scelerisque diam sit amet, consequat fringilla metus. Sed lacinia fringilla est, ac accumsan lectus commodo et. Etiam tempor lectus non dignissim sodales. Ut nisl metus, ullamcorper vel nisl a, ullamcorper aliquet arcu. Proin ligula purus, rutrum vitae lorem vel, pharetra vehicula magna. Nam elementum, elit eget elementum pharetra, risus ante ultricies eros, sagittis accumsan odio enim vel libero. Nullam sit amet erat maximus, pharetra ante non, gravida est. Nulla facilisi. Vivamus non leo vel ex tempus consequat vitae eget metus. Nunc non molestie dui. Praesent porttitor ac magna et varius. Donec eros lectus, tempus vel varius eget, laoreet eget elit. Morbi commodo mauris id."
		}
		checkWordCount(text, remaining)
		text.onkeyup()
		expect(remaining.innerHTML).to.be.eql("Words left: 0")
	});
});