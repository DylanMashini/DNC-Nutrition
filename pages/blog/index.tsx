import Layout from "../../layouts/Main"
import { Grid, Card, Text, Col } from "@nextui-org/react";
import { useEffect } from "react";
import Router from "next/router";
export default function Named({ data }) {
  const cards = data.map(item =>
    <Grid xs={12} sm={4}>
      <Card cover hoverable clickable onClick={() => {
        Router.push(item.path)
      }}>
        <Card.Header css={{ position: 'absolute', zIndex: 1, top: 5 }}>
          <Col>
            <Text
              size={12}
              weight="bold"
              transform="uppercase"
              color="#000000"
              css={{
                textAlign: 'right',
              }}

            >
              {item.Header}
            </Text>
            <Text h4 color="black" css={{
              textAlign: 'right',
            }}>
              {item.Title}
            </Text>
          </Col>
        </Card.Header>
        <Card.Image
          src={item.Cover}
          height={340}
          width="100%"
          alt="Card image background"
        />
      </Card>
    </Grid>
  )
  useEffect(() => {
    console.log(JSON.stringify(data))
  })
  return (
    <Layout>
      <Grid.Container gap={2} justify={"center"}>
        {cards}
      </Grid.Container>
    </Layout>
  )
}

export function getStaticProps() {
  const fs = require('fs')
  const posts = []
  const matter = require('gray-matter')
  fs.readdirSync('./pages/blog').map(file => {
    if (!(file == "index.tsx")) {
      posts.push(file)
    }
  })
  let cards = [];
  for (var i = 0; i < posts.length; i++) {
    const post = posts[i]
    const postContents = fs.readFileSync(`./pages/blog/${post}`, 'utf8')
    const { data } = matter(postContents)
    cards.push(data)


  }
  console.log(cards)
  return {
    props: {
      data: cards
    }
  }

}