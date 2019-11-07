//AJAX FUNCTION START
function ajax({method: method, route: route, type: type, data: data, success: success, forbidden: forbidden, notFound: notFound}){
  var xhr = new XMLHttpRequest();
  xhr.open(method, route, true);
  // (method == "post") && (type == "json")? (xhr.setRequestHeader('Content-type', "application/json")) : (xhr.setRequestHeader('Content-type', "multipart/form-data"));
  xhr.onload = function(){
    (this.status == 200) ? (success(this)) : (this.status == 403)? (forbidden(this)) : (notFound(this));
  }
  xhr.send(data)
};
//AJAX FUNCTION END

/**************************************************************************/
//submit form btn
const uploadBtn = document.getElementById('upload');
//post title
const newPostTitle = document.getElementsByClassName('new-post-title')[0];
//display the uploaded picture [TEST PURPOSE ONLY]
const showImage = document.getElementsByClassName('new-post-image-show')[0];

uploadBtn.addEventListener('click', function(){
  //post pic
  const file = document.getElementById('new-pic').files[0];
  //post body
  const postBody = iframe.contentWindow.document.body.innerHTML;
  //create formData and append post details to it
  var formData = new FormData();
  formData.append('photo', file);
  formData.append('post-title', newPostTitle.value);
  formData.append('post-body', postBody);

  postItem(formData);
})

/*POST EXAMPLE*/
function postItem(formData){
  ajax({
    method: 'post',
    route: '/upload',
    type: "multipart/form-data",
    data: formData,
    success: function(xhr){
      console.log(xhr.responseText);
      // load picture in the document
      showImage.setAttribute('src', JSON.parse(xhr.responseText).file)
    },
    forbidden: function(){
      console.log('FORBIDDEN');
    },
    notFound: function(){
      console.log('Not Found');
    }
  });
};
