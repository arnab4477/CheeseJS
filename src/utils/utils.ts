import chalk from 'chalk';

export const log = (...values) => console.log(chalk.greenBright(...values));
export const err = (...values) => console.log(chalk.redBright(...values));
