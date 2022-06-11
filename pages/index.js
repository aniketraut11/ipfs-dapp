import { useWeb3React } from "@web3-react/core";

export default function Home() {
    const { active, account} = useWeb3React()

    return (
        <>
            <div className="flex flex-col items-start white-card">
                <h1 className="title self-center"> Tittle </h1>
            </div>
            { active? <>
            <div className="flex flex-col items-center white-card">
                <span className="text-lg"> Account: </span> 
                <span className="mb-2"> {account} </span>
                
                <input className="form-control block text-base font-normal p-1 mb-2 rounded-md border border-gray-500" type="file" id="formFile" />
                <div className="button mb-2"> Upload</div>
            </div>
            </> : <></>}
        </>
        )
    }
    