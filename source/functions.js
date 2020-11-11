import{FormValidator} from "./classes.js"
import { v4 as uuidv4 } from 'uuid';

const formEl=document.querySelector("#form");
const titleEl=document.querySelector("#title");
const authorEl=document.querySelector("#author");
const totalPagesEl=document.querySelector("#total_pages");
const currentPageEl=document.querySelector("#current_page");
const completedEl=document.querySelector("#completed");
let fieldsArray=[titleEl,authorEl,totalPagesEl,currentPageEl]

//create a validator object with our current form element and our current fieldElements
const validator=new FormValidator(formEl,fieldsArray)


//initialize our validator object from the getgo, so we have the submit event listener on our form and input event listeners on our form fields. These event listeners will run first, since they are the first ones activated. Any of the  same event listener added to the same element wil occur after this one occurs.
validator.initialize();


//get our library array from localStorage
const getMyLibrary=()=>{
  const libraryArrayString=localStorage.getItem("myLibrary");
  try{
    return libraryArrayString?JSON.parse(libraryArrayString):[];
  }catch(e){
    return [];
  }
}

//set myLibrary array equal to the return value in getMyLibrary function
const myLibrary=getMyLibrary();

const returnMyLibrary=()=>{
  return myLibrary
}

//add a book to our library Array
const addBookToLibrary=()=>{
    myLibrary.push({
      title:titleEl.value,
      author:authorEl.value,
      "total pages":totalPagesEl.value,
      "current page":currentPageEl.value,
      completed:completedEl.checked,
      id:uuidv4(),
    })
    //clear each field in our fields array inside our form
    fieldsArray.forEach((field)=>{
      field.value=""
    })
    completedEl.checked=false;
    //save the book to our myLibrary array
    saveLibrary();
}

//save book to our localStorage
const saveLibrary=()=>{
  localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
}

//remove a book from our library
const removeBook=(bookId)=>{
  const index=myLibrary.findIndex((book)=>book.id===bookId);
  if(index!==-1){
    myLibrary.splice(index,1);
    saveLibrary();
  }
}

//toggle book completed
const toggleCompleted=(bookId)=>{
  const book=myLibrary.find((book)=>book.id===bookId)
  if(book){
    book.completed=!book.completed;
    saveLibrary();
  }
}
const changePageNumber=(value,bookId)=>{
  const numberValue=+value;
  if(numberValue||numberValue===0){
    const book=myLibrary.find((book)=>book.id===bookId);
    if(book){
      if(numberValue<=book["total pages"]&&!(numberValue<=0)){
        book["current page"]=value;
        saveLibrary();
        return true;
      }else{
        document.querySelector(".new-one").classList.add("error");
        document.querySelector(".new-one .error_message").textContent="Please enter valid number"
        return false;
      }
    }
  }
}
export{addBookToLibrary,getMyLibrary,saveLibrary,validator,formEl,myLibrary,removeBook,toggleCompleted,completedEl,changePageNumber,fieldsArray}
