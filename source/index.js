import{addBookToLibrary,saveBook,validator,formEl} from "./functions.js"
import{FormValidator,Book} from "./classes.js"
import{displayBooks} from "./views.js"


localStorage.clear();

//our second submit event when we click Add Book.
formEl.addEventListener("submit",(e)=>{
  e.preventDefault();
  //validator.initialize was already run in functions.js, so submit event listener was already added on the form. So, that event listener will run first(and validify our input along with telling us if result was correct or fail) before this event will run.
  if(validator.result==="correct"){
    addBookToLibrary();
    formEl.style.display="none";
    displayBooks();
  }
})

//event listner when we click the plus sign, our form pops up in the center
document.querySelector("#plus_sign").addEventListener("click",(e)=>{
  formEl.style.display="block"
})
