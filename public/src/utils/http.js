import Response from './response';

export default function (options) {
	if(!options.url || !options.method) {
		throw new Error('some required options are not provided');
	}

	options.url = options.url + '?';

	if(options.queryParams && Object.keys(options.queryParams).length > 0) {
		for(let key in options.queryParams) {
			let val = options.queryParams[key];
			if(val || val === 0) {
				options.url = options.url + key + '=' + val + '&';
			}
		}
	}
	options.url = options.url + "v=" + +new Date();


	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();

		let success = (event) => {
			let response = new Response(options, xhr);
			if(xhr.status >= 200 && xhr.status < 300) {
				resolve(response);
			}else {
				reject(response);
			}
		};

		let error = (event) => {
			reject(new Response(options, xhr))
		};

		xhr.open(options.method, options.url, true);

		if (options.responseType) {
			xhr.responseType = options.responseType;
		}

		if(options.headers) {
			for(let headerName in options.headers) {
				let headerValue = options.headers[headerName];
				xhr.setRequestHeader(headerName, headerValue);
			}
		}

        if(options.data && (!options.headers || !options.headers['Content-type'])) {
            xhr.setRequestHeader('Content-type', 'application/json');
        }

		xhr.onload = success;
		xhr.onabort = error;
		xhr.onerror = error;
		xhr.ontimeout = error;
		xhr.send(JSON.stringify(options.data));
	});
}
