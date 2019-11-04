//AJAX FUNCTION START
function ajax({method: method, route: route, type: type, data: data, success: success, forbidden: forbidden, notFound: notFound}){
  var xhr = new XMLHttpRequest();
  xhr.open(method, route, true);
  //if (type == "json") true/false
  (method == "post") && (type == "json")? (xhr.setRequestHeader('Content-type', "application/json")) : (xhr.setRequestHeader('Content-type', "application/x-www-form-urlencoded"));
  xhr.onload = function(){
    (this.status == 200) ? (success(this)) : (this.status == 403)? (forbidden(this)) : (notFound(this));
  }
  xhr.send(JSON.stringify(data))
};
//AJAX FUNCTION END

/**************************************************************************/

/*POST EXAMPLE*/
function postItem(){
  ajax({
    method: 'post',
    route: '/api',
    type: "json",
    data: {name: "anyName"},
    success: function(xhr){
      console.log(xhr.responseText);
    },
    forbidden: function(){
      console.log('FORBIDDEN');
    },
    notFound: function(){
      console.log('Not Found');
    }
  });
};

/*GET EXAMPLE*/
function getItem(){
  ajax({
    method: 'get',
    route: '/api',
    success: function(xhr){
      console.log(xhr.responseText);
    },
    forbidden: function(){
      console.log('FORBIDDEN');
    },
    notFound: function(){
      console.log('Not Found');
    }
  });
};


/*DELETE EXAMPLE*/
function deleteItem (id){
  ajax({
    method: "delete",
    route: "/todo/"+id,
    data: id,
    success: function(xhr){
      //list.children[xhr.responseText].remove();
      //or
      list.children[id].remove();
    }
  });
};
