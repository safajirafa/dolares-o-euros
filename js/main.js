$(document).ready(function(){

    // Cache de objetos en la pagina
    var $plataEnCOP = $('#plataEnCOP');
    var $precioCompraUSD = $('#precioCompraUSD');
    var $precioCompraEURO = $('#precioCompraEURO');
    var $resultadoCompraUSD = $('.resultadoCompraUSD');
    var $resultadoCompraEURO = $('.resultadoCompraEURO');
    var $precioVentaUSD = $('#precioVentaUSD');
    var $precioVentaEURO = $('#precioVentaEURO');
    var $resumenOperacionUSDenCAD = $('.resumenOperacionUSDenCAD');
    var $resumenOperacionEUROenCAD = $('.resumenOperacionEUROenCAD');
    var $calcular = $('#calcular');
    var $limpiar = $('#limpiar');

    var calcularCompraDivisas = function(){
        // Dividir el total en pesos colombianos por la cantidad ingresada en dolares y euros
        $resultadoCompraUSD.html(
            formatearDecimales($plataEnCOP.val() / $precioCompraUSD.val())
            );

        $resultadoCompraEURO.html(
            formatearDecimales($plataEnCOP.val() / $precioCompraEURO.val())
            );
    };

    var formatearDecimales = function(valor) {
        return valor.toFixed(2);
    };

    var sePuedeCalcular = function(){

        if ($plataEnCOP.val() === '') return;
        if ($precioCompraUSD.val() === '' && $precioCompraEURO.val() === '') return;
        if ($precioVentaUSD.val() === '' && $precioVentaEURO.val() === '') return;

        return true;
    };

    // Realizar calculo de compra de divisas al ingresar valor en input de euro
    $precioCompraEURO.blur(function(){
        calcularCompraDivisas();
        $('.resultado-compra-divisas').fadeIn();
    });

    // Realizar calculo de compra de divisas al llegar a Canada
    $calcular.click(function(){

        // Validar los campos antes de hacer operaciones
        if(!sePuedeCalcular()){
            alert('Parece que te faltan unos campos para hacer bien las cuentas...');
            return;
        }

        $resumenOperacionUSDenCAD.html(
            formatearDecimales($resultadoCompraUSD.text() * $precioVentaUSD.val())
            );

        $resumenOperacionEUROenCAD.html(
            formatearDecimales($resultadoCompraEURO.text() * $precioVentaEURO.val())
            );

        // Mostrar resultados al usuario
        $('.resumen-operaciones').fadeIn();

        // Hacer scroll hacia la parte mas baja de la pagina
        $('html, body').animate({scrollTop: 9999}, 9000);


    });

    // Limpiar el formulario
    $limpiar.click(function(){
        $plataEnCOP.val('');
        $precioCompraUSD.val('');
        $precioCompraEURO.val('');
        $('.resultado-compra-divisas').fadeOut();
        $resultadoCompraUSD.text('0');
        $resultadoCompraEURO.text('0');
        $precioVentaUSD.val('');
        $precioVentaEURO.val('');
        $('.resumen-operaciones').fadeOut();
        $resumenOperacionUSDenCAD.text('0');
        $resumenOperacionEUROenCAD.text('0');
    });

});