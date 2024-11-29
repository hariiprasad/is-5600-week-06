import React, { useState, useEffect } from "react";
import Card from './Card';
import Button from './Button';
import Search from './Search'; // Added import for Search component

const CardList = ({ data }) => {
  const limit = 10;
  const [offset, setOffset] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(data);


  
  
// Refactored pagination into a single function
  const handlePagination = (direction) => {
    setOffset((prevOffset) => {
      if (direction === 'next') {
        return Math.min(prevOffset + limit, filteredProducts.length - limit);
      } else {
        return Math.max(prevOffset - limit, 0);
      }
    });
  };

  useEffect(() => {
     // Updated to use filteredProducts instead of data
    setProducts(filteredProducts.slice(offset, offset + limit));
  }, [offset, filteredProducts]);

    // Added filterTags function for search functionality
  const filterTags = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = data.filter((product) =>
      product.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
    );
    setFilteredProducts(filtered);
    setOffset(0);
  };

  return (
    <div className="cf pa2">
      {/* Added Search component */}
      <Search handleSearch={filterTags} />
      <div className="mt2 mb2">
        {products.map((product) => (
          <Card key={product.id} {...product} />
        ))}
      </div>
      <div className="flex items-center justify-center pa4">
         {/* Updated Button components to use handlePagination */}
        <Button 
          text="Previous" 
          handleClick={() => handlePagination('prev')} 
          disabled={offset === 0} // Added disabled prop
        />
        <Button 
          text="Next" 
          handleClick={() => handlePagination('next')} 
          disabled={offset + limit >= filteredProducts.length} // Added disabled prop
        />
      </div>
    </div>
  );
};

export default CardList;