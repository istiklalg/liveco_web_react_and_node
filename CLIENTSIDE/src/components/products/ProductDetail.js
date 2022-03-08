import React from "react";
import SelectInput from "../toolbox/SelectInput";
import TextInput from "../toolbox/TextInput";
import TextArea from "../toolbox/TextArea";
import { Input } from "reactstrap";

/** @author: istiklal */

const ProductDetail = ({
  categories,
  product,
  loadingImage,
  onSave,
  onChange,
  errors,
}) => {

    
  return (
    <form onSubmit={onSave} type="multipart-form-data">
      <h3>
        {product.id
          ? product.productName + " Ürününü Güncelle"
          : "Yeni Ürün Ekle"}
      </h3>

      <br />

      <TextInput
        name="productName"
        type="text"
        label="Ürün Adı"
        value={product.productName || ""}
        onChange={onChange}
        error={errors.productName}
      />

      <br />

      <SelectInput
        name="categoryId"
        label="Ürün Kategorisi"
        value={product.categoryId || ""}
        defaultOption="Kategory Seçin"
        options={categories.map((category) => ({
          value: category.id,
          text: category.categoryName,
        }))}
        onChange={onChange}
        error={errors.categoryId}
      />

      <br />

      <TextInput
        name="unitPrice"
        type="number"
        label="Ürün Ücreti"
        step="0.01"
        value={product.unitPrice || ""}
        onChange={onChange}
        error={errors.unitPrice}
      />

      <br />

      <TextInput
        name="unitsInStock"
        type="text"
        label="Stoktaki Ürün Sayısı"
        value={product.unitsInStock || ""}
        onChange={onChange}
        error={errors.unitsInStock}
      />

      <br />

      <TextArea
        name="quantityPerUnit"
        label="Ürün Açıklama ve Detayları"
        value={product.quantityPerUnit || ""}
        onChange={onChange}
        error={errors.quantityPerUnit}
      />

      <br />

      <Input
        id="fileInput"
        name="productImage"
        type="file"
        label="Ürün Resmi"
        accept=".jpg, .png, .bmp"
        onChange={onChange}
        error={errors.productImage}
      />

      <br />
      <p>
        <img
          id="thumbnailImage"
          className="smallImage"
          src={
            product.id
              ? `${process.env.PUBLIC_URL}/images/${product.productImage}`
              : `${process.env.PUBLIC_URL}/images/permanent/Logo.jpg`
          }
          alt="ürün resmi"
        />
        {"   "}
        <span id="thumbnailName">
          {product.id ? product.productImage : "Resim yüklenmedi"}
        </span>
      </p>

      <br />

      <button type="submit" className="btn-sm btn-outline-success">
        Kaydet
      </button>
    </form>
  );
};

export default ProductDetail;
