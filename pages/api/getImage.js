import fs from 'fs/promises';
import path from 'path';
import mime from 'mime-types';
import sharp from 'sharp';

export default async function GetImage(req, res) {
    if(req.query.method === 'get-doctor-image'){
        try {
            // Construct the dynamic file path
            const filePath = path.join(process.cwd(), 'uploads', 'doctors', req.query.doctor, req.query.image);
    
            // Extract the file extension and determine the MIME type
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            // Read the file and process it with sharp
            const fileContent = await fs.readFile(filePath);
    
            // Initialize sharp with the file content
            let processedImage;
    
            // Handle different image formats (jpeg, png, etc.)
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .resize({ width: 800 })  // Resize image to a maximum width of 800px
                    .jpeg({ quality: 80 })   // Compress JPEG image with 80% quality
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .resize({ width: 800 })  // Resize image to a maximum width of 800px
                    .png({ compressionLevel: 8 })  // Compress PNG image with a compression level of 8
                    .toBuffer();
            } else {
                // If the image format is not supported for processing, return the original content
                processedImage = fileContent;
            }
    
            // Set appropriate headers based on the MIME type and return the processed image content
            res.setHeader('Content-Type', mimeType);
            res.send(processedImage);
    
        } catch (err) {
            console.error('Error processing image:', err);
            res.status(404).send('File not found');
        }
    }

    else if(req.query.method === 'get-blog-image'){


        try {
            // Construct the dynamic file path
            const filePath = path.join(process.cwd(), 'uploads', 'blogs', req.query.blog, req.query.image);
    
            // Extract the file extension and determine the MIME type
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            // Read the file and process it with sharp
            const fileContent = await fs.readFile(filePath);
    
            // Initialize sharp with the file content
            let processedImage;
    
            // Handle different image formats (jpeg, png, etc.)
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .resize({ width: 800 })  // Resize image to a maximum width of 800px
                    .jpeg({ quality: 80 })   // Compress JPEG image with 80% quality
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .resize({ width: 800 })  // Resize image to a maximum width of 800px
                    .png({ compressionLevel: 8 })  // Compress PNG image with a compression level of 8
                    .toBuffer();
            } else {
                // If the image format is not supported for processing, return the original content
                processedImage = fileContent;
            }
    
            // Set appropriate headers based on the MIME type and return the processed image content
            res.setHeader('Content-Type', mimeType);
            res.send(processedImage);
    
        } catch (err) {
            console.error('Error processing image:', err);
            res.status(404).send('File not found');
        }
    }

  
}

export const config = {
    api: {
        externalResolver: true,
    },
};
