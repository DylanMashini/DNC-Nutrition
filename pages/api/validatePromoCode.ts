import codes from "../../promoCodes.json";

export default function Handler(req, res) {
  if (req.method != "POST") {
    res.status(405).send("Wrong Method");
    return;
  }
  const code = req.body.code;
  const products = req.body.products;
  if (!code || !products) {
    res.status(400).send("Missing Paramerters");
    return;
  }
    const discount = codes.find((p) => p.code == code);
}
