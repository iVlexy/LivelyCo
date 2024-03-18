import { Router } from 'express';
import { driveApi } from '../drive/drive';
import { getGoogleDriveFolderId, ProjectFolder } from '../project-folders.enum';

export const googleImagesRouter = Router();

googleImagesRouter.get('/photos/:folderId', async (req, res) => {
    const folderId: ProjectFolder = +req.params.folderId;

    let result = await driveApi.files.list({
        q: `'${getGoogleDriveFolderId(folderId)}' in parents`,
        fields: 'files(id)'
    });
    res.send(result.data.files.map(file => file.id))
});
