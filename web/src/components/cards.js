import React, { Component } from "react"
import { StaticQuery, graphql } from "gatsby"
import styled from "styled-components"
import Card from "./card";

const ALL_BLOG_POST = graphql`
  query BlogPost {
    allSanityTrack(sort: {fields: publishedAt, order: DESC}) {
      edges {
        node {
          _id
          name
          _createdAt
          publishedAt
          artist
          album {
            image {
              asset {
                url
              }
            }
          }
          dataByPlatform {
            spotify {
              id
            }
          }
          tag {
            title
          }
          _rawComment
        }
      }
    }
  }
`;

const BlogCards = styled.div`
  display: grid;
  grid-template-columns: 300px;
  grid-gap: 20px;
  margin: 0 auto;
  justify-content: center;
  @media (min-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

class Cards extends Component {
  render() {
    return (
      <StaticQuery
        query={ALL_BLOG_POST}
        render={(data) => (
          <BlogCards>
            {data.allSanityTrack.edges.map(edge => 
              <Card item={edge.node} key={edge.node._id}></Card>
            )}
          </BlogCards>
        )}
      />
    )
  }
};

export default Cards;
