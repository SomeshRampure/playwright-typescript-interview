import { exec } from 'node:child_process';

setInterval(() => {
    exec('npx playwright test tests/bitcoin.spec.ts ',(error, stdout) => {
        console.log(stdout);

        if (error) {
            console.log('Test failed');
        }
    });
}, 30 * 60 * 1000);