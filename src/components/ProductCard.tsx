export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
};

const ProductCard = ({ id, name, price, category, image }: Product) => {
  return (
    <div className="product-info">
      <img src={image} alt={name} className="product-image" />
      <div className="product-details">
        <p>ID: {id}</p>
        <p>Name: {name}</p>
        <p>Price: {price}</p>
        <p>Category: {category}</p>
      </div>
    </div>
  );
};

export default ProductCard;
