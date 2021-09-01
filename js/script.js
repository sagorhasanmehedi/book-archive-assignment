const sarchbutton = async () => {
  const input = document.getElementById("input");
  const inputvalue = input.value;
  input.value = "";

  if (inputvalue === "") {
    document.getElementById("found").style.display = "block";
    document.getElementById("card-parent").textContent = "";
    document.getElementById("result-found").style.display = "none";
    document.getElementById(
      "found"
    ).innerHTML = `<h3>"Please type something"</h3>`;
  } else {
    const url = ` http://openlibrary.org/search.json?q=${inputvalue}`;
    const res = await fetch(url);
    const data = await res.json();
    datalod(data.docs.slice(0, 20));
  }
};

const datalod = (docs) => {
  if (docs.length === 0) {
    document.getElementById("found").style.display = "block";
    document.getElementById("card-parent").textContent = "";
    document.getElementById("result-found").style.display = "none";
    document.getElementById("found").innerHTML = `<h3 >No Result Found</h3>`;
  } else {
    document.getElementById(
      "result-found"
    ).innerHTML = ` <h3>${docs.length} result found</h3>`;
    document.getElementById("result-found").style.display = "block";
    document.getElementById("found").style.display = "none";
    const parent = document.getElementById("card-parent");
    parent.textContent = "";
    docs.forEach((book) => {
      console.log(book);

      const newelem = document.createElement("div");
      newelem.classList.add("col");
      newelem.innerHTML = `
            <div class="card h-100 shadow">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg" class="card-img-top" alt="...">
            <div class="card-body">
             <h4 class="card-title text-center">${book.title}</h4>
              <h4 class="card-title text-center">author name: ${book.author_name}</h4>
              <h5 class="card-text text-center">publisher: ${book.publisher})</h5>
              <p class="card-text text-center">publish date: ${book.publish_date}</p> 
            </div>
          </div>
            `;
      parent.appendChild(newelem);
    });
  }
};

{
}
