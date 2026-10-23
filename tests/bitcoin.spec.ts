import {test, expect } from '@playwright/test';

const cryptocurrencies =[
    {
        name: 'Bitcoin',
        url:'https://coinmarketcap.com/currencies/bitcoin/',
        minimumPrice:70000
    },
    {
         name: 'Ethereum',
        url:'https://coinmarketcap.com/currencies/ethereum/',
        minimumPrice:2000
    }
]


for (const crypto of cryptocurrencies) {
    test(`${crypto.name} price validation`, async ({ page }) =>{
        await page.goto(crypto.url);

        const priceElement =page.locator(
            '[data-test="text-cdp-price-display"]'
        );
        await expect(priceElement).toBeVisible();
        const latestPrice = await priceElement.innerText();
        const price = Number(latestPrice.replace(/[$,]/g,''));
        console.log(`${crypto.name} latest price: ${latestPrice}`);

        expect (price,
            `${crypto.name} price is below $${crypto.minimumPrice}`
        ).toBeGreaterThanOrEqual(crypto.minimumPrice);
       

    });
}

// test('Fetch latest Bitcoin price', async ({ page }) => {
//     await page.goto('https://coinmarketcap.com/currencies/bitcoin/');
//     const price =page.locator('[data-test="text-cdp-price-display"]');
//     await price.waitFor({state: 'visible'});


//     const latestPrice = await price.innerText();
//     const bitcoinPrice = Number(latestPrice.replace(/[$,]/g,''));



//     console.log('Latest Bitcoin Price:', latestPrice);
    
//     expect (bitcoinPrice,`Bitcoin price fell below $70,000. Current price: ${latestPrice}`).toBeGreaterThanOrEqual(70000);
    
// });