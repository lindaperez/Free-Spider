if (!phantom.casperLoaded) {
    console.log('This script must be invoked using the casperjs executable');
    phantom.exit(1);
}
var casper = require('casper').create({
    clientScripts: ["jquery-3.1.1.min.js"],
    verbose: true
    //  logLevel: "debug"
});
var data = [];
var cUrl;
function getData(cUrl) {
    var container = document.querySelectorAll('div.products-container');
    return Array.prototype.map.call(container, function (elem) {
        var obj = [];
        var cat_title = 'Category Title: ' + elem.querySelector('h2.title').textContent + '\n';
        var products = elem.querySelectorAll('a.products-i');
        var out = Array.prototype.map.call(products, function (product) {
            var items = [];
            var url = product.getAttribute('href');
            var cats = url.split('/');

            items[0] = '\n\n Product-link: ' + url + '\n';

            if (typeof product.childNodes[0] !== 'undefined') {
                items[1] = 'Products-price:' + product.childNodes[0].textContent + '\n';
            }
            if (typeof product.childNodes[1] !== 'undefined') {
                items[2] = 'Products-name:' + product.childNodes[1].textContent + '\n';
            }
            if (typeof product.childNodes[2] !== 'undefined') {
                items[3] = 'Products-created:' + product.childNodes[2].textContent + '\n';
            }
            if (typeof cats[1] !== 'undefined') {
                items[4] = 'Main Category: ' + cats[1] + '\n';
            }
            if (typeof cats[2] !== 'undefined') {
                items[5] = 'Category: ' + cats[2] + '\n';
            }
            if (typeof cats[3] !== 'undefined') {
                items[6] = 'SubCategory: ' + cats[3] + '\n';
            }

            return items;
        });

        out.unshift(cat_title);
        return out;
    });
}



casper.start('http://ru.tap.az', function () {
    cUrl = this.getCurrentUrl();
    this.waitForSelector('div#content');


});
casper.run(function () {

    data = this.evaluate(getData, cUrl);

    for (i = 0; i < data.length; i++) {
        this.echo(i + 1 + '.------------------------------------------------');
        this.echo('' + data[i]);
    }
    casper.exit();
});