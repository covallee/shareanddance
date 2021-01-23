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

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  @media (min-width: 700px) {
    font-size: 2.25rem;
  }
`;

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: `linear-gradient(180deg, #72CBCF 0%, rgba(165, 222, 225, 0.635359) 65.75%, rgba(255, 255, 255, 0) 100%), #FCF2E1`,
      marginBottom: `1.45rem`,
      height: `120px`,
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
      <Title>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </Title>
      <SocialLinks>
        <a href="https://open.spotify.com/user/hokiefr?si=aj0hXQiWRP6Ql8nie0p5PQ" title="Spotify profile">
          <Spotify />
        </a>
        <a href="https://twitter.com/ShareandDance" title="Twitter profile">
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
