import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Layout, Row, Col, Select } from 'antd';

import {
    Switch,
    Route
} from 'react-router-dom';

import Products from './Products';
import ProductPage from './ProductPage';

import 'antd/dist/antd.css';
import '../App.css';

const { Option } = Select;


export default function Content(props) {

    const [searchQuery, setSearchQuery] = useState("");
    const [products, setProducts] = useState(null);
    const [productsPerPage, setProductsPerPage] = useState(10);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    //console.log(props.search);

    const fetchItems = () =>{
        fetch('/api/product/list',{
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProducts(data);
        });
    }

    const searchProducts = value => {
        setIsLoadingProducts(true);
        fetch(`/api/product/search?product=${value}`,{
            mode: 'cors',
            method: 'get',
            headers: {
                'Content-Type': 'application/json'
              }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setProducts(data);
            setIsLoadingProducts(false);
        });
    }

    useEffect(() => {
        setSearchQuery(props.search);
    });

    useEffect(() => {
        if(searchQuery.length > 0) searchProducts(searchQuery);
        else fetchItems();
    }, [searchQuery]);

    const ProductsCountDropdown = () => {
        return(
            <Row>
                <Col>
                    <p>
                        Products per page:
                        <Select defaultValue={productsPerPage} onSelect={value => setProductsPerPage(value)}>
                            <Option value={10}>10</Option>
                            <Option value={20}>20</Option>
                            <Option value={30}>30</Option>
                        </Select>
                    </p>
                </Col>
            </Row>
            
        )
    }


    return (
        <Layout.Content className="content-width">
            <div className="site-layout-content">
                <Switch>
                    <Route path="/" exact >
                        <ProductsCountDropdown />
                        <Products products={products} productCount={productsPerPage}/>
                    </Route>
                    <Route path="/product/:id" component={ProductPage} />
                </Switch>
            </div>
        </Layout.Content>
    )
}