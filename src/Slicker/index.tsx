import React, { useState } from 'react';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import {MovieRowStyled} from './style'

export default function Slicker({title, items}) {
  const [scrollX, setScrollX] = useState(0);

  const handleLeftArrow =()=>{
    let x = scrollX + Math.round(window.innerWidth / 2);
    if(x > 2) x = 0
    
    setScrollX(x)
  }

  const handleRightArrow = () => {
    let x = scrollX - Math.round(window.innerWidth / 2);
    let listWidth = items.results.length * 150
    if((window.innerWidth - listWidth) > x) {
      x = (window.innerWidth - listWidth) - 60;
    }

    setScrollX(x)
    
  }

  return (
    <MovieRowStyled>
      <h2>{title}</h2>
      <div onClick={handleLeftArrow} className="movieRow-left movieRow">
        <NavigateBeforeIcon style={{fontSize: 50}} />
      </div>

      <div onClick={handleRightArrow} className="movieRow-right movieRow">
        <NavigateNextIcon style={{fontSize: 50}} />
      </div>


      <div className="movieRow--listarea">
          <div className="movieRow--list"
            style={{
              marginLeft: scrollX,
              width: items.results.length * 150
            }}
          >
            {items.results.length > 0 && items.results.map((item, key) =>(
              <div key={key} className="movieRow--item">
                <img key={key} src={item.lookURL} alt={item.hashtag} />
                <h1>{item.hashtag}</h1>
                <p>{item.likes}</p>
                <h3>{item.requesterUsername}</h3>
              </div>
            ))}
          </div>

      </div>

    </MovieRowStyled>

  )



}