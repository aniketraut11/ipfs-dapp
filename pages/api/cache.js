let images = []

export default function handler(req, res) {
    if (req.method === 'POST') {
        const { url, uploader } = req.body
        images = [...images, {url:url, uploader:uploader}]
        console.log("log from api handler: ", images)
        res.status(200).json({ images: images, message: "Image added to the images list" })
    } else {
        res.status(200).json({ images: images })
    }
  }