// variable

const container = document.querySelector(".container");
const newBook = document.createElement("div");
const button = document.querySelector(".new");
const dialog = document.querySelector(".info-form");
const Title = dialog.querySelector("#Title");
const submit = dialog.querySelector(".submit");
const form = dialog.querySelector("form");
let library = [];

// ******************************************************Objects****************************************

class book {
  constructor(Title, Author, Pages, Status) {
    this.id = crypto.randomUUID();
    this.Title = Title;
    this.Author = Author;
    this.Pages = Pages;
    this.Status = Status;
  }
  toggleStatus = function () {
    if (this.Status === "read") {
      this.Status = "unread";
    } else {
      this.Status = "read";
    }
  };
}

// *********************************************************function*****************************************

const operations = (() => {
  function addBookToLibrary(Title, Author, Pages, Status) {
    const book1 = new book(Title, Author, Pages, Status);
    library.push(book1);
  }

  function removeFromLibrary(id) {
    library = library.filter((obj) => obj.id !== id);
  }

  function displayBooks() {
    const statusButton = document.createElement("button");
    const remove = document.createElement("button");
    const bookCard = document.createElement("div");
    const buttonContainer = document.createElement("div");
    remove.classList.add("removeBtn");
    remove.textContent = "Remove";
    statusButton.classList.add("statusBtn");
    statusButton.textContent = "Read";
    buttonContainer.append(statusButton, remove);
    buttonContainer.classList.add("buttonContainer");
    library.forEach((book) => {
      bookCard.classList.add("book");
      bookCard.id = book.id;

      bookCard.innerHTML = `<div class = 'bookInfo'><h3>Title: <span>${book.Title}</span></h3>
                          <h3>Author: <span>${book.Author}</span></h3>
                          <h3>Pages: <span>${book.Pages}</span></h3>
                          <h3>Status: <span>${book.Status}</span></h3></div>`;
      bookCard.append(buttonContainer);
    });
    container.append(bookCard);
  }

  function removeBook(e) {
    const id = e.target.parentNode.parentNode.id;
    const bookEle = document.getElementById([`${id}`]);
    // return id
    container.removeChild(bookEle);
    removeFromLibrary(id);
  }
  return { addBookToLibrary, removeFromLibrary, displayBooks, removeBook };
})();

//  *******************************************************DOM manipulation***********************************

const main = (function () {
  button.addEventListener("click", (e) => {
    dialog.showModal();
  });

  submit.addEventListener("click", (event) => {
    event.preventDefault();
    if (
      Title.value === "" &&
      Author.value === "" &&
      Pages.value === "" &&
      Status.value === "" &&
      Status.value !== "Read" &&
      Status.value !== "read" &&
      Status.value !== "unread" &&
      Status.value !== "Unread"
    ) {
      alert("please enter correct entries");
      return;
    }
    dialog.close();
    operations.addBookToLibrary(
      Title.value,
      Author.value,
      Pages.value,
      Status.value,
    );
    form.reset();
  });

  dialog.addEventListener("close", () => {
    operations.displayBooks();
  });

  container.addEventListener("click", (e) => {
    if (e.target.classList.contains("removeBtn")) {
      operations.removeBook(e);
    } else if (e.target.classList.contains("statusBtn")) {
      const id = e.target.parentNode.parentNode.id;
      library.forEach((book) => {
        if (book.id === id) {
          console.log(book);
          book.toggleStatus();
          let bookInfo = document.querySelector(`[id = '${id}'] > .bookInfo`);
          const status = bookInfo.querySelector("h3:nth-child(4)>span");
          status.textContent = `${book.Status}`;
        }
      });
    }
  });
})();
