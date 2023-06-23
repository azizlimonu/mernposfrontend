import React, { useState, useEffect } from 'react'
import { Col, Row } from 'antd';
import axios from 'axios'
import { useDispatch } from 'react-redux';

import DefaultLayout from '../components/DefaultLayout'
import ItemList from '../components/ItemList';

const Homepage = () => {
  const dispatch = useDispatch();

  const [itemsData, setItemsData] = useState([]);

  // State for chosing categories
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    {
      'name': 'all'
    },
    {
      'name': 'Bangunan'
    },
    {
      'name': 'Peralatan'
    },
    {
      'name': 'Perlengkapan'
    }
  ];

  // useEffect for fetching the data first time
  useEffect(() => {
    const getAllItems = async () => {
      try {
        dispatch({
          type: 'SHOW_LOADING'
        });
        const { data } = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/items/getItem`);
        setItemsData(data);
        dispatch({
          type: 'HIDE_LOADING'
        });
        console.log(data);
      } catch (error) {
        console.log(error)
      }
    }
    getAllItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <DefaultLayout>
      <div className='d-flex'>
        {categories.map(category => (
          <div
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`
            d-flex category 
            ${selectedCategory === category.name && "category_active"}
            `}
          >
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <Row>
        {
          selectedCategory !== "all" ?
            itemsData
              .filter((i) => i.category === selectedCategory)
              .map(item => (
                <Col xs={24} lg={6} md={12} sm={6}>
                  <ItemList key={item.id} item={item} />
                </Col>
              )) :
            itemsData.map(item => (
              <Col xs={24} lg={6} md={12} sm={6}>
                <ItemList key={item.id} item={item} />
              </Col>
            ))
        }
      </Row>
    </DefaultLayout>
  )
}

export default Homepage;