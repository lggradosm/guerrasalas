import { requisitos } from "./requisitos.js";

let requisitos_initial = requisitos;
let requisitosTmp = requisitos_initial;

const $ = (selector) => document.getElementById(selector);

const $requisitos = $("gs-requisitos");
const $input = $("gs-input");
const $button_protocolares = $("gs-button-protocolares");
const $button_no_contenciosos = $("gs-button-no-contenciosos");

let html = "";
requisitosTmp.map((requisito) => {
  html += '<li class="gs-li"><a href="#">' + requisito.nombre + "</a></li>";
});

$requisitos.innerHTML = html;
let search = "";
$input.addEventListener("keyup", (e) => {
  if (search === "") {
    requisitosTmp = requisitos_initial;
  }
  search = e.target.value;
  requisitosTmp = requisitos_initial.filter((requisito) =>
    (requisito.id + requisito.nombre).includes(search.toUpperCase())
  );
  showRequisitos();
});
let filter = "";

const showRequisitos = () => {
  let html = "";
  requisitosTmp.map((requisito) => {
    html += '<li class="gs-li"><a href="#">' + requisito.nombre + "</a></li>";
  });
  $requisitos.innerHTML = html;
};

const apllyFilter = (filter) => {
  requisitos_initial = requisitos.filter(
    (requisito) => requisito.type === filter
  );
  requisitosTmp = requisitos_initial;
};

const resetStyles = () => {
  requisitos_initial = requisitos;
  $button_no_contenciosos.classList.remove("active");
  $button_protocolares.classList.remove("active");
};

$button_no_contenciosos.addEventListener("click", () => {
  resetStyles();
  if (filter === "ASUNTOS_NO_CONTENCIOSOS") {
    requisitosTmp = requisitos_initial;
    filter = "";
  } else {
    filter = "ASUNTOS_NO_CONTENCIOSOS";
    $button_no_contenciosos.classList.add("active");

    apllyFilter(filter);
  }
  showRequisitos();
});
$button_protocolares.addEventListener("click", () => {
  resetStyles();

  if (filter === "PROTOCOLARES") {
    requisitosTmp = requisitos_initial;
    filter = "";
  } else {
    filter = "PROTOCOLARES";
    $button_protocolares.classList.add("active");
    apllyFilter(filter);
  }
  showRequisitos();
});
