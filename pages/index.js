import { useWeb3React } from "@web3-react/core";
import { create } from "ipfs-http-client";
import ImageCard from "../components/imageCard";
import contractInteractions from "../contractInteraction/contractInteractions";
import React, {useState } from "react";
import { BigNumber, Contract, providers, utils } from "ethers";


const client = create('https://ipfs.infura.io:5001/api/v0');

export default function Home() {
    const { active, account} = useWeb3React()
    const [file, setFile] = useState(null);
    const [urlArr, setUrlArr] = useState([]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const created = await client.add(file);
        const url = `https://ipfs.infura.io/ipfs/${created.path}`;
        setUrlArr(prev => [...prev, url]);   
        console.log(url);  
      } catch (error) {
        console.log(error.message);
      }
    };
  
    const retrieveFile = (e) => {
      const data = e.target.files[0];
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend = () => {
        setFile(Buffer(reader.result));
        console.log("Buffer data: ", Buffer(reader.result));
      }
  
      e.preventDefault();  
    }
  
    return (
        <>
            <div className="flex flex-col items-start white-card">
                <h1 className="title self-center"> IPFS Image Sharing App </h1>
            </div>
            { active? <>
            <div className="flex flex-col items-center white-card">
                <span className="text-lg"> Account: </span> 
                <span className="mb-2"> {account} </span>
                
                <form className="flex flex-col items-center" onSubmit={handleSubmit}>
                    <input className="form-control block text-base font-normal p-1 mb-2 rounded-md border border-gray-500" type="file" id="formFile" onChange={retrieveFile}/>
                    <button type="submit" className="button mb-2"> Upload</button>
                </form>
            </div>
            </> : <></>}
            <div className="grid grid-cols-1 md:grid-cols-2">
                {urlArr.length !== 0
                ? urlArr.map((el) => <ImageCard src={el} />)
                : <></>}
            </div>

          <div>
            <h1 className="title self-center" >Welcome to Image Sharing DAPP!</h1>
            <div className="title self-center">
              You can mint tokens here!
            </div>
            {active ? (
              <div>
                <div >
                  {/* Format Ether helps us in converting a BigNumber to string */}
                  You have minted {utils.formatEther(contractInteractions.balanceOfTokens)} Crypto
                  Dev Tokens
                </div>
                <div >
                  {/* Format Ether helps us in converting a BigNumber to string */}
                  Overall {utils.formatEther(contractInteractions.tokensMinted)}/10000 have been minted!!!
                </div>
                {renderButton()}
              </div>
              ) : (<></>)}
          </div>



        </>
        )
    }
    