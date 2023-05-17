import chalk from 'chalk';

class Log{

  logger:(message:string)=>void;
  intervalId:any;

  constructor() {
    this.logger = console.log;
    this.intervalId
  }
  

  log(message:string){
    this.logger(message);
  }
  info(message:string){
    this.logger(chalk.blue('ℹ') + " " + chalk.dim(message));
  }
  success(message:string){
    this.logger(chalk.green('✔') + " " + chalk.dim(message));
  }
  warning(message:string){
    this.logger(chalk.yellow('⚠') + " " + chalk.dim(message));
  }
  error(message:string){
    this.logger(chalk.red('✖') + " " + chalk.dim(message));
  }

  startLoading(
    text = "",
    chars = ["⠙", "⠘", "⠰", "⠴", "⠤", "⠦", "⠆", "⠃", "⠋", "⠉"],
    delay = 100
  ) {
    let x = 0;
  
    this.intervalId = setInterval(function() {
      process.stdout.write("\r" + chars[x++] + " " + text);
      x = x % chars.length;
    }, delay);
  
  }

  stopLoading(){
    if(this.intervalId){
      clearInterval(this.intervalId);
      process.stdout.write("\n");
    }
  }
}

export default new Log();