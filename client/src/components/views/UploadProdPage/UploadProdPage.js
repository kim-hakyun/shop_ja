import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Typography, Form, Input, Button } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Axios from 'axios';



const { TextArea } = Input;

const Continents =[

        {key:1, value:'염색약'},
        {key:2, value:'펌재/매직'},
        {key:3, value:'전후처리제/케어'},
        {key:4, value:'스타일링'},
        {key:5, value:'샴푸/트리트먼드/LPP'},
        {key:6, value:'두피크리닉'},
        {key:7, value:'모발크리닉'},
        {key:8, value: '마스크팩'}
    ]

function UploadProdPage(props) {

    const [Title, setTitle] = useState("")
    const [Price, setprice] = useState(0)
    const [Description, setdescription] = useState("")
    const [Continent, setContinent] = useState(1)
    
    const [confirm, setConfirm] = useState("")
    const [Images, setImages] = useState([])

  
    const titleHandler = (e)=> {
        setTitle(e.currentTarget.value)
    }

    const priceHandler = (e)=> {
        setprice(e.currentTarget.value)
    }

    const descriptionHandler =  (e)=> {
        setdescription(e.currentTarget.value)
    }

    const continentHandler = (e) =>{
        setContinent(e.currentTarget.value)    
    } 

    const updateImages = (newImagesUp) => {
        setImages(newImagesUp)
        // 이 기능은 업데이트된 이미지를 images 라는 유즈스테이트(useState)에 저장한다 
        // 
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log('비교 하기전...')
        console.log(Title)   
        console.log(Description)   
        console.log(Price)   
        console.log(Continent)   
        console.log(Images)   

        if (!Title || !Description || !Price || !Continent ||
             !Images) {
            return alert('모든 항목을 채워 주세요')
        } 
         
        // console.log('모든항목 채움')
     
        const body ={
            //프로덕트 모델을 보낸다

            // 로그인된 사람의 id
            writer: props.user.userData._id,
            title : Title,
            description: Description,
            price : Price,
            images: Images,
            continent: Continents,
        }
        
        // 서버에 항목을 request 로 저장하기
        Axios.post('/api/product', body)
          // 위에 '/api/pro..  로 안하고 'api/pro... 이렇게 해서 안됨 
            .then(response => {
                if(response.data.success) {
                    alert ('서버에 상품 업로드에 성공 했습니다.')
                    props.history.push('/')
                } else {
                    alert ('상품 업로드를 실패 했습니다.')
                }

            })

            

        }
    
    return (
        <div style ={{ maxWidth: '700px', margin: '2rem auto'}}>
            <div style ={{ textAlign: 'center', marginBottom: '2rem' }}>
                <h2>상품 등록</h2>
            </div>

           
            
            <Form onSubmit = { onSubmitHandler }>

                {/* Drop Zone */} 
            <FileUpload refleshFunc ={ updateImages }/>

                <br/>
                <br/>
                <label >제목</label>
                <Input onChange = { titleHandler } value={Title}></Input>
                {/* 라벨에 온체인지를 넣어두어서 타이틀 변경이 .. 타이틀이 넣어지지 않음 */}

                <br/>
                <br/>
                <label >설명</label>
                <TextArea onChange = { descriptionHandler} value={Description} ></TextArea>
                
                <br/>
                <br/>
                <label>가격</label>
                <Input type="number" onChange = { priceHandler} value = {Price}></Input>
                <br/>
                <br/>
                
                <select onChange = { continentHandler } value = { Continent }>
                    {
                        Continents.map((item) => (
                        <option key={item.key} value={item.key}> {item.value}</option>
                        ))
                    }
                </select>    

                    
                <br/>
                <br/>

                <Button type='onSubmit' onClick ={onSubmitHandler} >확인</Button>
            </Form>
            
        </div>
    )
}

export default withRouter (UploadProdPage) 
