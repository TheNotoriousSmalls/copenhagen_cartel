document.addEventListener("DOMContentLoaded", init);

// där målet är att ta bort första "jobbiga" .then, så vi slipper skriva det varje ågng
const simpleFetch = (url) => new Promise((resolve) => {
    fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        })
        .then((data) => {
            resolve(data)
        })
        .catch((e) => {
            console.error("An error occured:", e.message);
        });
})

function fetchData() {
    console.log('fetchData')

    simpleFetch("https://natvigdrougge.com/wordpress/wp-json/wp/v2/posts?_fields=id,title,content")
        .then(data => {
            render(data)
        })
}

function render(data) {
    const postsdiv = document.querySelector('#posts');
    const template = document.querySelector('#post-template');

    data.map((post) => {

        let postElementClone = template.content.cloneNode(true);

        postElementClone.querySelector('.title').innerHTML = post.title.rendered;
        postElementClone.querySelector('.content').innerHTML = post.content.rendered;

        postsdiv.append(postElementClone);
    })
}

function init() {
    console.log('init')
    // fetch data from WP
    fetchData()
    // myPromise.then(val => console.log(val))
}