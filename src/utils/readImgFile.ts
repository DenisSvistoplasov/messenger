export function readImgFile(imgFile: File | undefined) {
  return new Promise<string>((resolve, reject) => {
    if (imgFile) {
      const reader = new FileReader();
      reader.readAsDataURL(imgFile);

      reader.onloadend = () => {
        const base64Data = reader.result?.toString();
        if (base64Data) {
          resolve(base64Data);
        }
        else {
          reject('Cannot read the file: ' + imgFile);
        }
      };
    }
  });
}