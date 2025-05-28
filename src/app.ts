import { log } from 'console';
import {bot} from './Telegram/bot.ts';
import { logger } from './logger/logger.ts';

async function start(){
    try {
        logger.info('Bot ON');
        await bot.start();
    } catch (error) {
        logger.error(error);
    }
};

start()