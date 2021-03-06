$(document).ready(function() {

  
document.getElementById("connectBtn").addEventListener("click",initialise);
document.getElementById("btnGo").addEventListener("click",postRequest);
 
 $("#serviceType").on('click','li',function(){

    var text = $(this).html();
    var htmlText = text + ' <span class="caret"></span>';
    $(this).closest('.dropdown').find('.dropdown-toggle').html(htmlText)

    if($(this).attr('id') == "1") {

       $("#circumventPanel").addClass("disabledbutton");
       $("#Providepanel").removeClass("disabledbutton");
    }
    else {
      $("#circumventPanel").removeClass("disabledbutton");
      $("#Providepanel").addClass("disabledbutton");
    }

    });



   
});

function initialise() {

		var xhr = new XMLHttpRequest();
xhr.open("GET", "https://localhost:8080/initialize", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {

    var userDetailsDiv = document.createElement('div');
    var data =JSON.parse(xhr.responseText);
    userDetailsDiv.innerHTML=data.userId; 
    document.getElementById("userIdSpace").appendChild(userDetailsDiv.firstChild);   
  }
}
xhr.send();


	}


	function postRequest() {

    var userId = $("#userIdSpace").html();
    var url = $("#urltext").val();
    var service = 'require_proxy_service';
    var parametersToPost = {UserId:userId,urlRequested:url,serviceType:service};
		
    $.ajax
   ({
      type: "POST",

      url: 'https://localhost:8080/postRequest',
      headers: { 
       'Accept': 'application/json',
       'Content-Type': 'application/json' 
   },
   dataType: 'json',
   async: false,
   data:JSON.stringify(parametersToPost),
   success: function (data) { 


   }

})


	}


function postProvision() {

    var service = 'provide_proxy_service';
    var userId = $("#userIdSpace").html(); 
    console.log(userId);

    var parametersToPost = {UserId:userId,serviceType:service};
     $.ajax
   ({
      type: "POST",

      url: 'https://localhost:8080/postRequest',
      headers: { 
       'Accept': 'application/json',
       'Content-Type': 'application/json' 
   },
   dataType: 'json',
   async: false,
   data:JSON.stringify(parametersToPost),
   success: function (data) { 
        var RequesterUserId;
        var RequestedUrl;
         $.ajax
   ({
      type: "GET",

      url: 'https://localhost:8080/provideProxy',
      headers: { 
       'Accept': 'application/json',
       'Content-Type': 'application/json' 
   },
   dataType: 'json',
   async: false,
   success: function (data) { 
      
          RequesterUserId = data.userId;
          RequestedUrl   =data.url;

          var htmlTextResponse = httpGet(RequestedUrl);
          document.write(htmlTextResponse);

          var htmlFileParams = {requesterUserId:RequesterUserId,htmlBody:htmlTextResponse};

           $.ajax
   ({
      type: "POST",

      url: 'https://localhost:8080/provideWebPage',
      headers: { 
       'Accept': 'application/json',
       'Content-Type': 'application/json' 
   },
   dataType: 'json',
   async: false,
   data:JSON.stringify(htmlFileParams),
   success: function (data) { 
      
        var successDiv = document.createElement('div');
          successDiv.innerHTML="successfully provided";
          document.getElementById("Providepanel").appendChild(successDiv.firstChild);
          

   }

})



   }

})






   }

})




}


function httpGet(theUrl)
{
    if (window.XMLHttpRequest)
    {
        xmlhttp=new XMLHttpRequest();
    }
    else
    {
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();    
}

function open(argument) {
  chrome.app.window.create("mainMenu.html");
}