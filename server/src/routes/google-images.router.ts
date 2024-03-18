import { Router } from 'express';
import { driveApi } from '../drive/drive';
import { getGoogleDriveFolderId, ProjectFolder } from '../project-folders.enum';

export const googleImagesRouter = Router();

googleImagesRouter.get('/photos/:folderId', async (req, res) => {
    const folderId: ProjectFolder = +req.params.folderId;

    let result = await driveApi.files.list({
        q: `'${getGoogleDriveFolderId(folderId)}' in parents`,
        fields: 'files(thumbnailLink)'
    });

    const thumbnailLinks = result.data.files.map(file => file.thumbnailLink);

    const thumbnails = [];

    for (const thumbnailLink of thumbnailLinks) {
        const response = await fetch(thumbnailLink);

        thumbnails.push(await response.blob());
    }

    res.send(thumbnails);
});
