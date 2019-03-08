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
  var storage = {
      name: "",
      email: ""
  };


  try {
    storage.name = localStorage.getItem("feedbackUsername");
    storage.email = localStorage.getItem("feedbackUsermail");
    } catch (err) {
      isStorageSupport = false;
    }
 	

  moreInfo.addEventListener("click", onPopupShow);
  buttonExit.addEventListener("click", onPopupClose);


  function onPopupShow (evt) {
    evt.preventDefault();
     popup.classList.add("modal-show");
    if (isStorageSupport) {
       storage.name = localStorage.getItem("feedbackUsername");
       storage.email = localStorage.getItem("feedbackUsermail");

      if (storage.name) {
        feedbackUsername.value = storage.name;

        if (storage.email) {
          feedbackUsermail.value = storage.email;
          feedbackUsermessage.focus();
        } else {
          feedbackUsermail.focus();
        }
      } else {
        feedbackUsername.focus();
      }
    } else {
      feedbackUsername.focus();
    }
   
    window.addEventListener("keydown", onPopupEscapePress);
  }

  function onPopupClose (evt) {
   evt.preventDefault();
    popup.classList.remove("modal-show","modal-shake");
    if (isStorageSupport) {
       localStorage.setItem("feedbackUsername", feedbackUsername.value);
       localStorage.setItem("feedbackUsermail", feedbackUsermail.value);
    }
    feedbackUsername.classList.remove("field-invalided");
    feedbackUsermail.classList.remove("field-invalided");
    feedbackUsermessage.classList.remove("field-invalided");
 }

  function onPopupEscapePress (evt) {
    if (evt.keyCode === 27) {
      evt.preventDefault();
      onPopupClose();
      window.removeEventListener("keydown", onPopupEscapePress);
    }
  }



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










    form.addEventListener("submit", onFormSubmit);
    feedbackUsername.addEventListener("focus", onFieldFocus);
    feedbackUsermail.addEventListener("focus", onFieldFocus);
    feedbackUsermessage.addEventListener("focus", onFieldFocus);

    function onFormSubmit (evt) {
      var isFormValid = true;

         if (!feedbackUsername.value) {
          isFormValid = false;
          feedbackUsername.classList.remove("field-invalided");
          feedbackUsername.offsetWidth = feedbackUsername.offsetWidth;
          feedbackUsername.classList.add("field-invalided");
         }

          if (!feedbackUsermail.value) {
          isFormValid = false;
          feedbackUsermail.classList.remove("field-invalided");
          feedbackUsermail.offsetWidth = feedbackUsermail.offsetWidth;
          feedbackUsermail.classList.add("field-invalided");
         }

          if (!feedbackUsermessage.value) {
          isFormValid = false;
          feedbackUsermessage.classList.remove("field-invalided");
          feedbackUsermessage.offsetWidth = feedbackUsermessage.offsetWidth;
          feedbackUsermessage.classList.add("field-invalided");
        }

          if (!isFormValid) {
            evt.preventDefault();
            popup.classList.remove("modal-shake");
            popup.offsetWidth = popup.offsetWidth;
            popup.classList.add("modal-shake");
            } 
    }

    function onFieldFocus (evt) {
      evt.target.classList.remove("field-invalided");
    }
