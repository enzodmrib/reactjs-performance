import { memo, useState } from 'react';
import { AddProductToWishlistProps } from './AddProductToWishlist'
// import { lazy } from 'react'; --> React option
import dynamic from 'next/dynamic';
// import { AddProductToWishlist } from './AddProductToWishList';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
  return import('./AddProductToWishlist').then(module => module.AddProductToWishlist);
}, {
  loading: () => <span>Carregando...</span>
}) //lazyloading === CODE SPLITTING

interface ProductItemProps {
  product: {
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }
  onAddToWishlist: (id: number) => void;
}

// memo -> shallow compare -> comparação rasa
// {} === {} // false
// igualdade referencial

function ProductItemComponent({ product, onAddToWishlist }: ProductItemProps) {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);

  return (
    <div>
      {product.title} - <strong>{product.priceFormatted}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.product, nextProps.product); // deep compare
});

//memo evita que um novo componente seja criado na lifecycle (step 1)