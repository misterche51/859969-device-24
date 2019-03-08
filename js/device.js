	var moreInfo = document.querySelector(".about__btn--popup");
	var mapZoom = document.querySelector(".about__map");
	var mapPopup = document.querySelector("#modal-map");
  var mapExit = mapPopup.querySelector(".modal__btn-exit");
	var popup = document.querySelector(".modal__feedback");
	var buttonExit = document.querySelector(".modal__btn-exit");
	var form = popup.querySelector("form");
	var feedbackUsername = popup.querySelector(".form__field--username");
	var feedbackUsermail = popup.querySelector(".form__field--usermail");
	var feedbackUsermessage = popup.querySelector(".form__field--usermessage");
	var isStorageSupport = true;
  var storage = "";
  var storageMail = "";


  try {
    storage = localStorage.getItem("feedbackUsername");
    storageMail = localStorage.getItem("feedbackUsermail");
  } catch (err) {
    isStorageSupport = false;
  }
 	

  moreInfo.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	popup.classList.add("modal-show");
  	feedbackUsername.focus();
    
    if (storage) {
      feedbackUsername.value = storage;
      feedbackUsermail.focus(); 
    // } else if (storageMail) {
    //     feedbackUsermail.value = storageMail;
    //     feedbackUsermessage.focus();
    } else {
      feedbackUsername.focus();
    }
   });



   mapZoom.addEventListener("click", function (evt) {
  	evt.preventDefault();
  	mapPopup.classList.add("modal-show");
  });

   window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (mapPopup.classList.contains("modal-show")) {
          mapPopup.classList.remove("modal-show");
      } 
    };
  });

  mapExit.addEventListener("click", function (evt) {
    evt.preventDefault();
     mapPopup.classList.remove("modal-show");
});


   	buttonExit.addEventListener("click", function (evt) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
   
    feedbackUsername.classList.remove("field-invalided");
    feedbackUsermail.classList.remove("field-invalided");
    feedbackUsermessage.classList.remove("field-invalided");
    popup.classList.remove("modal-shake");
 });

    form.addEventListener("submit", function (evt) {
     if (!feedbackUsername.value) {
     	evt.preventDefault();
     	feedbackUsername.classList.remove("field-invalided");
     	feedbackUsername.offsetWidth = feedbackUsername.offsetWidth;
     	feedbackUsername.classList.add("field-invalided");
     }
  });

    form.addEventListener("submit", function (evt) {
     if (!feedbackUsermail.value) {
     	evt.preventDefault();
     	feedbackUsermail.classList.remove("field-invalided");
     	feedbackUsermail.offsetWidth = feedbackUsermail.offsetWidth;
     	feedbackUsermail.classList.add("field-invalided");
     };
  });

    form.addEventListener("submit", function (evt) {
     if (!feedbackUsermessage.value) {
     	evt.preventDefault();
     	feedbackUsermessage.classList.remove("field-invalided");
     	feedbackUsermessage.offsetWidth = feedbackUsermessage.offsetWidth;
     	feedbackUsermessage.classList.add("field-invalided");
     }
  });

    feedbackUsername.addEventListener("focus", function (evt) {
    	feedbackUsername.classList.remove("field-invalided");
    });

    feedbackUsermail.addEventListener("focus", function (evt) {
    	feedbackUsermail.classList.remove("field-invalided");
    });

    feedbackUsermessage.addEventListener("focus", function (evt) {
    	feedbackUsermessage.classList.remove("field-invalided");
    });

     form.addEventListener("submit", function (evt) {
    	if (!feedbackUsername.value || 
    		!feedbackUsermessage.value || 
    		!feedbackUsermail) {
    	evt.preventDefault();
    	popup.classList.remove("modal-shake");
    	popup.offsetWidth = popup.offsetWidth;
      	popup.classList.add("modal-shake");

    	} else {
      		localStorage.setItem("feedbackUsername", feedbackUsername.value);
      		localStorage.setItem("feedbackUsermail", feedbackUsermail.value);
    	};
  });

 window.addEventListener("keydown", function (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      if (popup.classList.contains("modal-show")) {
        popup.classList.remove("modal-show");
        popup.classList.remove("modal-shake");
      } if (feedbackUsername.classList.contains("field-invalided")){
      	feedbackUsername.classList.remove("field-invalided");
      } if (feedbackUsermail.classList.contains("field-invalided")){
      	feedbackUsermail.classList.remove("field-invalided");
      } if (feedbackUsermessage.classList.contains("field-invalided")){
      	feedbackUsermessage.classList.remove("field-invalided");
      };
    };
  });