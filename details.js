$(function () {
  let pId = window.location.search.split('=')[1];

  let getProduct = new Promise((resolve, reject) => {
    $.get(
      `https://5ee2489c8b27f30016094881.mockapi.io/products/${pId}`,
      function (response) {
        resolve(response);
      }
    ).fail((err) => {
      reject(err);
    });
  });
  getProduct
    .then((response) => {
      $('#product-title').text(response.name);
      $('#product-brand').text(response.brand);
      $('#price').text(response.price);
      $('#default-img').attr('src', response.preview);
      $('#desc').text(response.description);
      $('#preview-imgs').text('');
      for (let i = 0; i < response.photos.length; i++) {
        //     <img
        //     src="https://test-hosting-8f9bf.web.app/assets/default-product.png"
        //     alt="default-img"
        //     class="preview-img"
        //   />
        let thisImg = $('<img>')
          .addClass('preview-img')
          .attr('src', response.photos[i]);
        if (i == 0) {
          thisImg.addClass('active-img');
        }
        thisImg.click(function () {
          $('#default-img').attr('src', response.photos[i]);
          $('.preview-img').removeClass('active-img');
          thisImg.addClass('active-img');
        });
        $('#preview-imgs').append(thisImg);
      }
      /////on btn click saving data in localstorage
      $('#btn-cart').click(function () {
        $('#btn-cart').css({
          transform: 'scale(1.1)',
        });
        setTimeout(() => {
          $('#btn-cart').css({
            transform: 'scale(1)',
          });
        }, 200);
        if (localStorage.getItem('productList') == null) {
          let thisResponse = { ...response };
          let productList = [];
          thisResponse.count = 1;

          productList.push(thisResponse);
          localStorage.setItem('productList', JSON.stringify(productList));
        } else {
          let dataFromLocal = JSON.parse(localStorage.getItem('productList'));
          let found = false;
          for (var i = 0; i < dataFromLocal.length; i++) {
            if (dataFromLocal[i].id == response.id) {
              found = true;

              break;
            }
          }
          if (found) {
            dataFromLocal[i].count += 1;

            localStorage.setItem('productList', JSON.stringify(dataFromLocal));
          } else {
            let thisResponse = { ...response };
            thisResponse.count = 1;
            dataFromLocal.push(thisResponse);
            localStorage.setItem('productList', JSON.stringify(dataFromLocal));
          }
        }
        $('#cart-count').text(parseInt($('#cart-count').text()) + 1);
      });
    })
    .catch((err) => {
      let thisErr = `Get call failed with status code ${err.status}`;
      console.log(thisErr);
    });
});
