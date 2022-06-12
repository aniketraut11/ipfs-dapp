
import Image from "next/image";
const ImageCard = ({src}) => {
    return (
        <div className="flex flex-col m-2 white-card">
            <div className="m-2 border-2 border-black"><Image src={src} alt="nfts" width="100%" height="100%" layout="responsive"/></div>
            <div className="flex flex-col items-center p-2">
                <div className="w-full overflow-auto text-center">
                    <span className="font-medium">Uploader: </span>
                    <span>0xE8E21C3A33333c276eeCAE4ccD94C6B34a5017a4</span>
                </div>
                <button className="mt-2 button">Tip</button>
            </div>
        </div>
        )
    }
    
export default ImageCard;