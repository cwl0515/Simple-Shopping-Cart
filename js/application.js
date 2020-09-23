$(document).ready(function () {

    var calSubtotal = function() {
        var prices = $(".price");
        var qtys = $(".quantity");

        for (i=0; i < qtys.length; i++) {
            var price = Number($(prices[i]).text().replace(/\$/,""));
            var subtotal = (Number($(qtys[i]).val())) * price;
            if (subtotal != 0) {
                $($('.subtotal')[i]).text("$" + subtotal);
            } else {
                $($('.subtotal')[i]).text("$--.--");
            }
        }
    }
    
    var calTotal = function() {
        var total = 0;
        var subtotals = $('.subtotal');

        for (i=0; i<subtotals.length; i++) {
            if ($(subtotals[i]).text() != "$--.--") {
                total += Number($(subtotals[i]).text().replace(/\$/,""));
            }
        }
        $('#total-price').text("$ " + total);

    }

    var createItem = function(name, cost) {
        $('#list').append(
        '<div class="row item"> \
        <div class="name col-xs-3">'+ name +'</div> \
        <div class="price col-xs-3">$' + cost + '.00</div> \
        <div class="qty col-xs-3"> \
          <label>QTY</label> \
          <input class="quantity" type="number"> \
        </div> \
        <div class="col-xs-1"> \
          <button class="cancel">Cancel</button> \
        </div> \
        <div class="subtotal col-xs-2">$--.--</div> \
      </div>');
    }

    $(document).on('click', '.create', function() {
        createItem($('#name').val(), $('#cost').val());
        calSubtotal();
    });

    $(document).on('click', '.cancel', function() {
        $(this).parents('.row').remove();
        calSubtotal();
    })

    var timeout;
    $(document).on('input', '.quantity', function () {
        clearTimeout(timeout);
        timeout = setTimeout(function () {
            calSubtotal(); 
        }, 100);
    });

    $(document).on('click', '.calPrice', function() {
        calTotal();
    })
});