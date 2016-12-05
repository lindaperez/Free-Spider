// googletesting.js
casper.test.begin('ttp://ru.tap.az must to have serveral classes', function suite(test) {
    casper.start("http://ru.tap.az", function() {
        test.assertExists('div#content', "#container  is found");
        test.assertExists('div#content div.home-products', ".home-products is found");
        test.assertExists('div#content div.products-container', ".products-container is found");
        test.assertExists('div#content div.products-container h2.title', ".title  is found");
        test.assertExists('div#content div.products-container a.products-i', ".products-i is found");
        test.assertExists('div#content div.products-container.products-container_vip', ".products-vip is found");
        
      
    });

    casper.then(function() {
        
        test.assertEval(function() {
            return  __utils__.findAll("div#content div.home-products").length>=2;
        }, "at least 2 types of categories ");
        test.assertEval(function() {
            return __utils__.findAll("div#content div.home-products.home-products-vip").length >= 1;
        }, "at least 1 VIP category");
         test.assertEval(function() {
            return  __utils__.findAll("div#content div.home-products.home-products-vip a[class='products-i']").length>=0;
        }, "at least 0 without VIP class ");
          test.assertEval(function() {
            return  __utils__.findAll("div#content div.home-products.home-products-vip a[class='products-i vipped']").length>=8;
        }, "at least 8 product VIP vipped");
               test.assertEval(function() {
            return  __utils__.findAll("div#content div.home-products.home-products-vip a[class='products-i featured']").length>=0;
        }, "at least 0 product VIP featured");
        //// non VIP
         test.assertEval(function() {
            return  __utils__.findAll("div#content div[class='home-products'] a[class='products-i']").length>=13;
        }, "at least 0 without NoN VIP class ");
          test.assertEval(function() {
            return  __utils__.findAll("div#content div[class='home-products'] a[class='products-i vipped']").length>=46;
        }, "at least 8 product NoN VIP vipped");
               test.assertEval(function() {
            return  __utils__.findAll("div#content div[class='home-products'] a[class='products-i featured']").length>=2;
        }, "at least 0 product NoN VIP featured"); 
        
    });

    casper.run(function() {
        test.done();
    });
});