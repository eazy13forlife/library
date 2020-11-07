import{myLibrary}from "./functions.js"


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
    console.log(book.id)
    const infoCard=document.createElement("div");
    infoCard.classList.add("info-card")
    const titleCardEl=document.createElement("H1");
    titleCardEl.textContent=book.title;

    const authorCardEl=document.createElement("p");
    authorCardEl.textContent=`by ${book.author}`;

    const totalPagesCardEl=document.createElement("p");
    totalPagesCardEl.textContent=`${book["total pages"]} pages`;

    //if completed is checked,
    if(book.completed===true){
      const completedCardEl=document.createElement("p");
      completedCardEl.textContent=`Finished!`
      appendChildren(infoCard,titleCardEl,authorCardEl,totalPagesCardEl,completedCardEl);
    }else{
      const currentPageCardEl=document.createElement("p");
      currentPageCardEl.textContent= `on page ${book["current page"]}`;
      appendChildren(infoCard,titleCardEl,authorCardEl,totalPagesCardEl,currentPageCardEl);
    }
    document.querySelector(".library").appendChild(infoCard);
  })
}


//I need to add a delete button on the card and a checkmark if book is finished or not or a finished button and a way to undo this button

export{displayBooks}
