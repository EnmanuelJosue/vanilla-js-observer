const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';

localStorage.setItem('offset', 5);
let offset = localStorage.getItem('offset');

const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      let products = response;
      let output = products.map(product => {
        // template
        return `
          <article class="Card">
            <img src=${product.images[0]} />
            <h2>
              ${product.title}
              <small>$ ${product.price}</small>
            </h2>
          </article>
        `;

      });
      let newItem = document.createElement('section');
      newItem.classList.add('Item');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

const loadData = () => {
  const limit = 5;
  getData(`${API}?offset=${offset}&limit=${limit}`);
}

const intersectionObserver = new IntersectionObserver(entries => {
  // logic...
  entries.forEach((entry) => {
    if(entry.isIntersecting) {
      loadData();
      console.log('Intersectando');
      offset = Number(localStorage.getItem('offset')) + 10;
      localStorage.setItem('offset', offset);
    }
  })
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
