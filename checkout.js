$(function () {
  const getList = JSON.parse(localStorage.getItem('productList'));
  function increaseItem(id) {
    let found = false;
    for (var i = 0; i < getList.length; i++) {
      if (getList[i].id == id) {
        found = true;
        break;
      }
    }
    if (found) {
      $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
      getList[i].count += 1;
      localStorage.setItem('productList', JSON.stringify(getList));
    }
  }
  function decreaseItem(id) {
    let found = false;
    for (var i = 0; i < getList.length; i++) {
      if (getList[i].id == id) {
        found = true;
        break;
      }
    }
    if (found) {
      $('#cart-count').text(parseInt($('#cart-count').text()) - 1);
      getList[i].count -= 1;
      localStorage.setItem('productList', JSON.stringify(getList));
    }
  }
  function removeItem(id) {
    $('#t-items').text(parseInt($('#t-items').text()) - 1);
    let found = false;
    for (var i = 0; i < getList.length; i++) {
      if (getList[i].id == id) {
        found = true;
        break;
      }
    }
    if (found) {
      $('#cart-count').text(
        parseInt($('#cart-count').text()) - getList[i].count
      );
      getList.splice(i, 1);
      localStorage.setItem('productList', JSON.stringify(getList));
    }
  }
  function makeTotal() {
    let total = 0;
    getList.map((item) => {
      total += item.count * item.price;
    });
    $('#amount').text(total);
  }
  function createCard(data) {
    //     <div class="item">
    //     <img
    //       src="https://test-hosting-8f9bf.web.app/assets/default-product.png"
    //       alt="item-img"
    //       class="item-img"
    //     />
    //     <div class="item-desc">
    //       <h2 class="item-title">
    //         Product Title
    //       </h2>
    //<i class="far fa-plus-square"></i>
    //       <p class="item-count">x1</p>
    //<i class="far fa-minus-square"></i>
    //       <p class="item-amount">
    //         Amount: Rs <span class="price">XXXX</span>
    //       </p>
    //     </div>
    //   </div>
    //<i class="far fa-trash-alt"></i>
    let item = $('<div>').addClass('item');
    let itemImg = $('<img>').addClass('item-img').attr('src', data.preview);
    let plus = $('<i>').addClass('far fa-plus-square');
    let minus = $('<i>').addClass('far fa-minus-square');
    let dlt = $('<i>').addClass('far fa-trash-alt');

    let countItem = data.count;
    let itemCount = $('<p>').addClass('item-count').text(`x${countItem}`);
    let itemAmount = $('<p>')
      .addClass('item-amount')
      .text(`Amount: Rs ${data.price * countItem}`);
    let itemDesc = $('<div>')
      .addClass('item-desc')
      .append(
        $('<h2>').addClass('item-title').text(data.name),
        $('<span>').addClass('span-count').append(minus, itemCount, plus, dlt),
        itemAmount
      );
    plus.click(function () {
      if (countItem < 30) {
        countItem++;
        itemCount.text(`x${countItem}`);
        itemAmount.text(`Amount: Rs ${data.price * countItem}`);
        increaseItem(data.id);
        makeTotal();
      }
    });
    minus.click(function () {
      if (countItem > 1) {
        countItem--;
        itemCount.text(`x${countItem}`);
        itemAmount.text(`Amount: Rs ${data.price * countItem}`);

        decreaseItem(data.id);
        makeTotal();
      }
    });
    dlt.click(function () {
      item.remove();
      removeItem(data.id);
      makeTotal();
    });

    item.append(itemImg, itemDesc);
    return item;
  }

  $('#items').text('');
  $('#t-items').text(0);
  if (getList != null && getList != undefined && getList != []) {
    let total = 0;
    $('#place-card').css({ display: 'block' });
    getList.map((item) => {
      let card = createCard(item);
      $('#items').append(card);
      $('#t-items').text(parseInt($('#t-items').text()) + 1);
      total += item.count * item.price;
    });
    $('#amount').text(total);
  } else {
    $('#place-card').css({ display: 'none' });
  }
  $('#btn-place').click(function () {
    localStorage.removeItem('productList');
    location.assign('./success.html');
  });
});
