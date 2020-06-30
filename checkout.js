$(function () {
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
    //       <p class="item-count">x1</p>
    //       <p class="item-amount">
    //         Amount: Rs <span class="price">XXXX</span>
    //       </p>
    //     </div>
    //   </div>
    let item = $('<div>').addClass('item');
    let itemImg = $('<img>').addClass('item-img').attr('src', data.preview);
    let itemDesc = $('<div>')
      .addClass('item-desc')
      .append(
        $('<h2>').addClass('item-title').text(data.name),
        $('<p>').addClass('item-count').text(`x${data.count}`),
        $('<p>')
          .addClass('item-amount')
          .text(`Amount: Rs ${data.price * data.count}`)
      );
    item.append(itemImg, itemDesc);
    return item;
  }
  const getList = JSON.parse(localStorage.getItem('productList'));
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
