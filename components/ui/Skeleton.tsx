export function ProductSkeleton() {
  return (
    <div className="product-grid">
      {[1, 2, 3].map((i) => (
        <div key={i} className="product-card glass-card skeleton-card">
          <div className="skeleton-img" />
          <div className="skeleton-body">
            <div className="skeleton-line short" />
            <div className="skeleton-line" />
            <div className="skeleton-line short" />
          </div>
        </div>
      ))}
    </div>
  );
}
