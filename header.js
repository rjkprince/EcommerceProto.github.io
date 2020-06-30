$(function () {
  $('#drp').click(function () {
    if ($('#overlay').css('display') == 'none') {
      $('#dropdown').css({ transform: 'translateX(0)' });
      $('#overlay').css({ display: 'block' });
    }
  });
  $('#overlay').click(function () {
    $('#dropdown').css({ transform: 'translateX(-100%)' });
    $('#overlay').css({ display: 'none' });
  });
  $('.cross').click(function () {
    $('#dropdown').css({ transform: 'translateX(-100%)' });
    $('#overlay').css({ display: 'none' });
  });
  let getList = JSON.parse(localStorage.getItem('productList'));
  if (getList == null) {
    // $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
    $('#cart-count').text(0);
  } else {
    let cartCount = 0;
    for (let i = 0; i < getList.length; i++) {
      cartCount += getList[i].count;
    }
    $('#cart-count').text(cartCount);
  }
});
