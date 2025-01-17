import { Request, Response } from "express";
import { Mongoose, Model } from 'mongoose';

class BaseController<T> {
    model: Model<T>;
    constructor(model: Model<T>) {
        this.model = model;
    }

    async getAll(req: Request, res: Response) {
        const ownerFilter = req.query.owner;
        const postIdFilter = req.query.postId;

        try {
            if (ownerFilter && postIdFilter) {
                const items = await this.model.find({ owner: ownerFilter, postId: postIdFilter });
                res.status(200).send(items);
            } else if (ownerFilter) {
                const items = await this.model.find({ owner: ownerFilter });
                res.status(200).send(items);
            } else if (postIdFilter) {
                const items = await this.model.find({ postId: postIdFilter });
                res.status(200).send(items);
            } else {
                const items = await this.model.find();
                res.status(200).send(items);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    };

    async getById(req: Request, res: Response) {
        const idToFind = req.params.id;
        if (Mongoose.prototype.isValidObjectId(idToFind)) {
            try {
                const items = await this.model.findById(idToFind);
                if (items === null) {
                    return res.status(404).send('Item not found');
                } else {
                    return res.status(200).send(items);
                }
            } catch (error) {
                res.status(500).send(error);
            }
        } else {
            return res.status(400).send("invalid ObjectId");
        }
    };

    async createItem(req: Request, res: Response) {
        const itemToCreate = req.body;

        try {
            const newItem = await this.model.create(itemToCreate);
            res.status(201).send(newItem);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    async updateItemById(req: Request, res: Response) {
        const itemIdToUpdate = req.params.id;
        const item = req.body;
        if (Mongoose.prototype.isValidObjectId(itemIdToUpdate)) {
            try {
                const updatedItem = await this.model.findByIdAndUpdate(itemIdToUpdate, item, { new: true });
                if (!updatedItem) {
                    return res.status(404).send('Item not found');
                }

                res.status(200).send(updatedItem);
            } catch (error) {
                res.status(500).send(error);
            }
        } else {
            return res.status(400).send("invalid ObjectId");
        }
    };

    async deleteItemById(req: Request, res: Response) {
        const itemIdToDelete = req.params.id;

        if (Mongoose.prototype.isValidObjectId(itemIdToDelete)) {
            try {
                const deletedItem = await this.model.findByIdAndDelete(req.params.id);
                if (!deletedItem) {
                    return res.status(404).send('Item not found');
                }

                res.status(200).send(`Item with id ${req.params.id} deleted`);
            } catch (error) {
                console.log(error);
                console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
                res.status(500).send(error);
            }
        } else {
            return res.status(400).send("invalid ObjectId");
        }
    };

};

export default BaseController;