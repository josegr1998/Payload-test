import { RichTextContent as RichTextContentType } from '@/payload-types'
import {
  DefaultNodeTypes,
  SerializedLinkNode,
  SerializedHeadingNode,
  SerializedInlineBlockNode,
  SerializedBlockNode,
} from '@payloadcms/richtext-lexical'
import {
  JSXConvertersFunction,
  RichText,
  LinkJSXConverter,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'
import { Jumbotron as JumbotronType } from '@/payload-types'
import { Jumbotron } from '../Jumbotron/Jumbotron'

type Props = RichTextContentType

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<JumbotronType>
  | SerializedInlineBlockNode<JumbotronType>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { relationTo, value } = linkNode.fields.doc!
  if (typeof value !== 'object') {
    throw new Error('Expected value to be an object')
  }
  const slug = value.slug

  switch (relationTo) {
    case 'posts':
      return `/posts/${slug}`
    case 'categories':
      return `/category/${slug}`
    case 'pages':
      return `/${slug}`
    default:
      return `/${relationTo}/${slug}`
  }
}

const jsxConverters: JSXConvertersFunction<DefaultNodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
  heading: ({ node, nodesToJSX }) => {
    const tag = node.tag
    const children = nodesToJSX({ nodes: node.children })

    if (tag === 'h1') {
      return <h1 className="text-2xl font-bold my-2">{children}</h1>
    }

    if (tag === 'h2') {
      return <h2 className="text-xl font-bold my-2">{children}</h2>
    }

    if (tag === 'h3') {
      return <h3 className="text-lg font-bold my-2">{children}</h3>
    }

    if (tag === 'h4') {
      return <h4 className="text-base font-bold my-2">{children}</h4>
    }

    return <div>{children}</div>
  },
  blocks: {
    // Each key should match your block's slug
    jumbotron: ({ node }: { node: SerializedBlockNode<JumbotronType> }) => (
      <Jumbotron {...node.fields} />
    ),
  },
})

export const RichTextContent = ({ content }: Props) => {
  return <RichText data={content} converters={jsxConverters} className="py-4 px-4" />
}
