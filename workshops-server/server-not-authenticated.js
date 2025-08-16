// Reference: https://github.com/typicode/json-server#module
// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const path = require('path');
const axios = require('axios');
const multer = require('multer');

const port = process.env.PORT || 8001;
const baseUrl = `https://workshops-server.onrender.com`;

server.use(middlewares);

server.use(jsonServer.bodyParser);

// Add createdDate on POST requests
server.use((req, res, next) => {
    if (req.method === 'POST') {
        var today = new Date();
        req.body.createdDate = today.toString().substr(4, 6) + ',' + today.toString().substr(10, 5);
    }
    // Continue to JSON Server router
    next();
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        let uploadFolder = '';

        if (file.fieldname === 'profile' || file.fieldname === 'speakersbio' || file.fieldname === 'workshopImage') {
            if (file.fieldname === 'workshopImage') {
                uploadFolder = '/uploads/workshops';
                console.log(1);
            } else {
                uploadFolder = '/uploads/' + file.fieldname;
                console.log(2);
            }

            req.uploadFolder = uploadFolder;

            cb(null, path.join(__dirname, 'public', uploadFolder));
        } else {
            cb(new Error('Invalid upload resource'));
        }
    },
    filename: function (req, file, cb) {
        req.uploads = req.uploads || [];

        // req.uploads.push({
        //     _id: req.payload.sub
        // });

        // cb( null, req.payload.sub );

        req.uploadFilename = file.originalname;
        cb(null, file.originalname);
    }
});

function fileFilter(req, file, cb) {
    const fieldname = file.fieldname, extension = path.extname(file.originalname);

    const allowedExtensions = ['.JPG', '.JPEG', '.PNG', '.TIFF'];
    if (fieldname === 'profile') {
        return cb(null, allowedExtensions.indexOf(extension.toUpperCase()) !== -1)
    }

    if (fieldname === 'speakersbio') {
        return cb(null, extension.toUpperCase() === '.PDF');
    }

    if (fieldname === 'workshopImage') {
        return cb(null, allowedExtensions.indexOf(extension.toUpperCase()) !== -1)
    }
}

// const upload = multer({ dest: 'uploads/' })
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const uploadHandler = upload.fields(
    [
        { name: 'profile', maxCount: 1 },
        { name: 'speakersbio', maxCount: 4 },
        { name: 'workshopImage', maxCount: 1 }
    ]
);

server.put('/sessions/:id/upvote', async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get(`${baseUrl}/sessions/${id}`);
        const upvoteCount = response.data && response.data.upvoteCount;

        if (upvoteCount === undefined) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount + 1 },
            { 'Content-Type': 'application/json' }
        );

        if (response.data && response.data.upvoteCount) {
            return res.status(200).json(response.data);
        } else {
            throw new Error('Problem updating upvoteCount');
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when processing votes for session with id = ${id}`,
            error: error.message
        });
    }
});

server.put('/sessions/:id/downvote', async (req, res, next) => {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Session id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get(`${baseUrl}/sessions/${id}`);
        const upvoteCount = response.data && response.data.upvoteCount;

        if (upvoteCount === undefined) {
            return res.status(404).json({
                message: `Could not find session with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/sessions/${id}`,
            { upvoteCount: upvoteCount - 1 },
            { 'Content-Type': 'application/json' }
        );

        if (response.data && response.data.upvoteCount) {
            return res.status(200).json(response.data);
        } else {
            throw new Error('Problem updating upvoteCount');
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when processing votes for session with id = ${id}`,
            error: error.message
        });
    }
});

server.post('/workshops/:id/image', uploadHandler, async function (req, res) {
    const id = parseInt(req.params.id);

    if (isNaN(id)) {
        return res.status(401).json({
            message: `Bad request. Workshop id must be a number. Received ${id}.`
        });
    }

    // KNOWN BUG: The GET is processed asynchronously, vote count read and update using PATCH - this can lead to race conditions and update to vote may not happen correctly.
    try {
        let response;
        response = await axios.get(`${baseUrl}/workshops/${id}`);
        const workshopExists = response.data && response.data.id;

        if (!workshopExists) {
            return res.status(404).json({
                message: `Could not find workshop with id = ${id}`
            });
        }

        response = await axios.patch(
            `${baseUrl}/workshops/${id}`,
            { imageUrl: `https://workshop-server.herokuapp.com${req.uploadFolder}/${req.uploadFilename}` },
            { 'Content-Type': 'application/json' }
        );

        if (response.data && response.data.imageUrl) {
            return res.status(204).send();
        } else {
            throw new Error('Problem uploading workshop image');
        }
    } catch (error) {
        return res.status(500).json({
            message: `Internal Server Error. Something went wrong when uploading image for workshop with id = ${id}`,
            error: error.message
        });
    }
});

server.use(router);
server.listen(port, () => {
    console.log(`JSON Server is running on port ${port}`);
});
