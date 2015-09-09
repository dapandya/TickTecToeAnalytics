/**
 * Mock Server
 */
(function ($) {
  var self = {};

  self.get = function (url) {
    //url = url.split('?')[0];
    return this[url]();
  }

  exports.Server = self;



  var userImages = ['http://ddragon.leagueoflegends.com/cdn/5.9.1/img/item/1055.png', 'http://avatar.leagueoflegends.com/NA1/MONTUSAN1.png', 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/champion/Tristana.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/Leona.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/Graves.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/champion/Taric.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/2049.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/3134.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/3031.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/1031.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/3340.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/3067.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/1028.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/3341.png', 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/item/2049.png', 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/item/3110.png', 'http://ddragon.leagueoflegends.com/cdn/5.9.1/img/item/3035.png', 'http://ddragon.leagueoflegends.com/cdn/5.8.1/img/item/1057.png'],
    userNames = ['Gordon', 'MONTUSAN1', 'ddragon', 'Leona', 'Graves', 'Taric', 'Tristana', 'GOM_3134', 'GeekSlayer_4040', 'leagueoflegends', 'Nubes____forever', 'Why_me_No_WIN', 'Champ90', 'Kafka_scheduler_5050', 'P1_Issue_Slayer', 'httpDoc', 'SuperGom15', 'PowerXStrm'],
    location = ['India', 'USA', 'SF Bay Area', 'Canada', 'Peru', 'Brazil', 'China', 'Australia', 'London', 'Japan', 'Vietnam', 'Thailand', 'Singapore', 'Egypt', 'Panama', 'Chili', 'France', 'UK'],
    games = [{
      seq: ['o', 'x', 'o', 'x', 'o', 'x', 'o', 'o', 'x'],
      winner: 'o'
    },
    {
      seq: ['x', 'o', 'x', 'o', 'x', 'o', 'x', 'x', 'o'],
      winner: 'x'
    },
    {
      seq: ['o', 'o', 'o', 'x', 'x', '', '', '', ''],
      winner: 'o'
    },
    {
      seq: ['x', 'x', 'x', 'o', 'o', '', '', '', ''],
      winner: 'x'
    },
    {
      seq: ['o', 'o', 'x', 'x', 'o', 'o', 'o', 'x', 'x'],
      winner: ''
    },
    {
      seq: ['x', 'x', 'o', 'o', 'x', 'x', 'x', 'o', 'o'],
      winner: ''
    }];

  function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function getPlayer () {
    var user = {},
      MAX_USERS = 17,
      userIndex;
    user.id = Math.round(Math.random() * 1000);
    userIndex = Math.round(Math.random() * MAX_USERS);
    user.pic = userImages[userIndex];
    user.name = userNames[userIndex];
    user.location = userNames[userIndex];
    user.dateJoined = randomDate(new Date(2005, 0, 1), new Date());


    user.gamesWon = Math.round(Math.random() * 1000);
    user.gamesLost = Math.round(Math.random() * 1000);
    user.gamesTie = Math.round(Math.random() * 1000);
    user.totalGames = user.gamesWon + user.gamesLost + user.gamesTie;
    user.rank = Math.round(Math.random() * 100);
    return user;
  }

  function getGame(samePlayer) {
    var game = {},
      signs = ['o', 'x'],
      gameIndex = Math.round(Math.random() * 5),
      signIndex = Math.round(Math.random() * 1);

    game.id = Math.round(Math.random() * 1000000);
    game.startDate = randomDate(new Date(2005, 0, 1), new Date());
    game.duration = Math.round(Math.random() * 60); // in minutes
    game.player1 = samePlayer || getPlayer();
    game.player2 = getPlayer();
    game.winner = games[gameIndex].winner;

    game.player1.sign = signs[signIndex];
    game.player2.sign = signIndex ? signs[0] : signs[1];
    game.seq = games[gameIndex].seq;
    return game;
  }


  // common config response from initial load.. used by filters across multiple pages
  self['/api/common'] = function() {
    return [
      { key:'Regions', val : ['North America', 'South America', 'Africa', 'Asia', 'Europe', 'Australia']},
      { key:'Highest Ranked', val: ['Top 10', 'Top 50', 'Top 100', 'Top 500']},
    ];
  }

  self['/api/players'] = function () {
    var players = [],
      count = Math.round(Math.random() * 50);
    for(var i=0; i < count; i++) {
      players.push(getPlayer());
    }
    return players;
  };

  self['/api/players?id'] = function () {
    var player = getPlayer();
    return {
      profile: player,
      games: self['/api/games?'](player)
    };
  };

  self['/api/games?'] = function (samePlayer) {
    var games = [],
      aGame,
      count = Math.round(Math.random() * 50);

    for(var i=0; i < count; i++) {
      aGame = getGame(samePlayer);
      games.push(aGame);
    }
    return games;
  };

  self['/api/games?id'] = function () {
    return getGame();
  };

}());







