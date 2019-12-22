$(document).ready(function() {
    let addProduct = $('.dodajProduktDoKoszyka');
    let zakupy = $('.zakupy');
    let cleanButton = $('.cleanButton');
    let clickCounter = 0;
    let newProduct = $('#produktKoszyk');
    let removeProduct = $('#removeProduct');
    let buy = $('.przyciskKup');
    let koszykSuma = 0;

    addProduct.click(function (event) {
        let target = event.currentTarget;
        let productAddBtn = $(target);
        let price = $(target).data('value');
        koszykSuma += price;
        $('.cenaKoszyka').text(koszykSuma);

        let nazwaProduktu = productAddBtn.parent().find('.nazwaProduktu').text();
        newProduct = $('<div id="produktKoszyk">'+ nazwaProduktu + '</div>');

        $(zakupy).append(newProduct);
        removeProduct = $('<button class="removeProduct">Usuń</button>');
        $(newProduct).append(removeProduct);
        $('#clickCounter').text(++clickCounter);
        if (clickCounter >= 8) {
            addProduct.hide();
            alert('Osiągnąłeś maksymalną ilość produktów w koszyku');
            event.stopPropagation();
            event.preventDefault();
        }
        $(removeProduct).on('click', function (removeEvent) {
            $('#clickCounter').text(--clickCounter);
            let removeTarget = removeEvent.currentTarget;
            let productToRemove = $(removeTarget).parent();
            koszykSuma -= price;
            $('.cenaKoszyka').text(koszykSuma);
            productToRemove.remove();
            addProduct.show();
            console.log('Usunięto jeden produkt');
        })
    });
    $(cleanButton).click(function () {
        if (clickCounter > 0) {
            zakupy.empty();
            koszykSuma = 0;
            $('.cenaKoszyka').text(koszykSuma);
            clickCounter = 0;
            $('#clickCounter').text(clickCounter);
            addProduct.show();
            alert('Usunięto wszystkie produkty z koszyka.')
        }
    });
    $(buy).click(function () {
        if (clickCounter > 0) {
            zakupy.empty();
            alert('Dokonałeś zakupów na kwotę: ' + koszykSuma + ' złotych. Zapraszamy ponownie:-)');
            koszykSuma = 0;
            $('.cenaKoszyka').text(koszykSuma);
            clickCounter = 0;
            $('#clickCounter').text(clickCounter);
            addProduct.show();
        }
    })
});