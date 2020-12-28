import React from 'react'
import profile from '../../styles/profile.jpg'
// import { faGithubAlt, faLinkedIn } from '@fortawesome/free-brands-svg-icons'


export default function About() {


  return (
    <main style={{ margin: "5rem 10%" }}>
      <h2>What is <i>The Chronicles</i>?</h2>
      <p>This is a free website intended to let users create and share their own  text-based browser games where players can make decisions and experience their own unique stories.</p>
<br/><br/>
      <h2>About Alicia Mira Kim</h2>
      <div style={{ margin: "0 2rem", objectFit: "cover", float: "left" }}><img src={profile} alt="Photo of site creator, Alicia Mira Kim" style={{ borderRadius: "50%", height: "10rem" }} /></div>

        <p>Hello! I am the full-stack software engineer that developed and designed <i>The Chronicles</i>. The site was built using React and React-Redux in the frontend and a Flask / SQLAlchemy backend.</p>

        <p>Please feel free to contact me with any questions about me or the site. I'm interested in new opportunities based in my home state Maryland or in San Francisco, California.</p>

        <div className="lo-center-h">
          <ul style={{ textAlign: "center" }}>
            <li><a href="https://github.com/alimirakim/Iris-Isle" className="lo-wow">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/alicia-mira-kim-416a0a41/" className="lo-wow"><i className="fas-fa-linkedin"></i>LinkedIn</a></li>
            <li><a href="mailto:alicia.mira.kim@gmail.com" className="lo-wow"><i className="fas-fa-email" className="lo-wow"></i>alicia.mira.kim@gmail.com</a></li>
            <li><a href="#top" className="lo-wow">[Resume PDF]</a></li>
          </ul>
        </div>
    </main>
  )
}