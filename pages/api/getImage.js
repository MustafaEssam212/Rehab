import fs from 'fs'; // Change to fs
import fsPromises from 'fs/promises'; // Keep fs/promises for async operations
import path from 'path';
import mime from 'mime-types';
import sharp from 'sharp';

export default async function GetImage(req, res) {
    if(req.query.method === 'get-doctor-image'){
        try {
            const filePath = path.join(process.cwd(), 'uploads', 'doctors', req.query.doctor, req.query.image);
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            const fileContent = await fsPromises.readFile(filePath);
            let processedImage;
    
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .png({ compressionLevel: 8 })
                    .toBuffer();
            } else {
                processedImage = fileContent;
            }
    
            res.setHeader('Content-Type', mimeType);
            res.send(processedImage);
    
        } catch (err) {
            console.error('Error processing image:', err);
            res.status(404).send('File not found');
        }
    } else if(req.query.method === 'get-blog-image'){
        try {
            const filePath = path.join(process.cwd(), 'uploads', 'blogs', req.query.blog, req.query.image);
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            const fileContent = await fsPromises.readFile(filePath);
            let processedImage;
    
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .png({ compressionLevel: 8 })
                    .toBuffer();
            } else {
                processedImage = fileContent;
            }
    
            res.setHeader('Content-Type', mimeType);
            res.send(processedImage);
    
        } catch (err) {
            console.error('Error processing image:', err);
            res.status(404).send('File not found');
        }
    } else if(req.query.method === 'get-video') {
        try {
            const videoPath = path.join(process.cwd(), 'uploads', 'works', req.query.work, req.query.video);
            const mimeType = mime.lookup(videoPath);
    
            if (!mimeType || !mimeType.startsWith('video/')) {
                return res.status(400).send('Unsupported file type');
            }
    
            // Use fs.existsSync instead of fs/promises
            if (!fs.existsSync(videoPath)) {
                return res.status(404).send('Video not found');
            }
    
            const range = req.headers.range;
            if (!range) {
                return res.status(416).send('Range header is required');
            }
    
            const videoSize = fs.statSync(videoPath).size; // Use fs.statSync here
    
            const CHUNK_SIZE = 10 ** 6; // 1MB per chunk
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);
    
            const contentLength = end - start + 1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': mimeType,
            };
            res.writeHead(206, headers);
    
            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
    
            videoStream.on('error', (error) => {
                console.error('Stream error:', error);
                res.status(500).send('Error streaming video');
            });

        } catch (err) {
            console.error('Error processing video:', err);
            res.status(500).send('Server error');
        }
    } else if(req.query.method === 'get-work-image'){
        try {
            const filePath = path.join(process.cwd(), 'uploads', 'works', req.query.work, req.query.image);
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            const fileContent = await fsPromises.readFile(filePath);
            let processedImage;
    
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .png({ compressionLevel: 8 })
                    .toBuffer();
            } else {
                processedImage = fileContent;
            }
    
            res.setHeader('Content-Type', mimeType);
            res.send(processedImage);
    
        } catch (err) {
            console.error('Error processing image:', err);
            res.status(404).send('File not found');
        }
    } else if(req.query.method === 'get-video-review') {
        try {
            const videoPath = path.join(process.cwd(), 'uploads', 'reviews', req.query.review, req.query.video);
            const mimeType = mime.lookup(videoPath);
    
            if (!mimeType || !mimeType.startsWith('video/')) {
                return res.status(400).send('Unsupported file type');
            }
    
            // Use fs.existsSync instead of fs/promises
            if (!fs.existsSync(videoPath)) {
                return res.status(404).send('Video not found');
            }
    
            const range = req.headers.range;
            if (!range) {
                return res.status(416).send('Range header is required');
            }
    
            const videoSize = fs.statSync(videoPath).size; // Use fs.statSync here
    
            const CHUNK_SIZE = 10 ** 6; // 1MB per chunk
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE - 1, videoSize - 1);
    
            const contentLength = end - start + 1;
            const headers = {
                'Content-Range': `bytes ${start}-${end}/${videoSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': contentLength,
                'Content-Type': mimeType,
            };
            res.writeHead(206, headers);
    
            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
    
            videoStream.on('error', (error) => {
                console.error('Stream error:', error);
                res.status(500).send('Error streaming video');
            });

        } catch (err) {
            console.error('Error processing video:', err);
            res.status(500).send('Server error');
        }
    } else if(req.query.method === 'get-review-image'){
        try {
            const filePath = path.join(process.cwd(), 'uploads', 'reviews', req.query.review, req.query.image);
            const mimeType = mime.lookup(filePath);
    
            if (!mimeType) {
                return res.status(400).send('Unsupported file type');
            }
    
            const fileContent = await fsPromises.readFile(filePath);
            let processedImage;
    
            if (mimeType.startsWith('image/jpeg')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .jpeg({ quality: 80 })
                    .toBuffer();
            } else if (mimeType.startsWith('image/png')) {
                processedImage = await sharp(fileContent)
                    .withMetadata()
                    .resize({ width: 800 })
                    .png({ compressionLevel: 8 })
                    .toBuffer();
            } else {
                processedImage = fileContent;
            }
    
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
