import React, {Component} from "react"
import styled from "styled-components"
import {format} from "date-fns"

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
    const id = item.link.split('track/');
    const embedLink = `https://open.spotify.com/embed/track/${id[1]}`
    return (
      <CardStyles>
        {item.cover ? <img src={item.cover.file.url} alt="" /> : '' }
        <div className="content">
          <h2>{item.title} - {item.artist}</h2>
          <ListTags>
            <Tag>{item.tag}</Tag>
          </ListTags>
          {/* <a href={item.link}>Listen on spotify</a> */}
          {item.note ? <p>{item.note.note}</p> : ''}
          <div className="embed">
            <iframe src={embedLink} width="100%" height="80" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
          </div>
          <div className="date">{format(item.createdAt, 'MMMM D, YYYY h:mm a' )}</div>
        </div>
      </CardStyles>
    )
  }
}

export default Card;