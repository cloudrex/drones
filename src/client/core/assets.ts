export default abstract class Assets {
    public static async loadImage(path: string, extension: string = ".png"): Promise<HTMLImageElement> {
        const image: HTMLImageElement = new Image();

        image.src = `/assets/${path}${extension}`;

        return new Promise<HTMLImageElement>((resolve) => {
            image.onload = () => resolve(image);
        });
    }
}