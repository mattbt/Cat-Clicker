/*******************/
/***** Model *******/
/*******************/
var data = {
  current_cat : null,
  form_admin_open : false,
  cats : [
    {'name' : 'Peggy', 'img': 'img/cat1.jpg', 'click_count' : 0},
    {'name' : 'Sarasvati', 'img': 'img/cat2.jpg', 'click_count' : 0},
    {'name' : 'Pierrot', 'img': 'img/cat3.jpg', 'click_count' : 0},
    {'name' : 'Brahma', 'img': 'img/cat4.jpg', 'click_count' : 0},
    {'name' : 'Shakti', 'img': 'img/cat5.jpg', 'click_count' : 0}
  ]
}

/*******************/
/***** Octopus *****/
/*******************/
var octopus = {
  init : function(){
    // Model init
    this.set_current_cat(data.cats[0]);

    // View init
    view_catlist.init();
    view_catdetail.init();
    view_catadmin.init();
  },

  get_catlist : function(){
    // Model retrieve
    return data.cats;
  },

  set_current_cat : function(cat){
    // Model update
    data.current_cat = cat;
  },

  get_current_cat : function(cat){
    // Model retrieve
    return data.current_cat;
  },

  // Event Listeners
  image_click : function(){
    // Model update
    data.current_cat.click_count += 1;

    // View update
    view_catlist.render();
    view_catdetail.render();
    view_catadmin.render();
  },

  catlist_click : function(cat){
    // Model update
    this.set_current_cat(cat);

    // View update
    view_catdetail.render();
    view_catadmin.render();
  },

  // Form Admin
  open_form_admin : function(){
    // Model update
    data.form_admin_open = true;

    // View update
    view_catadmin.render();
  },

  close_form_admin : function(){
    // Model update
    data.form_admin_open = false;

    // View update
    view_catadmin.render();
  },

  save_form_admin : function(form_data){
    // Model update
    data.current_cat.name = view_catadmin.catName.value;
    data.current_cat.click_count = parseInt(view_catadmin.catClicks.value);

    // View update
    view_catlist.render();
    view_catdetail.render();
    view_catadmin.render();
  },

  get_form_open : function(){
    // Model retrieve
    return data.form_admin_open;
  },
}

/*******************/
/***** View ********/
/*******************/
var view_catlist = {

  init: function(){
    // store DOM elements for easy access later
    this.catlistNode = document.getElementById('catlist');

    // render this view
    this.render();
  },

  render: function(){
    // empty list
    this.catlistNode.innerHTML = null;

    // get the cats and render them
    catlist = octopus.get_catlist();
    catlist.forEach(this.render_catlist_elem);
  },

  render_catlist_elem : function(cat, index){
      // create and add single list element
      catlistNode = document.getElementById('catlist');
      cat_elem = document.createElement('li');
      cat_elem.className = "col-md-12";

      cat_link = document.createElement('a');
      cat_link.className = "row";
      cat_link.href = "#";

      cat_name = document.createElement('span');
      cat_name.innerHTML = cat.name;
      cat_name.className = "col-xs-8 col-sm-8 col-md-8";
      cat_link.appendChild(cat_name)

      cat_count = document.createElement('span');
      cat_count.className = "badge";
      cat_count.innerHTML = cat.click_count;
      cat_link.appendChild(cat_count)

      cat_elem.appendChild(cat_link)

      // list item click event handler
      cat_link.addEventListener('click', function(){
        octopus.catlist_click(cat);
      }, false);

      catlistNode.appendChild(cat_elem)
  }
}

var view_catdetail = {
  init: function(){
    // store DOM elements for easy access later
    this.catName = document.getElementById('catname');
    this.catImage = document.getElementById('catimage');
    this.catCount = document.getElementById('catcount');

    // event handlers
    this.catImage.addEventListener('click', octopus.image_click, false);

    // render this view
    this.render();
  },

  render : function(){
    // get current cat
    render_cat = octopus.get_current_cat()

    // set DOM values
    this.catName.innerHTML = render_cat.name;
    this.catImage.src = render_cat.img;
    this.catCount.innerHTML = render_cat.click_count;
  }
}

var view_catadmin = {
  init: function(){
    // store DOM elements for easy access later
    this.formAdmin = document.getElementById('form-admin');
    this.btnAdmin = document.getElementById('btn-admin');
    this.btnAdminCancel = document.getElementById('btn-admin-cancel');
    this.btnAdminSave = document.getElementById('btn-admin-save');
    this.catName = document.getElementById('form-catname');
    this.catClicks = document.getElementById('form-catclicks');

    // event handlers
    this.btnAdmin.addEventListener('click', octopus.open_form_admin, false);
    this.btnAdminCancel.addEventListener('click', octopus.close_form_admin, false);
    this.btnAdminSave.addEventListener('click', octopus.save_form_admin, false);

    // render this view
    this.render();
  },

  render : function(){
    // hide form admin
    this.formAdmin.style.display = 'none'

    // get form open boolean
    form_open = octopus.get_form_open();

    // if true get current cat info, set DOM form values and show form
    if (form_open) {
      render_cat = octopus.get_current_cat();
      this.catName.value = render_cat.name;
      this.catClicks.value = render_cat.click_count;
      this.formAdmin.style.display = 'block'
    }

  }
}

// initialize everything
octopus.init();
