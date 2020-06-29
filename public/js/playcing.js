let threeProductsWidth = 960;
let twoProductsWidth = 640;
let oneProductWidth = 320;

window.onresize = ()=> {
    let windowWidth = window.innerWidth || document.documentElement.clientWidth
        || document.body.clientWidth;

    let productsConteiner = document.getElementsByClassName('product_conteiner')[0];
    //alert(windowWidth);
    if (windowWidth >= threeProductsWidth) {
        productsConteiner.style.width = threeProductsWidth + "px";
    } else if (windowWidth < threeProductsWidth && windowWidth >= twoProductsWidth) {
        productsConteiner.style.width = twoProductsWidth + "px";
    } else {
        productsConteiner.style.width = oneProductWidth + "px";
    }
}