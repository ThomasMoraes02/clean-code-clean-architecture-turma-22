import axios from "axios";

export default function sleep(time: number) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

async function main() {
    const marketId = `BTC-USD-${Math.random()}`;
    const inputSignup = {
        name: "John Doe",
        email: `john.doe${Math.random()}@example.com`,
        document: "123.456.789-09",
        password: "asdQWE123",
    };
    const responseSignup = await axios.post("http://localhost:3000/signup", inputSignup);
    const accountId = responseSignup.data.accountId;
    while (true) {
        const inputPlaceOrder = {
            accountId: accountId,
            marketId: marketId,
            side: (Math.random() > 0.5) ? "buy" : "sell",
            quantity: Math.round(Math.random() * 10) + 1,
            price: Math.round(85000 + ((Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1)))
        }
        await axios.post("http://localhost:3000/place_order", inputPlaceOrder);
        // console.log(inputPlaceOrder);
        await sleep(10);
    }
}

main();