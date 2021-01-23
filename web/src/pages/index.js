import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Cards from "../components/cards"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`music`,`gatsby`, `application`, `react`]} />
    <h1 
      style={{
        fontSize: `1rem`
      }}>Just some tracks that I like</h1>
    <Cards></Cards>
  </Layout>
)

export default IndexPage
