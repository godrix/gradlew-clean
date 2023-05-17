import chalk from 'chalk';

class Log{

  log:(message:string)=>void;
  intervalId:any;

  constructor() {
    this.log = console.log;
    this.intervalId
  }
  

  info(message:string){
    this.log(chalk.blue('ℹ') + " " + chalk.dim(message));
  }
  success(message:string){
    this.log(chalk.green('✔') + " " + chalk.dim(message));
  }
  warning(message:string){
    this.log(chalk.yellow('⚠') + " " + chalk.dim(message));
  }
  error(message:string){
    this.log(chalk.red('✖') + " " + chalk.dim(message));
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