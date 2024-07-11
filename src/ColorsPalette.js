import React from 'react';
import './App.css';

import { useState } from 'react';
import axios from 'axios';

//부트스트랩
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

function ColorsPalette() {
  const [colors, setColors] = useState([]);
  const [number,setNumber] = useState(5)

  const getRandomHex = () => {
    const letters = '0123456789ABCDEF';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  const axiosColors = ()=>{
    const randomHex = getRandomHex();
    axios.get(`https://www.thecolorapi.com/scheme?hex=${randomHex}&mode=analogic&count=${number}`)
    .then((result)=>{
      setColors(result.data.colors);
    })
    .catch((error)=>{
      console.log('error', error);
    })
  }
  const copyColorCode = (text)=>{
    navigator.clipboard.writeText(text)
    // console.log(navigator.writeText(text))
    .then (()=>{
      alert('복사 성공')
    })
    .catch((error)=>{
      alert('복사 실패', error)
    })
  }

  return(
    <>
      <div style={{paddingTop:'30px'}}>
        <h1>5가지 컬러 추천</h1>
        <p>컬러 확인 후 색상 코드를 클릭하면 복사가 됩니다.</p>
        <div className='pdt30'>
          <Button className='colorSelbtn' disabled={number === 1 ? true : false} onClick={()=>{setNumber(1)}}>1개</Button>
          <Button className='colorSelbtn' disabled={number === 3 ? true : false} onClick={()=>{setNumber(3)}}>3개</Button>
          <Button className='colorSelbtn' disabled={number === 5 ? true : false} onClick={()=>{setNumber(5)}}>5개</Button>
          <Button className='colorSelbtn' disabled={number === 7 ? true : false} onClick={()=>{setNumber(7)}}>7개</Button>
        </div>
        <Button variant="outline-primary" onClick={axiosColors}>컬러 확인!</Button>
      </div>
      <Dashboard colors={colors} copyColorCode={copyColorCode}/>
    </>
  )
}

function Dashboard({colors = [], copyColorCode}){
  return(
    <>
      <div className="color-palette">
        {colors.map((color, index) => {
          return (
            <div key={index} onClick={()=>{copyColorCode(color.hex.value)}} className="color-block" style={{ backgroundColor: color.hex.value}}>
              {color.hex.value}
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ColorsPalette;