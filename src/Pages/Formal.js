import React from 'react'
import './pageStyle/Formal.css'
import formal_dressed from '../Components/assets/formal_dressed.jpeg'
import { Link } from 'react-router-dom'


const Formal = () => {

  return (
    <>   
    <section className='nothing'></section>
    <section className="season-collection-section">
    <div className="formal-image">
      <img src={formal_dressed} alt="formal" />
      <button className='formal-btn'>
        <Link to='/shop' style={{ textDecoration: "none", color: "black" }}> Shop now  <b><span>&#10140;</span></b></Link></button>
    </div>

  </section>
  </>
  )
}

export default Formal