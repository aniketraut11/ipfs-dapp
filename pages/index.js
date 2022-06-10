import { useWeb3React } from "@web3-react/core";

export default function Home() {
    const { active, account} = useWeb3React()

    return (
        <div className="flex flex-col items-start">
        <h1 className="title self-center"> Tittle </h1>
        <div>
            {active? "account: " + account : "not connected"}
        </div>
        
        </div>
        )
    }
    