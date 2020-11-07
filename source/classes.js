//need a class of success and error(most likely on the div element that contains the form field and everything it contains)
//need an id of password and password_confirm for the input fields
//need an id of error_message
class FormValidator{
  constructor(form,fields){
    this.form=form;
    this.fields=fields;
    this.result="fail";
  }
  //this calls all the functions we want to call
  initialize(){
    this.validateOnEntry();
    this.validateOnSubmit();
  }
  validateOnSubmit(){
    //we find the form and add a submit event listener on it
    this.form.addEventListener("submit",(e)=>{
      e.preventDefault();
      //we look at our fields array and for each field, we get the input(trimmed of course)
      //we run our validateFields function to check if that input meets our criteria
      this.fields.forEach((field)=>{
        const textValue=field.value;
        //we call validateFields with the input and the field parameter,since the function is created elsewhere, we have to pass in the field paramter for it to be able to use field. But if it was created inside here, we would use field. Same with the input parameter
        this.validateFields(textValue,field)//check to see if input is valid or not
      })
    })
  }
  validateOnEntry(){
    this.fields.forEach((field)=>{
      field.addEventListener("input",(e)=>{
        const textValue=field.value.trim();
        this.validateFields(textValue,field)
      })
    })
  }
  validateFields(value,formField){
    //the div element that holds our formField
    const numberValue=+value;
    const formItemEl=formField.parentElement.parentElement;
    if(value===""){
      //clear the error-message of formItemEL otherwise textContent of formItem wil include more than just name of the field
      formItemEl.querySelector("#error_message").textContent=""
      this.getResultStatus("error",formField,`${formItemEl.textContent} cannot be left blank`)
      this.result="fail"
    }else{
      this.getResultStatus("success",formField,null)
      this.result="correct";
    }

    if(formField.type==="email"){
      const re=/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/
      if(re.test(value)){
        this.getResultStatus("success",formField,null);
        this.result="correct"
      }else{
        this.getResultStatus("error",formField,"Please put in a valid email")
        this.result="fail"
      }
    }
    if(formField.id==="password_confirm"){
      if(document.querySelector("#password").value===formField.value){
        this.getResultStatus("success",formField,null)
        this.result="correct";
      }else{
        this.getResultStatus("error",formField,"Passwords do not match.")
        this.status="fail"
      }
    }
    if(formField.id==="total_pages"||formField.id==="current_page"){
      if(numberValue&&numberValue!==0){
        this.getResultStatus("success",formField,null);
        this.result="correct"
      }else{
        this.getResultStatus("error",formField,"Please add a page number");
        this.result="fail"
      }
    }
  }
  getResultStatus(outcome,formField,message){
    const formItemEl=formField.parentElement.parentElement;     const errorMessageEl=formItemEl.querySelector("#error_message")
    if(arguments[0]==="error"){
      if(formItemEl.classList.contains("success")){
        formItemEl. classList.toggle("success")
      }
      //if it doesnt contain error,add it
      if(!formItemEl.classList.contains("error")){
        formItemEl.classList.add("error");
        //clear any textContent in span first so message variable doesn't include it as part of textContent in the formItemEl
        //set the textContent of the errorMessageEl to the message variable.
        errorMessageEl.textContent=message
      //if it already contains error,just remove the textContent there and change the textContent
      }else{
        errorMessageEl.textContent=message
      }
    }else{
      if(formItemEl.classList.contains("error")){
        formItemEl.classList.toggle("error")
      }

      if(!formItemEl.classList.contains("success")){
        formItemEl.classList.add("success")
      }
    }
  }

}



//our Book class, which calls our constructor function and creates an instance of an object with our class name,so Book.
class Book{
  constructor(author,title,totalPages,currentPages,completed){
    this.title=title,
    this.author=author,
    this["total pages"]=totalPages,
    this["current pages"]=currentPages,
    this.completed=false
  }
}


export{Book,FormValidator}
