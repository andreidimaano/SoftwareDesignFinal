import{ Client, Message, Guild } from 'discord.js';

import { CommandInvoker } from './commands/CommandInvoker'

export class DiscordBot{
    private static instance: DiscordBot;

    private currentMembersOnBreak: string[] = [];
    private prefix: string = '!! ';
    private currentMembersStudying: string[] = [];

    private client: Client = new Client();
    private commandInvoker: CommandInvoker = new CommandInvoker(
      this.client,
      this.prefix
    );

    private constructor(){
        this.initializeClient();
    }

    private initializeClient(): void{
        if(!this.client) return;

        this.setMessageHandler();
        this.setReadyHandler();
    }
    
    getMembersStudying(): string[] {
        return this.currentMembersStudying;
    }

    addMemberStudying(authorTag: string): void{ 
         this.currentMembersStudying.push(authorTag);
    }

    removeMember(authorTag: string): void{
        let index = this.currentMembersStudying.indexOf(authorTag);
        if (index > -1){
          this.currentMembersStudying.splice(index,1);
        }
    }


    getMembersOnBreak(): string[] {
      return this.currentMembersOnBreak;
    }


    addMemberOnBreak(authorTag: string): void{ 
      this.currentMembersOnBreak.push(authorTag);
    }

    removeMemberOnBreak(authorTag: string): void{
     let index = this.currentMembersOnBreak.indexOf(authorTag);
     if (index > -1){
       this.currentMembersOnBreak.splice(index,1);
      }
    }

    
    static getInstance(): DiscordBot {
        if (!DiscordBot.instance) {
          DiscordBot.instance = new DiscordBot();
        }
        return DiscordBot.instance;
      }

    connect(): void {
        this.client
          .login(process.env.discord_token)
          .then(_ => console.log('Connected to Discord'))
          .catch((error) =>
            console.error(`Could not connect. Error: ${error.message}`)
          );
    }
  

    disconnect(): void {
        this.client.destroy();
    }
    
  
    private setReadyHandler(): void {
      this.client.on('ready', async () => {
        console.log(`Logged in as ${this.client.user?.tag}!`)
        console.log('Discord Bot Connected');
        await this.client.user?.setActivity('VSCode');
      })
    }

    private setMessageHandler(): void {
      this.client.on('message', async (message: Message) => {
        //* filters out requests from bots
        if (message.author.bot) return;
        if (message.content.indexOf(this.prefix) !== 0 ) return;
        
        //call commandInvoker
        this.commandInvoker.setCommand(message);
        await this.commandInvoker.executeCommand();

        // if (message.content === 'ping') {
        //   console.log(message.guild?.id);
        //   await message.reply(`Pong!`)
        // }
      })
    }
}