class Controller {

    constructor() {

        this.btn_test = document.querySelector("#test-data");
        this.formEl = document.querySelector("#form-principal");
        this.spinnerEl = document.querySelector('#load-spinner');
        this.resultEl = document.querySelector("#resultOfModel");
        $(function () { $('[data-toggle="tooltip"]').tooltip() });
        // iniciando evento
        this.init();
    }
    init() {
        this.btn_test.addEventListener("click", e => {
            e.preventDefault();
            let data = {},
                isValid = true;

            [...this.formEl].forEach(field => {
                if (field.name == "tutela-antecipada") {

                    if (field.checked) data[field.name] = field.value;
                } else if (field.value == "none") {
                    field.classList.remove("is-valid");
                    field.classList.add("is-invalid");
                    isValid = false;
                } else {
                    data[field.name] = field.value;
                    field.classList.remove("is-invalid");
                    field.classList.add("is-valid");
                }
            });
            if (isValid) {
                this.sendJSON(data);
            }
        });
    }
    sendJSON(data) {

        var xhr = new XMLHttpRequest();

        xhr.open(this.formEl.method, this.formEl.action);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onloadstart = e => {
            this.alterVisibleSpinner();
        }
        xhr.onload = (e) =>{
            if (xhr.readyState === 4 && xhr.status === 200) {
                this.alterVisibleSpinner();
                
                console.log(xhr.responseText);
                //this.resultEl.innerHTML = xhr.responseText;

            } else {
                this.alterVisibleSpinner();
                this.resultEl.innerHTML = xhr.responseText;
            }
        };
        xhr.send(JSON.stringify(data));

    }
    alterVisibleSpinner() {
        if (this.spinnerEl.style.display == "none") {
            this.spinnerEl.style.display = "block"
        } else {
            this.spinnerEl.style.display = "none"
        }
    }
}
let control = new Controller();