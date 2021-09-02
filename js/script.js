// onclicka on sarch button----->

const sarchbutton = async () => {
  const input = document.getElementById("input");
  const inputvalue = input.value;
  input.value = "";

  //if inputfild empty (error throw)----->

  if (inputvalue === "") {
    document.getElementById("found").style.display = "block";
    document.getElementById("card-parent").textContent = "";
    document.getElementById("result-found").style.display = "none";
    document.getElementById(
      "found"
    ).innerHTML = `<h3>"Please type something"</h3>`;
  }

  //if inputfild  not empty (api fetch)----->
  else {
    const url = ` https://openlibrary.org/search.json?q=${inputvalue}`;
    const res = await fetch(url);
    const data = await res.json();
    datalod(data);
  }
};

// datalode function----->

const datalod = (obj) => {
  document.getElementById(
    "result-found"
  ).innerHTML = ` <h3>${obj.numFound} result found</h3>`;
  update(obj.docs);
};

const update = (arr) => {
  // if result not found (error throw)----->

  if (arr.length === 0) {
    document.getElementById("found").style.display = "block";
    document.getElementById("card-parent").textContent = "";
    document.getElementById("result-found").style.display = "none";
    document.getElementById("found").innerHTML = `<h3 >No Result Found</h3>`;
  }

  // if result found (card create and data uplode)----->
  else {
    document.getElementById("result-found").style.display = "block";
    document.getElementById("found").style.display = "none";
    const parent = document.getElementById("card-parent");
    parent.textContent = "";

    //   card create and uplode function----->
    arr.forEach((book) => {
      console.log(book);
      const newelem = document.createElement("div");
      newelem.classList.add("col");
      newelem.innerHTML = `
            <div class="card h-100 border-0 shadow">
            <img src="https://covers.openlibrary.org/b/id/${
              book.cover_i
            }-L.jpg" class="card-img-top " alt="...">
            <div class="card-body">
             <h3 class="card-title text-center">${book.title}</h3>
              <h6 class="card-title text-center "> ${
                book.author_name?.[0] ? book.author_name[0] : ""
              }</h6>
              <h6 class="card-title text-center ">publisher: ${
                book.publisher?.[0] ? book.publisher[0] : ""
              }</h6>

              <p class="card-text text-center">publish year: ${
                book.publish_year?.[0] ? book.publish_year[0] : ""
              }</p>
            </div>
          </div>
            `;
      parent.appendChild(newelem);
    });
  }
};
