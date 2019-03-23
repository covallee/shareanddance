import React, {Component} from "react"
import styled from "styled-components"
import {format} from "date-fns"

const CardStyles = styled.div`
  border: 2px solid #F8B9BF;
  display: flex;
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
    return (
      <CardStyles>
        {item.cover ? <img src={item.cover.file.url} alt="" /> : '' }
        <div className="content">
          <h2>{item.title}</h2>
          <ListTags>
            <Tag>{item.tag}</Tag>
          </ListTags>
          <a href={item.link}>Listen on spotify</a>
          <div className="date">{format(item.createdAt, 'MMMM d, YYYY h:mm a' )}</div>
        </div>
      </CardStyles>
    )
  }
}

export default Card;