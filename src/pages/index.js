import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import Cards from "../components/cards"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`music`,`gatsby`, `application`, `react`]} />
    <h1>Hi people</h1>
    <p>Just some music that I like</p>
    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    <Cards></Cards>
    {/* <Link to="/page-2/">Go to page 2</Link> */}
  </Layout>
)

export default IndexPage
