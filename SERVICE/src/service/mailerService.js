/** @author: istiklal */

const nodemailer = require("nodemailer");
const conf = require("../seviceConfiguration");

const transporter = nodemailer.createTransport({
  service: conf.EMAIL_HOST,
  secure: false, // do not use TLS
  auth: {
    user: conf.EMAIL_USER,
    pass: conf.EMAIL_PASS,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false
  }
});

function createNewCartHtmlContent(titleText, orderCart, cartDetails) {
  var part1 = `<!DOCTYPE html><html lang="tr"><head>
        <meta charset="UTF-8" /><meta http-equiv="X-UA-Compatible" content="IE=edge" /><meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>LIVECO MAIL</title>
        <style>
          body{font-size: 9pt;}
          .container {margin: auto;padding: 2% 5%;}
          .table-container {align-items: center;width: 100%;}
          table{width: 100%;}
          h3 {text-align: center;}
          tr {display: flex;flex-direction: row;justify-content: space-between;}
          th, td {padding: 5px 5px;width: 100%;border: 0.2px solid #BEBEBE;}
          th{background-color: #BEBEBE;}
          footer {padding: 0 10%; text-align: center;}
        </style></head><body>
        <div class="container">
          <h3>${titleText}</h3> <hr />
          <div class="table-container">
            <table><thead>
                <tr>
                  <th>Müşteri Adı</th>
                  <th>Sipariş Tarihi</th>
                  <th>Telefon</th>
                  <th>E-posta</th>
                  <th>Adres</th>
                  <th>Sipariş detayları</th>
                  <th>Sipariş Tutarı</th>
                </tr>
              </thead><tbody>
                <tr><td>${orderCart.customerName}</td>
                <td>${orderCart.date}</td>
                <td>${orderCart.phone}</td>
                <td>${orderCart.email}</td>
                <td>${orderCart.address}</td>
                <td>`;
  var part2 = "";
  cartDetails.forEach((element) => {
    part2 += `<b>${element.product.productName}</b> -> ADET : <b>${element.quantity}</b>, <br />`;
  });
  var part3 = `</td>
                <td>${orderCart.totalPrice} TL</td>
            </tr></tbody></table></div><hr /></div></body><footer>www.liv-eco.net</footer></html>`;
  let htmlContent = part1 + part2 + part3;
  return htmlContent;
}

function sendNewCartToAdmin(orderCart) {
  if (orderCart && orderCart?.cart) {
    var cartDetails = JSON.parse(orderCart.cart);
    let htmlContent = createNewCartHtmlContent(
      "YENİ SİPARİŞ BİLGİSİ",
      orderCart,
      cartDetails
    );

    const mailOptions = {
      from: conf.EMAIL_FROM,
      to: conf.EMAIL_TO,
      subject: "Yeni bir siparişiniz var ..",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("E-posta gönderildi -> ", info.response);
      }
    });
  }
}

function sendNewCartToCustomer(orderCart) {
  if (orderCart && orderCart?.cart) {
    var cartDetails = JSON.parse(orderCart.cart);
    let htmlContent = createNewCartHtmlContent(
      "SİPARİŞ BİLGİLERİNİZ",
      orderCart,
      cartDetails
    );

    const mailOptions = {
      from: conf.EMAIL_FROM,
      to: orderCart.email,
      subject: "Siparişiniz tarafımıza ulaştı ..",
      html: htmlContent,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("E-posta gönderildi -> ", info.response);
      }
    });
  }
}

//   function sendCartApprovalToCustomer(orderCart) {
//     if (orderCart && orderCart?.cart) {
//     //   var cartDetails = JSON.parse(orderCart.cart);
//     //   let htmlContent = createNewCartHtmlContent(
//     //     "SİPARİŞ BİLGİLERİNİZ",
//     //     orderCart,
//     //     cartDetails
//     //   );

//       // const mailOptions = {
//       //   from: conf.EMAIL_FROM,
//       //   to: orderCart.email,
//       //   subject: "Siparişiniz tarafımıza ulaştı ..",
//       //   html: htmlContent,
//       // };

//       // transporter.sendMail(mailOptions, (error, info) => {
//       //   if (error) {
//       //     console.log(error);
//       //   } else {
//       //     console.log("E-posta gönderildi -> ", info.response);
//       //   }
//       // });

//     }
//   }

// var sampleOrder = {
//   customerName: "Zekeriya İstiklal Güneş",
//   phone: "05325041425",
//   email: "istiklalg@yahoo.com",
//   address: "Ahmet Taner Kışlalı Mah. Konutkent 2 sitesi",
//   city: "ÇANKAYA",
//   cart: '[{"product":{"id":14,"productName":"Kuru İncir","categoryId":1,"quantityPerUnit":"Meşhur Aydın inciri, güneşte kurutulmuş doğal incir.","unitPrice":149.99,"unitsInStock":20,"productImage":"IMG_20210509_140259.jpg"},"quantity":1},{"product":{"id":8,"productName":"Bahçeden Ayvalık Zeytini","categoryId":2,"quantityPerUnit":"undefined","unitPrice":200,"unitsInStock":10,"productImage":"ayvalık .jpg"},"quantity":1}]',
//   totalPrice: 349.99,
//   date: "16.06.2021 22:23:03"
// };

module.exports = { sendNewCartToAdmin, sendNewCartToCustomer };
