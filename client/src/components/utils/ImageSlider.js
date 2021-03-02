import React from 'react';
import { Carousel } from "antd";

function IimageSlider(props) {

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };

    return (
        <div>
            <Carousel effect="fade" autoplay>
                {props.imagesS.map((image, index) => (
                    <div key={index} >
                        <img style={contentStyle}
                            src={`http://localhost:5000/${image}`}
                            alt="ProductImage"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    )
}

export default IimageSlider
