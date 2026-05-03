const products = {
  soup: [
    { id: 1, name: "Spicy Soup (Mala)", price: 1, img: "https://images.squarespace-cdn.com/content/v1/611f775519579e5365f24bb5/1752580168842-49Z9H56GV1K3LFCDMEE6/suki-suki-hotpot-Mala+Soup.png" },
    { id: 2, name: "Mushroom Soup", price: 0, img: "https://static.wixstatic.com/media/705ed6_b833fafe89514ce9b559a58d8997dd9b~mv2.png/v1/crop/x_140,y_0,w_940,h_940/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Mushroom%20Soup.png" },
    { id: 3, name: "Tomato Soup", price: 0, img: "https://static.wixstatic.com/media/705ed6_d19de811d0a14bbab76830a1ce9747b3~mv2.png/v1/crop/x_148,y_0,w_940,h_940/fill/w_250,h_250,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Tomato%20Soup.png" },
    { id: 4, name: "Chicken Soup", price: 1, img: "https://inline.imgix.net/item/-My4dgQPxoLpcElap2I-:inline-live-2-8ca0a2f1-4860-44e7-9240-984a8cbe5b9d_Chicken.jpg" },
    { id: 6, name: "Herbal Soup", price: 0, img: "https://www.hungryhuy.com/wp-content/uploads/cooked-hot-pot-broth.jpg" },
  ],
  meat: [
    { id: 7, name: "Beef Slices", price: 1, img: "https://external-preview.redd.it/bought-a-meat-slicer-to-cut-paper-thin-slices-what-cut-of-v0-4F5_fSPXvyon4cGS99wW1wLFzCkeqfCIUcPDOrbtpYI.jpg?auto=webp&s=f3e42b2030b95ab96f0490bec71b94001a6c9234" },
    { id: 8, name: "Lamb Slices", price: 1, img: "https://img06.weeecdn.com/product/image/682/347/19C75F52C31659E8.png" },
    { id: 9, name: "Pork Slices", price: 0.5, img: "https://old.ploma.io/cdn/shop/products/mugifuji-premium-single-rib-thin-sliced-pork-belly-approx-1-2lb-meateggs-811_1024x1024.jpg?v=1644398979" },
    { id: 10, name: "Black Chicken Slices", price: 1, img: "https://www.kksbbq.com/wp-content/uploads/2020/06/sliced-black.png" },
    { id: 11, name: "Shrimp", price: 1, img: "https://static.vecteezy.com/system/resources/previews/008/066/908/large_2x/raw-shrimp-on-white-plate-with-mint-leaf-and-wooden-background-for-cooking-close-up-fresh-shrimps-or-prawns-seafood-shelfish-free-photo.JPG " },
    { id: 12, name: "Beef Meatball", price: 0.5, img: "https://i.ytimg.com/vi/zzEaehrIXD4/sddefault.jpg" },
    { id: 13, name: "Cheese Meatball", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/2523255.jpg?width=%s" },
    { id: 14, name: "Dumpling", price: 0.25, img: "https://png.pngtree.com/png-vector/20240224/ourmid/pngtree-chinese-dumplings-in-plate-png-image_11872394.png"},
  ],
  vegetables: [
    { id: 15, name: "Bok Choy", price: 0.5, img: "https://5.imimg.com/data5/SELLER/Default/2021/2/HU/VI/PW/3640922/bok-choy-500x500.jpeg" },
    { id: 16, name: "Chinese Cabbage", price: 0.5, img: "https://jiangnanhotpot.com/cdn/shop/files/IMG_0434e.png?v=1721706323" },
    { id: 17, name: "Water Spinach", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3545635.jpg?width=%s" },
    { id: 18, name: "Corn", price: 0.5, img: "https://c.ndtvimg.com/2025-08/o5ms8a4g_sweet-corn-benefits_625x300_10_August_25.jpg?im=FeatureCrop,algorithm=dnn,width=1200,height=738" },
    { id: 19, name: "Enoki Mushroom (big)", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677646.jpg?width=%s" },
    { id: 20, name: "Enoki Mushroom", price: 0.5, img: "https://images.deliveryhero.io/image/fd-kh/Products/3677591.jpg?width=%s" },
  ],
  noodles: [
    { id: 22, name: "Wheat Noodles", price: 0, img: "https://lh5.googleusercontent.com/proxy/HyecXOrXDCIXhf56e8JNKWjV55okd4Rj3Yhpca6aFuj0FAUK8fS8xOnSuB4p39agTEF_2_1ZOB7Uen8xvZ-H4sEKEHELhVeXhu618dVDJkpdgA" },
    { id: 23, name: "Glass Noodles", price: 0, img: "https://ecoapp.asia/image/catalog/Seller_532/60-20230912195519.%20%E1%9E%98%E1%9E%B8%E1%9E%9F%E1%9E%BD%E1%9E%9A.jpg" },
    { id: 25, name: "Udon", price: 0, img: "https://img.freepik.com/premium-photo/top-view-flat-lay-udon-noodle-isolated-white-background_121658-169.jpg" },
    { id: 26, name: "Instant Noodles", price: 2, img: "https://png.pngtree.com/png-clipart/20250104/original/pngtree-instant-noodles-close-up-png-image_19567365.png" },
  ],
};