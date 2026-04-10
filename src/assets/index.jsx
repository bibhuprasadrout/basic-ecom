// Barrel file - A barrel file is a way to re-export multiple modules from a single file, making imports cleaner and more organized.
// export { default as Carousel } from "./common/Carousel"; // This way of importing and exporting in the same line without the need of an import statement and an intermediate variable is called "re-exporting".
// It allows you to directly export a module from another file without having to import it first and then export it again. This is possible because we do not have any use for the Carousel variable in this file, we are just re-exporting it. If we had any use for the Carousel variable in this file, we would have to import it first and then export it.
export { default as leftArrow } from "./common/arrow-left.png";
export { default as rightArrow } from "./common/arrow-right.png";
export { default as downArrow } from "./common/arrow-down.png";
