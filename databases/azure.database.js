import {BlobServiceClient} from "@azure/storage-blob";
import { Readable } from 'stream'
import fs from "fs";
import path from "path";
import os from "os";

const accountName = process.env.ACCOUNT_NAME || "loopzimages"
const sasToken = "sp=racwdli&st=2024-03-06T08:37:05Z&se=2024-03-06T16:37:05Z&spr=https&sv=2022-11-02&sr=c&sig=bFytaIGLaj3tW80019j3FF969PK9aBnQp6zZqexnKrs%3D"
const containerName = process.env.CONTAINER_NAME || "images"

const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`)
const containerClient = blobServiceClient.getContainerClient(containerName)

export async function handleImageUpload(req, res)  {
    // const { id, image } = req.body
    //
    // const blobName = `${id}/profilePicture2.png`
    // const blockBlobClient = containerClient.getBlockBlobClient(blobName)
    // const filePath = "/Users/christiaanvanderberg/Downloads/defaultProfileImage.png"
    // const readableStream = fs.createReadStream(filePath);
    //
    // console.log("blockBlobClient created")
    //
    // await blockBlobClient.uploadStream(readableStream, fs.statSync(filePath).size)
    //
    // console.log("uploaded image to azure ")
    //
    // res.status(200).json({message: "image uploaded"})

    const { id } = req.body
    const image = req.files[0]
    const imageStream = Readable.from(image.buffer);


    const blobName = `${id}/profilePicture4.png`
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    console.log("blockBlobClient created")

    await blockBlobClient.uploadStream(imageStream, image.size)

    console.log("uploaded image to azure ")

}
