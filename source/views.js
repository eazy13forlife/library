import{myLibrary,removeBook,toggleCompleted,changePageNumber}from "./functions.js"
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
    infoCard.classList.add("info-card")
    const titleCardEl=document.createElement("H1");
    titleCardEl.textContent=book.title;

    const authorCardEl=document.createElement("p");
    authorCardEl.textContent=`by ${book.author}`;

    const totalPagesCardEl=document.createElement("p");
    totalPagesCardEl.textContent=`${book["total pages"]} pages`;

    //create remove card button and add event listener so that when you click it, the book is removed from the library
    const removeCardEl=document.createElement("button");
    removeCardEl.textContent="Remove"
    removeCardEl.addEventListener(("click"),(e)=>{
      removeBook(book.id);
      displayBooks();
    })

    const editPageCardEl=document.createElement("button");
    editPageCardEl.textContent="edit current page";
    editPageCardEl.addEventListener("click",(e)=>{
      document.querySelector(".new-one .error_message").textContent=""
      document.querySelector("#change_page").value=""
      document.querySelector("#change_page_form").style.display="block"
      document.querySelector("#change_page_form").setAttribute("id",book.id)
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
    /*
    //now if you hover over the checkmark,thats an indication that you want to change status of your book from finished to not finished or vice versa. If you havent finished the book, but hover over the checkmark, it will show red, which means the book is finished.If you have finished the book, but hover over the checkmark, it will show green meaning that the book is not finished.
    image.addEventListener("mouseover",(e)=>{
      if(book.completed===false){
        image.setAttribute("src",redCheckmark)
      }else{
        image.setAttribute("src",greenCheckmark)
      }
    })
    //when mouseout, transition to the original color
    image.addEventListener("mouseout",(e)=>{
      if(book.completed===true){
        image.setAttribute("src",redCheckmark)
      }else{
        image.setAttribute("src",greenCheckmark)
      }
    */
    //we append the image to the toggle button
    toggleCompletedEl.appendChild(image);
    toggleCompletedEl.addEventListener("click",(e)=>{
      toggleCompleted(book.id);
      displayBooks();
    })

    //if the book in the library is completed
    if(book.completed===true){
      const completedCardEl=document.createElement("h3");
      completedCardEl.textContent=`Finished!`
      appendChildren(infoCard,titleCardEl,authorCardEl,totalPagesCardEl,completedCardEl,removeCardEl,editPageCardEl,toggleCompletedEl);
    }else{
      const currentPageCardEl=document.createElement("p");
      currentPageCardEl.textContent= `on page ${book["current page"]}`;
      appendChildren(infoCard,titleCardEl,authorCardEl,totalPagesCardEl,currentPageCardEl,removeCardEl,editPageCardEl,toggleCompletedEl);
    }
    document.querySelector(".library").appendChild(infoCard);
  })
}


// checkmark if book is finished or not or a finished button and a way to undo this button,finished says completed, if not,it doesnt say it

export{displayBooks}
