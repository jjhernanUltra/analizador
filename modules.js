
















document.querySelector('#limpiar').addEventListener('click', () => {
    document.querySelector('#sentencia').value = '';
    document.querySelector('#estados').value = '';
});

document.querySelector('#analizar').addEventListener('click', () => {
    const a = document.querySelector('#sentencia').value.split("");
    let estado = 1;
    let estadosLista = [];
    let cadena = {
        ide_var : '',
        asignacion : '=',
        apos : "'",
        cadena : '',
        sim_ter : ';'
    };
    let cadenaToken = '';
    const regexLetra = RegExp('[a-zA-Z]');
    const regexDigito = RegExp('[0-9]');
    a.every(element => {
        if (element == " ") {
            return true;
        }
        if (estado == 3) {
            
            cadenaToken = '';
        } else if (estado == 6) {
            cadena.cadena = cadenaToken;
        }
        cadenaToken = cadenaToken + element;
        switch (estado) {
            case 1:
                if (regexLetra.exec(element)) {
                    cadena.ide_var += element;
                    estado = 2;
                    estadosLista.push(estado);
                } else if (regexDigito.exec(element)) {
                    estado = 15;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 2:
                if (regexLetra.exec(element) || regexDigito.exec(element)) {
                    cadena.ide_var += element;
                    estado = 2;
                    estadosLista.push(estado);
                } else if (element == '=') {
                    estado = 3;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 3:
                if (regexDigito.exec(element)) {
                    estado = 4;
                    estadosLista.push(estado);
                } else if (element == "'") {
                    
                    estado = 7;
                    estadosLista.push(estado);
                } else if (regexLetra.exec(element)) {
                    estado = 10;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 4:
                console.log(element);
                if (regexDigito.exec(element)) {
                    estado = 4;
                    estadosLista.push(estado);
                } else if (element == ".") {
                    estado = 5;
                    estadosLista.push(estado);
                } else if (element == ";") {
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    return false;
                } 
                break;
            case 5:
                if (regexDigito.exec(element)) {
                    estado = 6;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 6:
                if (regexDigito.exec(element)) {
                    estado = 6;
                    estadosLista.push(estado);
                } else if (element == ";") {
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 7:
                if (regexLetra.exec(element)) {
                    estado = 8;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 8:
                if (regexDigito.exec(element) || regexLetra.exec(element)) {
                    estado = 8;
                    estadosLista.push(estado);
                } else if (element == "'") {
                    estado = 9;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 9:
                if (element == ";") {
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            case 10:
                if (regexDigito.exec(element) || regexLetra.exec(element)) {
                    estado = 10;
                    estadosLista.push(estado);
                } else if (element == ";") {
                    estado = 11;
                    estadosLista.push(estado);
                } else {
                    return false;
                }
                break;
            default:
                break;
        }
        return true;
    });
    const val = document.querySelector('#val');
    if (estado == 11) {
        estadosLista.forEach((element) => {
            document.querySelector('#estados').value += element+', ';
        })
        val.innerHTML = 'Cadena valida';
        val.classList.remove('text-danger');
        val.classList.add('text-success');
    } else {
        document.querySelector('#estados').value = '';
        val.innerHTML = 'Cadena invalida';
        val.classList.remove('text-success');
        val.classList.add('text-danger');
    }
    console.log({estadosLista, cadena});
})

