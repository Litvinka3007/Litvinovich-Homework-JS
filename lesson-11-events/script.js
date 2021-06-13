'use strict';

var container = document.getElementById('container'),
    dragImage = null,
    dragShiftX,
    dragShiftY;

var pictures = container.getElementsByTagName('img');

for (var i = 0; i < pictures.length; i++) {
  AddEventHandler(pictures[i], 'mousedown', dragStart, false);
  AddEventHandler(pictures[i], 'mouseover', mouseOver, false);
  AddEventHandler(pictures[i], 'mouseout', mouseOut, false);
}

function mouseOver(EO) {
  EO = EO || window.event;
  console.log('mouseover - мышь сейчас над элементом ' + EO.target.id);
  PreventDefault(EO);
}

function mouseOut(EO) {
  EO = EO || window.event;
  console.log('mouseout - мышь сейчас НЕ над элементом ' + EO.target.id);
  PreventDefault(EO);
}

function dragStart(EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  dragImage = EO.target;

  container.appendChild(dragImage);
  dragImage.style.position = 'absolute';
  dragImage.style.cursor = 'grabbing';

  var mouseX = EO.pageX,
      mouseY = EO.pageY,
      imageX = dragImage.offsetLeft,
      imageY = dragImage.offsetTop;

  dragShiftX = mouseX - imageX;
  dragShiftY = mouseY - imageY;

  window.onmousemove = dragMove;
  window.onmouseup = dragStop;
}

function dragMove(EO) {
  EO = EO || window.event;
  PreventDefault(EO);

  var mouseX = EO.pageX,
      mouseY = EO.pageY,
      imageX = mouseX - dragShiftX,
      imageY = mouseY - dragShiftY;

  dragImage.style.left = imageX + 'px';
  dragImage.style.top = imageY + 'px';
}

function dragStop() {
  window.onmousemove = null;
  window.onmouseup = null;
  dragImage.style.cursor = 'auto';
}

// установка обработчика событий
function AddEventHandler(Elem,EventName,HandlerFunc,CaptureFlag) {
  if ( Elem.addEventListener )
    Elem.addEventListener(EventName,HandlerFunc,CaptureFlag); // современные браузеры и IE >=9
  else
  if ( !CaptureFlag ) // перехват вообще невозможен
  {
    var EventName2='on'+EventName;
    if ( Elem.attachEvent ) // IE <=8
    {
      // создаём обёртку для обработчика, чтобы обработчику правильно передавался this
      var IEHandlerF=function() { HandlerFunc.call(Elem); }
      Elem.attachEvent(EventName2,IEHandlerF);
      var StoreName="__IEHandlerF_"+EventName;
      Elem[StoreName]=IEHandlerF; // сохраняем ссылку на обёртку, чтобы найти её при удалении обработчика
    }
    else // устаревшие браузеры
    if ( !Elem[EventName2] )
      Elem[EventName2]=HandlerFunc; // не сработает если несколько обработчиков одного события
  }
}

// отмена обработки события по умолчанию
function PreventDefault(EO) {
  if ( EO.preventDefault )
    EO.preventDefault();
  else
    EO.returnValue=false;
}

