function fetchTimeout(url, option={}) {
    if (!option.dataType) {
        option.dataType = 'json';
    }
    return new Promise((resolve, reject) => {
        const controller = new AbortController();
        const signal = controller.signal;
        option.signal = signal;
        const fetchPromise = fetch(url, option)
        const timeoutId = setTimeout(() => controller.abort(), option.timeout || 10000);
        fetchPromise.then(function(res) {
            if (res.ok) {
                if (option.dataType == 'json') {
                    return res.json();
                } else if (option.dataType == 'text') {
                    return res.text();
                } else if (option.dataType == 'blob') {
                    return res.blob();
                } else if (option.dataType == 'formData') {
                    return res.formData();
                } else if (option.dataType == 'arrayBuffer') {
                    return res.arrayBuffer();
                }
            } else {
                throw new Error('Network response was not ok.');
            }
        }).then(function(data) {
            timeoutId && clearTimeout(timeoutId);
            resolve(data)
        }).catch(error => {
            timeoutId && clearTimeout(timeoutId);
            reject(error)
        })
        
    })
}
export default fetchTimeout;