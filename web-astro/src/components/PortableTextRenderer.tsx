import { PortableText, type PortableTextBlock } from "@portabletext/react"

interface Props {
  blocks: PortableTextBlock[]
}

export default function PortableTextRenderer({ blocks }: Props) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return <PortableText value={blocks} />
}
