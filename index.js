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

    let itemCard = $('<div>').addClass('item-card');
    let itemThumb = $('<a>')
      .attr('href', `./details.html?Pid=${data.id}`)
      .append(
        $('<img>')
          .attr({
            src: data.preview,
            alt: 'item-img',
          })
          .addClass('item-img')
      );

    let itemDesc = $('<div>')
      .addClass('item-desc')
      .append(
        $('<h3>').addClass('item-title').text(data.name),
        $('<p>').addClass('item-brand').text(data.brand),
        $('<p>').addClass('item-price').text(`Rs ${data.price}`)
      );
    itemCard.append(itemThumb, itemDesc);
    itemCard.attr({ id: data.id });
    return itemCard;
  }
  const getListPromise = new Promise((resolve, reject) => {
    $.get('https://5ee2489c8b27f30016094881.mockapi.io/products', function (
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

        for (let i = 0; i < $('.item-card').length; i++) {
          $('.item-img')
            .eq(i)
            .on({
              mouseover: function () {
                $('.item-card').eq(i).css({
                  'background-color': 'rgba(255,0,0,0.2)',
                });
              },
              mouseleave: function () {
                $('.item-card').eq(i).css({
                  'background-color': '#fff',
                });
              },
            });
        }
      });
    })
    .catch((err) => {
      let thisErr = new Error(`Get call failed with status code ${err.status}`);
      console.log(thisErr);
    });
});
