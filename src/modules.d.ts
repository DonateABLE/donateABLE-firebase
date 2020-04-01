declare module "*.scss" {
    const styles: { [className: string]: string }
    export default styles;
}
declare module "*.svg" {
    const path: string
    export default path;
}