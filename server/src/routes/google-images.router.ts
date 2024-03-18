import { Router } from 'express';
import { Blob } from 'node:buffer';
import { driveApi } from '../drive/drive';
import { getGoogleDriveFolderId, ProjectFolder } from '../project-folders.enum';

export const googleImagesRouter = Router();

googleImagesRouter.get('/photos/folders/:folderId', async (req, res) => {
    const folderId: ProjectFolder = +req.params.folderId;

    let result = await driveApi.files.list({
        q: `'${getGoogleDriveFolderId(folderId)}' in parents`,
        fields: 'files(id)'
    });

    const ids = result.data.files.map(file => file.id);
    // const thumbnailLinks = result.data.files.map(file => file.thumbnailLink);
    //
    // const thumbnails = [];
    //
    // for (const thumbnailLink of thumbnailLinks) {
    //     const response = await fetch(thumbnailLink);
    //
    //     thumbnails.push(response.body);
    // }

    res.send(ids);
});

googleImagesRouter.get('/photos/:imageId', async (req, res) => {
    const imageId: string = req.params.imageId;

    let image = await driveApi.files.get({
        fileId: imageId,
        alt: 'media',
    });

    const blob = image.data as unknown as Blob;
    const data = await blob.arrayBuffer();

    res.type(blob.type)

    res.setHeader('alt-svc', image.headers['alt-svc']);
    res.setHeader('content-type', image.headers['content-type']);
    res.send(Buffer.from(data));
});
