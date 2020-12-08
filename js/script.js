const $ = document.querySelector.bind(document);
const $a = document.querySelectorAll.bind(document);

function propostaSlide() {
    smoothScroll("minhaspropostas_propostas");
    if ($a(".minhaspropostas_texto")[0].classList.value.indexOf("hide") === -1) {
        $a(".minhaspropostas_texto")[0].classList.add("hide");
        $a(".minhaspropostas_texto")[1].classList.remove("hide");
        $("#minhaspropostas_button_left").removeAttribute("disabled");
        $("#minhaspropostas_button_right").setAttribute("disabled", "disabled");
    } else {
        $a(".minhaspropostas_texto")[0].classList.remove("hide");
        $a(".minhaspropostas_texto")[1].classList.add("hide");
        $("#minhaspropostas_button_left").setAttribute("disabled", "disabled");
        $("#minhaspropostas_button_right").removeAttribute("disabled");
    }
}

//Abrir vídeo
function video() {
    if (!$("#iframe")) {
        var iframe = document.createElement("div");
        iframe.id = "iframe";
        $("#sobremim").after(iframe);
        iframe.innerHTML = `<div id='iframe_video' class='content'><div id='iframe_topo'><h3 id='iframe_titulo'>Apresentação</h3><div id='close-video' onclick='fechar()'><i class='fa fa-close' aria-hidden='true'></i></div></div><iframe width='${window.screen.width > 1000 ? "790" : "100%"}' height='${window.screen.width > 1000 ? "448" : "400"}' src='https://www.youtube.com/embed/ncXoHrq3mFw?autoplay=1' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen></iframe></div>`;
        smoothScroll("iframe");
    }
}
function fechar() {
    $("#iframe").remove();
    smoothScroll("sobremim");
}

function menuMobile() {
    if ($("#menu_mobile_options").classList.value.indexOf("hide") === -1) {
        $("#menu_mobile_options").classList.add("hide");
    } else {
        $("#menu_mobile_options").classList.remove("hide");
    }
}

//capturar posição inicial;
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}
//capturar posição do elemento até onde a página irá rolar;
function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}
//calcula a distância entre o elemento inicial e final e o tempo até a página chegar neste;
function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID) - 50;
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
    return false;
}

window.onload = function () {
    $("#logo").addEventListener("click", () => {
        smoothScroll("header_container")
    });
    $("#button_sobremim").addEventListener("click", () => {
        smoothScroll("sobremim")
    });
    $("#button_mobile_sobremim").addEventListener("click", () => {
        smoothScroll("sobremim")
    });
    $("#button_minhaspropostas").addEventListener("click", () => {
        smoothScroll("minhaspropostas")
    });
    $("#button_mobile_minhaspropostas").addEventListener("click", () => {
        smoothScroll("minhaspropostas")
    });
    $("#button_colabore").addEventListener("click", () => {
        smoothScroll("participe")
    });
    $("#button_mobile_colabore").addEventListener("click", () => {
        smoothScroll("participe")
    });
}