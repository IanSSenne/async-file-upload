let isWorking = false;
let uploadQueue = [];
self.onmessage = (evt) => {
    uploadQueue.push(evt.data);
    if (!isWorking) {
        isWorking = true;
        uploadFromQueue();
    }
};
function uploadFromQueue() {
    let item = uploadQueue.shift();
    if (item === undefined) {
        isWorking = false;//we don't have any more work to do right now.
    } else {
        const [name, raw] = item;
        console.log('attempting upload for \'' + name + '\'.');
        fetch('/upload', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/octet-stream',
                'X-File-Name': name
            },
            body: raw
        }).then(() => {
            uploadFromQueue();
        }).catch((err) => {
            console.error('got an error uploading a file from the worker thread.', err);
            uploadFromQueue();
        });
    }
}