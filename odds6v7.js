var allGames = [];
        var finished = [];
       
        
        function doAjaxRequest(method, url, data){
            var xhr = new XMLHttpRequest();
            xhr.open(method, url, true);

            // Register the event handler
            xhr.onload = function(){
                if(xhr.status === 200){
                    data = JSON.parse(this.response);
                    var counter =0;
                    data.data.forEach(function(obj){
                        counter += 1;
                        var totalOdds = [];
                        obj.sites.forEach(function(obj2){
                            var sumOdds = obj2.odds.h2h.reduce(function(a, b){
                                return a + b;
                            }, 0);

                            obj2.odds.totalOdds = sumOdds;

                            totalOdds.push(sumOdds);
                        });
                        var index = totalOdds.indexOf(Math.max(...totalOdds));
                        

                        obj.sites.sort(function(a,b){
                            return b.odds.totalOdds-a.odds.totalOdds;
                        });

                        allGames.push(obj);
                        console.log(allGames);
                        if(counter == data.data.length){
                            finished.push(1);
                            checkAllFinished();
                            console.log("FINISHED");
                            console.log(finished);
                        }
                    });


                    allGames.sort(function(a, b) {
                    return new Date(a.commence_time) - new Date(b.commence_time);
                    });
                } else {
                }
            }; 
            
            xhr.onreadystatechange = function(){
            	if(xhr.readyState == 4){
              	
              }
            };

            data = data || {};

            xhr.send(data);
        }

        function updateDom (){
            doAjaxRequest('get', 'https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=eu&mkt=h2h&dateFormat=iso&apiKey='+apiKeyGood);
            doAjaxRequest('get', 'https://api.the-odds-api.com/v3/odds/?sport=soccer_france_ligue_one&region=eu&mkt=h2h&dateFormat=iso&apiKey='+apiKeyGood);
            doAjaxRequest('get', 'https://api.the-odds-api.com/v3/odds/?sport=soccer_germany_bundesliga&region=eu&mkt=h2h&dateFormat=iso&apiKey='+apiKeyGood);
            doAjaxRequest('get', 'https://api.the-odds-api.com/v3/odds/?sport=soccer_spain_la_liga&region=eu&mkt=h2h&dateFormat=iso&apiKey='+apiKeyGood);
            doAjaxRequest('get', 'https://api.the-odds-api.com/v3/odds/?sport=soccer_uefa_champs_league&region=eu&mkt=h2h&dateFormat=iso&apiKey='+apiKeyGood);
            doAjaxRequest('get', 'https://api.the-odds-api.com/v3/odds/?sport=soccer_uefa_europa_league&region=eu&mkt=h2h&dateFormat=iso&apiKey='+apiKeyGood);
           
        }
        
       function checkAllFinished(){
          var totalSumFinished = finished.reduce((a, b) => a + b, 0);
          var counter = 0;

          if(totalSumFinished == 6){
             allGames.forEach(function(obj){
                counter += 1;

                var club1 = obj.teams[0];
                var club2 = obj.teams[1];
                var date = new Date(obj.commence_time);

                year = date.getFullYear();
                month = date.getMonth()+1;
                dt = date.getDate();

                hours = date.getHours();
                minutes = date.getMinutes();

                if (dt < 10) {
                dt = '0' + dt;
                }
                if (month < 10) {
                month = '0' + month;
                }
                if(minutes < 10){
                minutes = '0' + minutes;
                }

                time = dt+'-' + month + '-'+year + " om " + hours + ":" + minutes;
                var bestBookmaker = obj.sites[0].site_key;
                var bestBookmaker2 = (typeof obj.sites[1] === 'undefined') ? "" : obj.sites[1].site_key;
                var bestBookmaker3 = (typeof obj.sites[2] === 'undefined') ? "" : obj.sites[2].site_key;
                var bestOdds = obj.sites[0].odds.h2h;

               $("#weddenschappen").append('<li class="wedstrijd-list-item opened w-clearfix"><div class="div-block-10"><a href="' 
                +
                domainName(bestBookmaker)
                +
                '" class="wedstrijden-link w-inline-block"><div class="top-casino-logo"><img src="'
                +
                bookmakerImage(bestBookmaker)
                +
                '" loading="lazy" alt="" class="top-casino-logo-image"></div><div class="wedstrijden-content"><h4 class="heading">'
                +
                club1
                +
                '<br>'
                +
                club2
                +
                '</h4><div class="caption">'
                +
                time
                +
                '</div></div></a><div class="wedstrijden-content horizontal"><div class="wedstrijd-column"><div class="caption">1</div><div class="wedstrijd-button"><div class="text-block-10">'
                +
                bestOdds[0]
                +
                '</div></div></div><div class="wedstrijd-column"><div class="caption">X</div><div class="wedstrijd-button"><div class="text-block-10">'
                +
                bestOdds[2]
                +
                '</div></div></div><div class="wedstrijd-column"><div class="caption">2</div><div class="wedstrijd-button"><div class="text-block-10">'
                +
                bestOdds[1]
                +
                '</div></div></div></div><div class="wedstrijden-content horizontal mobile-hidden"><div class="wedstrijd-column"><div class="caption">1</div><div class="wedstrijd-button no-bg"><img src="'
                
                +
                bookmakerImage(bestBookmaker)
                +
                '" loading="lazy" alt="" class="top-casino-logo-image small nm"></div></div><div class="wedstrijd-column"><div class="caption">2</div><div class="wedstrijd-button"><img src="'
                +
                bookmakerImage(bestBookmaker2)
                +
                '" loading="lazy" alt="" class="top-casino-logo-image small nm"></div></div><div class="wedstrijd-column"><div class="caption">3</div><div class="wedstrijd-button"><img src="'
                +
                bookmakerImage(bestBookmaker3)
                +
                '" loading="lazy" alt="" class="top-casino-logo-image small nm"></div></div></div><div data-w-id="a94cb014-6e8c-c0ea-75df-63ed9a593538" class="wedstrijd-star" style="transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg); transform-style: preserve-3d;"></div></div><div style="display: none; height: 0px;" class="wedstrijd-uitklappen"><div class="div-block-11 w-clearfix">'
                    +
                        uitklapWedstrijd(obj)
                    +
                    
                    '</div></div>');
            });

            if(counter == allGames.length){
                pagination();
                Webflow.require('ix2').init();
            }
          }


         
        }


        function uitklapWedstrijd (obj){
            var string = "";
            obj.sites.forEach(function(site){

                string += '<div class="div-block-9">\
                    <a href="'
                    +
                    domainName(site.site_key)
                    +
                    '" class="nostyle w-inline-block"><div class="top-casino-logo small"><img src="'
                    +
                        bookmakerImage(site.site_key)
                        +
                        '" loading="lazy" alt="" class="top-casino-logo-image small"></div></a><a href="'
                        +
                        domainName(site.site_key)
                        +
                        '" class="link-block w-inline-block"><div class="wedstrijden-content horizontal small"><div class="wedstrijd-column"><div class="caption">1</div><div class="wedstrijd-button small"><div class="text-block-10 small">'
                            
                            +
                            site.odds.h2h[0]
                            +
                            '</div></div></div><div class="wedstrijd-column"><div class="caption">X</div><div class="wedstrijd-button"><div class="text-block-10">'
                            +
                            site.odds.h2h[2]
                            +'</div></div></div><div class="wedstrijd-column"><div class="caption">2</div><div class="wedstrijd-button"><div class="text-block-10">'
                            +
                            site.odds.h2h[1]
                            +
                            '</div></div></div></div></a></div>';
            });
            return string;
        }

        function domainName (name) {
            switch (name){
                case 'williamhill':
                    return "https://www.williamhill.com/";
                case 'unibet':
                    return "https://www.unibet.eu/"
                case 'pinnacle':
                    return "https://www.pinnacle.com/";
                case 'mybookieag':
                    return "https://mybookie.ag/";
                case 'matchbook':
                    return "https://www.matchbook.com";
                case 'marathonbet':
                    return "https://www.marathonbet.com";
                case 'intertops':
                    return "https://intertops.eu";
                case 'bookmaker':
                    return "https://www.bookmaker.eu";
                case 'betway':
                    return "https://betway.com";
                case 'betonlineag':
                    return "https://www.betonline.ag";
                case 'betclic':
                    return "https://www.betclic.com";
                case 'sport888':
                    return "https://www.888sport.com/#/home";
                case 'onexbet':
                    return "https://1xbet.com/";
                case 'betfair':
                    return "https://www.betfair.com";
            }
        }
        function bookmakerImage(name){
            switch (name){
                case 'williamhill':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f40243d559d4697d0021_williamhill.png";
                case 'unibet':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f40207dd6e0b06e3229c_unibet.png"
                case 'pinnacle':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f401f319022bd07b3710_pinnacle.png";
                case 'mybookieag':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f400121c524fa29e07e0_mybookie.png";
                case 'matchbook':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f4001dc42e269f39df7e_matchbook.png";
                case 'marathonbet':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f3ffd083d4b08690e350_marathonbet.png";
                case 'intertops':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f3fff6b78380bb306d78_intertops.png";
                case 'bookmaker':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f3fe85aae63987c80d6c_bookmaker.png";
                case 'betway':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f469bb3e00ac2e34da78_betway.png";
                case 'betonlineag':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f3fd43d559416b7d0016_betonlineag.png";
                case 'betclic':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f84450f482cf99e59ce9_betclic.png";
                case 'sport888':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f848eb2abe1a3954a0db_sport888.png";
                case 'onexbet':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f8477db0d3fa5726ae59_onexbet.png";
                case 'betfair':
                    return "https://uploads-ssl.webflow.com/5fc79081fe2899ba138f9765/5fe0f8457dfff831ebea525d_betfair.png";
                

            }

        }



        function apiKey(){
            var apiKeys = ["39d2fa38b5709476f43ae20efecd7c7f", "2355edb526c369ce1830d092b8a7db5a", "33135690d08b87fe347a98136a690699", 
            "7a616e25e4df931f716655cded3b3217", "f4a7176a70518cf3fd44a29e863cf361"];

            apiKeyGood = "";
            var i = 0;

            for(i=0; i<apiKeys.length; i++){
                var xhr9 = new XMLHttpRequest();
                xhr9.open("GET", "https://api.the-odds-api.com/v3/odds/?sport=soccer_epl&region=eu&mkt=h2h&dateFormat=iso&apiKey="+apiKeys[i], true);
                var counter =i;

                // Register the event handler
                xhr9.onload = function(){
                    if(xhr9.status == 200){
                        apiKeyGood = apiKeys[counter];
                        console.log("THE GOOD API KEY IS: " + apiKeys[counter]);
                        if(apiKeyGood){
                            updateDom(apiKeyGood);
                        }
                        return i=100;
                    } else {
                        console.log("SAUS");
                    }
                }

                xhr9.send();
            }
            xhr9.abort();
            return apiKeyGood;
        }


			$(document).ready(function(){
            
            apiKey();
      	
      });
