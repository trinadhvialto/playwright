const cosmosClient = require("@azure/cosmos").CosmosClient;
const sql = require('mssql');

export class TestData {

    static async sqlDBConnection() {
        var server = process.env.subscription + "-conm-" + process.env.env + "-" + process.env.locationshortcut + "-sqlserver-dbs.database.windows.net"
        var database = "ConnectivityModuleDb"
        var config = {
            server: server,
            // user: 'mssqladministrator',
            // password: process.env.sqldbpassword,
            database: database,
            requestTimeout: 600000,
            options: {
                encrypt: true // Use this if you're on Windows Azure
            },
            authentication: {
                type: "azure-active-directory-service-principal-secret",
                options: {
                    clientId: process.env.servicePrincipalClientId,
                    clientSecret: process.env.servicePrincipalClientSecret,
                    tenantId: process.env.tenantId
                }
            }
        };
        var conn = new sql.ConnectionPool(config);
        return conn;

    }
    static async executeSqlQuery(pool1: { connect: () => any; on: (arg0: string, arg1: (err: any) => void) => void; request: () => any; close: () => void; }, queryString: any) {
        var pool1Connect = await pool1.connect();
        pool1.on('error', err => {
            console.log(err);
            return;
        })
        await pool1Connect;
        try {
            const request = pool1.request(); // or: new sql.Request(pool1)
            const result = await request.query(queryString)
            return result;
        } catch (err) {
            console.error('SQL error', err);
            return null;
        }
        pool1.close();

    }

 

    static async generateRandomUniqeIDNumber() {
        const d = new Date();
        let minutes = d.getMinutes();
        let seconds = d.getSeconds();
        let hour = d.getHours();
        const result = Math.random().toString(36).substring(2, 5).toUpperCase();
        let localUid = "SNO"+result + hour + minutes.toString() + seconds;
        return localUid;

    }

    static async getUTCTimeCustom24hrs(localTime: string) {

        console.log(localTime);
        var localDate = new Date();

        localDate.setHours(parseInt(localTime.split(":")[0].trim()));

        localDate.setMinutes(parseInt(localTime.split(":")[1].substring(0, 2).trim()))
        localDate.setSeconds(0, 0)
        console.log("**** Returning time " + localDate.toISOString());
        return localDate.toISOString()

    }
    
    static async waitFortimeOut(waitTime : any) {
        const sleep = (waitTimeInMs : any) => new Promise(resolve => setTimeout(resolve, waitTimeInMs));
        await sleep(waitTime);
    }
    static async executeCosmosQuery(queryString : any){
        /*var endpoint = process.env.cosmosConfig.endpoint;
        var key = process.env.cosmosConfig.key;
        var databaseId = process.env.cosmosConfig.databaseId;
        var containerId = process.env.cosmosConfig.containerId;
        const client = new cosmosClient({ endpoint, key });

        const database = client.database(databaseId);
        const container = database.container(containerId);
        console.log(`Querying container: Items`);

        // query to return all items
        const querySpec = {
            query: queryString
        };

        // read all items in the Items container
        var {resources: items}  = await container.items.query(querySpec).fetchAll();
        return items;*/
    }

    static async getUTCTimeCustom(localTime : any) {

        console.log(localTime);
        var localDate = new Date();
        var hours = parseInt(localTime.split(":")[0].trim());
        if (localTime.includes('PM')) {
            if (hours == 12) {
                localDate.setHours(parseInt(localTime.split(":")[0].trim()));
            } else {
                localDate.setHours(parseInt(localTime.split(":")[0].trim()) + 12);
            }
        } else {
            if (hours == 12) {
                localDate.setHours(0);
            } else {
                localDate.setHours(parseInt(localTime.split(":")[0].trim()));
            }
        }
        localDate.setMinutes(parseInt(localTime.split(":")[1].substring(0, 2).trim()))
        localDate.setSeconds(0, 0)
        console.log("**** Returning time " + localDate.toISOString());
        return localDate.toISOString()

    }

}