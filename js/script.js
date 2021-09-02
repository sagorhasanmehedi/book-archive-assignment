// onclicka on butyton----->
const sarchbutton = async () => {
  const input = document.getElementById("input");
  const inputvalue = input.value;
  input.value = "";

  // inputfild empty condition----->
  if (inputvalue === "") {
    document.getElementById("found").style.display = "block";
    document.getElementById("card-parent").textContent = "";
    document.getElementById("result-found").style.display = "none";
    document.getElementById(
      "found"
    ).innerHTML = `<h3>"Please type something"</h3>`;
  }

  //   url fetch----->
  else {
    const url = ` https://openlibrary.org/search.json?q=${inputvalue}`;
    const res = await fetch(url);
    const data = await res.json();
    datalod(data);
  }
};

// datalode arro function----->
const datalod = (obj) => {
  // console.log(obj);
  document.getElementById(
    "result-found"
  ).innerHTML = ` <h3>${obj.numFound} result found</h3>`;
  update(obj.docs);
};

const update = (arr) => {
  // condition for not found----->
  if (arr.length === 0) {
    document.getElementById("found").style.display = "block";
    document.getElementById("card-parent").textContent = "";
    document.getElementById("result-found").style.display = "none";
    document.getElementById("found").innerHTML = `<h3 >No Result Found</h3>`;
  } else {
    document.getElementById("result-found").style.display = "block";
    document.getElementById("found").style.display = "none";
    const parent = document.getElementById("card-parent");
    parent.textContent = "";
    arr.forEach((book) => {
      console.log(book.author_name);

      //   card create and uplode----->
      const newelem = document.createElement("div");
      newelem.classList.add("col");
      newelem.innerHTML = `
            <div class="card h-100 border-0 shadow">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top " alt="...">
            <div class="card-body">
             <h3 class="card-title text-center">${book.title}</h3>
              <h6 class="card-title text-center "> ${book.author_name}</h6>

              <p class="card-text text-center">publish year: ${book.publish_year}</p>
            </div>
          </div>
            `;
      parent.appendChild(newelem);
    });
  }
};
