export enum ProjectFolder {
    GatePhotos = 1,
    GradingAndGravelPhotos,
    BarnPhotos,
    RetainingWallPhotos,
    ResidentialFencePhotos,
    AgricultureFencePhotos,
}

export enum ProjectFolderDriveId {
    GatePhotos = '1k5vFkZvd5FtKj1JEjjk5B3_-6TRnnZDV',
    GradingAndGravelPhotos = '18G715MLGZtk75leJLUkQ8Vy2-gbtgZq0',
    BarnPhotos = '1OR5n7aawS_pcgObDu7dW-hGMO1Vdb5uf',
    RetainingWallPhotos = '1uNdp9Fvbgzla0rCg_bK3f1angzjJ5tUQ',
    ResidentialFencePhotos = '1_bWdsFYRHWTBtOT1BVePwm0QRhr-jcqH',
    AgricultureFencePhotos = '1jGxjUhtJiGH3wgabdeQ_CH7xMN4uEt1L',
}

export function getGoogleDriveFolderId(folder: ProjectFolder): string {
    switch (folder) {
        case ProjectFolder.GatePhotos:
            return ProjectFolderDriveId.GatePhotos;

        case ProjectFolder.GradingAndGravelPhotos:
            return ProjectFolderDriveId.GradingAndGravelPhotos;

        case ProjectFolder.BarnPhotos:
            return ProjectFolderDriveId.BarnPhotos;

        case ProjectFolder.RetainingWallPhotos:
            return ProjectFolderDriveId.RetainingWallPhotos;

        case ProjectFolder.ResidentialFencePhotos:
            return ProjectFolderDriveId.ResidentialFencePhotos;

        case ProjectFolder.AgricultureFencePhotos:
            return ProjectFolderDriveId.AgricultureFencePhotos;
    }
}
