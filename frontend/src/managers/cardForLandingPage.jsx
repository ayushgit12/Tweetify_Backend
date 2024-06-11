import React from 'react'
import './cardForLandingPageCss.css'

const cardForLandingPage = ({title, desc}) => {
  return (
    <div>
      <div class="card">
    <div class="align">
        <span class="red"></span>
        <span class="yellow"></span>
        <span class="green"></span>
    </div>

    <h1>{title}</h1>
    <p>
        {desc}
    </p>
</div>
    </div>
  )
}

export default cardForLandingPage
