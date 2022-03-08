export default function Named() {
    const [data, setData] = useState([])
    return(
        <Layout>
            <div>
                <List data={}></List>
            </div>
        </Layout>
    )
}

export getServerSideProps(context) {

}