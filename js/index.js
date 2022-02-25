const cardTemplate = document.querySelector("#card-template");
const cardContainer = document.querySelector("#card-container");
const searchBox = document.querySelector("input[search-box]");

function createCard(name, email) {
  let card = cardTemplate.content.cloneNode(true).children[0];
  let cardh2 = card.querySelector("h2");
  let cardp = card.querySelector("p");
  cardh2.innerText = name;
  cardp.innerText = email;

  return card;
}

fetch("https://jsonplaceholder.typicode.com/users")
  .then((response) => response.json())
  .then((element) => {
    let users = [];

    for(let i = 0; i< 3; i++){

    element.forEach((user) => {
        let createdCard = createCard(user.name, user.email);
  
        cardContainer.appendChild(createdCard);
  
        users.push({
          name: user.name,
          email: user.email,
          element: createdCard,
        });
      });
  
    }


    searchBox.addEventListener("input", (e) => {
      let data = e.target.value.toLowerCase();

      users.forEach((user) => {
        let isVisible =
          user.name.toLowerCase().includes(data) ||
          user.email.toLowerCase().includes(data);

        user.element.classList.toggle("d-none", !isVisible);
      });
    });
  });
