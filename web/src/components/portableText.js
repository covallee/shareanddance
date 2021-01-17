import React from 'react'
import BasePortableText from '@sanity/block-content-to-react'

const PortableText = ({blocks}) => (
  <BasePortableText blocks={blocks} serializers={seriablizers} />
)

export default PortableText;