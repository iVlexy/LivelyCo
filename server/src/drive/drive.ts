import { drive_v3 as drive } from '@googleapis/drive/build/v3';
import { GoogleAuth } from 'google-auth-library';

const keyFilename = process.env['KEY_FILE']

const auth = new GoogleAuth({
    keyFilename,
    scopes: [ 'https://www.googleapis.com/auth/drive.readonly' ]
});
export const driveApi = new drive.Drive({ auth });
