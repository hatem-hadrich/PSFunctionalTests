'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio');

describe('Connecting with linkedin in front office', function() {
    common.initMocha.call(this);

    before(function (done) {
        this.selector = globals.selector;
        this.client.call(done);
    });
    process.on('uncaughtException', common.take_screenshot);
    process.on('ReferenceError', common.take_screenshot);
    after(common.after);

    describe('Access to the Front Office', function() {
        it('should open the shop', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('https://' + URL)
                .call(done);

        });
    });

    describe('Check linkedin connection', function() {
        it('should click on linkedin button', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.linkedin.first_linkedin_logo, 90000)
                .click(this.selector.linkedin.first_linkedin_logo)
                .call(done);
        });
    });

    describe('Connection on linkedin site', function() {


        it('should acces to linkedin site', function (done) {
            global.fctname = this.test.title;
            this.client
                .windowHandles().then(function (handles) {
                return this.switchTab(handles.value[handles.value.length - 1]);
            })
                .call(done);
        });

        it('should connecting with linkedin account', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.linkedin.username_input, 90000)
                .setValue(this.selector.linkedin.username_input, 'prestotestslinkedin@gmail.com')
                .setValue(this.selector.linkedin.password_input, 'presto_tests')
                .waitForExist(this.selector.linkedin.allow_button, 90000)
                .click(this.selector.linkedin.allow_button)
                .call(done);
        });

    });

    describe('Access to the Front Office', function() {
        it('should open the shop', function (done) {
            global.fctname = this.test.title;
            this.client
                .windowHandles().then(function (handles) {
                this.close(handles.value[handles.value.length - 1]);
                return this.switchTab(handles.value[0]);
            })
                .call(done);

        });
        it('should check the connection', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(2000)
                .waitForVisible(this.selector.linkedin.user_connected_span, 90000)
                .moveToObject(this.selector.linkedin.user_connected_span)
                .getText(this.selector.linkedin.user_connected_span).then(function (user) {
                should(user).be.equal('Presto Tests');
            })
                .call(done);

        });
    });
    describe('The Purchase of a product', function () {

        describe('Add product to cart', function (done) {
            it('should go to the product details', function (done) {
                global.fctname = this.test.title;
                this.client
                    .url('https://' + URL)
                    .click(this.selector.product.logo_home_pageFO)
                    .waitForExist(this.selector.product.first_product_home_page, 90000)
                    .getText(this.selector.product.first_product_home_page_name).then(function (text) {
                    global.my_name = text[1].split('...')[0];
                })
                    .click(this.selector.product.first_product_home_page)
                    .waitForExist(this.selector.product.product_image, 90000)
                    .getText(this.selector.product.product_name_details).then(function (text) {
                    var my_name_check = text;
                    my_name_check.pop(-1).toLowerCase().should.containEql(my_name.toLowerCase());
                })
                    .getText(this.selector.product.product_price_details).then(function (text) {
                    global.my_price = text;
                })
                    .getValue(this.selector.product.product_quantity_details).then(function (text) {
                    global.my_quantity = text;
                })
                    .click(this.selector.product.add_to_cart)
                    .waitForExist(this.selector.product.layer_cart, 90000)
                    .getText(this.selector.product.layer_cart_name_details).then(function (text) {
                    var my_cart_name_check = text;
                    my_cart_name_check.toLowerCase().should.containEql(my_name.toLowerCase())
                })
                    .getText(this.selector.product.layer_cart_price_details).then(function (text) {
                    var my_cart_price_check = text;
                    should(my_cart_price_check).be.equal(my_price);
                })
                    .getText(this.selector.product.layer_cart_quantity_details).then(function (text) {
                    var my_cart_quantity_check = text.split(': ');
                    should(my_cart_quantity_check[1]).be.equal(my_quantity);
                })
                    .call(done);
            });

            it('should click add to cart button ', function (done) {
                global.fctname = this.test.title;
                this.client
                    .click(this.selector.product.layer_cart_command_button)
                    .call(done);
            });
        });

        describe('Validate the cart', function () {
            it('should validate name of product', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.product.command_button_checkout, 90000)
                    .getText(this.selector.product.command_product_name).then(function (text) {
                    var command_my_name = text;
                    command_my_name.toLowerCase().should.containEql(my_name.toLowerCase());
                })
                    .call(done);
            });

            it('should validate price of product', function (done) {
                global.fctname = this.test.title;
                this.client
                    .getText(this.selector.product.command_product_price).then(function (text) {
                    var command_price_check = text;
                    should(command_price_check).be.equal(my_price);
                })
                    .call(done);
            });
            it('should click checkout button', function (done) {
                global.fctname = this.test.title;
                this.client
                    .click(this.selector.product.command_button_checkout)
                    .call(done);
            });

            it('should select the address step-2', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.product.checkout_step2_continue_button, 90000)
                    .click(this.selector.product.checkout_step2_continue_button)
                    .waitForExist(this.selector.product.checkout_step3_continue_button, 90000)
                    .click(this.selector.product.checkout_step3_continue_button)
                    .call(done);
            });

            it('should select the payment step-3', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.product.checkout_step4_payment, 90000)
                    .getText(this.selector.product.checkout_total).then(function (text) {
                    var checkout_total = text;
                    should(checkout_total).be.equal(my_price);
                })
                    .click(this.selector.product.checkout_step4_payment)
                    .call(done);
            });

            it('should select the shipping method step-4', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.product.checkout_step4_cgv, 90000)
                    .click(this.selector.product.checkout_step4_cgv)
                    .waitForExist(this.selector.product.checkout_step4_order, 90000)
                    .click(this.selector.product.checkout_step4_order)
                    .call(done);
            });

            it('should confirm the order', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.product.order_confirmation_name, 90000)
                    .getText(this.selector.product.order_confirmation_name).then(function (text) {
                    var command_confirmation_my_name = text;
                    command_confirmation_my_name.toLowerCase().should.containEql(my_name.toLowerCase());
                })
                    .waitForExist(this.selector.product.order_confirmation_price1, 90000)
                    .getText(this.selector.product.order_confirmation_price1).then(function (text) {
                    var order_confirmation_price1 = text;
                    should(order_confirmation_price1).be.equal(my_price);
                })
                    .waitForExist(this.selector.product.order_confirmation_price2, 90000)
                    .getText(this.selector.product.order_confirmation_price2).then(function (text) {
                    var order_confirmation_price2 = text;
                    should(order_confirmation_price2).be.equal(my_price);
                })
                    .waitForExist(this.selector.product.order_confirmation_ref, 90000)
                    .getText(this.selector.product.order_confirmation_ref).then(function (text) {
                    var my_ref = text.split(': ')
                    global.order_reference = my_ref[1];
                })
                    .call(done);
            });

            it('should get the order id', function (done) {
                global.fctname = this.test.title;
                this.client
                    .url().then(function (res) {
                    var current_url = res.value;
                    var temp1 = current_url.split("id_order=");
                    var temp2 = temp1[1].split("&");
                    global.order_id = temp2[0];
                })
                    .call(done);
            });
        });

        describe('Log out in Front Office', function (done) {
            it('should logout successfully in FO', function (done) {
                global.fctname = this.test.title;
                this.client
                    .waitForExist(this.selector.logoutFO, 90000)
                    .click(this.selector.logoutFO)
                    .waitForExist(this.selector.access_loginFO, 90000)
                    .call(done);

            });
        });
    });
});
