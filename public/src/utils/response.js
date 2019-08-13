export default class Response {

	constructor(options, xhr){
		this.config = options;
		this.headers = this.buildHeadersMap(xhr);
		this.status = xhr.status;
		this.statusText = xhr.statusText;
		this.data = this.buildResponseData(xhr);
		this._xhr = xhr;
	}

	buildHeadersMap(xhr) {
		let headers = xhr.getAllResponseHeaders();
		let arr = headers.trim().split(/[\r\n]+/);
		let map = {};
		arr.forEach((line)=> {
			let parts = line.split(': ');
			let header = parts.shift();
			let value = parts.join(': ');
			if(header && header.trim()) {
				map[header] = value;
			}
		});
		return map;
	}

	buildResponseData(xhr) {
		try {
			return JSON.parse(xhr.response);
		}catch (e) {
			return xhr.responseText;
		}
	}
};