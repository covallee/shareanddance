import React, {Component} from "react"
import styled from "styled-components"
import {format} from "date-fns"
import BasePortableText from "@sanity/block-content-to-react"

const CardStyles = styled.div`
  border: 2px solid #F8B9BF;
  display: grid;
  grid-template-columns: 300px;
  @media (min-width: 700px) {
    grid-template-columns: 300px 1fr;
  }
  img {
    width: 300px;
    height: 300px;
    object-fit: cover;
    margin-bottom: 0;
  }
  a {
    display: block;
    margin-bottom: 1rem;
    flex-grow: 2
  }
  .embed {
    flex-grow: 2
  }
  h2 {
    margin-bottom: 1rem;
  }
  .content{
    display: flex;
    flex-direction: column;
    padding: 20px 20px 0;
  }
  .date{
    font-size: 0.7rem;
  }
`;

const Tag = styled.span`
  display: inline;
  border: 1px solid white;
  border-radius: 5px;
  background-color: #F096A7;
  color: white;
  padding: 5px 10px;
`;

const ListTags = styled.div`
  margin-bottom: 15px;
`;

class Card extends Component {
  render() {
    const { item } = this.props
    // const id = item.link.split(item.playlist ? 'playlist/' : 'track/');
    const id = item.dataByPlatform.spotify ? item.dataByPlatform.spotify.id : null;
    // const embedLink = item.playlist ? `https://open.spotify.com/embed/playlist/${id[1]}` : `https://open.spotify.com/embed/track/${id[1]}`
    const embedLink = id ? `https://open.spotify.com/embed/track/${id}` : 'http://'
    return (
      <CardStyles>
        {item.album ? <img src={item.album.image.asset.url} alt="" /> : '' }
        <div className="content">
          <h2>{item.name} - {item.artist}</h2>
          <ListTags>
            {item.tag.map(tag => <Tag>{tag.title}</Tag>)}
          </ListTags>
          {/* {item.comment ? <p>{item.comment[0].children[0].text}</p> : ''} */}
          {item._rawComment ? <BasePortableText blocks={item._rawComment}/> : ''}
          <div className="embed">
            <iframe title={item.name} src={embedLink} width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <div className="date">{format(item._createdAt, 'MMMM D, YYYY' )}</div>
        </div>
      </CardStyles>
    )
  }
}

export default Card;