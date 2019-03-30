import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import styled from "styled-components"

import Spotify from '../assets/spotify.svg';
import Twitter from '../assets/twitter.svg';

const SocialLinks = styled.div`
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    height: 44px;
    width: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `#71CACD`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <SocialLinks>
        <a href="https://open.spotify.com/user/hokiefr?si=aj0hXQiWRP6Ql8nie0p5PQ">
          <Spotify />
        </a>
        <a href="https://twitter.com/ShareandDance">
          <Twitter />
        </a>
      </SocialLinks>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
