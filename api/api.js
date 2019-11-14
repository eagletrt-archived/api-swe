const { MILLIS } = require('../config.json');
const { srotola, fromData } = require('../utils/data-handling');

module.exports = (app, database) => {

    /*
        This endpoint return the data with timestamp started from 'start' to 'finish
        URL: /getManyFromTimestamp?start=.....&finish=.....
     */
    app.get("/getManyFromTimestamp", async (req, res) => {
        const start = +req.query.start;
        const finish = +req.query.finish;
        await database.selectManyFromTimestamp(start, finish)
            .then((result) => {
                return res.status(200).send(result);
            })
            .catch((error) => {
                return res.status(400).send(error);
            });
    });

    /*
    This endpoint retrieves all the marks into the start and finish timestamp
    URL: /getMarkers?start=....&finish=....
     */
    app.get("/getMarkers", async (req, res) => {
        const start = +req.query.start;
        const finish = +req.query.finish;
        await database.getMarks(start, finish)
            .then(result => {
                let data = {};
                data = result.map(val => {
                        if(val.mark !== undefined){
                            return { ...val.mark, timestamp: val.timestamp };
                        }else if(val.timestamp !== undefined){
                            return {title: 'pilota', description: 'pilota', type: 'pilota', timestamp: val.timestamp };
                        }
                    }
                );
                return res.status(200).send(data);
            }).catch(error => {
                return res.status(400).send(error);
            });
    });

    /*
    This endpoint return the data with a certain id
    URL: /getTimestamp?timestamp=...
     */
    app.get("/getTimestamp", async (req, res) => {
        const timestamp = +req.query.timestamp;
        await database.selectFromTimestamp(timestamp)
            .then((result) => {
                return res.status(200).send(result);
            })
            .catch((error) => {
                return res.status(400).send(error);
            });
    });
};
