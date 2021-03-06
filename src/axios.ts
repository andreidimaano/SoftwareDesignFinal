import axios from 'axios';

require('dotenv').config({path: __dirname + '/../.env'});

let riotInstance = axios.create({
    baseURL: 'https://na1.api.riotgames.com/lol',
    params: {api_key: process.env.RIOT_API},
});

let kanyeInstance = axios.create({
    baseURL: 'https://api.kanye.rest'
});

let riotChampionInstance = axios.create({
    baseURL: 'http://ddragon.leagueoflegends.com/cdn/10.24.1/data/en_US/champion.json',
});

export {
    riotInstance,
    kanyeInstance,
    riotChampionInstance
}