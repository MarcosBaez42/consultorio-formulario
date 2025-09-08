import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

app.use('/uploads', express.static(uploadsDir));

app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const filename = Date.now() + '-' + req.file.originalname.replace(/\s+/g, '_');
        const filepath = path.join(uploadsDir, filename);

        await sharp(req.file.buffer)
            .resize({ width: 800, withoutEnlargement: true })
            .jpeg({ quality: 80 })
            .toFile(filepath);

        const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${filename}`;
        res.json({ path: imageUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to upload image' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});