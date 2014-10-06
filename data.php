<?php
/*LeagueSides - php backend for fetching data by Jin-li Chang */
if(isset($_GET["sum"]) && isset($_GET["region"])){
    $sum = $_GET["sum"];
    $reg = $_GET["region"];

    $key = '?api_key=fe47db54-a104-45af-97ae-4128f3b16b07';

    //get summoner ID from summoner name
    $sumurl = 'https://na.api.pvp.net/api/lol/'.$reg.'/v1.4/summoner/by-name/'.$sum;
    $summoner = json_decode(file_get_contents($sumurl.$key), true);
    $sumid = $summoner[$sum]["id"];

    $gameurl='https://na.api.pvp.net/api/lol/'.$reg.'/v1.3/game/by-summoner/'.$sumid.'/recent';
    $games = file_get_contents($gameurl.$key);

    echo $games;
}


