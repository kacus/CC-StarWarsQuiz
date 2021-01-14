const fetch = require('node-fetch');

async function generate() {
    let endpoint = "https://swapi.dev/api/starships/";

    let data = await fetch(endpoint)
        .then((response) => response.json())
        .then(data => data);


    let ids = []
    while (data.next) {
        let res = data.results;
        res.forEach(element => {
            const url = element.url;
            let id = parseInt(url.slice(endpoint.length-1, -1));
            ids.push(id);
        });
        data = await fetch(data.next)
            .then((response) => response.json());
    }
    return ids;
};
(async ()=>{
    let validIds = await generate()
    console.log(validIds);
})();
