function addNew(autor, url, fecha, descripcion, foto) {
  var title = $("<h5/>", {
    "class": "card-title col-md-12 col-sm-12 col-12 ",
    html: autor + " dijo: "

  })

  var a = $("<a/>f", {
    "class": "text-left col-md-12 col-12 col-sm-12",
    "href": url,
    html: "https://twitter.com/"+autor.slice(1,-1)+"/status/..."
  })

  var date = $("<p/>", {
    "class": "text-right col-md-12 col-12 col-sm-12",
    "style": "font-style: italic;",
    html: fecha
  })

  var p = $("<p/>", {    
    "class": "card-text col-md-12 col-12  col-sm-12",
    html: descripcion
  })  

  var imagen = $("<img/>", {
    "class": "col-sm-12 col-md-12 col-12",
    "src": "http://www.conecuakor.com/wp-content/uploads/2015/07/twitter-icon-circle-logo.png",
    "style":"min-height:50px; min-width:50px; max-height:120px; max-width:120px;",
    html: imagen

  })

  var div = $("<div/>", {
    "class": "card-body col-md-12 col-sm-12 col-12 row"
  });
  
  var div2 = $("<div/>", {
    "class": "card-body col-md-2 col-sm-3 col-2"
  });  

  var rows = $("<div/>", {
    "class": "col-md-12 col-12 col-sm-12 row"
  });
  var columns = $("<div/>", {
    "class": " border-bottom col-md-10 col-sm-9"
  });

 
  title.appendTo(columns);
  p.appendTo(columns);
  if(foto!=""){
    var img = $("<img/>", {
    "class": "col-md-12 col-12  col-sm-12",
    "src": foto,
    "style":"max-width: 400px; max-height: 400px; display:block; margin:auto;",
    html: img
  })
    img.appendTo(columns);
  }
  a.appendTo(columns);
  date.appendTo(columns);
  imagen.appendTo(div2);
  div2.appendTo(rows);
  columns.appendTo(rows);
  rows.appendTo(div);  
  div.appendTo("#informacion");
}

function loadNewsXml() {
  $.ajax({
    type: "GET",
    url: "https://twitrss.me/twitter_search_to_rss/?term=yoga",
    dataType: "xml",
    success: function (xml) {
      $(xml).find('item').each(function () {
        var autor = $(this).find('dc\\:creator').text();
        var newAutor= autor.slice(2,-1);
        var descripcion = $(this).find('description').text();
        var n= descripcion.search("<img src")
        var regex =/(<img src=\"http(s)?:)(\w|\W)+(\/>)/
        var url = $(this).find('link').text();
        var date = $(this).find('pubDate').text();
        var newDate = date.slice(0,date.indexOf("+"));
        var newDescripcion;
        var foto="";
        if(n!=-1){
          var inicio = descripcion.search(regex);
          var final = descripcion.indexOf(">",descripcion.search(regex));
          var final2 = 1+descripcion.indexOf("\"",descripcion.search(regex)+10);
          foto = descripcion.slice(inicio+10,final2-1);
          newDescripcion=descripcion.slice(0,inicio)+descripcion.slice(final+1,-1);
          addNew(newAutor, url, newDate, newDescripcion, foto);
        }else{
          addNew(newAutor, url, newDate, descripcion, foto) ;
        }
      });
    },
    error: function () {
      alert("Error al procesar el xml");
    }
  });
}


$(document).ready(function(){
  loadNewsXml();
  $("button").click(function(e){

    var texto = $('input#buscador').val();

    document.getElementById('busqueda').innerHTML = texto;
    $("#buscador").val("");
    
    if(texto.length != 0) {
      
      var noticias = $('#informacion .card-body');
      $('#informacion .card-body').filter(function(index){        
        $(this).show();        
        var noticia = $(this).text()
        if(noticia.indexOf(texto) == -1) {
          $(this).hide()
        }
      });
    } else {
      $('#informacion .card-body').each(function(){
        $(this).show();
      });
      $("#busqueda").val("<texto buscado>");
    } return false;  
  })
});

