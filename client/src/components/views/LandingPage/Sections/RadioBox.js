import React, { useState } from 'react'
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;


function RadioBox(props) {
    
    const [Value, setValue] = useState([])

    const handleToggle = (value) => {
        // 누른것의 index를 구하고
        const currentIndex = Checked.indexOf(value)
        const newChecked = [...Checked]
        
        // 전체 checked 된 state에서 현재 
        // 누른 checkbox가 이미 없으면 
        if(currentIndex === -1) { // 없으면
             newChecked.push(value)   // state에 넣어주고
            } else {
                newChecked.splice(currentIndex, 1)    // checkbox가 이미 있다면 빼주고
            }
            setChecked(newChecked) 
            props.handleFilters(newChecked) // 부모컴포넌트에 전달하는 역활
            // 새로 newChecked .. 만약 [1,2,3] 이들어 있다면 
            // 랜딩페이지 newFilers[category] 에 [1,2,3] 이들어간다
        }
  
    const renderListCheckBox = () => props.list && props.list.map((value, index) => (
                
                <React.Fragment key={index}>
                    <Checkbox onChange = {() => handleToggle(value._id)}
                    checked ={Checked.indexOf(value._id) === -1 ? false : true} /> 
                       <span> <b>{ value.name }</b> </span>
                </React.Fragment>    
            ))
    
     return (
        <div>
            CheckBox
            <Collapse defaultActiveKey={['1']} >
                <Panel header="카테고리" key="1">

                    {renderListCheckBox()}
                    '16512231101014'
        
                </Panel>
                
            </Collapse>
        </div>
    )
}

export default RadioBox
