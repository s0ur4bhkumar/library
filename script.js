const dialogBox = document.querySelector('.dialogBox');
const showButton = document.querySelector('.showButton');
const confirmBtn = document.getElementById('confirmBtn');
const title = document.getElementById('Title');
const Author = document.getElementById('Author');
const Pages = document.getElementById('Pages');
const Status = document.getElementById('Status');
const info = document.getElementById('Info');
const cancelBtn = document.getElementById('cancel')
const form = document.querySelector('form');
const library = [];
let count = 0;
let book1;
function Book(title, author, pages, status, info) {
    if (!new.target) {
        throw Error('must use new operator for constructor');
    };

    this.id = crypto.randomUUID();
    this.Title = title;
    this.Author = author;
    this.Pages = pages;
    this.Status = status;
    this.Info = info;
};

function addBookToLibrary(bookObj) {
    // take params, create a book then store it in the array
    library.push(bookObj);
}


function fetchBookdetails() {
    let details = '';
    for (const [key, value] of Object.entries(library[count])) {
        if (!(key === 'id')) {
            details += `<p>${key} : ${value}</p>`;
        }
    }
    return details + '\n';
};

function bookTemplate() {
    const div = document.createElement('div');
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    // buttons.appendChild(deleteBtn);
    // buttons.appendChild(readBtn);
    div.id = `book${count}`;
    div.classList.add('book');
    div.appendChild(buttons);
    return div;
}

function insertData() {
    const deleteBtn = document.createElement('button');
    const readBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    readBtn.textContent = 'Read';
    let data = dialogBox.returnValue === 'default' ? 'no return value' : dialogBox.returnValue;
    let bookel = bookTemplate();
    const container = document.querySelector('.container');
    const buttons = document.createElement('div');
    buttons.classList.add('buttons');
    buttons.appendChild(deleteBtn);
    buttons.appendChild(readBtn);
    bookel.innerHTML = data;
    bookel.id = `${count}`;
    bookel.appendChild(buttons);
    container.appendChild(bookel);
    deleteBtn.addEventListener('click',(e) => {
        let element = e.target.parentNode.parentNode;
        container.removeChild(element);
        count--;
        library.splice(count,1);
        // console.log(library);
    })
    readBtn.addEventListener('click',(e)=>{
        let element = e.target.parentNode.parentNode;
        let index = element.id;
        let nthElements = element.querySelectorAll('p')[3];
        nthElements.innerHTML = 'Status : Read'
        library[index-1].status = 'read';
        // library[`${element.id}`][Status] = 'Read';
        console.log(library);
    })
}   


showButton.addEventListener('click', () => {
    dialogBox.showModal();
})

cancelBtn.addEventListener('click', () => {
    dialogBox.close();
})

confirmBtn.addEventListener('click', (e) => {
    e.preventDefault();
    book = new Book(title.value, Author.value, Pages.value, Status.value, info.value);
    addBookToLibrary(book);
    dialogBox.close(fetchBookdetails());
    count++;
    insertData();
    form.reset();
});

