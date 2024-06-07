import imageCompression from 'browser-image-compression';

export default async function imageBase64(img: any): Promise<string | ArrayBuffer> {
    if (img === '') {
        return img;
    }
    const imageFile = img;
    const options = {
      maxSizeMB: 0.1, // (max file size in MB)
      maxWidthOrHeight: 1920, // (max width or height in pixel)
      useWebWorker: true,
    };
  
    try {
      const compressedFile = await imageCompression(imageFile, options);
      const reader = new FileReader();
      reader.readAsDataURL(compressedFile);
      return new Promise<string | ArrayBuffer>((resolve, reject) => {
        reader.onloadend = function() {
          const base64data = reader.result;
          if (base64data !== null) {
            resolve(base64data);
          } else {
            reject(new Error('Failed to read the file as base64.'));
          }
        };
        reader.onerror = reject;
      });
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
}