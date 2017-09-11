'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio');

describe('Connecting with yahoo in front office', function() {
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

    describe('Check yahoo connection', function() {
        it('should click on yahoo button', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.yahoo.first_yahoo_logo, 90000)
                .moveToObject(this.selector.yahoo.first_yahoo_url)
                .getAttribute(this.selector.yahoo.first_yahoo_url, 'onclick').then(function (url) {
                globals.yahoo_location = (url.split('window.open(').pop().split(", 'login'").shift()).slice(1, -1);
            })
                .call(done);

        });
    });

    describe('Connection on yahoo site', function() {

        it('should acces to yahoo site', function (done) {
            global.fctname = this.test.title;
            this.client
                .url(yahoo_location)
                .call(done);
        });

        it('should enter the email of yahoo account', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.yahoo.username_input, 90000)
                .setValue(this.selector.yahoo.username_input, 'prestotests@yahoo.com')
                .waitForExist(this.selector.yahoo.next_button, 90000)
                .click(this.selector.yahoo.next_button)
                .call(done);
        });

        it('should enter the password of yahoo account', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.yahoo.password_input, 90000)
                .setValue(this.selector.yahoo.password_input, 'prestashop123')
                .waitForExist(this.selector.yahoo.next_button, 90000)
                .click(this.selector.yahoo.next_button)
                .call(done);
        });

    });

    describe('Access to the Front Office', function() {
        it('should open the shop', function (done) {
            global.fctname = this.test.title;
            this.client
                .url('https://' + URL)
                .call(done);

        });
        it('should check the connection', function (done) {
            global.fctname = this.test.title;
            this.client
                .pause(2000)
                .waitForVisible(this.selector.yahoo.user_connected_span, 90000)
                .moveToObject(this.selector.yahoo.user_connected_span)
                .getText(this.selector.yahoo.user_connected_span).then(function (user) {
                should(user).be.equal('prestotests prestotests');
            })
                .call(done);

        });
    });
});