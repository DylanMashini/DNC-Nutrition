
import getAllProds from "../../utils/getAllProds";
export default async function handler(req, res) {
    getAllProds()
    res.status(200)
}