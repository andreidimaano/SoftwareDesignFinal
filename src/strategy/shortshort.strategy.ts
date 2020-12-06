import { PomodoroTimer } from './Pomodoro.strategy'
import { Message, Client } from 'discord.js'
import { createStartEmbed, createEndEmbed } from './EmbedTimer'



export class ShortShort extends PomodoroTimer {
    constructor(private message: Message, private client: Client) {
        super();
    }

    private studyTime: number = 25;
    private breakTime: number = 5;

    async startTimer(): Promise<void> {
        
        //send start message
        await this.message.reply(createStartEmbed((this.studyTime).toString()));
            setTimeout(async () => {
                //remove from studying list     
                await this.message.channel.send(this.message.author, createEndEmbed((this.breakTime).toString()));
                //console.log(currentMembersStudying);
        }, 100 * this.studyTime ); 
        
        /*
        setTimeout{async () => {
            //remove from break list
        }, 1000 * break timer};
        */
    }

    
}