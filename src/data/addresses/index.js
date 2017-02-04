import addresses from './data.json';

class AddressFactory {
	get() {
		const COUNT = 5;
		return new Promise((resolve, reject) => {
			var result = [],
				copy = addresses.slice();
			for (var i = 0; i < COUNT; i++)
				result.push(copy.random());

			resolve(result);
		});
	};
};

Array.prototype.random = function() {
	var index = Math.floor(Math.random() * this.length),
		found = this[index];
	this.splice(index, 1);
	return found;
};

export default new AddressFactory();