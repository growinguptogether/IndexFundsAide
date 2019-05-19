import { FundGetter } from './fundGetter';
import * as fs from 'fs';

const fundGetter = new FundGetter();

fundGetter.getAllIndexFunds()
    .then(funds => {
        fs.writeFile('allIndexFunds.json', JSON.stringify(funds), (error) => {
            if (error) console.warn("write file failed!");
            else console.log('write file success!')
        });
    });




