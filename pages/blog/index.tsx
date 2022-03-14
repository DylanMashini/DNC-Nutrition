import Layout from "../../layouts/Main"
import {Grid, Card, Text, Col} from "@nextui-org/react";

export default function Named({posts}) {
    return(
        <Layout>
      <Grid.Container gap={2} justify={"center"}>
        <Grid xs={12} sm={4}>
          <Card cover>
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
                  How to be healthy
                </Text>
                <Text h4 color="black" css={{
                    textAlign: 'right',
                  }}>
                  Suplements that actually work
                </Text>
              </Col>
            </Card.Header>
            <Card.Image
              src='/images/featured-1.jpg'
              height={340}
              width="100%"
              alt="Card image background"
            />
          </Card>
    </Grid>

            </Grid.Container>
        </Layout>
    )
}

export function getStaticProps() {
  const fs = require('fs')
  const posts = []
  const matter = require('gray-matter')
  fs.readdirSync('./pages/blog').map(file => {
    if (!(file == "index.tsx")){
      posts.push(file)
    }
  })
  for (var i = 0; i < posts.length; i++) {
    const post = posts[i]
    const postContents = fs.readFileSync(`./pages/blog/${post}`, 'utf8')
    const { data } = matter(postContents)
    console.log(data)
    
  }

}