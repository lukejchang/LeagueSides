<?php
/**
 * Created by PhpStorm.
 * User: JChang
 * Date: 10/3/2014
 * Time: 12:57 AM
 */

//pulling game data from the riot api

$url=urlencode('https://na.api.pvp.net/');

$key = 'fe47db54-a104-45af-97ae-4128f3b16b07';

$summoner = 'walkemskies';

$curl = curl_init($url + 'api/lol/NA/v1.3/game/by-summoner/' + $summoner + '/recent');

$result = curl_exec($curl);

echo "HEY";

echo $result;