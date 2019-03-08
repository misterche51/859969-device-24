var writeUs = document.querySelector(".about__btn--popup");
var mapHtml = document.querySelector(".about__map");
var mapModal = document.querySelector("#modal-map");
var mapExit = mapModal.querySelector(".modal__btn-exit");
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
 	
writeUs.addEventListener("click", onPopupShow);
buttonExit.addEventListener("click", onPopupClose);


function onPopupShow (evt) {
    evt.preventDefault();
    popup.classList.add("modal--show");
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
};

function onPopupClose (evt) { 
    evt.preventDefault();

    popup.classList.remove("modal--show","modal--error");
    if (isStorageSupport) {
       localStorage.setItem("feedbackUsername", feedbackUsername.value);
       localStorage.setItem("feedbackUsermail", feedbackUsermail.value);
    }
    feedbackUsername.classList.remove("field-invalid");
    feedbackUsermail.classList.remove("field-invalid");
    feedbackUsermessage.classList.remove("field-invalid");
 }

function onPopupEscapePress (evt) {
    if (evt.keyCode === 27) {
      onPopupClose(evt);
      window.removeEventListener("keydown", onPopupEscapePress);
    }
}


form.addEventListener("submit", onFormSubmit);
feedbackUsername.addEventListener("focus", onFieldFocus);
feedbackUsermail.addEventListener("focus", onFieldFocus);
feedbackUsermessage.addEventListener("focus", onFieldFocus);

function onFormSubmit (evt) {
  var isFormValid = true;
  checkElementEmpty(feedbackUsername);
  checkElementEmpty(feedbackUsermail);
  checkElementEmpty(feedbackUsermessage);

    if (!isFormValid) {
      evt.preventDefault();
      popup.classList.remove("modal--error");
      popup.offsetWidth = popup.offsetWidth;
      popup.classList.add("modal--error");
    } 
      function checkElementEmpty (elem) {
        if (!elem.value) {
          isFormValid = false;
          elem.classList.add("field-invalid");
        }
      }
}

function onFieldFocus (evt) {
    evt.target.classList.remove("field-invalid");
    }



ymaps.ready(function () {
    var myMap = new ymaps.Map("modal-map", {
            center: [55.686980, 37.529654],
            zoom: 14,
            controls: ["zoomControl","searchControl"]
    });

     var placemark = new ymaps.Placemark(myMap.getCenter(), {
        balloonContentHeader: 'Device на ул.Строителей, 15',
        balloonContentBody: '<img src="img/decorative/logo-device-footer.svg" width="163" height="35"> <br/> ' +
            '<a href="tel:+7-495-495-95-95">+7(495)495-95-95</a><br/>' +
            '<b>Режим работы</b> <br/> С 10-00 до 20-00.',
        balloonContentFooter: 'Информация предоставлена:<br/>OOO "Девайс"',
        hintContent: 'Магазин Device находится здесь'
    });
    // Добавим метку на карту.
    myMap.geoObjects.add(placemark);
    // Откроем балун на метке.
    placemark.balloon.open();
});




  mapHtml.addEventListener("click", onMapShow);
  mapExit.addEventListener("click", onMapClose);
  
  function onMapShow (evt) {
    evt.preventDefault();
    mapModal.classList.add("modal--show");
    window.addEventListener("keydown", onMapEscapePress);
  }

 function onMapEscapePress (evt) {
    if (evt.keyCode === 27) {
      onMapClose(evt);
      window.removeEventListener("keydown", onMapEscapePress);
    }
  }
  
  function onMapClose (evt) { 
    evt.preventDefault();

    mapModal.classList.remove("modal--show");
  }




