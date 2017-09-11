'use strict';
var should = require('should');
var common = require('../../common.webdriverio');
var globals = require('../../globals.webdriverio');

describe('Connecting with foursquare in front office', function() {
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

    describe('Check foursquare connection', function() {
        it('should click on foursquare button', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.foursquare.first_foursquare_logo, 90000)
                .moveToObject(this.selector.foursquare.first_foursquare_url)
                .getAttribute(this.selector.foursquare.first_foursquare_url, 'onclick').then(function (url) {
                globals.foursquare_location = (url.split('window.open(').pop().split(", 'login'").shift()).slice(1, -1);
            })
                .call(done);

        });
    });

    describe('Connection on foursquare site', function() {


        it('should acces to foursquare site', function (done) {
            global.fctname = this.test.title;
            this.client
                .url(globals.foursquare_location)
                .call(done);
        });

        it('should connecting with foursquare account', function (done) {
            global.fctname = this.test.title;
            this.client
                .waitForExist(this.selector.foursquare.username_input, 90000)
                .setValue(this.selector.foursquare.username_input, 'prestotests+foursquare@gmail.com')
                .setValue(this.selector.foursquare.password_input, 'presto_tests')
                .waitForExist(this.selector.foursquare.allow_button, 90000)
                .click(this.selector.foursquare.allow_button)
                .pause(2000)
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
                .waitForVisible(this.selector.foursquare.user_connected_span, 90000)
                .moveToObject(this.selector.foursquare.user_connected_span)
                .getText(this.selector.foursquare.user_connected_span).then(function (user) {
                should(user).be.equal('Tests Presto');
            })
                .call(done);

        });
    });
});