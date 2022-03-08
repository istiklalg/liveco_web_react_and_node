let initialState = {
  currentCategory: {},
  categories: [],
  products: [],
  carts: [],
  cart: [],
  cartTotal: 0.0,
  loadingImage: {},
  savedProduct: {},
  savedCategory: {},
  savedCart: {},
  editChoices: [
    { id: 1, call:"/admin/saveproduct", name: "Ürün Ekle"},
    { id: 2, call:"/admin/saveproduct", name: "Ürün Düzenle"},
    { id: 3, call:"/admin/savecategory", name: "Kategori Ekle"},
    { id: 4, call:"/admin/savecategory", name: "Kategori Düzenle"},
    { id: 5, call:"/admin/seecarts/0", name: "Bekleyen Siparişler"},
    { id: 6, call:"/admin/seecarts/1", name: "Onaylı Siparişler"},
  ],
  currentEditChoice: { id: 2, call:"/admin/saveproduct", name: "Ürün Düzenle"},
  currentUser: {},
  token: null,
  currentProduct: {},
};

export default initialState;
