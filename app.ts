import initApp from './server';

const port = process.env.PORT || 3000;

const runApp = async () => {
    try {
        const app = await initApp();
        app.listen(port, () => {
            console.log(`Post and comment app listening to port ${port}`);
        });
    } catch (error) {
        console.error("Failed to initialize the app: ", error);
    }
};

runApp();