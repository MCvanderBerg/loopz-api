import {BlobServiceClient} from "@azure/storage-blob";
import { Readable } from 'stream'
import fs from "fs";
import path from "path";
import os from "os";

const accountName = process.env.ACCOUNT_NAME || "loopzimages"
const sasToken = "sp=racwdli&st=2024-03-06T22:51:25Z&se=2024-03-28T06:51:25Z&spr=https&sv=2022-11-02&sr=c&sig=Xv63W2YQRy2MUlSnb2PCVdW9KSyXtcfO3X9Tv2J2pOU%3D"
const containerName = process.env.CONTAINER_NAME || "images"

const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net/?${sasToken}`)
const containerClient = blobServiceClient.getContainerClient(containerName)

export async function handleProfilePictureUpload(req, res)  {
    const { username } = req.body
    const image = req.files[0]
    const imageStream = Readable.from(image.buffer);

    const blobName = `users/${username}/profilePicture.png`
    const blockBlobClient = containerClient.getBlockBlobClient(blobName)

    console.log('before')
    await blockBlobClient.uploadStream(imageStream, image.size)
    console.log('after')

    return blobName
}
