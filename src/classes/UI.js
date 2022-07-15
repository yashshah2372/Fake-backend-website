class UI{
    constructor(){
        //container with form and postsWrapper
        this.addPostFormCard=document.querySelector('.posts-container .card');
        //COntainer whcih holds all the cards of the posts
        this.postsWrapper=document.getElementById('posts');
        this.firstFormGroup=document.querySelector('.posts-container .form-group');
        this.add_post_title_element=document.querySelector('#post_title');
        this.add_post_body_element=document.querySelector('#post_body');
        this.add_post_author_element=document.querySelector('#post_author');
        this.edit_post_title_element=document.querySelector('#edit_post_title');
        this.edit_post_body_element=document.querySelector('#edit_post_body');
        this.edit_post_author_element=document.querySelector('#edit_post_author');
        this.edit_post_id_element=document.querySelector('#edit_post_id');
    }
    showPosts(posts){
        let output='';
        posts.forEach(post=>{
        output +=`<div class="card">
        <div class="card-body">
          <h5 class="card-title">${post.title}</h5>
          <p class="card-text">${post.body}</p>
          <a href="#" data-post-id="${post.id}" class="btn btn-primary pull-right ml-2 edit" data-toggle="modal" data-target="#editModal">Edit</a>
          <a href="#" data-post-id="${post.id}" class="btn btn-danger pull-right ml-2 delete">Delete</a>
        </div>
      </div>`;
        })
        this.postsWrapper.innerHTML=output;
    }
    createAlert(message,classes){
        const divElement=document.createElement('div');
        const classArray=classes.split(" ");

        divElement.className='alert';
        classArray.forEach(className=>divElement.classList.add(className));
        console.log(this.addPostFormCard);
        console.log(this.firstFormGroup);
        divElement.innerHTML = message;
        this.addPostFormCard.insertBefore(divElement, this.firstFormGroup);
        setTimeout(() => {
          this.clearAlert();
        }, 3000)
    }
    clearAlert(){
        const alertElement=document.querySelector('.alert');
        if(alertElement){
                alertElement.remove();
        }
    }
    clearAllFields(){
        this.add_post_title_element.value='';
        this.add_post_body_element.value='';
        this.add_post_author_element.value='';
    }


    loadEditPost(data){
        this.edit_post_title_element.value=data.title;
        this.edit_post_body_element.value=data.body;
        this.edit_post_author_element.value=data.author;
        this.edit_post_id_element.value=data.id;
    }
}
const ui=new UI();
export default ui;