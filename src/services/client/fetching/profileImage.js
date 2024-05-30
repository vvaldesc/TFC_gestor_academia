export default async function fetchProfilePhotoSrc() {
    const response = await fetch('https://jsonplaceholder.typicode.com/photos/1');
    const data = await response.json();
    console.log(data.thumbnailUrl);
    return 'https://www.gemoo-resource.com/tools/img/image_urlgenerator_img3.png';
}