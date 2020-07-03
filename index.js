$(function () {
  $('#main-banner').slick({
    autoplay: true,
    dots: true,
    arrows: false,
  });

  function createProductItem(data) {
    //   <div class="item-card">
    //   <a href="#">
    //     <img
    //       src="https://images-na.ssl-images-amazon.com/images/I/61IOMaxiQqL._UX522_.jpg"
    //       alt="item-img"
    //       class="item-img"
    //     />
    //   </a>
    //   <div class="item-desc">
    //     <h3 class="item-title">Men Navy Tshirt</h3>
    //     <p class="item-brand">Polo</p>
    //     <p class="item-price">Rs <span>2599</span></p>
    //   </div>
    // </div>
    let a_wrap = $('<a>').attr('href', `./details.html?Pid=${data.id}`);
    a_wrap.css({ outline: 'none' });
    let itemCard = $('<div>').addClass('item-card');
    let itemThumb = $('<a>').attr('href', `./details.html?Pid=${data.id}`);
    for (let i = 0; i < data.photos.length; i++) {
      let itemImg = $('<img>')
        .attr({
          src: data.photos[i],
          alt: 'item-img',
        })
        .addClass('item-img');

      itemThumb.append(itemImg);
      itemThumb.css({ outline: 'none' });
      itemImg.css({ outline: 'none' });
    }
    itemThumb.slick({
      autoplay: false,
      dots: false,
      touchMove: false,
      arrows: false,
    });
    itemCard.on({
      mouseenter: function () {
        itemThumb.slick('unslick');
        itemThumb.slick({
          autoplay: true,
          dots: false,
          arrows: false,
          autoplaySpeed: 800,
        });
      },
      mouseleave: function () {
        itemThumb.slick('unslick');
        itemThumb.slick({
          autoplay: false,
          dots: false,
          touchMove: false,
          arrows: false,
        });
      },
    });
    let itemDesc = $('<div>')
      .addClass('item-desc')
      .append(
        $('<h3>').addClass('item-title').text(data.name),
        $('<p>').addClass('item-brand').text(data.brand),
        $('<p>').addClass('item-price').text(`Rs ${data.price}`)
      );
    a_wrap.append(itemDesc);
    a_wrap.css({ 'text-decoration': 'none', color: 'black' });
    itemCard.append(itemThumb, a_wrap);

    itemCard.attr({ id: data.id });

    return itemCard;
  }
  const getListPromise = new Promise((resolve, reject) => {
    $.get('https://5efd74c4dd373900160b3098.mockapi.io/products', function (
      response
    ) {
      resolve(response);
    }).fail(function (err) {
      reject(err);
    });
  });
  getListPromise
    .then((response) => {
      response.map((item) => {
        let thisCard = createProductItem(item);
        if (item.isAccessory) {
          $('#accessories-items').append(thisCard);
        } else $('#clothing-items').append(thisCard);
      });
    })
    .catch((err) => {
      let thisErr = new Error(`Get call failed with status code ${err.status}`);
      console.log(thisErr);
    });
  /////////creating some text animation on section title
  $('.sec-title').eq(0).text('');
  let msg1 = 'Clothing for Men and Women';
  let i = 0;
  function typeWriter1() {
    if (i < msg1.length) {
      let pMsg = $('.sec-title').eq(0).text();

      $('.sec-title')
        .eq(0)
        .text(pMsg + msg1.charAt(i));
      i++;
      setTimeout(typeWriter1, 100);
    } else {
      typeWriter2();
    }
  }
  function typeWriter2() {
    if (i > 1) {
      let pMsg = $('.sec-title').eq(0).text();
      pMsg = pMsg.substr(0, pMsg.length - 1);

      $('.sec-title').eq(0).text(pMsg);
      i--;
      setTimeout(typeWriter2, 50);
    } else {
      typeWriter1();
    }
  }
  typeWriter1();

  $('.sec-title').eq(1).text('');
  let msg2 = 'Accessories for Men and Women';
  let j = 0;
  function typeWriter3() {
    if (j < msg2.length) {
      let pMsg = $('.sec-title').eq(1).text();

      $('.sec-title')
        .eq(1)
        .text(pMsg + msg2.charAt(j));
      j++;
      setTimeout(typeWriter3, 100);
    } else {
      typeWriter4();
    }
  }
  function typeWriter4() {
    if (j > 1) {
      let pMsg = $('.sec-title').eq(1).text();
      pMsg = pMsg.substr(0, pMsg.length - 1);

      $('.sec-title').eq(1).text(pMsg);
      j--;
      setTimeout(typeWriter4, 50);
    } else {
      typeWriter3();
    }
  }
  typeWriter3();
});
