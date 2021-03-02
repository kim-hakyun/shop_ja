import axios from 'axios';
import React, {useEffect, useState } from 'react';
import { Icon, Row, Col, Card } from "antd";
import Meta from "antd/lib/card/Meta";
import 'antd/dist/antd.css';
import IimageSlider from '../../utils/ImageSlider';
import CheckBoxs from './Sections/CheckBoxs';
import { continents } from './Sections/Datas'


function LandingPage() {
    
    const [Products, setProducts] = useState([])   // 제품을 가져오는 스테이트
    const [Skip, setSkip] = useState(0)            // 
    const [Limit, setLimit] = useState(8)          // 더보기 버튼을 위한 스테이트
    const [PostSize, setPostSize] = useState(0)    // 더보기 버튼을 사라지게 하는 스테이트
    const [Filters, setFilters] = useState({
        continents: [],
        price: []
    })  // 카테고리나 가격으로 필터링

    /////////////////

    useEffect(() => {
        const body = {
            skip: Skip,
            limit: Limit
        }
        getProducts(body)
    }, [])

    ////////////// 

    const getProducts =( body ) => {
        axios.post('/api/product/products', body)
        .then(response => {
            console.log( "카테고리", continents )
            if(response.data.success) {
                console.log( "모든데이터", response.data) // 모든테이터 > object 로 콘솔챵에 나타난다
                if (body.loadMore) {
                    setProducts([...Products, ...response.data.productInfo])
               } else { // 위의 내용을 안하면 아래의 productInfo에 의해서 기존것은 사라진다 
                    setProducts(response.data.productInfo)
               }
               setPostSize(response.data.postSize) // 더보기 버튼 사라지게
            } else { 
               alert("상품 가져온는데 실패")
            }
        })
    }

    
    
    const onLoadMore = () => {
        let skip = Skip + Limit;
        //  0        0   8
        //  8    =   0 + 8
        //  16   =   8 + 8   
        const body = {
            skip: skip,
            limit: Limit,
            loadMore: true
        }
        getProducts(body)   //  상품을 가져오는 함수  body에는 스킵과 리미트가 들어간다
        setSkip(skip)       // 변경된 스킵값을 Skip에저장
    }

    const renderCards = Products.map ((product, index) =>
        {
            console.log ('제품', product)
                        // 콘솔창에 각각의 product로 반복해서 나타난다. 
            return (

             <Col lg={6} md={8} sm={12} xs={24} key={index}> 
                <Card hoverable ={ true }
                 cover= { <IimageSlider imagesS={product.images}/> }
                    
                     // <img src ={`http://localhost:5000/${product.images[0]}`} alt="ProductImage"
                     // />
                >  
                            <Meta // Card에 들어갈 수 있는 것은 title와 description 만 있다.
                        title = {product.title}
                        description ={` ${product.price}원 `}   
                        // price = {product.description}
                    />
                </Card>
            </Col>
            )
    })

    const showFliteredResult = (filters) => {
        
        const body = {
            skip: 0, // 데이터 베이스에서 처음있는것 부터 가져온다
            limit: Limit,
            filters: filters 
        }
        getProducts(body)
        setSkip(0)
    }

    const handleFilters = (filters, category) => {
        // 인자 fliters에는 CheckBox 콤포넌트의 Checked 되어있는 것의 아이디가 들어있는 어래이
        const newFilters = {...Filters} // continents 와  price 어래이가 들어간다
        newFilters [category] = filters  // category는 Filters 스테이트의 컨티넨츠나 프라이스를 가르킨다.
        
        showFliteredResult(newFilters)
    }
    
    return (
        <div style={{ width: '75%', margin: '3rem auto' }}>
            <div style={{ textAlign: 'center' }}>
                <h2>  Let's Travel Anywhere 
                     <Icon type="rocket" /> 
                </h2>
            </div>
            {/* Filter  */}
                <Row gutter={[16, 16]}>
                <Col lg={12} xs={24} >

            <CheckBoxs
                list={continents}
                handleFilters={ filters => handleFilters(filters,"continents")} 
            // handleFilters={filters => handleFilters(filters, "continents")}
            />
            
                </Col>
                <Col lg={12} xs={24}>
                    {/* <RadioBox
                        list={price}
                        handleFilters={filters => handleFilters(filters, "price")}
                    /> */}
                </Col>
            </Row>
            {/*
            
            
            
            */}

        
            {/* Search  */}


{/*             
            <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '1rem auto' }}>

                <SearchFeature
                    refreshFunction={updateSearchTerms}
                />

            </div>
 */}

            

{/*
            {Products.length === 0 ?
                <div style={{ display: 'flex', height: '300px', justifyContent: 'center', alignItems: 'center' }}>
                    <h2>No post yet...</h2>
                </div> :
                <div>
                    <Row gutter={[16, 16]}>

                        {renderCards}

                    </Row>


                </div>
            }  
*/}
            
        
            <Row gutter={[16, 16]}>
            
                { renderCards }
            
            </Row>    
        
   
            
            <br />

            {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button onClick={onLoadMore}> 더보기 </button>
                </div>
            } 

        </div>
    )
}

export default LandingPage
