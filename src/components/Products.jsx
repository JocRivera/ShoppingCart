export function Products ({ products }) {
  return (
    <div className="card" style="width: 18rem;">
      <ul>
        {products.map(product => (
          <li key={product.id}>
            <img src={product.image} className="card-img-top" alt={product.name} />
            <div className="card-body">
              <h5 className="card-title">{product.name}</h5>
              <p className="card-text">{product.description}</p>
              <h6 className="card-subtitle mb-2 text-muted">Price: {product.price}</h6>
              <a href="#" className="card-link">Add to cart</a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}