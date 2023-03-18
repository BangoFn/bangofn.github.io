// Récupérer les boutons d'ajout au panier
const addToCartButtons = document.querySelectorAll('.add-to-cart');

// Ajouter un écouteur d'événement à chaque bouton
addToCartButtons.forEach(button => {
  button.addEventListener('click', addToCart);
});

// Fonction pour ajouter un produit au panier
function addToCart(event) {
  // Empêcher le comportement par défaut du bouton
  event.preventDefault();

  // Récupérer l'élément de la liste de produits correspondant au bouton
  const product = event.target.parentElement.parentElement;

  // Récupérer le nom et le prix du produit
  const name = product.querySelector('.product-name').textContent;
  const price = product.querySelector('.product-price').textContent;

  // Créer un objet pour le produit
  const item = {
    name: name,
    price: price,
    quantity: 1
  };

  // Vérifier si le produit est déjà dans le panier
  let cartItems = localStorage.getItem('cartItems');
  cartItems = cartItems ? JSON.parse(cartItems) : [];

  const index = cartItems.findIndex(item => item.name === name);
  if (index !== -1) {
    // Si le produit est déjà dans le panier, augmenter la quantité
    cartItems[index].quantity++;
  } else {
    // Sinon, ajouter le produit au panier
    cartItems.push(item);
  }

  // Enregistrer le panier dans le stockage local
  localStorage.setItem('cartItems', JSON.stringify(cartItems));

  // Mettre à jour le nombre de produits dans le panier affiché dans l'en-tête
  updateCartItemCount();
}

// Fonction pour mettre à jour le nombre de produits dans le panier affiché dans l'en-tête
function updateCartItemCount() {
  let cartItems = localStorage.getItem('cartItems');
  cartItems = cartItems ? JSON.parse(cartItems) : [];

  const cartItemCount = document.querySelector('.cart-item-count');
  cartItemCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0);
}
