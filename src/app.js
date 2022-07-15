import http from './libs/slhttp';
import ui from './classes/UI';

const post_title_element=document.querySelector('#post_title');
const post_body_element=document.querySelector('#post_body');
const post_author_element=document.querySelector('#post_author');

const edit_post_title_element=document.querySelector('#edit_post_title');
const edit_post_body_element=document.querySelector('#edit_post_body');
const edit_post_author_element=document.querySelector('#edit_post_author');
const edit_post_id_element=document.querySelector('#edit_post_id');

document.addEventListener('DOMContentLoaded',fetchPosts);
document.querySelector('#btn_add_post').addEventListener('click',addPost);
document.querySelector('#btn_edit_post').addEventListener('click',savEditPost);
document.getElementById('posts').addEventListener('click',deletePost);
document.getElementById('posts').addEventListener('click',editPost);



function editPost(e){
    e.preventDefault();
    console.log(e.target.classList);
    if(e.target.classList.contains('edit')){
        const postId=e.target.dataset.postId;
        console.log(postId);
        http.get(`http://localhost:3000/posts/${postId}`)
        .then(data=>{
            ui.loadEditPost(data);
        })
        .catch(err=>console.warn(err));
    }
}



function deletePost(e){
    e.preventDefault();
    console.log(e.target.classList);
    if(e.target.classList.contains('delete')){
        const postId=e.target.dataset.postId;
        console.log(postId);
        http.delete(`http://localhost:3000/posts/${postId}`)
        .then(data=>{
            ui.createAlert('Post deleted successfully!','alert-success');
            fetchPosts();
        })
        .catch(err=>console.warn(err));
    }
}

function fetchPosts(e){
    http.get('http://localhost:3000/posts')
    .then(data=>ui.showPosts(data))
    .catch(err=>console.log(err));
}
function addPost(){
    let title=post_title_element.value;
    let body=post_body_element.value;
    let author=post_author_element.value;
const data={
    title,
    author,
    body
}

http.post('http://localhost:3000/posts',data)
.then(data=>{
    ui.createAlert("Post added successfully!",'alert-success');
    ui.clearAllFields();
    fetchPosts();
})
.catch(err=>console.warn(err));
}

function savEditPost(){
    let title=edit_post_title_element.value;
    let body=edit_post_body_element.value;
    let author=edit_post_author_element.value;
    let postId=edit_post_id_element.value
const data={
    title,
    author,
    body
}

http.put(`http://localhost:3000/posts/${postId}`,data)
.then(data=>{
    ui.createAlert("Edit added successfully!",'alert-success');
    $('#editModal').modal('hide');
    fetchPosts();
})
.catch(err=>console.warn(err));
}