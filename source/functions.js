import{FormValidator} from "./classes.js"


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


//add a book to our library Array
const addBookToLibrary=()=>{
    myLibrary.push({
      title:titleEl.value,
      author:authorEl.value,
      "total pages":totalPagesEl.value,
      "current page":currentPageEl.value,
      completed:completedEl.checked,
    })
    saveBook();
}

//save book to our localStorage
const saveBook=()=>{
  localStorage.setItem("myLibrary",JSON.stringify(myLibrary));
}



export{addBookToLibrary,getMyLibrary,saveBook,validator,formEl,myLibrary}
