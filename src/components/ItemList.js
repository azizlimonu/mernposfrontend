import React from 'react'
import { Card } from 'antd';
import '../styles/ItemList.css'
import { useDispatch } from "react-redux"

const ItemList = ({ item }) => {

  const dispath = useDispatch();
  // Update cart handler
  const handleAddToCart = () => {
    dispath({
      type: 'ADD_TO_CART',
      payload: { ...item, quantity: 1 }
    })
  }

  const { Meta } = Card;
  return (
    <div>
      <Card
        hoverable
        style={{ width: 200, height: 250, margin: 10, border: '2px solid #f0f2f5' }}
        cover={<img alt={item.name} src={item.image} style={{ height: 150, backgroundSize: 'cover' }} />}
      >
        <Meta title={item.name} description={`Rp.${item.price}`} />
        <div className='item-button'>
          <button onClick={() => handleAddToCart()}>Add to Cart</button>
        </div>
      </Card>
    </div>

  )
}

export default ItemList