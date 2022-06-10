import { useWeb3React } from "@web3-react/core";
import { InjectedConnector } from "@web3-react/injected-connector";

export const injected = new InjectedConnector();

const Navbar = () => {
    const {active, activate, account} = useWeb3React()
    
    function shrotAddr() {
        return account.substring(0,5)+"..."+account.substring(38,42)
    }
    
    async function connect() {
        if (typeof window.ethereum !== "undefined") {
            try {
                await activate(injected)
            } catch (e) {
                console.log(e);
            }
        }
    }

    return (
        <div className="nav-bar flex items-center">
        <span className="ml-2 mr-auto text-2xl font-bold"> IPFS DApp</span>
        {active?
            <div className="mr-2"> { shrotAddr() } </div> :
            <button className="mr-2 nav-item button" onClick={connect}>Connect</button>
        }
        </div>
        )
    }
    
    export default Navbar;