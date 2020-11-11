import{myLibrary,removeBook,toggleCompleted,changePageNumber,formEl}from "./functions.js"
import{redCheckmark,greenCheckmark}from "./icons.js"


//function thats appends all your children to a parent element
const appendChildren=(parentElement,...children)=>{
  children.forEach((child)=>{
    parentElement.appendChild(child);
  })
}


//look at each item in my array and create a box with all the info needed and then display box to the screen.
const displayBooks=()=>{
  //we clear the the container where we append each bookCard, before running through our book array and displaying each bookCard on our screen.
  document.querySelector(".library").innerHTML="";
  myLibrary.forEach((book)=>{
    const infoCard=document.createElement("div");
    infoCard.classList.add("info-card");

    const infoCardLeft=document.createElement("div");
    infoCardLeft.classList.add("card-left");

    const infoCardRight=document.createElement("div");
    infoCardRight.classList.add("card-right");

    const titleCardEl=document.createElement("H1");
    titleCardEl.textContent=book.title;

    const authorCardEl=document.createElement("p");
    authorCardEl.innerHTML=`by <span class="author">${book.author}</span>`;

    const totalPagesCardEl=document.createElement("p");
    totalPagesCardEl.innerHTML=`<span class="page">${book["total pages"]}</span> pages`;

    //create remove card button and add event listener so that when you click it, the book is removed from the library
    const removeCardEl=document.createElement("button");
    removeCardEl.textContent="X"
    removeCardEl.classList.add('remove-card');
    removeCardEl.setAttribute("style","background:none; border-radius:50%;")
    removeCardEl.addEventListener(("click"),(e)=>{
      removeBook(book.id);
      displayBooks();
    })

    //create an edit page button. When you click it,our edit form in our html pops up
    const editPageCardEl=document.createElement("button");
    editPageCardEl.textContent="bookmark page";
    editPageCardEl.setAttribute("style","border:none;border-radius:20px;")
    editPageCardEl.classList.add("edit-page-number")
    editPageCardEl.addEventListener("click",(e)=>{
      if(formEl.style.display==="block"){

      }else{
        //first remove any text content from our form, so when it pops up,everything is blank
        document.querySelector(".new-one .error_message").textContent=""
        document.querySelector("#change_page").value=""
        //display our form to the screen
        document.querySelector(".new-one").style.display="block"
        //add an id attribute to the form in our html that is equal to the uuid of the book where we just clicked edit current page. So, we can use the id of this edit page form and match it with the id of the book in our myLibraryArray, when we click submit
        document.querySelector(".new-one").setAttribute("id",book.id)
      }
    })

    //create a toggle button and add event listener so that when you click it, book.completed toggles between true and false and shows the appropriate message
    const toggleCompletedEl=document.createElement("button");
    toggleCompletedEl.setAttribute("id","toggle_button")
    const image=document.createElement("img");
    image.setAttribute("class","checkmark")
    //if book is completed,the checkmark is red, because you've clicked the green button,meaning you finished the book.
    if(book.completed===true){
      image.setAttribute("src",redCheckmark)
    }else{
      image.setAttribute("src",greenCheckmark);
    }

    toggleCompletedEl.appendChild(image);
    toggleCompletedEl.addEventListener("click",(e)=>{
      toggleCompleted(book.id);
      displayBooks();
    })

    //if the book in the library has been read
    if(book.completed===true){
      const completedCardEl=document.createElement("h3");
      completedCardEl.textContent=`Finished!`
      appendChildren(infoCardLeft,titleCardEl,authorCardEl,totalPagesCardEl,completedCardEl,editPageCardEl);
      appendChildren(infoCardRight,removeCardEl,toggleCompletedEl)
    }else{
      const currentPageCardEl=document.createElement("p");
      currentPageCardEl.innerHTML= `on page <span class="page">${book["current page"]}</span>`;
      appendChildren(infoCardLeft, titleCardEl,authorCardEl,totalPagesCardEl,currentPageCardEl,editPageCardEl);
      appendChildren(infoCardRight,removeCardEl,toggleCompletedEl)
    }
    appendChildren(infoCard,infoCardLeft,infoCardRight)
    document.querySelector(".library").appendChild(infoCard);
  })
}


// checkmark if book is finished or not or a finished button and a way to undo this button,finished says completed, if not,it doesnt say it

export{displayBooks}
