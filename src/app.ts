import path from 'path';
import express from 'express';
import "reflect-metadata";
import {createConnection, getConnection} from "typeorm";
import {Task} from "./entity/Task"

const app = express();
app.disable("x-powered-by");

const PORT = process.env.PORT || 3000

createConnection().then(async connection => {
    console.log("Database successful connected...");

    // @ts-ignore
    app.listen(PORT, (err) => {
        if (err) {
            console.error(err);
        }
        console.log(`server is listening on ${PORT}`);
    });
}).catch(error => console.log(error));

app.use(express.static(path.join('dist', 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/tasks', async (req, res) => {

    try {
        const repository = getConnection().getRepository(Task);
        const allTasks :Task[] = await repository.find();

        res.status(200).send(allTasks)
    }
    catch (e) {
        res.status(418).send(e);
    }

});

app.post('/api/tasks', async (req, res) => {

    try {
        const task = new Task();

        task.text = req.body.text;
        task.date = req.body.date;
        task.done = req.body.done;

        const repository = getConnection().getRepository(Task);
        await repository.save(task);
        const allTasks :Task[] = await repository.find();

        res.status(200).send(allTasks);
    }
    catch (e) {
        res.status(418).send(e);
    }

});

app.put('/api/tasks/:id', async (req, res) => {
    try {
        const repository = getConnection().getRepository(Task);

        const task :Task = await repository.findOne({
            id: (+req.params.id)
        });

        task.text = req.body.text;
        task.date = req.body.date;
        task.done = req.body.done;

        await repository.save(task);
        const allTasks :Task[] = await repository.find();

        res.status(200).send(allTasks);
    }
    catch (e) {
        res.status(418).send(e);
    }
});

app.delete('/api/tasks/:id',async (req, res) => {
    try {
        const repository = getConnection().getRepository(Task);

        const task :Task = await repository.findOne({
            id: (+req.params.id)
        });

        await repository.delete(task);
        const allTasks :Task[] = await repository.find();

        res.status(200).send(allTasks);
    }
    catch (e) {
        res.status(418).send(e);
    }

});

app.get('/api/articles/:id', (req, res) => {
    res.send('This is not implemented now');
});

