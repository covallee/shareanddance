import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Cards from "../components/cards"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`music`,`gatsby`, `application`, `react`]} />
    <h1 
      style={{
        fontSize: `1rem`
      }}>Just some tracks that I like</h1>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    <Cards></Cards>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
