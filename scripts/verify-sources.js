const fs = require('fs');
const https = require('https');
const http = require('http');
const path = require('path');

const SOURCES_PATH = path.join(__dirname, '../data/official_sources.json');

// Color codes for console output
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

function getProtocol(url) {
    return url.startsWith('https') ? https : http;
}

function checkUrl(url) {
    return new Promise((resolve) => {
        const protocol = getProtocol(url);
        const req = protocol.request(url, { method: 'HEAD', timeout: 10000 }, (res) => {
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ url, status: 'OK', code: res.statusCode });
            } else if (res.statusCode === 405) {
                // Some servers block HEAD, try GET
                resolve(checkUrlGet(url));
            } else {
                resolve({ url, status: 'FAIL', code: res.statusCode });
            }
        });

        req.on('error', (err) => {
            resolve({ url, status: 'ERROR', error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ url, status: 'TIMEOUT' });
        });

        req.end();
    });
}

function checkUrlGet(url) {
    return new Promise((resolve) => {
        const protocol = getProtocol(url);
        const req = protocol.get(url, { timeout: 10000 }, (res) => {
            // We just want status, destroy stream immediately
            res.destroy();
            if (res.statusCode >= 200 && res.statusCode < 400) {
                resolve({ url, status: 'OK', code: res.statusCode });
            } else {
                resolve({ url, status: 'FAIL', code: res.statusCode });
            }
        });

        req.on('error', (err) => {
            resolve({ url, status: 'ERROR', error: err.message });
        });

        req.on('timeout', () => {
            req.destroy();
            resolve({ url, status: 'TIMEOUT' });
        });
    });
}

function extractUrls(obj, urls = []) {
    for (const key in obj) {
        if (typeof obj[key] === 'string' && (obj[key].startsWith('http://') || obj[key].startsWith('https://'))) {
            urls.push(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            extractUrls(obj[key], urls);
        }
    }
    return urls;
}

async function main() {
    console.log(`${YELLOW}Starting Official Sources Verification...${RESET}\n`);

    try {
        const rawData = fs.readFileSync(SOURCES_PATH);
        const sources = JSON.parse(rawData);

        const urls = extractUrls(sources);
        const uniqueUrls = [...new Set(urls)];

        console.log(`Found ${uniqueUrls.length} unique URLs to check.\n`);

        let successCount = 0;
        let failCount = 0;

        for (const url of uniqueUrls) {
            process.stdout.write(`Checking ${url}... `);
            const result = await checkUrl(url);

            if (result.status === 'OK') {
                console.log(`${GREEN}[OK]${RESET} (${result.code})`);
                successCount++;
            } else {
                console.log(`${RED}[${result.status}]${RESET} ${result.code || result.error || ''}`);
                failCount++;
            }
        }

        console.log(`\n${YELLOW}Verification Complete.${RESET}`);
        console.log(`Total: ${uniqueUrls.length}`);
        console.log(`Success: ${GREEN}${successCount}${RESET}`);
        console.log(`Failed: ${RED}${failCount}${RESET}`);

        if (failCount > 0) {
            process.exit(1);
        } else {
            process.exit(0);
        }

    } catch (err) {
        console.error(`${RED}Critical Error:${RESET}`, err.message);
        process.exit(1);
    }
}

main();
