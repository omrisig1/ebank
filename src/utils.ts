// export const delay = (ms: number) =>
//   new Promise((resolve) => setTimeout(resolve, ms));

//--------------------------------------------------

// export const echo = async (msg: string, ms: number) => {
//   await delay(ms);
//   return msg;
// };

//--------------------------------------------------
/*

    const echo = async (msg, ms)=> {
        console.log(`--> start ${msg}`)
        await delay(ms);
        log.magenta(`finish <-- ${msg}`)
        return msg;
    }

*/
//--------------------------------------------------

export default (max: number, min = 0) => min + Math.round(Math.random() * (max - min));
