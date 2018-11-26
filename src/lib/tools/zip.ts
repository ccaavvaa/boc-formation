import * as archiver from 'archiver';
import * as fs from 'fs';
import { promisify } from 'util';

const exists = promisify(fs.exists);
const unlink = promisify(fs.unlink);
export async function zipDirectory(directory: string, outputFileName: string) {
    if (await exists(outputFileName)) {
        throw new Error(`File exists: ${outputFileName}`);
    }
    if (! await exists(directory)) {
        throw new Error(`Directory not found ${directory}`);
    }
    const output = fs.createWriteStream(outputFileName);
    const archive = archiver('zip', {
        zlib: {
            level: 9,
        },
    });
    return new Promise<void>((resolve, reject) => {
        let onCloseOutput = resolve;
        let error: any;
        const deleteOutput = async () => {
            await (unlink(outputFileName));
            reject(error);
        };

        const warningOrError = (err: any) => {
            if (!error) {
                error = err;
                onCloseOutput = deleteOutput;
                archive.abort();
                output.close();
            }
        };
        // listen for all archive data to be written
        // 'close' event is fired only when a file descriptor is involved
        output.on('close', () => {
            onCloseOutput();
        });

        // good practice to catch warnings (ie stat failures and other non-blocking errors)
        archive.on('warning', warningOrError);

        // good practice to catch this error explicitly
        archive.on('error', warningOrError);

        // pipe archive data to the file
        archive.pipe(output);

        archive.directory(directory, false);
        archive.finalize();
    });
}
