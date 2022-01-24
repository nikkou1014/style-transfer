const tf = require('@tensorflow/tfjs-node');
let Jimp = require('jimp');

let model = null;

async function load_model() {
    model = await tf.loadGraphModel(tf.io.fileSystem('./encoder/model.json'));
}

load_model();

let tensor2base64 = async (tensor, callback) => {
    const [height, width, channels] = tensor.shape;
    const arr = tensor.dataSync();

    new Jimp(width, height, function (err, image) {
        let buffer = image.bitmap.data;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const offset = y * width + x; // RGBA = 4 bytes

                buffer[offset * 4] = arr[offset * 3];    // R
                buffer[offset * 4 + 1] = arr[offset * 3 + 1];    // G
                buffer[offset * 4 + 2] = arr[offset * 3 + 2];;    // B
                buffer[offset * 4 + 3] = 255  // Alpha
            }
        }

        image.quality(95).getBase64(Jimp.MIME_JPEG, function (err, rst) {
            callback(err, rst);
        });
    });
};

function style_img(file, res, next) {
    let input = tf.node.decodeImage(file.buffer);

    // limit max size to max_size
    const max_size = 1280;
    let [height, width, channels] = input.shape;
    if (height > max_size) {
        input = input.resizeBilinear([max_size, width * max_size / height]);
    }

    [height, width, channels] = input.shape; // update shape
    if (width > max_size) {
        input = input.resizeBilinear([height * max_size / width, max_size]);
    }

    console.log("start transfer", input.shape);

    const styled_tensor = model.predict(input.toFloat().expandDims()).toInt();

    console.log("finished transfer", styled_tensor.shape);

    tensor2base64(styled_tensor.squeeze(axis = 0), function (err, rst) {
        res.send(rst);

        tf.disposeVariables();
    });
}

exports.style_img = style_img;
