import React, {useState} from 'react';
import Dropzone from 'react-dropzone';
import {Icon} from 'antd';
import Axios from 'axios';
//  import { response } from 'express';

function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {


        // 파일을 보낼때는
        // formData에 파일 번호를 넣고
        // header 에 파일(content) 타입과 파일 정보 담는다
        // header는 환경변수에 넣는다
        //
        // 백앤드로  formData와 config를 보낸다
        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server
        Axios.post('/api/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                       // console.log(response.data)

                    setImages([...Images, response.data.filePath])
                    props.refleshFunc([...Images, response.data.filePath])
            } else {
                console.log('*댕 파일을 저장하지 못했다')
            }
        })

    }

    
    const deleteHandler = (image) => {
        const currentIndex = Images.indexOf(image);
        
        console.log ('currentIndex', currentIndex)
     
        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
         props.refleshFunc(newImages)
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'spece-between'}}>
            <Dropzone onDrop={onDrop}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div style = {{
                                    width: '300px', height: '240px', border: '1px solid lightgray',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                        {...getRootProps()}>
                        {/* {console.log('getRootProps',{...getRootProps})}
                        {console.log('getInputProps',{...getInputProps})} */}

                        <input {...getInputProps()} />
                        <Icon type="plus" style={{ fontSize: '3rem' }} />
                        
                    </div>
                    </section>
                )}
            </Dropzone>


            <div style ={{ display: 'flex', width: '350px', height:'240px', overflowX:'scroll'}}>

            { Images.map((image, index) => (
                <div onClick ={()=> deleteHandler(image)} key={index} >
                    <img style ={{minWidth: '300px', width: '300px', height:'240px' } }
                        src={`http://localhost:5000/${image}`} alt=""/>
                </div>
                ))
            }
            </div>

        </div>
        )
    }

export default FileUpload



