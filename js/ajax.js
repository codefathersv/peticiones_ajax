/* /=============================== XMLHttpRequest =================================/ */
(() => {

    const xhr = new XMLHttpRequest(); // se instancia el objeto 
    const $xhr = document.getElementById("xhr");
    const $fragmento = document.createDocumentFragment();


    xhr.addEventListener("readystatechange", (e) => { // se agrega el evento al objeto    

        if (xhr.readyState !== 4) return; // se valida que la operacion este lista

        if (xhr.status >= 200 && xhr.status < 300) { // se valida que la operacion sea exitosa

            // console.log("Exito");
            // console.log(xhr.responseText);

            let json = JSON.parse(xhr.responseText); // convertimos a un arreglo con el json.parse
            // console.log(json);

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} || ${el.email} || ${el.phone}`;
                $fragmento.append($li);
            });

            $xhr.append($fragmento);

        } else { // en caso contrario imprimir error

            // console.log("Error");

            let message = xhr.statusText || "Ocurrio un error";

            $xhr.innerHTML = `Error ${xhr.status}: ${message}`;

        }

        // console.log("Este mensaje cargara de todas maneras");

        // console.log(xhr);
    });

    xhr.open("GET", "https://jsonplaceholder.typicode.com/users"); // se abre la operacion
    // xhr.open("GET", "./assets/user.json"); // se abre la operacion

    xhr.send(); // se envia la operacion

})();

/* /===============================    API Fetch   =================================/ */
(() => {

    const $fetch = document.getElementById("fetch");
    const $fragmento = document.createDocumentFragment();

    fetch("https://jsonplaceholder.typicode.com/users") // ./assets/user.json
        .then((res) => { // se convierte a formato json

            // console.log(res);

            // se valida en caso de error
            return res.ok ? res.json() : Promise.reject(res); // o res.text(); | res.blob();

        }).then((json) => { // se procesa para agregar la lista 

            // console.log(json);
            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} || ${el.email} || ${el.phone}`;
                $fragmento.append($li);
            })

            $fetch.appendChild($fragmento);


        }).catch((err) => { // en caso de error

            // console.log("Estamos en el catch: ", err);

            let message = err.statusText || "Ocurrio un error";
            $fetch.innerHTML = `Error ${err.status}: ${message}`;

        }).finally(() => {

            console.log("Se imprime de todos modos...");

        });


})();

/* /========================== API Fetch + Async Await =============================/ */
(() => {

    const $fetchAsync = document.getElementById("fetch-async");
    const $fragmento = document.createDocumentFragment();

    async function getData() {

        try {

            let res = await fetch("https://jsonplaceholder.typicode.com/users"); // ./assets/user.json
            let json = await res.json();

            // console.log(res, json);

            if (!res.ok) throw {
                status: res.status,
                statusText: res.statusText
            };

            json.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} || ${el.email} || ${el.phone}`;
                $fragmento.appendChild($li);
            })

            $fetchAsync.appendChild($fragmento);

        } catch (err) {

            console.log("Estoy en el catch ", err);
            let message = err.statusText || "Ocurrio un error";
            $fetchAsync.innerHTML = `Error ${err.status}: ${message}`;

        } finally {

            console.log("Siempre se ejecuta...");

        }

    }

    getData();


})();

/* /===============================      Axios     =================================/ */
(() => {

    const $axios = document.getElementById("axios");
    const $fragmento = document.createDocumentFragment();

    axios.get("https://jsonplaceholder.typicode.com/users") // ./assets/user.json
        .then((res) => {
            // console.log(res);

            // let json = res.data;

            res.data.forEach(el => {
                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} || ${el.email} || ${el.phone}`;
                $fragmento.appendChild($li);
            })

            $axios.appendChild($fragmento);
        })
        .catch((err) => {
            // console.log("Estamos en el catch ", err.response);
            let message = err.response.statusText || "Ocurrio un error";
            $axios.innerHTML = `Error ${err.response.status}: ${message}`;
        })
        .finally(() => {
            console.log("Esto se ejecutara de todas maneras...");
        });

})();

/* /=========================    Axios + Async Await    ============================/ */
(() => {

    const $axiosAsync = document.getElementById("axios-async");
    const $fragmento = document.createDocumentFragment();

    async function getData() {

        try {

            let res = await axios("https://jsonplaceholder.typicode.com/users"); // ./assets/user.json
            let json = await res.data;

            json.forEach(el => {

                const $li = document.createElement("li");
                $li.innerHTML = `${el.name} || ${el.email} || ${el.phone}`;
                $fragmento.appendChild($li);

            })

            $axiosAsync.appendChild($fragmento);

        } catch (err) {

            console.log("Estoy en el catch:", err);
            let message = err.response.statusText || "Ocurrio un error";
            $axiosAsync.innerHTML = `Error ${err.response.status}: ${message}`;

        } finally {

            console.log("Se ejecuta siempre...");

        }

    }

    getData();

})();