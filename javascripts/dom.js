const UNREAD_LIST_BOOK_ID = "incompleteBookshelfList";
const READ_LIST_BOOK_ID = "completeBookshelfList"; 
const BOOK_ITEMID = "itemId";

function makeBook(judul,author,tahun,kondisi){
    const textJudul = document.createElement("h3");
    textJudul.innerText = judul;

    const textAuthor = document.createElement("p");
    textAuthor.innerText =author;

    const textTahun=document.createElement("p");
    textTahun.innerText=tahun;
    
    let button1=null;
    let button2=null;
    
    if (kondisi) {
       button1 =createUndoCheckButton()
       button2=createTrashButton()
        
    } else {
       
        button1 =createCheckButton()
        button2=createTrashButton()
       
    }
    const containerButtons=document.createElement("div");
    containerButtons.classList.add("action");
    containerButtons.append(button1,button2);

    const Container = document.createElement("article");
    Container.classList.add("book_item")
    Container.append(textJudul,textAuthor,textTahun,containerButtons);

    return Container;
    

}
function addBook(){
    const unreadBookList = document.getElementById(UNREAD_LIST_BOOK_ID );
    const readBookList=document.getElementById(READ_LIST_BOOK_ID);
    
    const textJudul=document.getElementById("inputBookTitle").value;
    const textPenulis=document.getElementById("inputBookAuthor").value;
    const textTahun=document.getElementById("inputBookYear").value;
    const checkComplete=document.getElementById("inputBookIsComplete").checked;


    
    const book = makeBook(textJudul,textPenulis,textTahun,checkComplete);
    const bookObjek=composeBookObject(textJudul,textPenulis,textTahun,checkComplete);
    book[BOOK_ITEMID] = bookObjek.id;
    books.push(bookObjek);

    if(checkComplete){
        readBookList.append(book);       
    }else{
        unreadBookList.append(book);
    }
    updateDataToStorage();
    
}


function createButton(buttonTypeClass,kondisi,eventListener){
    const button=document.createElement("button");
    button.innerText=kondisi;
    button.classList.add(buttonTypeClass);
    button.addEventListener("click", function (event) {
        eventListener(event);
    });
    return button;
}

function addTaskToCompleted(taskElement) {
    const listCompleted=document.getElementById(READ_LIST_BOOK_ID);

    const textJudul=taskElement.querySelector(".book_item > h3").innerText;
    const textPenulis=taskElement.getElementsByTagName("p")[0].innerText;
    const textTahun=taskElement.getElementsByTagName("p")[1].innerText;

    const newList=makeBook(textJudul,textPenulis,textTahun,true);
    const book=findBook(taskElement[BOOK_ITEMID]);

    book.checkComplete=true;
    newList[BOOK_ITEMID]=book.id;

    listCompleted.append(newList);
    taskElement.remove();
    updateDataToStorage();
} 

function undoTaskFromCompleted(taskElement){
    const listUnCompleted=document.getElementById(UNREAD_LIST_BOOK_ID);

    const textJudul=taskElement.querySelector(".book_item > h3").innerText;
    const textPenulis=taskElement.getElementsByTagName("p")[0].innerText;
    const textTahun=taskElement.getElementsByTagName("p")[1].innerText;

    const newList=makeBook(textJudul,textPenulis,textTahun,false);

    const book=findBook(taskElement[BOOK_ITEMID]);
    book.checkComplete=false;
    newList[BOOK_ITEMID]=book.id;

    listUnCompleted.append(newList);
    taskElement.remove();

    updateDataToStorage();
 
}

function removeTaskFromCompleted(taskElement) {
    const bookPosition=findBookIndex(taskElement[BOOK_ITEMID]);
    books.splice(bookPosition,1);


    taskElement.remove();
    updateDataToStorage();
}

function createCheckButton() { 
    return createButton("green","Sudah Dibaca",function(event){
         addTaskToCompleted(event.target.parentElement.parentElement);
    });
}

function createUndoCheckButton() {
    return createButton("green","belum selesai Dibaca",function(event){
       undoTaskFromCompleted(event.target.parentElement.parentElement);
       
        
   });
}

function createTrashButton() {
    return createButton("red","hapus buku", function(event){
        removeTaskFromCompleted(event.target.parentElement.parentElement);
    });
}

function refreshDataFromBook() {
    const listUnRead = document.getElementById(UNREAD_LIST_BOOK_ID);
    let listRead = document.getElementById(READ_LIST_BOOK_ID);
  
  
    for(book of books){
        const newBook = makeBook(book.Judul,book.Author,book.tahun,book.checkComplete);
        newBook[BOOK_ITEMID] = book.id;
        
        if(book.checkComplete){
            listRead.append(newBook);
        } else {
            listUnRead.append(newBook);
        }
    }
 }