window.addEventListener("DOMContentLoaded",function(){
    const submitForm=document.getElementById("inputBook");
    submitForm.addEventListener("submit",function(event){
        event.preventDefault();
        addBook();
    });
    if(isStorageExist()){
        loadDataFromStorage();
    }
    
});
document.addEventListener("ondatasaved",()=>{
    console.log("data berhasil disimpan");
});
document.addEventListener("ondataloaded",()=>{
    refreshDataFromBook();
});