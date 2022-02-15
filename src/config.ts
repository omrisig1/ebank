import fs from 'fs';
import path from "path";

interface IConfig {
    HTTP_LOG_FILE_PATH: string;
    ERRORS_LOG_FILE_PATH: string;
    account_types:{
        INDIVIDUAL: string,
        BUISNESS: string,
        FAMILY: string
    };
    individual_account_minimum_transfer:string;
    account_minimum_transfer:{
        "individual":string
    };
    currencies: string[];
    express_server: {
        HOST: string,
        PORT: string
    };
    mysql_connection: {
        DB_HOST: string,
        DB_PORT: string,
        DB_NAME: string,
        DB_USER_NAME: string,
        DB_USER_PASSWORD: string
    },
    TRASNFER_LIMIT_ON:boolean,
    family:{
        MIN_BALANCE: number,
        TRANS_F2B: number
    },
    individual:{
        MIN_BALANCE: number,
        MIN_INDIVIDUAL_ID_NUM: number,
        INDIVIDUAL_ID_DIGITS: number
    };
    business:{
        MIN_BALANCE: number,
        MIN_COMPANY_ID_NUM: number,
        COMPANY_ID_DIGITS: number,
        MAX_TRANS_B2B_SAME_COMPANY: number,
        MAX_TRANS_B2B_DIF_COMPANY: number,
        MAX_TRANS_B2B_FX_SAME_COMPANY: number,
        MAX_TRANS_B2B_FX_DIF_COMPANY: number,
        MAX_TRANS_B2I: number
    };
    FX_ACCESS_KEY: string
}

const config: IConfig = JSON.parse(fs.readFileSync(path.join(process.cwd(),"config.json"),"utf-8"));
export default config;