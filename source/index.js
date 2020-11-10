import{addBookToLibrary,validator,formEl,changePageNumber,fieldsArray} from "./functions.js"
import{FormValidator,Book} from "./classes.js"
import{displayBooks} from "./views.js"

localStorage.clear();
//our second submit event when we click Add Book.
formEl.addEventListener("submit",(e)=>{
  e.preventDefault();
  //validator.initialize was already run in functions.js, so submit event listener was already added on the form. So, that event listener will run first(and validify our input along with telling us if result was correct or fail) before this event will run.
  if(validator.success.length===4){
    addBookToLibrary();
    formEl.style.display="none";
    displayBooks();
  }
})

//event listner when we click the plus sign, our form pops up in the center
document.querySelector("#plus_sign").addEventListener("click",(e)=>{
  fieldsArray.forEach((field)=>{
    field.value=""
    field.parentElement.parentElement.classList.remove("error")
  })
  formEl.style.display="block";
})

//event listener when we click the X on our form
document.querySelector("#close_form").addEventListener("click",(e)=>{
  formEl.style.display="none"
})

document.querySelector("#change_page_form").addEventListener("submit",function(e){
  e.preventDefault();
  changePageNumber(e.target.elements.change_page.value,this.id)
  displayBooks();
  this.setAttribute("id","change_page_form");
  this.style.display="none"

})
