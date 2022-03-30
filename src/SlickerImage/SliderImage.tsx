import React, {useEffect, useState} from 'react';
import Tmdb from '../services/isntance'

import GlobalStyle from './global';
import MovieRow from '../Slicker';

function Images() {
  const [images, setImages] = useState([])
  const [featureData, setFeatureData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)
  
  useEffect(() => {
      const loadAll = async () =>{
          let list = await Tmdb.getHomeList()
          setImages(list)

          let originalImages = list.filter(original => original.slug === "originals")
          let randomChosen = Math.floor(Math.random() * (originalImages[0].items.results.length - 1))
          let chosen = originalImages[0].items.results[randomChosen];
          let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "pictures")

          setFeatureData(chosenInfo);
      }
      loadAll()
  }, [])

  useEffect(() => {
      const scrollListener = () =>{
          if(window.scrollY > 10){
            setBlackHeader(true)
          }else{
            setBlackHeader(false)
          }
      }
      
      window.addEventListener('scroll', scrollListener)

      return () => {
      window.removeEventListener("scroll", scrollListener)
      }       
  },[])
  return (
      <>
      <GlobalStyle />
        <div className="page">
          <section className="lists">
            {images.map((item, key)=>(
            <MovieRow key={key} title={item.title} items={item.items} />
            ))}
          </section>
          </div>
  
      </>
    )

}

export default Images;