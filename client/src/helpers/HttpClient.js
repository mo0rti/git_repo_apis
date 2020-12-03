const HttpClient = () => {
    return {
        getAsync: (url) => {
            let options = {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
            return http(url, options)
        }         
    };
}

const http = async (url, options) => {
    return fetch(url, options)
        .then(response => {
            try {                
                return response.json()
            } catch (error) {
                return Promise.reject(error);
            }
        })
        .then(result => {
            return Promise.resolve(result);
        }).catch(error => {
            if (error) {
                return Promise.reject(error);
            }
        });
};


export default HttpClient;
