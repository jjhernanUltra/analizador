document.querySelector('#limpiar').addEventListener('click', () => {
    window.location.reload();
});

document.querySelector('#btnradio1').addEventListener('click', () => {
    document.querySelector('#img').removeAttribute('src');
    document.querySelector('#img').setAttribute('src', './DT.png');
});

document.querySelector('#btnradio2').addEventListener('click', () => {
    document.querySelector('#img').removeAttribute('src');
    document.querySelector('#img').setAttribute('src', './TT.png');
});

document.querySelector('#analizar').addEventListener('click', () => {
    const a = (document.querySelector('#sentencia').value).split('');
    let estado = 1;
    let estadosLista = [];
    let cadEs = [];
    const estadosTerminal = [11, 14, 16, 19];
    let cadena = {
        identificador_de_variable : '',
        simbolo_asignacion : '',
        apostrofe : "",
        valor : '',
        simbolo_terminal : ''
    };
    let recS = 0;
    const regexLetra = RegExp('[A-Za-z]');
    const regexDigito = RegExp('[0-9]');
    const regexEspacio = RegExp('^\\s+$');
    a.every(element => {
        if ((element == ' ')) {
            if (estado != 2 && estado != 3 && estado != 8 && estado != 4 && estado != 10 && estado != 12) {
                return true;
            }
        }
        switch (estado) {
            case 1:
                if (regexLetra.exec(element)) {
                    cadena.identificador_de_variable += element;
                    estado = 2;
                    estadosLista.push(estado);
                } else if (element == '+' || element == '-') {
                    cadena.valor += element;
                    estado = 13;
                    estadosLista.push(estado);
                } else if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 14;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 2:
                if (regexLetra.exec(element) || regexDigito.exec(element) || element == '_') {
                    cadena.identificador_de_variable += element;
                    estado = 2;
                    estadosLista.push(estado);
                } else if (element == '=') {
                    if (cadena.identificador_de_variable.includes(' ')) {
                        if (!regexEspacio.exec(cadena.identificador_de_variable.substring(cadena.identificador_de_variable.search(' ')))) {
                            recS = 0;
                            return false;
                        }
                    }
                    cadena.simbolo_asignacion += element;
                    estado = 3;
                    estadosLista.push(estado);
                } else if (element == ' ') {
                    cadena.identificador_de_variable += element;
                    estado = 2;
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 3:
                if (element == ' ') {
                    cadena.simbolo_asignacion += element;
                    estado = 3;
                } else {
                    if (cadena.simbolo_asignacion.includes(' ')) {
                        if (!regexEspacio.exec(cadena.simbolo_asignacion.substring(cadena.simbolo_asignacion.search(' ')))) {
                            return false;
                        }
                    }
                    if (element == '-' || element == '+') {
                        cadena.valor += element;
                        estado = 12;
                        estadosLista.push(estado);
                    } else if (element == "'") {
                        cadena.apostrofe = element;
                        estado = 8;
                        estadosLista.push(estado);
                    } else if (regexDigito.exec(element)) {
                        cadena.valor = element;
                        estado = 4;
                        estadosLista.push(estado);
                    } else if (regexLetra.exec(element)) {
                        cadena.valor += element;
                        estado = 10;
                        estadosLista.push(estado);
                    } else {
                        recS = 0;
                        return false;
                    }
                }
                break;
            case 4:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 4;
                    estadosLista.push(estado);
                } else if (element == ".") {
                    cadena.valor += element;
                    estado = 5;
                    estadosLista.push(estado);
                } else if (element == ";") {
                    cadena.simbolo_terminal = element;
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                } 
                break;
            case 5:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 6;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 6:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 6;
                    estadosLista.push(estado);
                } else if (element == ";") {
                    cadena.simbolo_terminal = element;
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 8:
                if (element == "'") {
                    estado = 9;
                    estadosLista.push(estado);
                } else {
                    cadena.valor += element;
                    estado = 8;
                    estadosLista.push(estado);
                } 
                break;
            case 9:
                if (element == ";") {
                    cadena.simbolo_terminal = element;
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 10:
                if (regexDigito.exec(element) || regexLetra.exec(element) || element == '_') {
                    cadena.valor += element;
                    estado = 10;
                    estadosLista.push(estado);
                } else if (element == ";") {
                    cadena.simbolo_terminal = element;
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 12:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 4;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 13:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 14;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 14:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 14;
                    estadosLista.push(estado);
                } else if (element == ".") {
                    cadena.valor += element;
                    estado = 15;
                    estadosLista.push(estado);
                } else if (element == "E" || element == "e") {
                    cadena.valor += element;
                    estado = 17;
                    estadosLista.push(estado);
                }
                else {
                    recS = 0;
                    return false;
                }
                break;
            case 15:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 16;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 16:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 16;
                    estadosLista.push(estado);
                } else if (element == "E" || element == "e") {
                    cadena.valor += element;
                    estado = 17;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 17:
                if (element == "+" || element == "-") {
                    cadena.valor += element;
                    estado = 18;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 18:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 19;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            case 19:
                if (regexDigito.exec(element)) {
                    cadena.valor += element;
                    estado = 19;
                    estadosLista.push(estado);
                } else {
                    recS = 0;
                    return false;
                }
                break;
            default:
                break;
        }
        if (element == ' ' && estado != 8) {
            return true;
        }
        recS++;
        cadEs += element;
        return true;
    });
    const val = document.querySelector('#val');
    const tableBody = document.querySelector('#body');
    const trState = document.querySelector('#trState');
    const trChar = document.querySelector('#trChar');

    trChar.innerHTML = '';
    trState.innerHTML = '';
    trState.innerHTML += '<th>1</th>';

    for (let i = 0; i < estadosLista.length; i++) {
        trState.innerHTML += `<th>${estadosLista[i]}</th>`;
        trChar.innerHTML += `<th>${cadEs[i]}</th>`;
    }
    if (estadosTerminal.includes(estadosLista[estadosLista.length - 1]) && recS == estadosLista.length) {
        val.innerHTML = 'Cadena valida';
        cadena.identificador_de_variable = cadena.identificador_de_variable.replaceAll(' ', '');
        cadena.valor = cadena.valor.replaceAll(' ', '&nbsp');
        val.classList.remove('bg-danger');
        val.classList.add('bg-success');
        trChar.innerHTML += '<th>\\n</th>';
    } else {
        val.innerHTML = 'Cadena invalida';
        val.classList.remove('bg-success');
        val.classList.add('bg-danger');
        trChar.innerHTML += `<th>${cadEs[cadEs.length - 1]}</th>`;
    }
    
    tableBody.innerHTML = '';
    for (const key in cadena) {
        if (cadena[key] != '' || key == 'valor') {
            if (key == 'valor') {
                let vaNum = Number.parseFloat(cadena[key]);
                if (estadosLista.includes(8)) {
                    tableBody.innerHTML += `<tr><th>cadena</th><th>${ cadena[key] == '' ? ' ' : cadena[key]}</th></tr>`;
                } else if (estadosLista.includes(10)) {
                    tableBody.innerHTML += `<tr><th>referencia variable</th><th>${cadena[key]}</th></tr>`;
                } else if (Number.isInteger(vaNum)) {
                    tableBody.innerHTML += `<tr><th>entero ${vaNum < 0 ? 'con' : 'sin'} signo</th><th>${cadena[key].replace('+', '')}</th></tr>`;
                } else if (estadosLista.includes(17)) {
                    tableBody.innerHTML += `<tr><th>exponencial</th><th>${cadena[key].replace('+', '')}</th></tr>`;
                } else {
                    tableBody.innerHTML += `<tr><th>real ${vaNum < 0 ? 'con' : 'sin'} signo</th><th>${cadena[key].replace('+', '')}</th></tr>`;
                }
            } else {
                tableBody.innerHTML += `<tr><th>${key}</th><th>${cadena[key]}</th></tr>`;
            }
        }
    }
    console.log({estadosLista, cadena});
})

