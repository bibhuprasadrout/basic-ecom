// download assets like a bunch of images if you have the cdn links
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useEffect } from "react";
const productsImages = [
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/1.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/2.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/3.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/1.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/2.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-v9/3.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/1.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/2.webp",
  "https://cdn.dummyjson.com/product-images/smartphones/vivo-x21/3.webp",
  "https://cdn.dummyjson.com/product-images/sports-accessories/football/1.webp",
  "https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/1.webp",
  "https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/1.webp",
  "https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/1.webp",
  "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/1.webp",
  "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/2.webp",
  "https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/3.webp",
  "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/1.webp",
  "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/2.webp",
  "https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/3.webp",
  "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/1.webp",
  "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/2.webp",
  "https://cdn.dummyjson.com/product-images/womens-jewellery/tropical-earring/3.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/1.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/2.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/3.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/4.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/1.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/2.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/3.webp",
  "https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/4.webp",
  "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/1.webp",
  "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/2.webp",
  "https://cdn.dummyjson.com/product-images/womens-watches/rolex-cellini-moonphase/3.webp",
];

async function downloadImages(productsImages) {
  const zip = new JSZip();
  for (const image of productsImages) {
    try {
      const res = await fetch(image);
      const blob = await res.blob();
      const filename = image.slice(41);
      zip.file(filename, blob);
    } catch (err) {
      console.error(err);
    }
  }
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, "images.zip");
}

const DownloadMultipleImagesWithCDN = () => {
  useEffect(() => {
    downloadImages(productsImages);
    console.log(productsImages);
  }, []);
  return <div>DownloadMultipleImagesWithCDN</div>;
};

export default DownloadMultipleImagesWithCDN;
