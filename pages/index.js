import { useWeb3React } from "@web3-react/core";
import { create } from "ipfs-http-client";
import { useState } from "react";
import ImageCard from "../components/imageCard";
import { ethers } from "ethers";
import {TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS} from "../constants/contract";

const client = create('https://ipfs.infura.io:5001/api/v0');

export default function Home({ images }) {
    const { active, account, library: provider} = useWeb3React()
    const [file, setFile] = useState(null);
    const [imgArr, setImgObj] = useState([]);
    // console.log("imgArr: ", imgArr)
    const [loading, setLoading] = useState(false);

    // register the image link to smart contract
    const registerImage = async (IPFSLink) => {
        try {
            if(active) {
                setLoading(true);
                const signer = await provider.getSigner();
                const tokenContract = new ethers.Contract(
                    TOKEN_CONTRACT_ADDRESS,
                    TOKEN_CONTRACT_ABI,
                    signer
                );
            
                const tx = await tokenContract.registerImage(IPFSLink);
                await tx.wait();
                setLoading(false);
                window.alert("Sucessfully added the image IPFS link on the blockchain");
            }
        } catch (err) {
            console.error(err);
        }
    };

    const cacheImgaes = async (url, uploader) => {
        try {
            const body = JSON.stringify({ url:url, uploader:uploader})
            // console.log(body)
            const res = await fetch('/api/cache', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                body: body
            })
            const res_json = await res.json()
            // console.log("in casheImages: ", res_json)
            return res_json
        } catch (error) {
            console.log(error);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const created = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${created.path}`;   
            console.log(url);
            await registerImage(url);
            const {images} = await cacheImgaes(url, account)
            // console.log("in handleSubmit, images: ", images)
            setImgObj(images);
        } catch (error) {
            console.log(error);
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
                    <input className="form-control block text-base font-normal p-1 mb-2 rounded-md border border-gray-500" 
                        type="file" accept="image/*" id="formFile" onChange={retrieveFile}/>
                    {loading? 
                    <button className="button-disabled mb-2" disabled={true}>Loading...</button>
                    :<button type="submit" className="button mb-2">Upload</button>}
                </form>
            </div>
        </> : <></>}
        <div className="grid grid-cols-1 md:grid-cols-2">
            {imgArr.length !== 0
                ? imgArr.map((img) => <ImageCard src={img.url} key={null} uploader={img.uploader}/>)
                : <></>}
        </div>
        </>
    )
} 

// export async function getStaticProps() {
//     const res = await fetch('http://localhost:3000/api/cache')
//     const {images} = await res.json()
    
//     // console.log("log from getStaticProps: ", images)

//     return {
//       props: {
//         images
//       },
//     }
// }