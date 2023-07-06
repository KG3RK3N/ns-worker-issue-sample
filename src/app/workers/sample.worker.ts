require("@nativescript/core/globals");
import { Utils } from "@nativescript/core";

class Foo {}

self.onmessage = function (message) {
  const src = message.data.src;
  const mode = message.data.mode || "noop";
  const options = message.data.options;

  const result = processImage(src, mode, options);

  if (result) {
    // send the result back to the main thread
    self.postMessage({
      success: true,
      src: result,
    });

    return;
  }

  // no result, send back an empty object for example
  self.postMessage({});
};

// example heavy function to process an image
function processImage(src, mode, options) {
  console.log("Process Image brr dzzz grr", options);
  console.log("Foo", Foo, new Foo());

  // this stuff added
  const applicationContext = Utils.ad.getApplicationContext();
  console.log("has application context:", !!applicationContext);

  // image processing logic
  // save image, retrieve location
  // return source to processed image
  return src + "_processed";
}
