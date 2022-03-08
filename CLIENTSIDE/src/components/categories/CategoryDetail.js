import React from "react";
import TextInput from "../toolbox/TextInput";

const CategoryDetail = ({
  category,
  onSave,
  onChange,
  errors,
}) => {

  return (
    <form onSubmit={onSave} type="multipart-form-data">
      <h3>
        {category.id
          ? category.categoryName + " Kategorisini Güncelle"
          : "Yeni Kategori Ekle"}
      </h3>

      <br />

      <TextInput
        name="categoryName"
        type="text"
        label="Kategori Adı"
        value={category.categoryName || ""}
        onChange={onChange}
        error={errors.categoryName}
      />

      <br />

      <button type="submit" className="btn-sm btn-outline-success">
        Kaydet
      </button>
    </form>
  );
};

export default CategoryDetail;