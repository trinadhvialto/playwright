import { test as base, chromium, BrowserContext } from '@playwright/test';
import fs from 'fs';
import request, { CoreOptions } from 'request';

export const test = base.extend({
    context: async ({ context }, use) => {

       // I use the context that is created using my base config here, just adding the route, but you could also create
       // a context first if you needed even more customizability.

        await context.route('**/*', (route, req) => {
            const options = {
                uri: req.url(),
                method: req.method(),
                headers: req.headers(),
                body: req.postDataBuffer(),
                timeout: 10000,
                followRedirect: false,
                agentOptions: {
                    ca: fs.readFileSync('./certs/ca.pem'),
                    pfx: fs.readFileSync('./certs/user.p12'),
                    passphrase: fs.readFileSync('./certs/user.p12.passwd', 'utf8'),
                },
            }
            let firstTry = true
            const handler = function handler(err: any, resp: any, data: any) {
                if (err) {
                    /* Strange random connection error on first request, do one re-try */
                    if (firstTry) {
                        firstTry = false
                        return request(options, handler)
                    }
                    console.error(`Unable to call ${options.uri}`, err.code, err)
                    return route.abort()
                } else {
                    return route.fulfill({
                        status: resp.statusCode,
                        headers: resp.headers,
                        body: data,
                    })
                }
            }
            return request(options, handler)
        })
        use(context)
    },
})

export * from '@playwright/test'