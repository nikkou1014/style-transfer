const tf = require('@tensorflow/tfjs-node');
var Jimp = require('jimp');

let model = null;

async function load_model() {
    model = await tf.loadGraphModel(tf.io.fileSystem('./saved_model_style_js/model.json'));
}

load_model();

let tensor2base64 = async (tensor, res) => {
    const [height, width, channels] = tensor.shape;
    const arr = tensor.dataSync();

    var image = new Jimp(width, height, function (err, image) {
        let buffer = image.bitmap.data;

        for (let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const offset = y * width + x; // RGBA = 4 bytes

                buffer[offset * 4] = arr[offset * 3];    // R
                buffer[offset * 4 + 1] = arr[offset * 3 + 1];    // G
                buffer[offset * 4 + 2] = arr[offset * 3 + 1];;    // B
                buffer[offset * 4 + 3] = 255  // Alpha
            }
        }

        image.getBase64(Jimp.MIME_PNG, function (err, rst) {
            // console.log(rst);
            res.send(rst);
        });
    });
};

function style_img(file, res, next) {
    const input = tf.node.decodeImage(file.buffer, 3) //.toFloat().div(tf.scalar(255));
    // console.log(input.shape, input.dataSync());

    //const styled_img = model.predict(input.expandDims()).mul(tf.scalar(255)).toInt();

    const styled_img = tensor2base64(input, res);
}

exports.style_img = style_img;