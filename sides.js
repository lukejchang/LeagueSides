/**
 * Created by JChang on 10/4/2014.
 */
"use strict";
var sides = angular.module("sides", []);
sides.controller('sidesCtrl', function($scope, $http){
    $scope.init = function() {
        $scope.regions = ['br', 'eune', 'euw', 'kr', 'lan', 'las', 'na', 'oce', 'ru', 'tr'];
        $scope.reg = $scope.regions[6];

        $scope.error = false;
        $scope.nogames = false;
        $scope.haveData = false;
    };

    $scope.getgames = function() {
        $scope.haveData = false;
        $scope.nogames = false;
        $scope.error = false;
        $scope.name = $scope.sum;
        $scope.region = $scope.reg;
        $http.get('http://students.washington.edu/jlchang/LeagueSides/data.php?sum=' + $scope.name + '&region=' + $scope.region)
            .success(function(data){
                $scope.process(data);
            })
            .error(function(){
                $scope.error = true;
            });
    };

    $scope.process = function(data){
        $scope.games = data.games;
        if($scope.games == null || $scope.games.length === 0) {
            $scope.nogames = true;
            return;
        }
        $scope.stats = {
            Normals: {
                Order: 0,
                Blue: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                },
                Purple: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                }
            },
            "Ranked Solo": {
                Order: 1,
                Blue: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                },
                Purple: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                }
            },
            "Ranked 5s": {
                Order: 2,
                Blue: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                },
                Purple: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                }
            },
            "Other": {
                Order: 3,
                Blue: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                },
                Purple: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                }
            },
            Total: {
                Order: 4,
                Blue: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                },
                Purple: {
                    Win: 0,
                    Loss: 0,
                    Kills : 0,
                    Deaths: 0,
                    Assists: 0
                }
            }
        };

        for (var i = 0; i < $scope.games.length; i++) {
            //if game is matchmade 5v5 rift
            if ($scope.games[i]["gameMode"] == "CLASSIC" && $scope.games[i]["gameType"] == "MATCHED_GAME") {
                var side = $scope.games[i]["teamId"] == 100 ? "Blue" : "Purple";
                var result = $scope.games[i]["stats"]["win"] ? "Win" : "Loss";
                var subtype = "";

                var kills = $scope.games[i].stats.championsKilled || 0;
                var deaths = $scope.games[i].stats.numDeaths || 0;
                var assists = $scope.games[i].stats.assists || 0;

                switch ($scope.games[i]["subType"]) {
                    case "NORMAL":
                        subtype = "Normals";
                        break;
                    case "RANKED_SOLO_5x5":
                        subtype = "Ranked Solo";
                        break;
                    case "RANKED_PREMADE_5x5":
                    case "RANKED_TEAM_5x5":
                        subtype = "Ranked 5s";
                        break;
                    default :
                        subtype = "Other";

                }

                $scope.stats[subtype][side][result]++;
                $scope.stats[subtype][side].Kills += kills;
                $scope.stats[subtype][side].Deaths += deaths;
                $scope.stats[subtype][side].Assists += assists;
                $scope.stats.Total[side][result]++;
                $scope.stats.Total[side].Kills += kills;
                $scope.stats.Total[side].Deaths += deaths;
                $scope.stats.Total[side].Assists += assists;
            }
        }
        $scope.haveData = true;
    };
});
