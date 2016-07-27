var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var request = require('request');
var Quandl = require("quandl");

var async = require('async');

var Stock = require('./models/Stock');

//var ejs = require('ejs');
//var engine = require('ejs-mate');

var app = express();

app.use('/js', express.static( __dirname + '/public/js' ))
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true}));

app.listen(3000, function(err){
   if(err) throw err;
    console.log('Server has started runnig at port 3000');
});

var apiKey = 'ydGLJzmoZ_hmpAvsSBnx';

var stocksInPortfolio = ['YHOO','GOOG'];

var stock = {
    symbol:String,
    result:[]
};

var dataSet = [];

var BASE_URL = 'https://www.quandl.com/api/v3/datasets/WIKI/';


var quandl = new Quandl({
    auth_token: apiKey,
    api_version: 3
    //proxy: "http://myproxy:3128"
});

app.get('/queryall',function(req,res){

    var connectors = [];
    dataSet = [];

    var date = new Date();
    var todayDate = (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
    var startDate = '2016-06-14';
    var endDate = todayDate;

    stocksInPortfolio.forEach(function(symbol){
        console.log(symbol);

        /*
        var url = 'https://www.quandl.com/api/v3/datasets/WIKI/'
            + symbol
            + '/data.json?api_key=' + apiKey;

        url += '&start_date=' + startDate + '&end_date=' + endDate;

        //url = 'http://www.' +symbol+ '.com';
        console.log(url);
        */
        connectors.push(function (symbol,startDate,endDate){
            var dataJson = '' ;
           /*
            request(url, function (err, data) {
                if(err) return err;
                dataJson = data.body;
                var symbol = dataJson.dataset.dataset_code;
                var result = dataJson.dataset.data;

                //stock.symbol = symbol;
                //stock.result = result;
                console.log(result);
                dataSet.push(result);
            });
            */
            quandl.dataset({
                source: "WIKI",
                table: symbol
            }, {
                order: "asc",
                exclude_column_names: true,
                start_date: startDate,
                end_date: endDate,
                column_index: 4
            }, function(err, response){
                if(err)
                    throw err;
                dataSet.push(response);
            });

        });
    });
    sequenty.run(connectors);
    console.log(dataSet);
});

app.get('/query/:sym',function(req,res){

    var date = new Date();
    var todayDate = (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
    var startDate = '2016-06-14';
    var endDate = todayDate;

    //var symbol = req.params.sym;
/*
    var url = BASE_URL
        + symbol
        + '/data.json?api_key=' + apiKey;

    url += '&start_date=' + startDate + '&end_date=' + endDate;

    request(url, function (err, data) {

        var dataJson = JSON.parse(data.body);
        /*
        var symbol = dataJson.dataset_data.dataset_code;

        var result = dataJson.dataset_data.data;

        stock.symbol = symbol;
        stock.result = result;

        dataSet.push(stock);
        res.json(dataSet);
    });
 */
    quandl.dataset({
        source: "WIKI",
        table: symbol
    }, {
        order: "asc",
        exclude_column_names: true,
        start_date: startDate,
        end_date: endDate,
        column_index: 4
    }, function(err, response){
        if(err)
            throw err;
        console.log(response);
        res.json(response);
    });

});

app.post('/querydaterange',function(req,res){

    var startDate = req.body.startDate;
    var endDate = req.body.endDate;

    var symbol = req.body.symbol;

    var url = BASE_URL
        + symbol
        + '/data.json?api_key=' + apiKey;

    url += '&start_date=' + startDate + '&end_date=' + endDate;

    request(url, function (err, data) {

        var dataJson = JSON.parse(data.body);
        /*
         var symbol = dataJson.dataset_data.dataset_code;
         */
        var result = dataJson.dataset_data.data;

        stock.symbol = symbol;
        stock.result = result;

        dataSet.push(stock);
        res.json(JSON.parse(dataSet));
    });

});

app.get('/querytest',function(req,res){
    console.log('into the funciton');
    var date = new Date();
    var todayDate = (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
    var startDate = '2016-06-15';
    var endDate = todayDate;

    var i = 0;
    var callAgain = function (){

        var symbol = stocksInPortfolio[i];

        var url = BASE_URL
            + symbol
            + '/data.json?api_key=' + apiKey;

        url += '&start_date=' + startDate + '&end_date=' + endDate;

        /*
        request(url, function (err, data) {

            console.log('called : ' + data + err );

            var dataJson = JSON.parse(data.body);
            var result = dataJson.dataset_data.data;
            dataSet.push(result);

            i++;

            if( i === stocksInPortfolio.length){
                return res.json(dataSet);
            }else{
                callAgain();
            }

        //end of request
        });
        */
        console.log(symbol);
        quandl.dataset({
            source: "WIKI",
            table: symbol
        }, {
            order: "asc",
            exclude_column_names: true,
            start_date: startDate,
            end_date: endDate,
            column_index: 4
        }, function(err, response){
            if(err) throw err;
            response.replace('\\','');
            var stk = stock.prototype;
            var dataJson = JSON.parse(response);

            var symbol = dataJson.dataset.dataset_code;

            var result = dataJson.dataset.data;

            stk.symbol = symbol;
            stk.result = result;

            dataSet.push(stk);

            i++;

            if( i === stocksInPortfolio.length){
                return res.json(dataSet);
            }else{
                callAgain();
            }

        //end of quandl call back
        });
    //end of var callAgain
    };

   callAgain();
//end of app.get
});

app.get('/querytest2',function(req,res){

    var date = new Date();
    var todayDate = (date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate());
    var startDate = '2016-06-24';
    var endDate = todayDate;

    console.log('---------------------------------------------\n');
    console.log(dataSet);
    console.log('---------------------------------------------\n');

    var functions = [];
    for(var i=0; i<3;i++){
        functions.push(
          function(i,callback){
            return function(callback){
            console.log(i);
                callback (null, i);
            }
          }
        );
    }

    async.waterfall([

        functions

    //end of async.waterfall
    ]);

    res.json('done');

//end of app.get
});

app.get('/querytest3',function(req,res){

 /*   async.waterfall([

        function(callback){
            queryQuandl('YHOO');
            callback(null);
        },
        function(callback){
            queryQuandl('GOOG');
            callback(null);
        },
        function (callback) {
            res.json(dataSet);
        }

    ]);*/
    async.each(
        stocksInPortfolio
        ,/*setTimeout(function (){*/

        function queryQuandl(ticker,callback){
            var sym = ticker,
                startDate = '2016-06-24',
                endDate =  '2016-06-25';

            quandl.dataset({
                source: "WIKI",
                table: sym
            }, {
                order: "asc",
                exclude_column_names: true,
                start_date: startDate,
                end_date: endDate,
                column_index: 4
            }, function (err, response) {
                if (err) throw err;
                response.replace('\\', '');
                var stk = new Stock();
                var dataJson = JSON.parse(response);

                //console.log('Response --> ' + response);

                var symbol = dataJson.dataset.dataset_code;

                var result = dataJson.dataset.data;

                stk.symbol = symbol;
                stk.result = result;
                //console.log('In the Callback');
                dataSet.push(stk);
                console.log(dataSet);

                callback(null);

                //end of quandl call back
            });
        }
        /*},3000)*/
        ,function (err){
            console.log('--------------done---------------\n');
            console.log(dataSet);
        }

    );
    setTimeout(function(){
        res.json(dataSet);
    },3000);
});

//function queryQuandl(sym, startDate, endDate){
function queryQuandl(ticker,callback){
    var sym = ticker,
        startDate = '2016-06-24',
        endDate =  '2016-06-25';

    quandl.dataset({
        source: "WIKI",
        table: sym
    }, {
        order: "asc",
        exclude_column_names: true,
        start_date: startDate,
        end_date: endDate,
        column_index: 4
    }, function (err, response) {
        if (err) throw err;
        response.replace('\\', '');
        var stk = new Stock();
        var dataJson = JSON.parse(response);

        //console.log('Response --> ' + response);

        var symbol = dataJson.dataset.dataset_code;

        var result = dataJson.dataset.data;

        stk.symbol = symbol;
        stk.result = result;
        //console.log('In the Callback');
        dataSet.push(stk);
        console.log(dataSet);

        callback(null);

        //end of quandl call back
    });
}