import{addBookToLibrary,validator,formEl,changePageNumber,fieldsArray,saveLibrary,darkModeEl} from "./functions.js"
import{FormValidator,Book} from "./classes.js"
import{displayBooks} from "./views.js"
console.log(document.querySelector("body"))
//when page is reloaded,display all the books in the library
displayBooks();

//our second submit event when we click Add Book.
formEl.addEventListener("submit",(e)=>{
  e.preventDefault();
  //validator.initialize was already run in functions.js, so submit event listener was already added on the form. So, that event listener will run first(and validify our input along with telling us if result was correct or fail) before this event will run.
  if(validator.success.length===4){
    addBookToLibrary();
    formEl.style.display="none";
    //this will save our library only when we click submit. If we exit our of the form, we don't want anything to be saved.
    saveLibrary();
    displayBooks();
    darkModeEl.style.display="none"
  }
})

//event listner when we click the plus sign.
document.querySelector("#plus_sign").addEventListener("click",(e)=>{
  //first remove all the textcontent from our form
  darkModeEl.style.display="block"
  fieldsArray.forEach((field)=>{
    field.value=""
    field.parentElement.parentElement.classList.remove("error")
  })
  //show our form on the screen
  formEl.style.display="block";
})

//event listener when we click the X on our form
document.querySelector("#close_form").addEventListener("click",(e)=>{
  //remove our form box
  formEl.style.display="none"
  darkModeEl.style.display="none"
})

//event listener when we click submit on our change page number
document.querySelector(".new-one").addEventListener("submit",function(e){
  e.preventDefault();
  if(changePageNumber(e.target.elements.change_page.value,this.id)){
    //this will save our library only when we click submit. If we exit our of the form, we don't want anything to be saved.
    saveLibrary();
    //show all of our books
    displayBooks();
    //remove that box from the screen
    this.style.display="none";
    darkModeEl.style.display="none";
  }
})

//event listener when we exit out of our change page number form
document.querySelector(".close-edit-page").addEventListener("click",(e)=>{
  document.querySelector(".new-one").style.display="none";
  darkModeEl.style.display="none";
})
