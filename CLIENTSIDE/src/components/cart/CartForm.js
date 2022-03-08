import React from "react";
import TextInput from "../toolbox/TextInput";
import SelectInput from "../toolbox/SelectInput";
import { Container, Table } from "reactstrap";
import { getToken } from "../../redux/actions/loginActions";
import LoginUser from "../common/LoginUser";

/** @author: istiklal */

const CartForm = ({ cart, cartTotalPrice, onSave, onChange, errors }) => {
  const token = getToken();
  if (!cart.id) {
    return (
      <form onSubmit={onSave} type="multipart-form-data">
        <h3>Siparişi Onayla ve Gönder</h3>
        <hr />
        <ul>
            <li>
                Siparişiniz tarafımıza ulaştığında verdiğiniz iletişim bilgileri üzerinden sizinle temasa geçilerek 
                ödeme ve sipariş süreçleri tamamlanacaktır, bu nedenle iletişim bilgilerinin doğruluğu önemlidir.
            </li>
        </ul>
        <hr />
        <br />
        <TextInput
          name="customerName"
          type="text"
          label="Adınız ve Soyadınız *"
        //   value={cart.customerName || ""}
          onChange={onChange}
          error={errors.customerName}
        />
        <br />
        <TextInput
          name="phone"
          type="text"
          label="Telefon Numaranız *"
        //   value={cart.phone || ""}
          placeholder="+905.. .. .."
          onChange={onChange}
          error={errors.phone}
        />
        <br />
        <TextInput
          name="email"
          type="text"
          label="E-posta Adresiniz *"
        //   value={cart.email || ""}
          onChange={onChange}
          error={errors.email}
        />
        <br />
        <TextInput
          name="address"
          type="text"
          label="Kargo Adresiniz *"
        //   value={cart.address || ""}
          placeholder="adress / ilçe"
          onChange={onChange}
          error={errors.address}
        />
        <br />
        <TextInput
          name="city"
          type="text"
          label="Şehir *"
        //   value={cart.city || ""}
          onChange={onChange}
          error={errors.city}
        />
        <br />
        <Container fluid="fluid">
        <Table size="sm">
          <thead>
            <tr>
              <th>Ürün Adı</th>
              <th>Ürün Sayısı</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((cartItem) => (
              <tr key={cartItem.product.id}>
                <td>{cartItem.product.productName}</td>
                <td>{cartItem.quantity}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr />
        </Container>
        {/* <p id="instantCartDetails">{cart.cart || JSON.stringify(cart)}</p> */}
        <br />
        <Container fluid="fluid">
            <Table size="sm">
                <tbody>
                    <tr>
                        <td>Sipariş Toplam Tutarı</td>
                        <td>{parseFloat(cart.totalPrice) || parseFloat(cartTotalPrice) || 0}  TL</td>
                    </tr>
                </tbody>
            </Table>
            {/* <p id="instantCartPrice">{parseFloat(cart.totalPrice) || parseFloat(cartTotalPrice) || 0}  TL</p> */}
        </Container>
        
        <br />

        <br />

        <button type="submit" className="btn-sm btn-outline-success">
          Kaydet
        </button>
        <br /><hr /><br />
      </form>
    );
  } else if(cart.id && token){
    return (
      <form onSubmit={onSave} type="multipart-form-data">
        <h3>Seşilen Siparişin Onay Durmunu Güncelle</h3>
        <h5>
          {cart.customerName} kişisinin {cart.date} tarihli siparişi
        </h5>
        <hr />
        <SelectInput
          name="status"
          label="Sipariş Onay Durmu"
          defaultOption="Onay Durmu Seçin"
          options={[
            { value: 1, text: "Onay Bekliyor" },
            { value: 2, text: "Onaylandı" },
          ]}
          onChange={onChange}
          error={errors.cartId}
        />
        <br />
        <button type="submit" className="btn-sm btn-outline-success">
          Kaydet
        </button>
      </form>
    );
  } else {
    return <LoginUser />;
  }
};

export default CartForm;
