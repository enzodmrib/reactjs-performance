import { List, ListRowRenderer } from 'react-virtualized'
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  results: Array<{
    id: number;
    price: number;
    priceFormatted: string;
    title: string;
  }>;
  totalPrice: number;
  onAddToWishlist: (id: number) => void;
}

// igualdade referencial
// 

export function SearchResults({ results, totalPrice, onAddToWishlist }: SearchResultsProps) {
  const rowRenderer: ListRowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <ProductItem
          product={results[index]}
          onAddToWishlist={onAddToWishlist}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>{totalPrice}</h2>

      <List
        height={300}
        rowHeight={30}
        width={900}
        overscanRowCount={5}
        rowCount={results.length}
        rowRenderer={rowRenderer}
      />

      {/* {results.map(product => {
        return (
          <ProductItem
            key={product.id}
            product={product}
            onAddToWishlist={onAddToWishlist}
          />
        );
      })} */}
    </div>
  );
}

/*
  REACT LIFECYCLE
  1. Cria uma nova versão do componente
  2. Comparar com a versão anterior
  3. Caso hajam alterações, atualiza o que alterou
*/

/*  
  USOS PARA O MEMO()
  1. Pure Functional Components -> Componentes para apenas abstrair uma parte visual da aplicação
  2. Renders too often
  3. Re-renders with same props
  4. Medium to big size
*/

/*
  * useMemo / useCallback
  * 
  * 1. Cálculos PESADOS
  * 2. Igualdade referencial (quando a gente repassa aquela informação a um componente filho)
*/