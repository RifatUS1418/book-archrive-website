// toogle spinner
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}

// toggle error message
const toggleErrorMessage = displayStyle => {
    document.getElementById('error-message').style.display = displayStyle;
}

// search result
const searchResult = () => {
    const searchField = document.getElementById('search-field');
    // display spinner
    toggleSpinner('block');

    // hide error message
    toggleErrorMessage('none');
    const searchText = searchField.value;
    searchField.value = '';
    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(res => res.json())
        .then(data => displayResult(data))
}

// load book 
const displayResult = books => {
    if (books.docs.length === 0) {
        const resultFound = document.getElementById('result-found');
        resultFound.textContent = '';
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';

        // hide spinner
        toggleSpinner('none');
        // display error message
        toggleErrorMessage('block');
    }
    else {

        toggleErrorMessage('none');
        const resultFound = document.getElementById('result-found');
        resultFound.textContent = '';
        const div = document.createElement('div');
        div.classList.add('text-light');
        div.innerHTML = `
            <h3 class= 'text-center'>Found Book: ${books.numFound}</h3>
        `;
        resultFound.appendChild(div);
        const searchResult = document.getElementById('search-result');
        searchResult.textContent = '';
        books.docs.forEach(book => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div class="card h-100">
            <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" width="auto" height="400px">
            <div class="card-body">
              <h3 class="card-title">${book.title}</h3>
              <p class="card-text fw-bold"><span class="text-danger">Author:</span> ${book.author_name}</p>
            </div>
            <div class="card-footer">
              <small class="text-muted fw-bold">First released: ${book.first_publish_year}</small>
            </div>
          </div>
          `;
            searchResult.appendChild(div);
        })
        // hide spinner
        toggleSpinner('none');
    }
}
